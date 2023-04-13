import styled from "styled-components";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../Store/cart-slice";

export default function Header() {
  const totalCartQuantity = useSelector(
    (state) => state.cart.totalCartQuantity
  );

  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Logo>ReduxCart</Logo>
      <Button
        onClick={() => {
          dispatch(toggleCart());
        }}
      >
        My Cart <span>{totalCartQuantity}</span>
      </Button>
    </Wrapper>
  );
}

const Logo = styled.h1`
  font-size: 48px;
`;
const Wrapper = styled.header`
  width: 100%;
  background-color: gray;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`;
