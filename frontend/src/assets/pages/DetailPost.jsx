import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { loggedUserContext } from "../../context/Context";

const DetailPost = () => {
    const [data,setData] = useState([])
    const {name} = useParams()
    const {id} = useParams()
    const {loggedUser} = useContext(loggedUserContext)
    const [allComments, setAllComments] = useState([])


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/categories/${name}/${id}`); //http://localhost:3001/categories/${name}
            setData(response.data);
            setAllComments(response.data[0].comments)
            
 //           console.log(data);
          } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
          }
           
        };
        
        fetchData();
      }, []);


      const  addComment = async () => {
        event.preventDefault()
        const formData = new FormData(event.target)

        const response = await axios.post(`http://localhost:3001/detailpost/${name}/${id}`, formData);
        //http://localhost:3001/categories/${name}
        const commentId = response.data._id;
        const secFormData = new FormData()
        secFormData.append("commentId", commentId)

        console.log(secFormData);
        console.log(secFormData.get("commentId"));
        const change = await axios.put(`http://localhost:3001/detailpost/${name}/${id}`, secFormData); 

      }


      const compareAuthor = () => {
        console.log(loggedUser == data.author ? "ja" : "nein");
      }

   
    return (
        <>
            <main>
            {data?
                  data.map((post,index) => {
                    return(
                      <article className="singlePost" key={index}>
                        <h2>{post.title}</h2>
                        <img src={post.image.url} alt="" />
                        <p>{post.content}</p>
                        <p>Author:<Link>{post.author}</Link></p>
                        <p>Thread: {post._id}</p>
                            <div>
                                <h2>Add comment</h2>
                                <form onSubmit={addComment}>
                                    <label htmlFor="content">Content: </label>
                                    <textarea name="content" id="commentContent" cols="30" rows="10"></textarea>
                                    <input readOnly name="postId" type="text" value={post._id}/>
                                    <input readOnly name="author" type="text" value={loggedUser}/>
                                    <input readOnly name="title" type="text" value={post.title}/>
                                    <input type="submit" />
                                    <div>
                                        <label htmlFor="image">Choose a picture:</label>
                                        <input type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
                                    </div>
                                    {console.log(allComments)}
                                    {allComments? allComments.map((comment,index) => {
                                      return (
                                          <article key={index}>
                                            <p>{comment.content}</p>
                                          </article>
                                      ) 
                                    }): <p>Warte auf Comments...</p>}
                                </form>
                            </div>
                      </article>
                    )
                  }) : <p>Wait for data...</p>}
            </main>
        </>
      );
}
 
export default DetailPost;