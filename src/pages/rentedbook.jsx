import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import BookTable from "../components/Book/BookTable";
import fetchApi from "../utils/fetchApi";
import moment from "moment";

const RentedBooksPage = () => {
  let { getAllBooks, onAuthFail, setMessage} = useContext(GlobalContext);
  const [books, setBooks] = useState([]);

  async function getBooks() {
    let books = await getAllBooks();
    let user_id = sessionStorage.getItem("__user_id__");
    books = books?.map((book) => {
      book.rents = book.rents?.filter((rent) => {
        return rent.userId === user_id;
      });
      return book;
    });
    setBooks(
      books?.filter((book) => {
        return book.rents.length > 0;
      })
    );
  }

  useEffect(() => {
    getBooks();
  }, []);

  const returnBook = async(bookId, rentId)=>{
    let user_id = sessionStorage.getItem("__user_id__");
    let token = sessionStorage.getItem("__token__");
    let value = {
        book_id : bookId,
        isReturned : true,
        returnedOn : moment().format('yyyy-MM-DD'),
        changedBy : user_id,
    }
    //console.log(value);
    let res = await fetchApi.put(`/rents/${rentId}`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (res.data.statusCode === 401) {
        onAuthFail();
      } else if (res.data.statusCode === 200) {
        setMessage("");
        getBooks();
        window.alert('Book has been returned successfully');
      } else {
        setMessage(res.data.message);
      }
  }

  return (
    <div className="sm:container sm:mx-auto" style={{ minHeight: "77.1vh" }}>
      <BookTable rented books={books} returnBook={returnBook}>Rented Books</BookTable>
    </div>
  );
};

export default RentedBooksPage;
