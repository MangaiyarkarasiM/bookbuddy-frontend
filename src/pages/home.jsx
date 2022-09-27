import React, { useState, useEffect, useContext } from "react";
import Card from "../components/Card/Card";
import { GlobalContext } from "../context/globalContext";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const HomePage = () => {
  const { user, getAllBooks } = useContext(GlobalContext);
  const [books, setBooks] = useState([]);
  const [barData, setBarData] = useState([]);
  const [availableBooks, setAvailableBooks] = useState(0);
  const [issuedBooks, setIssuedBooks] = useState(0);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const barchartdata = {
    labels: [
      "Biography",
      "Thriller",
      "Fantasy",
      "Humor",
      "Adventure",
      "Horror",
      "Fiction",
      "Mystery",
    ],
    datasets: [
      {
        data: barData,
        label: "Books",
        backgroundColor: [
          "rgb(30 64 175)",
          "rgb(30 64 175)",
          "rgb(30 64 175)",
          "rgb(30 64 175)",
          "rgb(30 64 175)",
          "rgb(30 64 175)",
          "rgb(30 64 175)",
          "rgb(30 64 175)",
        ],
        borderColor: "rgb(30 58 138)",
        borderWidth: 1.5,
      },
    ],
  };

  const barchartoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Books by Category',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
      }
      },
      y: {
        beginAtZero: true,
        suggestedMax: 10
      //   grid: {
      //     display: false
      // }
      },
    },
  };

  const calculateData = (books) => {
    let data = {
      Biography: 0,
      Thriller: 0,
      Fantasy: 0,
      Humor: 0,
      Adventure: 0,
      Horror: 0,
      Fiction: 0,
      Mystery: 0,
    };
    books?.map((book) => {
      data[book.category]++;
    });
    setBarData(Object.values(data));
  };

  const getBooks = async () => {
    let books = await getAllBooks();
    setBooks(books);
    let issued = 0;
    let available = 0;
    books?.map((book) => {
      if (book.isRented) {
        issued++;
      } else {
        available++;
      }
    });
    setAvailableBooks(available);
    setIssuedBooks(issued);
    calculateData(books);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="sm:container sm:mx-auto">
      <div className="w-5/6 md:w-2/3 mx-auto my-4">
        <div className="text-base sm:text-lg md:text-3xl pb-5 pt-4 sm:pt-8 lg:pt-10">
          <div>
            Welcome, <span className="capitalize">{user.user_id}</span>!
          </div>
        </div>
        <hr></hr>
        <div className="flex flex-col md:flex-row justify-between gap-y-2 mt-5">
          <Card value={books?.length} className="green-600">
            Total Books
          </Card>
          <Card value={availableBooks} className="yellow-500">
            Books Available for Rent
          </Card>
          <Card value={issuedBooks} className="neutral-600">
            Books Issued
          </Card>
        </div>
        <div className="text-center md:w-3/4 my-5 mx-auto">
            <Bar
              className=""
              options={barchartoptions}
              data={barchartdata}
            ></Bar>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
