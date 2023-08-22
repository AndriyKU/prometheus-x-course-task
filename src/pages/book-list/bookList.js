import "./styles.css";
import { Book } from "../../components/bookTemplate/Book";
import { useBooks } from "../../contextAPI/useBooks";
import { useState } from "react";

export const BookList = () => {
  const { books } = useBooks();
  const [filteredValue, setFilteredValue] = useState("");
  const [selectValue, setSelectValue] = useState("All");
  const filteredBooks = books
    .filter((book) => {
      return book.title
        .toLowerCase()
        .includes(filteredValue.trim().toLowerCase());
    })
    .filter((book) => {
      if (selectValue === "<15") return book.price < 15;
      else if (selectValue === "15-30")
        return book.price < 30 && book.price >= 15;
      else if (selectValue === "30+") return book.price >= 30;
      else return book;
    });

  const handleFilter = (event) => {
    setFilteredValue(event.target.value);
  };

  const handleSelect = ({ target: { value } }) => {
    setSelectValue(value);
  };
  const quantityOfShelfs = Math.ceil(filteredBooks.length / 3);
  const shelfs = Array(quantityOfShelfs, 1);
  console.log(shelfs);
  const booksComponents = filteredBooks.map((book, i) => {
    return (
      <Book
        author={book.author}
        price={book.price}
        image={book.image}
        title={book.title}
        id={book.id}
        key={book.id}
        shortDescription={book.shortDescription}
      />
    );
  });
  return (
    <main>
      <section className="filters-section">
        <form className="form">
          <input
            className="form__search"
            type="search"
            name="search"
            id="search"
            placeholder="Search by book name"
            value={filteredValue}
            onChange={handleFilter}
            autoComplete="off"
          />
          <select
            className="form__filter"
            value={selectValue}
            name="filter"
            id="select"
            onChange={handleSelect}
          >
            <option value="All">All</option>
            <option value="<15">Below $15</option>
            <option value="15-30">Between $15 and $30</option>
            <option value="30+">Above $30</option>
          </select>
        </form>
      </section>
      <section className="books-section bookshelf">
        {filteredBooks.length === 0 ? (
          <div className="shelf"></div>
        ) : (
          filteredBooks.map((book, i, arr) => {
            return i % 3 === 0 ? (
              <div className="shelf" key={i}>
                {arr.slice(i, i + 3).map((book) => {
                  return (
                    <Book
                      author={book.author}
                      price={book.price}
                      image={book.image}
                      title={book.title}
                      id={book.id}
                      key={book.id}
                      shortDescription={book.shortDescription}
                    />
                  );
                })}
              </div>
            ) : null;
          })
        )}
      </section>
    </main>
  );
};
