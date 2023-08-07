
import React from 'react'
import { useContext } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import bookContext from '../Context/BookContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

export default function Orders() {
    const {setLink} = useContext(bookContext);

    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        setLink(3);
        try{
            axios.get(
                "https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
             ).then((res)=>{
                
                const storage = Object.values(res.data);
                let ans = [];

                storage.forEach((ele)=>{
                    // console.log(localStorage.getItem('username'),ele.user);
                    if(localStorage.getItem('username') == ele.user){
                        console.log("run");
                        ans.push(ele);
                        
                    }
                })
                console.log(ans);
                setOrders(ans);
             })
              
        } catch (error) {
            toast.info(error.message);
            console.log(error);
        }
    },[])
    
    const copyOrderID = (e)=>{
        navigator.clipboard.writeText(e.target.innerText);
        toast.info("Order ID Copied",{autoClose:800});
    }

    return (

        <center>
        <div style={{width:"80%",display:"flex",flexWrap:"wrap",marginTop:"20px"}}>
        {orders.map((ele,index) => {
            
            return (
            
                <div className="d-flex flex-row border border-warning p-3 rounded" key={index} style={{ width: "20rem",margin:"25px" }}>
                    
                    <img src={ele.image} className="card-img-left" alt="..." height="180px" width="140px" />
                    <div className="card-body text-start" style={{ marginTop: "-15px" }}>
                        <p className='m-0' style={{fontSize:"14px"}}>Order Id </p>
                        <p className="text-muted d-inline-block text-truncate" onClick={copyOrderID} style={{textAlign:"center",maxWidth:"150px",cursor:"pointer"}}>{ele.orderId}</p>
                        <br></br>
                        <h5 className="card-title m-0">{ele.book_name}</h5>
                        <p className="text-muted m-0">{ele.category}</p>
                        <h4 className="card-text my-1">{ele.book_price}Rs</h4>
                    </div>
                </div>
                
            )
        })}
        </div>
        </center>

    )
}
