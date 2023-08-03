import { useEffect } from "react";
import { useContext } from "react";
import bookContext from "../Context/BookContext";

export const SearchBar = () => {

    const { bookData, user, setUserTrue, setCartNumber,cartNo,setBookData,constBookData } = useContext(bookContext);

    useEffect(()=>{
        console.log(bookData);
    },[])

    const filtertheData = (e) =>{
        console.log("Filtering...");
        if(e.target.value == ""){
            setBookData(constBookData,0);
        }

        const newData = constBookData.filter(value => value.book_name.toLowerCase().includes(e.target.value.toLowerCase()))
        console.log(newData);
        setBookData(newData,0);
    }
    const sortTheData = (e) =>{
        console.log(e.target.value);
        if(e.target.value == 1){
            const ascending = [...bookData].sort((a, b) => a.book_name > b.book_name ? 1:-1);
            console.log(ascending);
            setBookData(ascending,1);
        }
        else if(e.target.value == 2){
            const descending = [...bookData].sort((a, b) => a.book_name > b.book_name ? -1:1);
            console.log(descending);
            setBookData(descending,1);
        }
        else if(e.target.value == 3){
            const priceAscending = [...bookData].sort((a, b) => a.book_price - b.book_price);
            console.log(priceAscending);
            setBookData(priceAscending,1);
        }
        
    }
  return (
    <center>
    <div className="d-flex flex-row" style={{width:"800px"}}>
      <div style={{ width: "600px", marginTop: "20px" }}>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={filtertheData}
          />
        </form>
        
      </div>
      <div>
      <form className="d-flex mx-5 my-4" style={{height:"34px"}}>
            <select className="custom-select" onChange={sortTheData} style={{width:"200px"}} defaultValue="0">
                <option value="0">Sort Books</option>
                <option value="1">Sort by A-Z</option>
                <option value="2">Sort by Z-A</option>
                <option value="3">Sort by Price</option>
            </select>
        </form>
      </div>
      </div>
    </center>
  );
};
