import { useSelector } from "react-redux";
import styled from "styled-components";
export default function SuperHeader() {
  const status = useSelector((state) => state.ui.status);
  const message = useSelector((state) => state.ui.message);
  return (
    <Wrapper>
      <div>{status}</div>
      <div>{message}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  background-color: blue;
`;
