import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "./Categories.css"

const Categories = () => {
    const [data,setData] = useState([])
    const {name} = useParams()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/categories/${name}`); //http://localhost:3001/categories/${name}
            setData(response.data);
       //     console.log(response.data);
          } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
          }
        };
        
        fetchData();
      }, []);


    return ( 
        <>
            <main>
                <h1>{name}</h1>
                {data?
                  data.map((post,index) => {
                    return(
                      <article className="singlePost" key={index}>
                        <h2>{post.title}</h2>
                        <img src={post.image.url} alt="" />
                        <p>{post.content}</p>
                        <p>Author:<Link>{post.author}</Link></p>
                        <p>To Thread: <Link to={`/detailpost/${name}/${post._id}`}>{post._id}</Link></p>
                      </article>
                    )
                  }) : <p>Wait for data...</p>}
            </main>
        </>
     );
}
 
export default Categories;