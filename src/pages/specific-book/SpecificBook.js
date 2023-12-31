import "./styles.css";
import imageNotFound from "../../images/imageNotFound.png";
import { Button } from "../../components/button/Button";
import { useParams } from "react-router-dom";
import { useBooks } from "../../contextAPI/useBooks";
import { useCart } from "../../contextAPI/useCart";
import { useState } from "react";

export const SpecificBook = () => {
  const { id } = useParams();
  const { books } = useBooks();
  const { booksInCart, setBooksInCart } = useCart();
  const book = books.find((book) => book.id === +id) || {};
  const [quantity, setQuantity] = useState(1);

  const handleCount = (event) => {
    let count = event.target.value;
    if (count < 1) count = 1;
    else if (count > book.amount) count = 42;
    setQuantity(count);
  };

  const handleClick = (event) => {
    let newOrder = {
      id: book.id,
      count: +quantity,
      price: book.price,
      title: book.title,
      totalPrice: +(+quantity * book.price).toFixed(2),
    };

    const arrayBooks = JSON.parse(localStorage.getItem("booksInCart"));
    const sameOrder = arrayBooks.find((book) => book.title === newOrder.title);
    /*    console.log(sameOrder.count, quantity);
    console.log(sameOrder.count + quantity); */
    if (sameOrder && sameOrder.count + +quantity > 42) {
      /* console.log(sameOrder.count + quantity); */
      return;
    }

    const sameOrderIndex = arrayBooks.findIndex(
      (book) => book.title === newOrder.title
    );
    if (sameOrder) {
      newOrder = {
        ...newOrder,
        count: newOrder.count + sameOrder.count,
        totalPrice: +(newOrder.totalPrice + sameOrder.totalPrice).toFixed(2),
      };
      arrayBooks.splice(sameOrderIndex, 1);
    }
    arrayBooks.push(newOrder);
    localStorage.setItem("booksInCart", JSON.stringify(arrayBooks));
    setBooksInCart(JSON.parse(localStorage.getItem("booksInCart")));
  };

  return (
    <section className="specific-book-section">
      <article className="container-specific-book">
        <figure className="book__image">
          <img src={book.image || imageNotFound} alt="book" width="300" />
        </figure>

        <div className="photo"></div>
        <ul className="book__description-list">
          <div className="wrapper__description">
            <li>
              <h2 className="book__title">Book name:</h2>
              <p>{book.title}</p>
            </li>
            <li>
              <h2>Book author:</h2>
              <p>{book.author}</p>
            </li>
          </div>
          <li className="book__level">
            <h2>Book level:</h2>
            <div className="cards__container">
              <p className="card top">{book.level}</p>
              <div className="card middle"></div>
              <div className="card bottom"></div>
            </div>
          </li>
          <li className="book__tags">
            <h2>Book tags:</h2>
            <p className="tags__container">
              {book.tags.map((tag, i) => {
                return (
                  <span className="hashtag" key={i}>
                    {"#" + tag}
                  </span>
                );
              })}
            </p>
          </li>
        </ul>
        <div className="book__long-description">
          <h2>Description:</h2>
          <p>{book.description}</p>
        </div>
      </article>
      <form className="form" action="../cart/index.html" method="POST">
        <p className="form__text">
          <strong>Price:</strong>
          <b id="single-book-price">{book.price} $</b>
        </p>
        <div className="form__text">
          <label htmlFor="quantity">Count:</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            min="1"
            max="42"
            onChange={handleCount}
          />
        </div>
        <p className="form__text">
          <strong>Total price:</strong>
          <b id="total-books-price">{`${(book.price * quantity).toFixed(
            2
          )} $`}</b>
        </p>
        <Button
          text="Add to chart"
          navigation={{ path: "", link: false }}
          functionality={handleClick}
          disabled={
            booksInCart.find((bookInCart) => bookInCart.title === book.title)
              ?.count +
              +quantity >
            42
              ? true
              : false
          }
        />
      </form>
    </section>
  );
};
