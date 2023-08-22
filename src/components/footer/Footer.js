import { useUsername } from "../../contextAPI/useUsername";
import "./footer.css";

export const Footer = () => {
  const { username } = useUsername();
  return (
    <>
      {username === "" ? null : (
        <footer className="footer">
          <p className="footer__text">
            Виконано в{" "}
            <a
              href="https://prometheus.org.ua/"
              target="_blank"
              rel="noreferrer"
            >
              Prometheus
            </a>{" "}
            &copy; 2023
          </p>
        </footer>
      )}
    </>
  );
};
