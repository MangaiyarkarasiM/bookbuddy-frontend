import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import Book from "../components/Book/Book";
import Modal from "../components/Modal/Modal";
import BookForm from "../components/Book/BookForm";
import SearchBooks from "../components/Book/SearchBooks";

const ViewBookPage = () => {
  let { getAllBooks, updateBook, deleteBook } = useContext(GlobalContext);
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

  const onUpdate = async(value,id)=>{
    //console.log(value,id);
    let success = await updateBook(value,id);
    if(success){
      getBooks();
      window.alert("Book details updated successfully");
    }
  }

  const onDelete = async(id, name) => {
    let con = window.confirm(`Are you sure to delete ${name} book?`);
    if(con){
      let success = await deleteBook(id,name);
      if(success){
        getBooks();
        window.alert(`'${name}' book has been deleated successfully`);
      }
    }
  }

  return (
    <>
      <div className="sm:container sm:mx-auto">
        <h3 className="text-emerald-500 text-2xl text-center font-medium my-3">
          View Books
        </h3>
        <div className="w-5/6 md:w-2/3 mx-auto">
          <SearchBooks
            books={books}
            setSearchResult={setSearchResult}
            setSearchLoaded={setSearchLoaded}
          />
        </div>
        <div className="w-5/6 md:w-3/4 mx-auto rounded-md shadow">
          {searchLoaded === true ? (
            searchResult?.length > 0 ? (
              searchResult?.map((book) => {
                return (
                  <Book
                    key={book.id}
                    book={book}
                    setBook={setBook}
                    setShowModal={setShowModal}
                    onDelete={onDelete}
                  ></Book>
                );
              })
            ) : (
              <div>No books found with the search criteria</div>
            )
          ) : (
            books?.map((book) => {
              return (
                <Book
                  key={book.id}
                  book={book}
                  setBook={setBook}
                  setShowModal={setShowModal}
                  onDelete={onDelete}
                ></Book>
              );
            })
          )}
        </div>
      </div>
      {showModal && (
        <div>
          <Modal title="Edit Book" onClose={close}>
            <BookForm
              id={book.id}
              book={book}
              addCancel
              onClose={close}
              onUpdate={onUpdate}
            ></BookForm>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ViewBookPage;
