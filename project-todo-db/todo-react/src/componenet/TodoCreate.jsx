import styled from "styled-components";
import Button from "./Button";

function TodoCreate({ onSubmit, onChange, value }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Container>
          <Input type="text" onChange={onChange} value={value} />
          <Button text="Submit" />
        </Container>
      </form>
    </div>
  );
}

const Container = styled.div`
  padding: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  outline: none;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.border};
  margin-bottom: 5px;
`;

export default TodoCreate;
