import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RentForm from "../components/Rent/RentForm";
import fetchApi from "../utils/fetchApi";
import { GlobalContext } from "../context/globalContext";
import Modal from "../components/Modal/Modal";
import RentSummary from "../components/Rent/RentSummary";

const RentPage = () => {
  const { onAuthFail, setMessage } = useContext(GlobalContext);
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState({});

  const getBookDetails = async () => {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.get(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setMessage("");
      setBook(res.data.book);
    } else {
      setMessage(res.data.message);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, [id]);

  async function onPay(value) {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.post(
      "/razorpay/create-order",
      { amount: value.amountPaid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setOrder(res.data.order);
      setBook({...book,...value});
      setShowModal(true);
    } else {
      setMessage(res.data.message);
    }
  }

  return (
    <>
      <div className="sm:container sm:mx-auto" style={{ minHeight: "78.3vh" }}>
        <RentForm
          book={book}
          setShowModal={setShowModal}
          onPay={onPay}
        ></RentForm>
      </div>
      {
        showModal && <Modal
        open={showModal}
        title="Order Summary"
        onClose={() => {
          setShowModal(false);
        }}
      >
        <RentSummary
          setShowModal={setShowModal}
          book={book}
          order={order}
        ></RentSummary>
      </Modal>
      }
    </>
  );
};

export default RentPage;
