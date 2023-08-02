import { categorieContext } from "../../context/Context";
import axios from "axios";
import { useEffect, useContext } from "react";
import { NavLink} from "react-router-dom";
import "./CategorieLinks.css"

const CategorieLinks = () => {
    const {allCategories,setAllCategories} = useContext(categorieContext);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/collectionNames');
          setAllCategories(response.data);
        } catch (error) {
          console.error('Fehler beim Abrufen der Daten:', error);
        }
      };
      
      fetchData();
    }, []);

    return (
        <>
        <section className="categoriesSection">
            <h2 className="categoriesSectionHeadline">THREADS</h2>
            <div className="categoriesSectionDiv">
                {allCategories?
                    allCategories.map((categorie,index) => {
                        return <NavLink className="categorieLink" key={index} to={`./categories/${categorie}`} > {categorie} </NavLink>
                    })
                : <p>WAIT FOR DATA...</p>
                }
            </div>
        </section>
        </>
    );
}
 
export default CategorieLinks;