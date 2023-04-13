import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { decrementQuantity, incrementQuantity } from "../Store/cart-slice";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  return (
    <Wrapper>
      <h1>Your shopping cart</h1>
      <CartItems>
        {products.map((i) => (
          <li>
            <h1>{i.title}</h1>
            <div>{i.quantity}</div>
            <div>${i.quantity * i.price}</div>
            <button onClick={() => dispatch(decrementQuantity(i))}>-</button>
            <button onClick={() => dispatch(incrementQuantity(i))}>+</button>
          </li>
        ))}
      </CartItems>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
`;

const CartItems = styled.ul`
  padding: 16px;
  border: 1px solid grey;
`;
