import Button from "./UI/Button";
import Header from "./Components/Header";
import Cart from "./Components/Cart";
import Products from "./Components/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SuperHeader from "./UI/SuperHeader";
import { showNotification } from "./Store/ui-slice";

let initialRun = true;

function App() {
  const showCart = useSelector((state) => state.cart.showCart);
  const cartData = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  console.log(cartData);

  const sendCartData = async (cartData) => {
    try {
      const response = await fetch(
        "https://redux-try2-default-rtdb.asia-southeast1.firebasedatabase.app/items.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartData),
        }
      );

      if (!response.ok) {
        throw new Error("You received a Network response but it was not OK");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchCartData = () => {
    return fetch(
      "https://redux-try2-default-rtdb.asia-southeast1.firebasedatabase.app/items.json",
      {
        method: "GET",
      }
    );
  };

  useEffect(() => {
    if (initialRun) {
      initialRun = false;
      return;
    }
    sendCartData(cartData);
  }, [cartData]);

  useEffect(() => {
    fetchCartData()
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <SuperHeader></SuperHeader>
      <Header></Header>
      {showCart && <Cart></Cart>}
      <Products></Products>
    </>
  );
}

export default App;
