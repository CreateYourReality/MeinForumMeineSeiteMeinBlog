import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css"
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const siteBack = () =>{
        navigate(-1)
    }
    const btnTxt = "< BACK"
    return (
    <header>
        <h1>777kun</h1>
        {location.pathname != "/" ?
            <button onClick={siteBack}>{btnTxt}</button> 
            : null}
    </header>  
    );
}
 
export default Header;