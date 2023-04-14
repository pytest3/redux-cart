import { useSelector } from "react-redux";
import styled from "styled-components";
export default function SuperHeader() {
  const status = useSelector((state) => state.ui.status);
  const message = useSelector((state) => state.ui.message);

  return (
    <Wrapper status={status}>
      <div>{status}</div>
      <div>{message}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  background-color: ${(p) =>
    p.status === "Success"
      ? "#a7c957"
      : p.status === "Error"
      ? "#bc4749"
      : p.status === "Pending"
      ? "#fff3b0"
      : ""};
`;
