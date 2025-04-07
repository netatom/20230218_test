import { useReducer, useRef, useState } from "react";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";

function main_reducer(state, action) {
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

const start_data = [
  { id: 1, text: "json-text1", done: true },
  { id: 2, text: "json-text2", done: false },
  { id: 3, text: "json-text3", done: false },
];

function Todos() {
  // console.log(start_data);
  const [todos, dispatch] = useReducer(main_reducer, start_data);
  const [text, setText] = useState("");
  const handle_text = (e) => setText(e.target.value);
  const nextId = useRef(4);

  // 추가
  const handle_create = (e) => {
    e.preventDefault();
    dispatch({ type: "create", id: nextId.current++, text });
  };

  // 삭제
  function handle_delete(id) {
    if (window.confirm("delete ok?")) dispatch({ type: "remove", id });
  }

  // 토글(밑줄)
  const handle_toggle = (id) => dispatch({ type: "toggle", id });

  return (
    <div>
      <TodoList todos={todos} onRemove={handle_delete} onToggle={handle_toggle} />
      <TodoCreate onSubmit={handle_create} onChange={handle_text} />
    </div>
  );
}

export default Todos;
