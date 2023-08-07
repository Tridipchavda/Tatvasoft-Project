import axios from "axios";
import { collection, doc, getDocs } from "firebase/firestore/lite";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookCover from "../bookCover.jpg";
import bookContext from "../Context/BookContext";
import firebaseDB, { db } from "../firebaseConn";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

export const BookCard = () => {

    const {bookData,user,setUserTrue,setCartNumber} = useContext(bookContext);
    const nav = useNavigate();
    
    const goToProductDetails = (id) =>{
        console.log(id);
        nav(`/product/${id}`);
    }
    const notify = (mess,type) => {
        if(type == "success"){
            toast.success(mess,{position:"top-center",autoClose:2000});
        }else{
            toast.info(mess,{position:"top-center",autoClose:2000});
        }
        
    }

    const handleAddToCart = async(e) =>{
        e.preventDefault();

        console.log(e.target.value);
        if(localStorage.getItem("cart")==null){
            localStorage.setItem("cart","");
        }
        var cart = localStorage.getItem("cart").split(",");

        for (let i = 0; i < cart.length; i++) {
            if(cart[i]==e.target.value){
                notify("Already Added To Cart");
                setCartNumber();
                return;
            }
        }
        localStorage.setItem("cart", localStorage.getItem("cart") + `${e.target.value},`);

        const specificBookData = bookData.find(item=>(item.book_id==e.target.value));
        notify(specificBookData.book_name+"     ~Added To Cart","success");
    
        console.log(setCartNumber());
        
    }
    

    return (
        <center>
        <div style={{width:"80%",display:"flex",flexWrap:"wrap",marginTop:"20px"}}>
        {bookData.map((ele,index) => {
            if(ele.book_name==null){
                return ""
            }
            // console.log(index,ele.book_id);
            return (
                <div className="card " key={index} style={{ width: "15rem",margin:"15px" }}>
                    <img src={ele.image} onClick={()=>goToProductDetails(ele.book_id)} className="card-img-top" alt="..." height="260px"/>
                    <div className="card-body text-start" style={{ marginTop: "-5px" }}>
                        <p className="card-title m-0">{ele.book_name}</p>
                        <p className="text-muted m-0">Adventure</p>
                        
                        <h4 className="card-text my-1">{ele.book_price}Rs</h4>
                    </div>
                    <div className="py-2">
                        <button type="button" className="btn btn-outline-info btn-lg mx-1" style={{ fontSize: "14px",marginTop:"-10px",width:"150px" }} value={ele.book_id} onClick={(e)=>{handleAddToCart(e)}}>Add To Cart</button>
                        
                    </div>
                </div>
            )
        })}
        </div>
        </center>

    )
}