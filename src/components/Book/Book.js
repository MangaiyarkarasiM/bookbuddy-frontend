import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Book = (props) => {
  const [role, setRole] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setRole(sessionStorage.getItem("__role__"));
    props?.book.rents
      ?.filter((rent) => {
        return !rent.isReturned;
      })
      ?.forEach((rent) => {
        return setReturnDate(rent.rentedTill);
      });
  }, []);

  const onEdit = () => {
    props.setBook(props.book);
    props.setShowModal(true);
  };

  const onRent = () => {
    navigate(`/rent/${props.book.id}`);
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-between items-center gap-y-5 bg-white border p-3">
      <div className="flex justify-between items-center gap-x-4">
        <img
          src={props.book.bookImage}
          alt={props.book.bookName}
          className="min-h-20 max-h-20 md:min-h-40 md:max-h-40 min-w-12 max-w-12 md:min-w-24 md:max-w-24"
        ></img>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-base sm:text-xl lg:text-2xl font-medium">
            {props?.book.bookName}
          </h4>
          <div className="text-xs sm:text-sm md:text-base">
            <span className="text-xs">by</span> {props?.book.authorName}
          </div>
          <div className="text-xs sm:text-sm md:text-base">
            {props?.book.category}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="text-xs sm:text-sm md:text-base">
          <span className="font-medium">Publication:</span>{" "}
          {props?.book.publication}
        </div>
        <div className="text-xs sm:text-sm md:text-base">
          <span className="font-medium">Edition:</span> {props?.book.edition}
        </div>
        <div className="text-xs sm:text-sm md:text-base">
          <span className="font-medium">Placed At:</span> {props?.book.placedAt}
        </div>
        <div className="text-xs sm:text-sm md:text-base">
          <span className="font-medium">Expected Return Date:</span>{" "}
          {props?.book.isRented ? returnDate === "" ? "NA" : returnDate : "NA"}
        </div>
      </div>
      {role === "admin" && (
        <div className="flex sm:flex-col gap-y-2 gap-x-4">
          <button
            type="button"
            className="bg-blue-900 text-white px-3 py-1 border rounded-md text-xs sm:text-base hover:bg-blue-800"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="bg-gray-300 px-3 py-1 border rounded-md text-xs sm:text-base hover:bg-gray-200"
            onClick={() => {
              props.onDelete(props?.book.id, props?.book.bookName);
            }}
          >
            Delete
          </button>
        </div>
      )}
      {role === "user" && (
        <div className="flex sm:flex-col gap-y-2 gap-x-4">
          <button
            type="button"
            className={
              props?.book.isRented
                ? "bg-blue-300 text-white px-4 py-1 border rounded-md text-xs sm:text-base"
                : "bg-blue-900 text-white px-4 py-1 border rounded-md text-xs sm:text-base hover:bg-blue-800"
            }
            onClick={onRent}
            disabled={props?.book.isRented}
          >
            Rent
          </button>
        </div>
      )}
      <div className="absolute right-0 top-0 text-xs mx-1 my-2">
        <span
          className={
            props?.book.isRented
              ? "bg-red-600 text-white rounded-full px-2 py-1"
              : "bg-emerald-600 text-white rounded-full px-2 py-1"
          }
        >
          {props?.book.isRented ? "Rented" : "Available"}
        </span>
      </div>
    </div>
  );
};

export default Book;
