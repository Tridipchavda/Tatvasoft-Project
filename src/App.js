import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useImperativeHandle, useState } from "react";
import axios, { Axios } from "axios";
import { Navbar } from "./Components/Navbar";
import { SearchBar } from "./Components/Search";
import { BookCard } from "./Components/BookCard";
import React from "react";
import BookState from "./Context/BookDetails";
import { Login } from "./Components/Login";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { RegisterForm } from "./Components/RegisterForm";
import CartView from "./Components/CartView";
import BookDetailView from "./Components/BookDetailView";
import { ToastContainer } from "react-toastify";
import Orders from "./Components/Orders";
import bookContext from "./Context/BookContext";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/store"
              element={
                <>
                  <SearchBar />
                  <BookCard />
                </>
              }
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/cart" element={<CartView/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/product/:id" element={<BookDetailView/>} />
          </Routes>
        </BrowserRouter>
      </div>

    <div>
      <ToastContainer />
    </div>
    </>
  );
}

export default App;
