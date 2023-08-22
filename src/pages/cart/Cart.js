import { Button } from "../../components/button/Button";
import "./styles.css";
import cart from "../../images/cart.svg";
import { Order } from "../../components/orderTable/Order";
import { useCart } from "../../contextAPI/useCart";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { booksInCart, setBooksInCart } = useCart();
  const handleDeleteCart = () => {
    localStorage.setItem("booksInCart", JSON.stringify([]));
    setBooksInCart(JSON.parse(localStorage.getItem("booksInCart")));
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  /* console.log(booksInCart); */

  return (
    <section className="cart-section">
      <div className="buttons-section">
        <Button
          text="Purchase"
          navigation={{ path: "", link: false }}
          functionality={handleDeleteCart}
          disabled={booksInCart.length === 0 ? true : false}
        />

        <Button
          text="Go back"
          navigation={{ path: "", link: false }}
          functionality={handleClick}
        />
      </div>
      {booksInCart.length === 0 ? (
        <figure className="cart">
          <img src={cart} alt="cart" width="300" height="300" />
          <figcaption>Cart empty...</figcaption>
        </figure>
      ) : null}
      <div className="cart-container">
        <table className="table-recap">
          <thead>
            <tr className="table-recap__headers">
              <th>Book</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {booksInCart.map((bookOrder) => {
              return (
                <Order
                  title={bookOrder.title}
                  price={bookOrder.price}
                  totalPrice={bookOrder.totalPrice}
                  count={bookOrder.count}
                  key={bookOrder.id}
                />
              );
            })}
          </tbody>
          {booksInCart.length === 0 ? null : (
            <tfoot>
              <div className="wooden_scenario3D">
                <div className="pallet">
                  {["0", "21%", "42%", "62%", "82%"].map((position, i) => {
                    /*
                    formula ():
                      (100% - 18% * numberOfElement) / numberOfElement ) * indexPosition 
                      + (18% * indexPosition)
                    */
                    return (
                      <div
                        className="lateral-wooden-plank"
                        key={i}
                        style={{ left: position }}
                      >
                        <div className="lateral-wooden-plank__top"></div>
                        <div className="lateral-wooden-plank__front"></div>
                        <div className="lateral-wooden-plank__right"></div>
                      </div>
                    );
                  })}
                  {[
                    { transform: "translateZ(0px)", zIndex: 3 },
                    { transform: "translateZ(-75px)", zIndex: 2 },
                    { transform: "translateZ(-150px)", zIndex: 1 },
                  ].map((style, i) => {
                    return (
                      <div
                        className="longitudinal-wooden-plank"
                        key={i}
                        style={style}
                      >
                        <div className="longitudinal-wooden-plank__top"></div>
                        <div className="longitudinal-wooden-plank__front"></div>
                        <div className="longitudinal-wooden-plank__right"></div>
                      </div>
                    );
                  })}
                  {["0", "calc(45%)", "calc(95%)"].map((position, i) => {
                    return (
                      <div
                        className="wooden-cube"
                        key={i}
                        style={{ left: position }}
                      >
                        <div className="wooden-cube__top"></div>
                        <div className="wooden-cube__front"></div>
                        <div className="wooden-cube__right"></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <tr className="table-recap__total">
                <th colSpan={5}>
                  Total price, $
                  {" " +
                    booksInCart.reduce(
                      (total, book) => total + book.totalPrice,
                      0
                    )}
                </th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </section>
  );
};
