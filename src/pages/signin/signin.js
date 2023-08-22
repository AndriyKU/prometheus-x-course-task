import avatar from "../../images/avatar.png";
import "./styles.css";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../../contextAPI/useUsername";
import { useRef, useState } from "react";

export const Signin = () => {
  const { setUsername } = useUsername();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const handleUserName = ({ target: { value } }) => {
    if (value.length >= 4 && value.length <= 20) {
      inputRef.current.classList.add("correct");
    } else {
      inputRef.current.classList.remove("correct");
    }
    setInputValue(value);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    if (inputValue.length < 4) return;
    else if (inputValue.length > 20) return;
    navigate("/books");
    sessionStorage.setItem("username", inputValue);
    setUsername(sessionStorage.getItem("username"));
  };
  const handleSubmit = ({ key }) => {
    if (key === "Enter") handleClick();

    return;
  };
  return (
    <>
      <section className="signin__container">
        <div className="wrapper">
          <figure className="signin__image">
            <img src={avatar} alt="avatar logo" width="160" height="160" />
          </figure>
          <form
            className="signin__form"
            action="./"
            method="POST"
            autoComplete="off"
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="type Username"
              maxLength="20"
              minLength="4"
              required
              value={inputValue}
              onChange={handleUserName}
              ref={inputRef}
              onKeyDown={handleSubmit}
            />
            <Button
              text="Sign-In"
              navigation={{ link: false, path: "" }}
              functionality={handleClick}
            />
          </form>
        </div>
      </section>
    </>
  );
};
