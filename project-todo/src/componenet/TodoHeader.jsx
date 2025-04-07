import styled from "styled-components";

function TodoHeader() {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <DateText>{currentYear} Year</DateText>
      <CountText>To do List This year!</CountText>
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.border};

  display: flex;
  padding: 10px;
  flex-direction: row; // 아이템의 나열 방향
  justify-content: center; // 주축에 대한 나열 방법
  align-items: center; // 교차축에 대한 나열 방법
  flex-wrap: wrap; // 공간이 부족할 때 아이템의 줄바꿈 여부 지정.
  width: 500px;
  /* border: 3px solid red; */
`;

const DateText = styled.p`
  font-size: 1.4rem;
  font-weight: 300;
`;

const CountText = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

export default TodoHeader;
