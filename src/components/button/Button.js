import { Link } from "react-router-dom";
import "./button.css";

export const Button = ({
  text,
  navigation = { link: false, path: "" },
  functionality,
  disabled = false,
}) => {
  return (
    <>
      {navigation.link ? (
        <Link className="link" to={navigation.path}>
          {text}
        </Link>
      ) : (
        <button
          className={`button${!disabled ? "" : " disabled"}`}
          type="button"
          onClick={functionality}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </>
  );
};
