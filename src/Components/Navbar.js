import { useCallback, useContext, useEffect, useState } from "react";
import bookContext from "../Context/BookContext";
import cart from "./cart.png";

export const Navbar = () => {
  const {
    bookData,
    user,
    setUserTrue,
    setCartNumber,
    cartNo,
    activeLink,
    setLink,
  } = useContext(bookContext);


  const doSafeLogout = ()=>{
    localStorage.clear();
  }
  const [margin, setMargin] = useState();

  useEffect(() => {
    setMargin(user == "" ? 70 : 48);
    console.log(activeLink);
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: "#fddc4a" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand mx-3" href="#">
          E Book Sell
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" " style={{ float: "right" }} id="navbarNavAltMarkup">
          <div className="navbar-nav mx-5">
            <a
              className={activeLink == 0 ? "nav-link active" : "nav-link"}
              href="/store"
            >
              Home
            </a>
            <a
              className={activeLink == 2 ? "nav-link active" : "nav-link"}
              href="#"
            >
              Terms
            </a>
            <a
                className={activeLink == 5 ? "nav-link active" : "nav-link"}
                href="#"
            >
                About
            </a>
            {user == "" ? (
              ""
            ) : (
              <>
                <a
                  className={activeLink == 3 ? "nav-link active" : "nav-link"}
                  href="/orders"
                >
                  Orders
                </a>
                <li className="nav-item dropdown">
                  <button className="btn mx-2 border border-dark nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                        {user}
                  </button>
                  
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/addBook">
                      Add Book
                    </a>
                    <a className="dropdown-item" href="/selfBooks">
                      View Your Books
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={doSafeLogout} href="/">Log Out</a>
                  </div>
                </li>
                
                <a href="/cart">
                  <button className="btn mx-1 border border-dark">
                    <img src={cart} width="25px" height="24px"></img>
                    &nbsp;
                    {cartNo != 0 ? cartNo - 1 : " "}
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
