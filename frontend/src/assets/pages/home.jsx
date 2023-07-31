import axios from "axios";
import { useEffect, useContext } from "react";
import {NavLink} from "react-router-dom";
import "./Home.css"
import { categorieContext } from "../../context/Context";
import CreatePost from "../components/CreatePost";

const Home = () => {
    const {allCategories,setAllCategories} = useContext(categorieContext);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/collectionNames');
      setAllCategories(response.data);
   //   console.log(response.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  };
  
  fetchData();
}, []);

    return (  
        <>
            <main>
                <h1>777kun</h1>
                <CreatePost/>
                {allCategories?
                  allCategories.map((categorie,index) => {
                    return <NavLink key={index} to={`./categories/${categorie}`} > {categorie} </NavLink>
                  })
                :
                <p>WAIT FOR DATA...</p>
              }
            </main>
        </>
    );
}
 
export default Home;