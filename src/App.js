import TodoHeader from "./componenet/TodoHeader";
import Todos from "./componenet/Todos";
import { Route, Routes } from "react-router-dom";
import Post from "./componenet/post/Post";
import PostEdit from "./componenet/post/PostEdit";
import PostList from "./componenet/post/PostList";
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

        <Routes>
          <Route path="post" element={<Post />}>
            {/* http://localhost:3000/post */}
            <Route path="" element={<PostList />} />
            {/* http://localhost:3000/post/edit */}
            <Route path="edit" element={<PostEdit />} />
          </Route>
        </Routes>
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
