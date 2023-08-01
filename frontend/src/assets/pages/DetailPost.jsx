import { useParams,useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { loggedUserContext } from "../../context/Context";
import "./DetailPost.css"


const DetailPost = () => {
    const [refresh,setRefresh] = useState(false);
    const [data,setData] = useState([])
    const {name} = useParams()
    const {id} = useParams()
    const navigate = useNavigate();
    const {loggedUser} = useContext(loggedUserContext)

    const [allCommentFields,setAllCommentFields] = useState([])

    const getCommentFields = async (commentID) => {
      let commentArray = []
      try {
        const commentData = await axios.get(`http://localhost:3001/comments/${id}/${commentID}`)
        commentArray.push(commentData.data[0].content)
        commentArray.push(commentData.data[0].author)
        commentArray.push(commentData.data[0].image.url)
        commentArray.push(commentData.data[0]._id)
      }catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);       
      }
      setAllCommentFields(prevState => [...prevState,commentArray])
    }

    useEffect(() => {
        setAllCommentFields([])
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/categories/${name}/${id}`); //http://localhost:3001/categories/${name}
            setData(response.data);
            await response.data[0].comments.forEach(async (comment) => {
              await getCommentFields(comment);
            })
 //           console.log(data);
          } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
          }
        };
        
        fetchData();
      }, [refresh]);


      const refreshSite = async () => {
        await setRefresh(prevState => !prevState)
      }

      const  addComment = async () => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const response = await axios.post(`http://localhost:3001/detailpost/${name}/${id}`, formData);
        const commentId = response.data._id;
        const secFormData = new FormData()
        secFormData.append("commentId", commentId)
        const change = await axios.put(`http://localhost:3001/detailpost/${name}/${id}`, secFormData); 
        refreshSite();

      }


      const compareAuthor = () => {
        console.log(loggedUser == data.author ? "ja" : "nein");
      }



      const deleteComment = async (commentId) => {
        await axios.delete(`http://localhost:3001/comments/${id}/${commentId}`); 
        await refreshSite();
      }

      const deletePost = async (categorieName,postId) => {
        navigate('/');
        await axios.delete(`http://localhost:3001/categories/${categorieName}/${postId}`); 
        
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
                                  <button onClick={() => deletePost(name,id)}>DELETE POST</button>
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
                                </form>
                                {allCommentFields? allCommentFields.map((comment,index) => {
                                      return (
                                          <article className="singleComment" key={index}>
                                            <h6>id:{comment[3]}</h6>
                                            <div className="singleCommentText">
                                              <img src={comment[2]}/>
                                              <p>{comment[0]}</p>
                                            </div>
                                            <h6>Author: {comment[1]}</h6>
                                            <button onClick={() => deleteComment(comment[3])}>DELETE</button>  
                                          </article>
                                      ) 
                                    }): <p>Warte auf Comments...</p>}
                            </div>
                      </article>
                    )
                  }) : <p>Wait for data...</p>}
            </main>
        </>
      );
}
 
export default DetailPost;