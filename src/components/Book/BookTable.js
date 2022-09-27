import React from "react";

const BookTable = (props) => {
  let books = props.books;
  let n = 1;

  function onReturn(bookId, rentId){
    props.returnBook(bookId, rentId);
  }

  return (
    <>
      <div className="w-5/6 md:w-3/4 mx-auto bg-white rounded-md overflow-x-auto p-3 my-3">
        <h3 className="text-emerald-500 text-2xl text-center font-medium mb-3">
          {props.children}
        </h3>
        <table className="table-auto border text-center">
          <thead className="border">
            <tr className="border">
              <th className="border">#</th>
              <th className="border">Book Name</th>
              <th className="border">Author Name</th>
              <th className="border">Publication</th>
              <th className="border">Place</th>
              <th className="border">Issued Date</th>
              <th className="border">Issued To</th>
              <th className="border">Expected Return Date</th>
              <th className="border">Actual Returned Date</th>
              {props.rented && <th className="border">Return</th>}
            </tr>
          </thead>
          <tbody className="border">
            {books?.map((book) => {
              return book.rents?.map((rent) => {
                return (
                  <tr key={rent.id}>
                    <td className="border">{`${n++}`}</td>
                    <td className="border">{book.bookName}</td>
                    <td className="border">{book.authorName}</td>
                    <td className="border">{book.publication}</td>
                    <td className="border">{book.placedAt}</td>
                    <td className="border">{rent.rentedFrom}</td>
                    <td className="border">{rent.userId}</td>
                    <td className="border">{rent.rentedTill}</td>
                    <td className="border">
                      {rent.returnedOn === null
                        ? "Not Returned"
                        : rent.returnedOn}
                    </td>
                    {props.rented && (
                      <td className="border">
                        <button
                          type="button"
                          className={
                            rent.returnedOn === null
                              ? "text-white border rounded-md bg-blue-900 mb-5 px-5 py-1 hover:bg-blue-800"
                              : "text-white border rounded-md bg-blue-300 mb-5 px-5 py-1"
                          }
                          disabled={ rent.returnedOn === null ? '' : true}
                          onClick={()=>{onReturn(book.id, rent.id)}}
                        >
                          Return
                        </button>
                      </td>
                    )}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookTable;
