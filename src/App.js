import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import fetchApi from "./utils/fetchApi";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import AddBookPage from "./pages/addbook";
import ViewBookPage from "./pages/viewbook";
import IssuedBookPage from "./pages/issuedbook";
import BrowseBookPage from "./pages/browsebook";
import RentPage from "./pages/rent";
import RentedBooksPage from "./pages/rentedbook";

const exclusionArray = ["/", "/login", "/signup"];
const footerExclusionArray = ["/", "/login", "/signup"];

function App() {
  let [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let user_id = sessionStorage.getItem("__user_id__");
    let token = sessionStorage.getItem("__token__");
    let role = sessionStorage.getItem("__role__");
    user_id === null || token === null || role === null
      ? navigate("/login")
      : setUser({ user_id, token, role });
  }, []);

  const onLogin = async (value) => {
    let res = await fetchApi.post("/users/login", { ...value });
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("__user_id__", res.data.user_id);
      sessionStorage.setItem("__token__", res.data.token);
      sessionStorage.setItem("__role__", res.data.role);
      setUser({
        user_id: res.data.user_id,
        token: res.data.token,
        role: res.data.role,
      });
      setMessage("");
      setSpin(false);
      navigate("/home");
    } else {
      setSpin(false);
      setMessage(res.data.message);
    }
  };

  const getUserWithUserId = async (id) => {
    let res = await fetchApi.get(`/users/${id}`);
    if (res.data.statusCode === 200) {
      setMessage("");
      setSpin(false);
      return res.data.user;
    } else {
      setSpin(false);
      setMessage(res.data.message);
    }
  };

  const onSignOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const onAuthFail = () => {
    window.alert("Your session has ended. Please login again to authenticate");
    setSpin(false);
    navigate("/login");
  };

  const onEditProfile = async (value, id) => {
    let res = await fetchApi.put(`/users/${id}`, value, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setMessage("");
      window.alert("Profile details updated successfully");
    } else {
      setMessage(res.data.message);
    }
    setSpin(false);
  };

  const addBook = async (value) => {
    //console.log(value);
    let token = sessionStorage.getItem("__token__");
    let user_id = sessionStorage.getItem("__user_id__");
    let res = await fetchApi.post("/books/add", { ...value, addedBy : user_id, updatedBy : user_id}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setMessage("");
      setSpin(false);
      navigate("/books/view");
    } else {
      setMessage(res.data.message);
    }
    setSpin(false);
  };

  const getAllBooks = async () => {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.get("/books", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setMessage("");
      setSpin(false);
      return res.data.books;
    } else {
      setMessage(res.data.message);
    }
    setSpin(false);
  };

  const updateBook = async (value, id) => {
    let user_id = sessionStorage.getItem("__user_id__");
    let res = await fetchApi.put(`/books/${id}`, { ...value, updatedBy : user_id}, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setMessage("");
      return true;
    } else {
      setMessage(res.data.message);
    }
    setSpin(false);
    return false;
  };

  const deleteBook = async (id, name) => {
    //console.log(id,name);
    let res = await fetchApi.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setMessage("");
      return true;
    } else {
      setMessage(res.data.message);
    }
    return false;
  };

  return (
    <GlobalProvider
      value={{
        user,
        onAuthFail,
        message,
        setMessage,
        spin,
        setSpin,
        onLogin,
        onSignOut,
        getUserWithUserId,
        onEditProfile,
        addBook,
        getAllBooks,
        updateBook,
        deleteBook,
      }}
    >
      {exclusionArray.indexOf(location.pathname) < 0 && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/books/new" element={<AddBookPage />}></Route>
        <Route path="/books/view" element={<ViewBookPage />}></Route>
        <Route path="/books/issued" element={<IssuedBookPage />}></Route>
        <Route path="/books/browse" element={<BrowseBookPage />}></Route>
        <Route path="/books/rented" element={<RentedBooksPage />}></Route>
        <Route path="/rent/:id" element={<RentPage />}></Route>
        <Route path="/user/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
      {footerExclusionArray.indexOf(location.pathname) < 0 && <Footer />}
    </GlobalProvider>
  );
}

export default App;
