import axios from "axios";
import { doc } from "firebase/firestore/lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookContext from "../Context/BookContext";

function CartView() {
  const { bookData, user, setUserTrue, setCartNumber } =
    useContext(bookContext);
  const nav = useNavigate();
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app/books.json"
      )
      .then((res) => {
        var ans = [];
        res.data.forEach((element) => {
          ans.push(element);
        });
        console.log(ans);

        var allCartIds = localStorage.getItem("cart").split(",");
        console.log(allCartIds);

        const checkCartItem = (ele) => {
          // console.log("hel");
          for (let i = 0; i < allCartIds.length; i++) {
            if (parseInt(allCartIds[i]) == ele.book_id) {
              console.log(ele.book_name + "---");
              return ele;
            }
          }
          return null;
        };

        setTemp(ans.filter(checkCartItem));
        // setCartData(temp.filter(checkCartItem));
      });
  }, []);

  const deleteCartItem = (id) => {
    var cookie = localStorage.getItem("cart").split(",");

    var cookieString = "";
    cookie.forEach((element) => {
      if (element == id || element == "") {
      } else {
        cookieString += element + ",";
      }
    });
    console.log(cookie);
    console.log(cookieString);

    localStorage.setItem("cart", cookieString);
    setTemp(
      temp.filter((data) => {
        if (data.book_id == id) {
          return null;
        }
        return data;
      })
    );

    setCartNumber();
  };

  const goToProductDetails = (id) => {
    console.log(id);
    nav(`/product/${id}`);
  };

  return (
    <>
      <h1 className=" m-3" style={{ textAlign: "left" }}>
        Books Added To Cart
      </h1>
      <hr></hr>
      <center>
      <div className="d-flex flex-row justify-content-left flex-wrap m-3" style={{width:"90%"}}>
        {temp != "" ? (
          temp.map((ele) => {
            if (ele != undefined) {
              return (
                <div className="row py-2 px-2 " key={ele.book_id}>
                  <div style={{ width: "400px" }}>
                    <div className="card">
                      <div className="row card-body">
                        <img
                          className="col-sm-6"
                          src={ele.image}
                          alt="Book"
                          height="240px"
                        />
                        <div
                          className="col-sm-5 "
                          style={{ justifyContent: "start", textAlign: "left" }}
                        >
                          <h4>{ele.book_name}</h4>
                          <br></br>
                          <h1>{ele.book_price}Rs</h1>

                          <div className="m-1">
                            <a
                              className="btn btn-outline-info mt-2"
                              style={{ width: "160px" }}
                              onClick={() => goToProductDetails(ele.book_id)}
                            >
                              Buy Now
                            </a>

                            <button
                              className="btn btn-outline-danger mt-2"
                              style={{ width: "160px" }}
                              onClick={() => {
                                deleteCartItem(ele.book_id);
                              }}
                            >
                              Delete
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <h4>No Books Found</h4>
        )}
      </div>
      </center>
    </>
  );
}

export default CartView;
