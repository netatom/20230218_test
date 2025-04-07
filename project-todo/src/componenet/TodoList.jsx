import React, { useMemo } from "react";
import styled from "styled-components";

function counter_todo(todos) {
  return todos.filter((todo) => !todo.done).length;
}

function TodoList({ todos, onRemove, onToggle }) {
  const undoneCount = useMemo(() => {
    return counter_todo(todos);
  }, [todos]);

  return (
    <div>
      Todo List : {undoneCount}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onRemove, onToggle }) {
  return (
    <Container>
      <span
        style={{ textDecoration: todo.done && "line-through" }} onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </Container>
  );
}

const Container = styled.li`
  padding: 5px 10px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.border};
`;

export default React.memo(TodoList);
