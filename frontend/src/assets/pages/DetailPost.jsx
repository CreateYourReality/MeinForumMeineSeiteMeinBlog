import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const DetailPost = () => {
    const [data,setData] = useState([])
    const {name} = useParams()
    const {id} = useParams()


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/categories/${name}/${id}`); //http://localhost:3001/categories/${name}
            setData(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
          }
        };
        
        fetchData();
      }, []);

   
    return (
        <>
            <main>
                <article className="singlePost">
                    {console.log(data)}
                    <h2>{data.title}</h2>
                    <img src={data.image.url} alt="" />
                    <p>{data.content}</p>
                    <p>Author:<Link>{data.author}</Link></p>
                    <p>Thread: {id} </p>               
                </article>
            </main>
        </>
      );
}
 
export default DetailPost;