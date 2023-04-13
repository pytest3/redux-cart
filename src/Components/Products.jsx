import styled from "styled-components";
import CART_DATA from "../Data/cart-data";
import { useDispatch } from "react-redux";
import { incrementQuantity } from "../Store/cart-slice";

export default function Products() {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      {CART_DATA.map((i) => (
        <li>
          <div>{i.title}</div>
          <div>{i.description}</div>
          <div>${i.price}</div>
          <button onClick={() => dispatch(incrementQuantity(i))}>
            Add to Cart
          </button>
        </li>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.ul`
  display: grid;
  gap: 16px;
  padding: 16px;
  margin-top: 16px;
  border: 1px solid black;
`;
