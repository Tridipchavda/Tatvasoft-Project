import React from "react";
import { useContext } from "react";
import bookContext from "../Context/BookContext";
import { useRef } from "react";
import { toast } from "react-toastify";
import md5 from "md5";


export default function ConfirmationModal(props) {

  const {bookData,user,setUserTrue,setCartNumber} = useContext(bookContext);
  const myRef = useRef();

  const purchaseBook = async () => {

    try{
        const date = new Date;
        const valToConvert = date.getTime() + user + props.id;
        
        const response = await fetch(
            "https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                orderId:md5(valToConvert),
                user:user,
                book_id:props.id,
                category:props.category,
                image:props.image,
                book_name:props.name,
                book_price:props.price
              }),
            }
          );
          console.log(response.status);
          toast.success("Order has been Placed.",{position:"top-center",autoClose:2000});

    } catch (error) {
        toast.info(error.message);
    }
    
    myRef.current.click();

    

  }
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Confirmation For Order Place
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              {props.name} @ {props.price}Rs
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={myRef}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={purchaseBook}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
