import { useState } from "react";
import { useCart } from "../../contextAPI/useCart";
import trash from "../../images/trash-icon.svg";
import "./order.css";

export const Order = ({ title, price, count, totalPrice }) => {
  const [quantity, setQuantity] = useState(count);
  const { setBooksInCart } = useCart();
  const deleteOrder = () => {
    setBooksInCart((prev) => {
      const orderIndex = prev.findIndex((order) => {
        return order.title === title;
      });
      prev.splice(orderIndex, 1);
      localStorage.setItem("booksInCart", JSON.stringify([...prev]));
      return JSON.parse(localStorage.getItem("booksInCart"));
    });
  };
  const decreaseCount = () => {
    if (quantity === 1) return;
    setBooksInCart((prev) => {
      const orderIndex = prev.findIndex((order) => order.title === title);
      --prev[orderIndex].count;
      (prev[orderIndex].totalPrice -= prev[orderIndex].price).toFixed(2);
      console.log(prev);
      return [...prev];
    });
    setQuantity((prev) => prev - 1);
  };
  const increaseCount = () => {
    if (quantity === 42) return;
    setBooksInCart((prev) => {
      const orderIndex = prev.findIndex((order) => order.title === title);
      ++prev[orderIndex].count;
      prev[orderIndex].totalPrice += prev[orderIndex].price;
      console.log(prev);
      return [...prev];
    });
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
          <td>{totalPrice} $</td>
          <td>
            <img
              src={trash}
              alt="delete icon"
              width=""
              height=""
              style={{ width: "32px" }}
              onClick={deleteOrder}
            />
          </td>
        </tr>
      </div>
    </div>
  );
};
