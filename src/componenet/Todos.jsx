import { useEffect, useReducer, useRef, useState } from "react";
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
    default:
      return state;
  }
}

const Data = () => {
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
  console.log("data: ");
  console.log(posts.data);
  return <></>;
};

const initialState = [
  { id: 1, text: "json-text1", done: true },
  { id: 2, text: "json-text2", done: false },
  { id: 3, text: "json-text3", done: false },
];

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

  // var temp = posts.data;
  // json
  // console.log(temp);
  // text
  // console.log(initialState);
  const [todos, dispatch] = useReducer(reducer, initialState);
  // const [todos, dispatch] = useReducer(reducer, temp);
  const [text, setText] = useState("");

  const handleText = (e) => setText(e.target.value);
  const nextId = useRef(4);

  // 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "create", id: nextId.current++, text });
  };

  // const handleSubmit = async () => {
  //   const { data } = await axios.post("http://localhost:5000/posts", inputs);
  //   navigate("/post/", data.id);
  // };

  // 삭제
  function handleRemove(id) {
    if (window.confirm("delete ok?")) dispatch({ type: "remove", id });
  }

  // 토글(밑줄)
  const handleToggle = (id) => dispatch({ type: "toggle", id });

  return (
    <div>
      <Data />
      <TodoList todos={todos} onRemove={handleRemove} onToggle={handleToggle} />
      <TodoCreate onChange={handleText} onSubmit={handleSubmit} />
      <Outlet context={{ posts }} />
    </div>
  );
}

export default Todos;
