import { useEffect, useReducer, useState } from "react";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";
import axios from "axios";
import { Outlet } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "create":
      return [...state, { id: action.id, text: action.text, done: false }];
    case "remove":
      return state.filter((todo) => todo.id !== action.id);
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "reset":
      return action.data;
    default:
      return state;
  }
}

function Todos() {

  // json server start
  const [posts, setPosts] = useState({
    isLoading: true,
    data: null,
    isError: false,
  });
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:5000/posts");
    setPosts({
      isLoading: false,
      data,
      isError: false,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  // json server end

  useEffect(() => {
    if (posts.data) {
      posts.data.forEach((todo) => {
        dispatch({ type: "create", id: todo.id, text: todo.text });
      });
    }
  }, [posts.data]);

  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");
  const handleText = (e) => setText(e.target.value);

  // 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { text, done: false };
    await axios.post("http://localhost:5000/posts", newTodo);
    // reload list
    const { data } = await axios.get("http://localhost:5000/posts");
    dispatch({
      type: "reset",
      data: data.map(todo => ({
        id: todo.id,
        text: todo.text,
        done: false,
      }))
    });
    setText("");
  };

  // 삭제
  const handleRemove = async (id) => {
    if (window.confirm("delete ok?")) {
      try {
        await axios.post(`http://localhost:5000/post/delete/${id}`);
        dispatch({ type: "remove", id });
      } catch (err) {
        console.error("삭제 실패:", err);
      }
    }
  };

  // 토글(밑줄)
  const handleToggle = async (id) => {
    // 현재 todo의 상태를 찾음
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedDone = !todo.done;

    try {
      await axios.post(`http://localhost:5000/post/update/${id}`, {
        done: updatedDone,
      });
      dispatch({ type: "toggle", id });
    } catch (err) {
      console.error("업데이트 실패:", err);
    }
  };

  return (
    <div>
      <TodoList todos={todos} onRemove={handleRemove} onToggle={handleToggle} />
      <TodoCreate onChange={handleText} onSubmit={handleSubmit} value={text} />
      <Outlet context={{ posts }} />
    </div>
  );
}

export default Todos;
