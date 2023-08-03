import { useCallback, useContext, useEffect, useState } from "react";
import bookContext from "../Context/BookContext";
import cart from "./cart.png";
import { act } from "react-dom/test-utils";
import { Link } from "react-router-dom";


export const Navbar = () => {

    const { bookData, user, setUserTrue, setCartNumber, cartNo,activeLink,setLink} = useContext(bookContext);

    const [margin,setMargin] = useState();
    
    useEffect(()=>{
        
        setMargin((user=="" ? 70:48));
        console.log(activeLink);
    })
    

    return (
        <nav className="navbar navbar-expand-lg navbar-light "style={{backgroundColor:'#fddc4a'}}>
            <div className="container-fluid">
                <a className="navbar-brand mx-3" href="#">E Book Sell</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" " style={{float:"right"}} id="navbarNavAltMarkup">
                    <div className="navbar-nav mx-5">
                        <a className={activeLink==0?'nav-link active':'nav-link'}  href="/store">Home</a>
                        <a className={activeLink==1?'nav-link active':'nav-link'} href="#">About</a>
                        <a className={activeLink==2?'nav-link active':'nav-link'} href="#">Terms</a>
                        {user=="" ? "":
                        <>
                        <a className={activeLink==3?'nav-link active':'nav-link'} href="/orders">Orders</a>
                        <button className="btn mx-2 border border-dark" >{user}</button>
                        <a href="/cart">
                        <button className="btn mx-1 border border-dark" >
                            <img src={cart} width="25px" height="24px"></img>
                            &nbsp;
                            {cartNo != 0 ? cartNo-1 : " "}
                        </button>
                        </a>
                        </>
                        }
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}