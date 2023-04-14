import Button from "./UI/Button";
import Header from "./Components/Header";
import Cart from "./Components/Cart";
import Products from "./Components/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SuperHeader from "./UI/SuperHeader";
import { showNotification } from "./Store/ui-slice";
import { refreshCart } from "./Store/cart-slice";

// let initialRun = true;
const URL =
  "https://redux-try2-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";

function App() {
  const showCart = useSelector((state) => state.cart.showCart);
  const cartData = useSelector((state) => state.cart.products);
  const totalCartQuantity = useSelector(
    (state) => state.cart.totalCartQuantity
  );
  const cartChanged = useSelector((state) => state.cart.cartChanged);

  const dispatch = useDispatch();

  // Send cart data //

  const sendCartData = async (cartData) => {
    dispatch(
      showNotification({
        message: "Sending cart data",
        status: "Pending",
      })
    );
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartData, quantity: totalCartQuantity }),
      });

      if (!response.ok) {
        throw new Error("You received a Network response but it was not OK");
      }

      dispatch(
        showNotification({
          message: "Sent cart data successfully",
          status: "Success",
        })
      );
    } catch (e) {
      dispatch(
        showNotification({
          message: "Error sending cart data",
          status: "Error",
        })
      );
    }
  };

  useEffect(() => {
    // if (initialRun) {
    //   initialRun = false;
    //   console.log(initialRun);
    //   return;
    // }

    if (!cartChanged) {
      console.log(cartChanged);
      return;
    }

    console.log("here");
    sendCartData(cartData);
  }, [cartData]);

  // Fetch cart data //

  useEffect(() => {
    // dispatch(
    //   showNotification({ message: "Getting Cart Data", status: "Pending" })
    // );
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          return response;
        }
      })
      .then((data) => data.json())
      .then((data) => {
        // dispatch(
        //   showNotification({
        //     message: "Cart Data Fetched Successfully",
        //     status: "Success",
        //   })
        // );
        // // fallback value for if/when entire cart gets deleted in firebase
        dispatch(refreshCart(data || {}));
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          showNotification({
            message: "Error fetching cart data",
            status: "Error",
          })
        );
      });
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
