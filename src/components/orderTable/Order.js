import { useState } from "react";
import { useCart } from "../../contextAPI/useCart";
import trash from "../../images/trash-icon.svg";
import "./order.css";

export const Order = ({ title, price, count, totalPrice }) => {
  const [quantity, setQuantity] = useState(count);
  const { setBooksInCart } = useCart();
  const deleteOrder = () => {
    const ordersInCart = JSON.parse(localStorage.getItem("booksInCart"));
    const orderIndex = ordersInCart.findIndex((order) => order.title === title);
    ordersInCart.splice(orderIndex, 1);
    localStorage.setItem("booksInCart", JSON.stringify(ordersInCart));
    setBooksInCart(JSON.parse(localStorage.getItem("booksInCart")));
  };
  console.log(typeof price);
  const decreaseCount = () => {
    if (quantity === 1) return;
    const ordersInCart = JSON.parse(localStorage.getItem("booksInCart"));
    const orderIndex = ordersInCart.findIndex((order) => order.title === title);

    --ordersInCart[orderIndex].count;
    ordersInCart[orderIndex].totalPrice = +(
      ordersInCart[orderIndex].totalPrice - price
    ).toFixed(2);

    localStorage.setItem("booksInCart", JSON.stringify(ordersInCart));
    setBooksInCart(JSON.parse(localStorage.getItem("booksInCart")));
    setQuantity((prev) => prev - 1);
  };
  const increaseCount = () => {
    if (quantity === 42) return;
    const ordersInCart = JSON.parse(localStorage.getItem("booksInCart"));
    const orderIndex = ordersInCart.findIndex((order) => order.title === title);

    ++ordersInCart[orderIndex].count;
    ordersInCart[orderIndex].totalPrice = +(
      ordersInCart[orderIndex].totalPrice + price
    ).toFixed(2);

    localStorage.setItem("booksInCart", JSON.stringify(ordersInCart));
    setBooksInCart(JSON.parse(localStorage.getItem("booksInCart")));
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="scenario3D">
      <div className="container-box">
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="left"></div>
        <div className="back"></div>
        <tr className="table-recap__order">
          <td>{title}</td>
          <td>{price} $</td>
          <td>
            <button className="count-minus" onClick={decreaseCount}>
              -
            </button>
            {quantity}
            <button className="count-plus" onClick={increaseCount}>
              +
            </button>
          </td>
          <td>{totalPrice.toFixed(2)} $</td>
          <td>
            <img
              src={trash}
              alt="delete icon"
              width=""
              height=""
              style={{ width: "32px" }}
              onClick={deleteOrder}
              className="trash"
            />
          </td>
        </tr>
      </div>
    </div>
  );
};
