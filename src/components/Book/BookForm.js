import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const bookFormValidation = Yup.object().shape({
  bookName: Yup.string().required("Enter book name"),
  authorName: Yup.string().required("Enter author name"),
  bookImage: Yup.string().url().required("Enter book image url"),
  category: Yup.string().required("Select category"),
  publication: Yup.string().required("Enter publication of the book"),
  edition: Yup.string().required("Enter eition of the book"),
  placedAt: Yup.string().required(
    "Enter the place number at which the book is placed"
  ),
});

const catgry = [
  "Biography",
  "Thriller",
  "Fantasy",
  "Humor",
  "Adventure",
  "Horror",
  "Fiction",
  "Mystery",
];

const BookForm = (props) => {
  let { spin, setSpin, message, addBook } = useContext(GlobalContext);

  const initialValue = props.id
    ? {
        bookName: props?.book.bookName,
        authorName: props?.book.authorName,
        bookImage: props?.book.bookImage,
        category: props?.book.category,
        publication: props?.book.publication,
        edition: props?.book.edition,
        placedAt: props?.book.placedAt,
      }
    : {};

  const onSubmit = (value) => {
    if (props.id) {
      props.onUpdate(value, props.id);
      props.onClose();
    } else {
      addBook(value);
    }
  };

  return (
    <div className="flex flex-col my-3">
      <h3 className="text-emerald-500 text-2xl text-center font-medium mb-5">
        {props.id ? "Edit A Book" : "Add A New Book"}
      </h3>
      <div className="mt-3 flex flex-col bg-white border rounded-md shadow w-3/4 md:w-1/2 mx-auto">
        <Formik
          initialValues={initialValue}
          onSubmit={(value) => {
            setSpin(true);
            onSubmit(value);
          }}
          validationSchema={bookFormValidation}
          enableReinitialize={true}
        >
          {(prop) => {
            return (
              <Form className="flex flex-col items-center justify-center px-2">
                <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                  <label className="block mt-10 font-medium">Book Name</label>
                  <Field
                    name="bookName"
                    value={prop.values.bookName}
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                    placeholder=" Enter book name"
                  />
                  <ErrorMessage
                    name="bookName"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                  <label className="block font-medium">Author Name</label>
                  <Field
                    name="authorName"
                    value={prop.values.authorName}
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                    placeholder=" Enter author name"
                  />
                  <ErrorMessage
                    name="authorName"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                  <label className="block font-medium">Book Image</label>
                  <Field
                    name="bookImage"
                    value={prop.values.bookImage}
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                    placeholder=" Enter book image url"
                  />
                  <ErrorMessage
                    name="bookImage"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                  <label className="block font-medium">Category</label>
                  <Field
                    as="select"
                    name="category"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                  >
                    <option value="" defaultChecked>
                      Select
                    </option>
                    {catgry?.map((cat) => {
                      return (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                  <label className="block font-medium">Publication</label>
                  <Field
                    name="publication"
                    value={prop.values.publication}
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                    placeholder=" Enter publication of the book"
                  />
                  <ErrorMessage
                    name="publication"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                  <label className="block font-medium">Edition</label>
                  <Field
                    name="edition"
                    value={prop.values.edition}
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                    placeholder=" Enter edition of the book"
                  />
                  <ErrorMessage
                    name="edition"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                  <label className="block font-medium">
                    Place of a book in library
                  </label>
                  <Field
                    name="placedAt"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                    placeholder=" Book is placed at eg: A101"
                  />
                  <ErrorMessage
                    name="placedAt"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="flex justify-between items-center">
                  {props.addCancel && (
                    <button
                      className="bg-gray-300 border rounded-md hover:bg-gray-400 mb-5 px-4 md:px-10 py-2 mr-5"
                      onClick={props.onClose}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center text-white border rounded-md bg-blue-900 mb-5 px-4 md:px-10 py-2 hover:bg-blue-800"
                  >
                    {spin ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span className="font-medium">Submit</span>
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        {message ? (
          <>
            <div className="block text-center text-red-500 mb-5">{message}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BookForm;
