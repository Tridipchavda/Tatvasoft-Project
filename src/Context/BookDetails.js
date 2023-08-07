import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { BookCard } from "../Components/BookCard";
import bookContext from "./BookContext";
import { connectAuthEmulator } from "firebase/auth";

const BookState = (props) => {
  const [bookData, setData] = useState([]);
  const [constBookData, setConstBookData] = useState([]);
  const [cartNo, setCartNo] = useState(0);
  const [user, setUser] = useState("");
  const [activeLink, setactiveLink] = useState(0);
  const [selfBook,setSelfBook] = useState([]);
  const [selectBook,setSelectBook] = useState({});

  const setLink = (val) => {
    console.log(val);
    setactiveLink(val);
  };
  const setUserTrue = (val) => {
    window.localStorage.setItem("username", val);
    setUser(val);
  };

  const setUpdateBook = (data)=>{
    setSelectBook(data);
  }

  const setCartNumber = () => {
    console.log("set Cart Works");
    setCartNo(localStorage.getItem("cart").split(",").length);
  };

  const setBookData = (data, val) => {
    console.log("Setting Book Data");
    if (val == 1) {
      setData(data);
      setConstBookData(data);
    }
    if (val == 0) {
      setData(data);
    }
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("username") == undefined ||
      window.localStorage.getItem("username") == ""
    ) {
      setUser("");
    } else {
      setUser(window.localStorage.getItem("username"));
      if(localStorage.getItem("cart") != undefined){
        setCartNo(localStorage.getItem("cart").split(",").length);
      }
    }
   
    var ans = [];
    axios
      .get(
        "https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app/books.json"
      )
      .then((res) => {
        if (res.data == null) {
          return;
        }
        const allData = Object.values(res.data);
        allData.forEach((element) => {
          ans.push(element);
        });
        console.log(ans);

        setData(ans);
        setConstBookData(ans);

      });
  }, []);

  return (
    <bookContext.Provider
      value={{
        bookData,
        user,
        setUserTrue,
        setCartNumber,
        cartNo,
        setBookData,
        constBookData,
        activeLink,
        setLink,
        selfBook,
        selectBook,
        setUpdateBook
      }}
    >
      {props.children}
    </bookContext.Provider>
  );
};

export default BookState;
