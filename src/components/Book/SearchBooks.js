import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const searchFormValidation = Yup.object().shape({
  searchCategory: Yup.string().required("Please select a category to search"),
  searchString: Yup.string().required("Enter search value"),
});

const SearchBooks = (props) => {
  const searchBooks = (value) => {
    let books = props.books?.filter((book) => {
      return String(book[value.searchCategory])
        .toLowerCase()
        .includes(String(value.searchString).toLowerCase());
    });
    props.setSearchResult(books);
    props.setSearchLoaded(true);
  };

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center gap-x-3">
        <Formik
          initialValues={{}}
          onSubmit={searchBooks}
          validationSchema={searchFormValidation}
          className="inline-block mt-5"
        >
          {(prop) => {
            return (
              <Form className="flex flex-row items-start justify-between px-2 gap-x-4">
                <div className="mb-10 flex flex-col">
                  <Field
                    as="select"
                    name="searchCategory"
                    value={prop.values.searchCategory}
                    className="block border rounded-md border-gray-300 py-1 w-24 sm:w-56 md:w-76"
                  >
                    <option value="" defaultChecked>
                      Select
                    </option>
                    <option value="bookName">Book Name</option>
                    <option value="authorName">Author Name</option>
                    <option value="category">Category of the Book</option>
                  </Field>

                  <ErrorMessage
                    name="searchCategory"
                    render={(msg) => (
                      <small className="block text-red-600">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10 flex flex-col">
                  <Field
                    name="searchString"
                    value={prop.values.searchString}
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-36 sm:w-64 md:w-80 lg:w-96"
                    placeholder=" Search"
                  />
                  <ErrorMessage
                    name="searchString"
                    render={(msg) => (
                      <small className="block text-red-600">{msg}</small>
                    )}
                  />
                </div>
                <button type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
                <button
                  type="reset"
                  className=""
                  onClick={() => {
                    props.setSearchLoaded(false);
                    prop.resetForm({
                      values: {
                        searchCategory: "",
                        searchString: "",
                      },
                    });
                  }}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SearchBooks;
