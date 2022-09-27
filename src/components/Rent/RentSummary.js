import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../utils/fetchApi";
import { GlobalContext } from "../../context/globalContext";
import moment from "moment";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const RentSummary = (props) => {
  const { onAuthFail } = useContext(GlobalContext);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  let book = props.book;

  async function getUser() {
    let user_id = sessionStorage.getItem("__user_id__");
    let res = await fetchApi.get(`/users/${user_id}`);
    if (res.data.statusCode === 200) {
      setUserDetails(res.data.user);
    } else {
      console.log(res.data);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function handleSuccess(rzpres) {
    let token = sessionStorage.getItem("__token__");
    let rent = {
      book_id: book.id,
      user_id: userDetails.id,
      userId: userDetails.user_id,
      amountPaid: book.amountPaid,
      rentedFrom: book.rentedFrom,
      rentedTill: book.rentedTill,
      isReturned: false,
      razorPayOrderId: rzpres.razorpay_order_id,
      razorPayPaymentId: rzpres.razorpay_payment_id,
      changedBy: userDetails.user_id,
    };
    let res = await fetchApi.post("/rents/create", rent, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      window.alert('Payment successful and book has been taken for rent');
      navigate('/books/rented');
    } else {
      console.log(res.data.message);
    }
  }

  async function displayRazorPay() {
    let res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert(
        "The razorpay payment option is currently unavailable. Please try again later"
      );
      return;
    }

    let image =
      document.domain === "localhost"
        ? "http://localhost:3000/favicon.ico"
        : `https://${document.domain}/favicon.ico`;
    var options = {
      key: props.order.key_id,
      amount: props.order.amount,
      currency: props.order.currency,
      name: "Book Buddy",
      description: "Renting a book",
      image: image,
      order_id: props.order.id,
      handler: function (response) {
        handleSuccess(response);
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.mobile,
      },
      theme: {
        color: "#3399cc",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      console.log(response.error);
      alert("Payment has been failed. Please try again");
    });
  }

  return (
    <>
      <div
        className="mx-auto border border-success rounded-lg p-2 my-2"
        style={{ width: "28rem" }}
      >
        <div className="flex flex-col justify-center mx-5 text-sm sm:text-base">
          <div className="mb-4 mt-2 mx-5">
            <div className="flex flex-col sm:flex-row">
              <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                Book Name
              </label>
              <div className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2">
                {book.bookName}
              </div>
            </div>
          </div>
          <div className="mb-4 mx-5">
            <div className="flex flex-col sm:flex-row">
              <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                Author Name
              </label>
              <div className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2">
                {book.authorName}
              </div>
            </div>
          </div>
          <div className="mb-4 mx-5">
            <div className="flex flex-col sm:flex-row">
              <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                Category
              </label>
              <div className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2">
                {book.category}
              </div>
            </div>
          </div>
          <div className="mb-4 mx-5">
            <div className="flex flex-col sm:flex-row">
              <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                Publication
              </label>
              <div className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2">
                {book.publication}
              </div>
            </div>
          </div>
          <div className="mb-4 mx-5">
            <div className="flex flex-col sm:flex-row">
              <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                Edition
              </label>
              <div className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2">
                {book.edition}
              </div>
            </div>
          </div>
          <div className="mb-4 mx-5">
            <div className="flex flex-col sm:flex-row">
              <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                Rented From
              </label>
              <div className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2">
                {book.rentedFrom}
              </div>
            </div>
          </div>
          <div className="mb-4 mx-5">
            <div className="flex flex-col sm:flex-row">
              <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                Rented Till
              </label>
              <div className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2">
                {book.rentedTill}
              </div>
            </div>
          </div>
          <div className="text-center my-2">
            <button
              type="button"
              className="bg-emerald-600 text-white px-4 py-2 border rounded-md text-xs sm:text-base hover:bg-emerald-500"
              onClick={displayRazorPay}
            >
              Pay Rs.{" "}
              {moment(book.rentedTill).diff(moment(book.rentedFrom), "days") *
                2}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentSummary;
