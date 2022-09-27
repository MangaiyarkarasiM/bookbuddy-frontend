import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";

const rentFormValidation = Yup.object().shape({
  rentedFrom: Yup.date().required("Rented from date is required"),
  rentedTill: Yup.date().required("Rented till date is required"),
});

const RentForm = (props) => {
  let book = props.book;

  const onSubmit = (value) => {
    let amountPaid =
      moment(value.rentedTill).diff(moment(value.rentedFrom), "days") * 2;
    props.onPay({...value,amountPaid});
  };
  return (
    <div className="border rounded-md w-3/4 mx-auto sm:w-2/4 my-4 p-3 shadow-lg bg-white">
      <Formik
        initialValues={{
          rentedFrom: moment().format("yyyy-MM-DD"),
          rentedTill: moment().add(14, "d").format("yyyy-MM-DD"),
        }}
        onSubmit={onSubmit}
        validationSchema={rentFormValidation}
        enableReinitialize={true}
      >
        {(prop) => {
          return (
            <Form className="flex flex-col justify-center mx-5 text-sm sm:text-base">
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
                    Rented From
                  </label>
                  <Field
                    name="rentedFrom"
                    type="date"
                    value={prop.values.rentedFrom}
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                    disabled={true}
                  />
                  <ErrorMessage
                    name="rentedFrom"
                    render={(msg) => (
                      <small className="block text-red-600">{msg}</small>
                    )}
                  />
                </div>
              </div>
              <div className="mb-4 mx-5">
                <div className="flex flex-col sm:flex-row">
                  <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                    Rented Till
                  </label>
                  <Field
                    name="rentedTill"
                    type="date"
                    min={moment().add(1, "d").format("yyyy-MM-DD")}
                    max={moment().add(14, "d").format("yyyy-MM-DD")}
                    value={prop.values.rentedTill}
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                  />
                  <ErrorMessage
                    name="rentedTill"
                    render={(msg) => (
                      <small className="block text-red-600">{msg}</small>
                    )}
                  />
                </div>
              </div>
              {props.message && (
                <small className="block text-red-600 mb-2">
                  {props.message}
                </small>
              )}
              <div className="text-center my-2">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 py-2 border rounded-md text-xs sm:text-base hover:bg-emerald-500"
                >
                  Proceed to Pay Rs.{" "}
                  {moment(prop.values.rentedTill).diff(
                    moment(prop.values.rentedFrom),
                    "days"
                  ) * 2}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <small className="block text-center text-gray-600 mt-2">
        A book can be rented maximum up to 14 days.
      </small>
      <small className="block text-center text-gray-600 mt-2">
        A rent per day for a book is Rs. 2.
      </small>
    </div>
  );
};

export default RentForm;
