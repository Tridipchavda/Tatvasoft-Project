import React from "react";
import { useContext } from "react";
import { Table } from "react-bootstrap";
import bookContext from "../Context/BookContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import firebaseDB from "../firebaseConn";
import { getDatabase, ref, remove } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SeeSelfBooks() {
  const { user,setUpdateBook } = useContext(bookContext);
  const [books, setBooks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
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
        var temp = allData.filter((element) => {
          return element.book_id
            .toLowerCase()
            .includes(user.split("@")[0].toLowerCase());
        });

        setBooks(temp);
      });
  });

  const deleteBook = (name)=> {
    
    const databaseRef = ref(getDatabase(firebaseDB), `books/${name}`);
    remove(databaseRef)
      .then(() => {
        console.log('Data deleted successfully');
        toast.success("Book Delete from Database");
      })
      .catch(error => {
        console.error('Error deleting data:', error);
        toast.info("Book is not deleted");
      });
  }

  const updateBookDetails = (index) =>{
    var selectedData = books[index];
    
    setUpdateBook(selectedData);
    nav("/addBook");
  }

  return (
    <>
    <h3 className="m-3" style={{textAlign:"left"}}>
      Book Uploaded By You
    </h3>
    <hr></hr>
    <center>
    <div style={{width:"80%"}}>
      <Table hover >
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Price</th>
            <th>Update Book</th>
            <th>Delete Book</th>
          </tr>
        </thead>
        <tbody>
          {books.map((ele, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{ele.book_name}</td>
                <td>{ele.author_name}</td>
                <td>{ele.book_price}</td>
                <td className="text-center">
                  <button className="btn btn-outline-success btn-sm" onClick={()=>{updateBookDetails(index)}}>
                    Update
                  </button>
                </td>
                <td className="text-center">
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>{deleteBook(ele.book_id)}}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    </center>
    </>
  );
}
