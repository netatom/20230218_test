import TodoHeader from "./componenet/TodoHeader";
import Todos from "./componenet/Todos";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin : 0;
    padding : 0;
    box-sizing: border-box;
  }

  a {
    text-decoration:  none;
    color : inherit;
  }

  li {
    list-style: none;
  }
`;

function App() {
  return (
    <>
      <Container>
        <GlobalStyle />
        <TodoHeader />
        <Todos />
      </Container>
    </>
  );
}

const Container = styled.div`
  /* border: 2px solid; */
  border-color: ${({ theme }) => theme.colors.border};

  display: flex;
  flex-direction: row; // 아이템의 나열 방향
  justify-content: center; // 주축에 대한 나열 방법
  align-items: center; // 교차축에 대한 나열 방법
  flex-wrap: wrap; // 공간이 부족할 때 아이템의 줄바꿈 여부 지정.
  width: 500px;
  height: 400px;
  border: 3px solid red;
`;

export default App;
