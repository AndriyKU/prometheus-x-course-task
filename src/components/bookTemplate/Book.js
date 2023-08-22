import imageNotFound from "../../images/imageNotFound.png";
import { Button } from "../button/Button";
import "./book.css";

export const Book = ({ image, title, author, price, id, shortDescription }) => {
  return (
    <>
      <article className="container-book">
        <div className="book">
          <figure className="book__front">
            <img src={image || imageNotFound} alt="book" width="300" />
          </figure>
          <div className="book__left">
            <h2>{title}</h2>
            <p>{author}</p>
          </div>
          <div className="book__right"></div>
          <div className="book__back">
            <p>{shortDescription}</p>
            <p> {price} $</p>
          </div>
          <div className="book__top"></div>
          <div className="book__down"></div>
        </div>
        <form className="book-button">
          <Button
            text="View"
            navigation={{ path: `/books/${id}`, link: true }}
          />
        </form>
        {/* <div className="book__description">
        <h2 className="book__description-title">{title}</h2>
        <p className="book__description-author">{author}</p>
        <div className="book__description-container">
          <p className="book__description-price">
            <strong>{price} $</strong>
          </p>
          <p>
            <Button
              text="View"
              navigation={{ path: `/books/${id}`, link: true }}
            />
          </p>
        </div>
      </div> */}
      </article>
    </>
  );
};
