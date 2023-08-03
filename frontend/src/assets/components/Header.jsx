import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Header.css"
import axios from "axios";
import { UserContext } from "../user/UserContext";
import Login from "../user/Login";

const Header = () => {
    const { isLoggedIn, logout} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation()
    const siteBack = () =>{
        navigate(-1)
    }
    const btnTxt = "< BACK"

    const getUsername = async () => {
        try{
            return await axios.get("/api/user/secure");
        }catch(error){
            console.log(error);
        }
    }

    return (
    <header>
         <a href="/"><h1>777kun</h1></a>
        {location.pathname != "/" ?
            <button onClick={siteBack}>{btnTxt}</button> 
            : null}

<nav>
       
        {!isLoggedIn && (
          <>
            <a href="/signup">Signup</a>
            <Login/>
          </>
        )}
        {isLoggedIn && (
          <>
            {location.pathname != "/profile" ?
             <a href="/profile">Profile</a> : null}
            <button id="logoutBtn" type="button" onClick={logout}>Logout</button>
            <button onClick={getUsername}>GET USER INFO</button>
          </>
        )}
      </nav>   
    </header>  
    );
}
 
export default Header;