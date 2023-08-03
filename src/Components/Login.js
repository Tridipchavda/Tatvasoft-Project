import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import firebaseDB, { auth } from "../firebaseConn";
import loadingImage from "./loading.gif";
import bookContext from "../Context/BookContext";

export const Login = () => {

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [loading,setLoading] = useState(false);
    const {bookData,user,setUserTrue} = useContext(bookContext);

    const nav = useNavigate();

    const handleSubmitForm = async(e) =>{
        e.preventDefault();
        setLoading(true);

        signInWithEmailAndPassword(auth,email,pass).then((res) => {
            console.log(res.user)
            setLoading(false);

            setUserTrue(res.user.email);            
            nav("/store");
            
          })
        .catch((err)=>{
            alert(err.message);
            console.log(err.message);
            setLoading(false);
        })

        
    }

    useEffect(()=>{
        if(window.localStorage.getItem("username")==undefined || window.localStorage.getItem("username")==""){

        }else{
            nav("/store");
        }
    },[])
    return (
        <center>
            <div style={{width:"70%",padding:"5px",height:"75vh",marginTop:"30px"}}>
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://img.freepik.com/premium-vector/online-library-people-reading-books-smartphone-with-reader-app-online-book-store-library-education-flat-concept-illustration-education-book-app-digital-bookshelf-students_53562-11803.jpg?w=2000"
                                    className="img-fluid" alt="Sample image" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <form>
                                    <div className="d-flex flex-row my-3 align-items-center justify-content-center justify-content-lg-start">
                                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                        <button type="button" className="btn btn-primary btn-floating mx-1">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" className="btn btn-primary btn-floating mx-1">
                                            <i className="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" className="btn btn-primary btn-floating mx-1">
                                            <i className="fab fa-linkedin-in"></i>
                                        </button>
                                    </div>

                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="form-control form-control-sm"
                                       
                                            placeholder="Enter a valid email address" style={{padding:"5px 10px"}}/>
                                    </div>

                                    <div className="form-outline mb-3">
                                        <input type="password" onChange={(e)=>{setPass(e.target.value)}} value={pass} className="form-control form-control-sm"
                                        
                                            placeholder="Enter password" style={{padding:"5px 10px"}}/>
                                    </div>

                                    <div className="text-center text-lg-start mt-1 pt-2 ">
                                        <button onClick={handleSubmitForm} type="button" className="btn btn-primary btn-sm" style={{padding:"3px 12px",width:"290px",fontSize:"20px"}}>{loading?"Please Wait...":"Log In"}</button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                                        <a href="/register" className="link-danger" > Register</a></p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
        </center>
    )
}