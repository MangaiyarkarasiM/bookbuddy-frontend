import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import Book from "../components/Book/Book";
import Modal from "../components/Modal/Modal";
import SearchBooks from "../components/Book/SearchBooks";
import RentForm from "../components/Rent/RentForm";

const BrowseBookPage = () => {
  let { getAllBooks } = useContext(GlobalContext);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoaded, setSearchLoaded] = useState(false);

  async function getBooks() {
    setBooks(await getAllBooks());
  }

  useEffect(() => {
    getBooks();
  }, []);

  function close() {
    setShowModal(false);
    setBook({});
  }

  return (
    <>
      <div className="sm:container sm:mx-auto" style={{minHeight:'76.3vh'}}>
        <h3 className="text-emerald-500 text-2xl text-center font-medium my-3">
          Browse Books
        </h3>
        <div className="w-5/6 md:w-2/3 mx-auto">
          <SearchBooks
            books={books}
            setSearchResult={setSearchResult}
            setSearchLoaded={setSearchLoaded}
          />
        </div>
        <div className="w-5/6 md:w-2/3 mx-auto rounded-md shadow">
          {searchLoaded === true ? (
            searchResult?.length > 0 ? (
              searchResult?.map((book) => {
                return (
                  <Book
                    key={book.id}
                    book={book}
                    setBook={setBook}
                    setShowModal={setShowModal}
                  ></Book>
                );
              })
            ) : (
              <div>No books found with the selected search criteria</div>
            )
          ) : null}
        </div>
      </div>
      {showModal && (
        <Modal title="Rent a Book" onClose={close}>
          <RentForm id={book.id} book={book} onClose={close}></RentForm>
        </Modal>
      )}
    </>
  );
};

export default BrowseBookPage;
