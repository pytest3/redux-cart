import styled from "styled-components";

export default function Button({ children, onClick }) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
}

const Wrapper = styled.button`
  border: 1px solid black;
  border-radius: 16px;
`;
