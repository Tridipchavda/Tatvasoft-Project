import axios, { all } from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import bookContext from "../Context/BookContext";
import cart from "./cart.png";
import ConfirmationModal from "./ConfirmationModal";

export default function BookDetailView() {
  const params = useParams();
  const { bookData, user, setUserTrue, setCartNumber, cartNo } =
    useContext(bookContext);

  const [product, setProduct] = useState({});

  useEffect(() => {
    var ans = [];
    axios
      .get(
        "https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app/books.json"
      )
      .then((res) => {
        const allData = Object.values(res.data);
        allData.forEach((element) => {
          ans.push(element);
        });
        console.log(ans);

        
        setProduct(ans.find((item)=>item.book_id==params.id));
      });
    
  }, []);

  const notify = (mess,type) => {
    if(type == "success"){
        toast.success(mess,{position:"top-center",autoClose:2000});
    }else{
        toast.info(mess,{position:"top-center",autoClose:2000});
    }
    
}

const handleAddToCart = async(e) =>{
  e.preventDefault();
  if(localStorage.getItem("cart")==null){
      localStorage.setItem("cart","");
  }
  var cart = localStorage.getItem("cart").split(",");

  console.log(cart);
  for (let i = 0; i < cart.length; i++) {
      if(cart[i]==e.target.value){
          notify("Already Added To Cart");
          setCartNumber();
          return;
      }
  }

  localStorage.setItem("cart", localStorage.getItem("cart") + `${e.target.value},`);
  notify(bookData[e.target.value-1].book_name+"     ~Added To Cart","success");

  console.log(setCartNumber());
  
}
  
  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div
            className="card border py-2"
            style={{ boxShadow: "2px 2px 10px #f5e050" }}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="images py-3">
                  <div className="text-center py-4">
                    {" "}
                    <img
                      id="main-image"
                      src={product != undefined ? product.image : ""}
                      width="300"
                      height="400px"
                      className="rounded"
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="product py-2"
                  style={{ textAlign: "left", marginRight: "50px" }}
                >
                  <div className="cart w-full" style={{ textAlign: "right" }}>
                    {" "}
                    <i className="fa fa-heart text-muted mx-2"></i>{" "}
                    <i className="fa fa-share-alt text-muted"></i>{" "}
                  </div>
                  <div className="mt-2 mb-3">
                    {" "}
                    <span className="text-uppercase text-muted brand">
                      {params.id}
                    </span>
                    <h5 className="text-uppercase">
                      {product != undefined ? product.book_name : ""}
                    </h5>
                    <div className="price d-flex flex-row align-items-center">
                      {" "}
                      <h3>
                        {product != undefined ? product.book_price : ""}Rs
                        &nbsp;
                      </h3>
                      <div className="ml-3 d-flex flex-row">
                        <strike>
                          {" "}
                          <p>{Math.round(parseInt(product.book_price)*1.4)}Rs </p>{" "}
                        </strike>
                        <span> (40% OFF)</span>{" "}
                      </div>
                    </div>
                  </div>
                  <p style={{ textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    ut massa pharetra, cursus magna et, cursus eros. Donec
                    interdum ligula eu tincidunt volutpat. Duis nec tempus
                    mauris. Cras at metus sit amet odio commodo luctus quis in
                    est. Vivamus cursus egestas malesuada. Cras congue sagittis
                    lorem vitae tincidunt. Phasellus sed ultricies lectus, id
                    lacinia nibh. Nam eget dignissim velit. Cras vestibulum sem
                    sagittis est commodo iaculis. Morbi condimentum posuere
                    rhoncus. Sed sit amet neque pharetra, varius sapien id,
                    feugiat nulla.
                  </p>
                  <div className="m-1">
                    <button
                      className="btn btn-outline-info mt-2 mx-2"
                      style={{ width: "160px", fontSize: "22px" }}
                      data-bs-toggle="modal" data-bs-target="#exampleModal"
                    >
                      Buy Now
                    </button>

                    <button
                      className="btn btn-outline-danger mt-2 mx-2"
                      style={{ width: "160px", fontSize: "22px" }}
                      value={product != undefined ? product.book_id : 0}
                      onClick={(e) => handleAddToCart(e)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ConfirmationModal name={product.book_name} price={product.book_price} id={product.book_id} image={product.image} category={product.category}/>
        </div>
      </div>
    </div>
  );
}
