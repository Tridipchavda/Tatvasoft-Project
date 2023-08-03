import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import firebaseDB, { auth } from "../firebaseConn";
import loadingImage from "./loading.gif";

export const RegisterForm = () => {

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [phone,setPhone] = useState();
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(false);
    
    const nav = useNavigate();
    
    const handleSubmitForm = async(e) =>{
        e.preventDefault();
        setLoading(true);

        createUserWithEmailAndPassword(auth,email,pass).then(async(res) => {
            console.log(res.user)

            const userAdd = await fetch("https://ebooksell-9b422-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    phone:phone,
                })
            })
            setLoading(false);

            nav("/");
          })
        .catch((err)=>{
            console.log(err.message)
            setLoading(false);

            alert(err.message);
        })

        
    }
    return (
        <center>
            <div style={{width:"70%",padding:"5px",height:"75vh",marginTop:"30px"}}>
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="https://images.freeimages.com/365/images/istock/previews/8334/83345199-online-library-mobile-app-education-concept-vector-illustration.jpg"
                                    className="img-fluid" alt="Sample image" />
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <h5>Register Yourself</h5><br></br>
                                <form>
                                    <div className="form-outline mb-4">
                                        <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="form-control form-control-sm"
                                       
                                            placeholder="Enter a valid email address" style={{padding:"5px 10px"}}/>
                                    </div>

                                    <div className="form-outline mb-3">
                                        <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} className="form-control form-control-sm"
                                        
                                            placeholder="Enter Name" style={{padding:"5px 10px"}}/>
                                    </div>

                                    <div className="form-outline mb-3">
                                        <input type="number" onChange={(e)=>{setPhone(e.target.value)}} value={phone} className="form-control form-control-sm"
                                        
                                            placeholder="Enter Phone Number" style={{padding:"5px 10px"}}/>
                                    </div>

                                    <div className="form-outline mb-3">
                                        <input type="password" onChange={(e)=>{setPass(e.target.value)}} value={pass} className="form-control form-control-sm"
                                        
                                            placeholder="Enter password" style={{padding:"5px 10px"}}/>
                                    </div>


                                    <div className="text-center text-lg-start mt-1 pt-2 ">
                                        <button onClick={handleSubmitForm} type="button" className="btn btn-primary btn-sm" style={{padding:"3px 12px",width:"300px",fontSize:"20px"}}>{loading?"Please Wait...":"Submit"}</button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">Have an account? 
                                        <a href="/" className="link-danger"> Log In</a></p>
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