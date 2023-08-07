import React from "react";
import { useContext } from "react";
import bookContext from "../Context/BookContext";
import { useEffect } from "react";
import { useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import sampleBookCover from "./bookCover.png";
import {
  CollectionReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import firebaseDB, { db } from "../firebaseConn";
import { toast } from "react-toastify";
import axios, { all } from "axios";

export default function AddBook() {
  const { bookData, user, setLink,selectBook } = useContext(bookContext);

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const myCollection = collection(db, user);

    var length;
    var data = {
      book_name: bookName,
      author_name: authorName,
      book_price: price,
      image: bookImage,
      desc: desc,
      category: category,
    };
    var length=0;
    
    axios
      .get(
        "https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app/books.json"
      )
      .then((res) => {
        if(res.data == null){
          length=0;
        }

        const allData = Object.values(res.data);
        length = allData.length;

        var newDocRefIn;
        if(selectBook.book_id == undefined){
          const newId = user.split("@")[0] + "_" + String(parseInt(length) + 1);
          newDocRefIn = ref(getDatabase(firebaseDB), `books/${newId}`);
          data = { ...data, book_id: newId };
        }else{
          newDocRefIn = ref(getDatabase(firebaseDB), `books/${selectBook.book_id}`);
          data = { ...data, book_id: selectBook.book_id };
        }
        

        set(newDocRefIn, data)
          .then(() => {
            if(selectBook.book_id == undefined){
              toast.success("Book Added To Database");
            }else{
              toast.success("Book Data Updated in Database");
            }
            resetAllValuesToBlank();
            
          })
          .catch((error) => {
            toast.info(error);
          });

        setLoading(false);
      });

    
  };

  const resetAllValuesToBlank = ()=>{
    setAuthorName("");
    setBookCover("");
    setBookImage("");
    setBookName("");
    setCategory("");
    setPrice("");
    setDesc("");
  }

  const setBookCover = (link) => {
    setBookImage(link);
  };
  const handleImageError = (e) => {
    e.target.src = sampleBookCover;
  };

  useEffect(() => {
    setLink(1);
    console.log(selectBook);
    if(selectBook.book_id != undefined){
      setAuthorName(selectBook.author_name);
      setBookCover(selectBook.image);
      setBookImage(selectBook.image);
      setBookName(selectBook.book_name);
      setCategory(selectBook.category);
      setPrice(selectBook.book_price);
      setDesc(selectBook.desc);
    }
    

  }, []);

  return (
    <center>
      <div
        style={{
          width: "70%",
          padding: "5px",
          height: "75vh",
          marginTop: "30px",
        }}
      >
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-3">
                <img
                  src={bookImage == "" ? sampleBookCover : bookImage}
                  width="300px"
                  height="400px"
                  className="border mt-5 p-2 border-warning"
                  //   alt="Sample image"
                  onError={handleImageError}
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <h5>Add Your Book</h5>
                <br></br>
                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      onChange={(e) => {
                        setBookName(e.target.value);
                      }}
                      value={bookName}
                      className="form-control form-control-sm"
                      placeholder="Enter Book Name"
                      style={{ padding: "5px 10px" }}
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      onChange={(e) => {
                        setAuthorName(e.target.value);
                      }}
                      value={authorName}
                      className="form-control form-control-sm"
                      placeholder="Enter Author Name"
                      style={{ padding: "5px 10px" }}
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      onChange={(e) => {
                        setBookImage(e.target.value);
                        setBookCover(e.target.value);
                      }}
                      value={bookImage}
                      className="form-control form-control-sm"
                      placeholder="Enter Image Link "
                      style={{ padding: "5px 10px" }}
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      value={price}
                      className="form-control form-control-sm"
                      placeholder="Enter Amount of Book"
                      style={{ padding: "5px 10px" }}
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      value={category}
                      className="form-control form-control-sm"
                      placeholder="Enter Category"
                      style={{ padding: "5px 10px" }}
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      style={{ resize: "none" }}
                      className="form-control"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Enter Book Description"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="text-center text-lg-start mt-1 pt-2 ">
                    <button
                      onClick={handleSubmitForm}
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{
                        padding: "3px 12px",
                        width: "300px",
                        fontSize: "20px",
                      }}
                    >
                      {loading ? "Please Wait..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </center>
  );
}
