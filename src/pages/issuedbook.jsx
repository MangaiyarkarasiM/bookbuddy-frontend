import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import BookTable from "../components/Book/BookTable";

const IssuedBookPage = () => {
  let { getAllBooks } = useContext(GlobalContext);
  const [books, setBooks] = useState([]);

  async function getBooks() {
    let books = await getAllBooks();
    setBooks(
      books?.filter((book) => {
        return book.rents.length > 0;
      })
    );
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="sm:container sm:mx-auto" style={{minHeight:'77.1vh'}}>
      <BookTable books={books}>Issued Books History</BookTable>
    </div>
  );
};

export default IssuedBookPage;
