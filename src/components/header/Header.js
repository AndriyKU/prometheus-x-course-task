import "./header.css";
import cart from "../../images/cart.svg";
import { Button } from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUsername } from "../../contextAPI/useUsername";
import { useCart } from "../../contextAPI/useCart";

export const Header = () => {
  const { username, setUsername } = useUsername();
  const { booksInCart } = useCart();
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.removeItem("username");
    setUsername("");
    navigate("/");
  };

  return (
    <>
      {username === "" ? null : (
        <header className="header">
          <h1 className="header__logo">X-course task</h1>
          <nav className="header__nav">
            <Link className="header__nav-cart" to="/cart">
              <img src={cart} alt="cart icon" width="36" />
              <span className="counter">
                {booksInCart === 0 ? "0" : booksInCart.length}
              </span>
            </Link>
            <Button
              text="Sign-Out"
              navigation={{ link: false, path: "" }}
              functionality={handleClick}
            />
            <div className="header__nav-user-avatar">
              {/* {username[0].toUpperCase()} */}
            </div>
            <h2 className="header__nav-user-name">{username}</h2>
          </nav>
        </header>
      )}
    </>
  );
};
