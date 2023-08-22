import "./styles.css";
import { Button } from "../../components/button/Button";

export const ErrorPage = () => {
  return (
    <section className="wall">
      <div className="frame">
        <div className="picture">
          <h2>
            Oops, something went wrong, 404 error. Please return to homepage.
          </h2>
          <Button text="Go Home" navigation={{ link: true, path: "/books" }} />
        </div>
      </div>
    </section>
  );
};
