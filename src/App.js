import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { Signin } from "./pages/signin/signin";
import { BookList } from "./pages/book-list/bookList";
import { SpecificBook } from "./pages/specific-book/SpecificBook";
import { SharedStyles } from "./pages/sharedStyles/SharedStyles";
import { ErrorPage } from "./pages/error-page/ErrorPage";
import { Cart } from "./pages/cart/Cart";
import { BookProvider } from "./contextAPI/useBooks";
import { useEffect, useState } from "react";
import { CartProvider } from "./contextAPI/useCart";
import { UsernameProvider } from "./contextAPI/useUsername";
import { ProtectedRoutes } from "./components/protectedRoutes/ProtectedRoutes";
import { FallbackUI } from "./pages/fallbackUI-page/FallbackUI";

function App() {
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("books")) || []
  );
  const [booksInCart, setBooksInCart] = useState(
    JSON.parse(localStorage.getItem("booksInCart")) || []
  );
  const [username, setUsername] = useState("");
  useEffect(() => {
    localStorage.setItem("booksInCart", "[]");
    setBooksInCart(JSON.parse(localStorage.getItem("booksInCart")));

    fetch("/prometheus-x-course-task/database/books.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("books", JSON.stringify(data.books));
        setBooks(JSON.parse(localStorage.getItem("books")));
      });
  }, []);
  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <BookProvider
        value={{
          books,
          setBooks,
        }}
      >
        <CartProvider
          value={{
            booksInCart,
            setBooksInCart,
          }}
        >
          <UsernameProvider
            value={{
              username,
              setUsername,
            }}
          >
            <div className="App">
              <Routes>
                <Route path="/" element={<SharedStyles />}>
                  <Route index element={<Signin />} />
                  <Route
                    path="books"
                    element={
                      <ProtectedRoutes username={username}>
                        <BookList />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="books/:id"
                    element={
                      <ProtectedRoutes username={username}>
                        <SpecificBook />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="cart"
                    element={
                      <ProtectedRoutes username={username}>
                        <Cart />
                      </ProtectedRoutes>
                    }
                  />
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
            </div>
          </UsernameProvider>
        </CartProvider>
      </BookProvider>
    </ErrorBoundary>
  );
}

export default App;
