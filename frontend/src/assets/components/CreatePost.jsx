import { useContext, useState } from "react";
import "./createNewPostSection.css"
import { categorieContext, loggedUserContext } from "../../context/Context";
import axios from "axios";

const CreatePost = () => {
    const {allCategories,setAllCategories} = useContext(categorieContext)
    const [categorie,setCategorie] = useState()
    const {loggedUser,setLoggedUser} = useContext(loggedUserContext)

    const createNewPost =  async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)

        const response = await axios.post(`http://localhost:3001/categories/${categorie}`, formData); //http://localhost:3001/categories/${name}
         
        for (let value of formData.entries()) {
            console.log ("entries " + value[0] + " mit " + value[1]);
         }    
    }

    const handleSelect = () => {
        setCategorie(event.target.value)
    }

    return ( 
        <>
            <section className="createNewPostSection">
                <form onSubmit={createNewPost}>
                    <h3>Create new Post</h3>
                    <select onChange={handleSelect} name="" id="">
                        {allCategories?
                            allCategories.map((categorie,index) => {
                                return(
                                    <option key={index}>{categorie}</option>
                                )
                            }) : <p>Wait for Categories...</p>
                        } 
                    </select>
                    <label htmlFor="title">Title:</label>
                    <input name="title" type="text" />
                    <label htmlFor="content">Content:</label>
                    <textarea name="content" type="text" />
                    <input type="submit" value={"neuen Post erstellen"}/>
                    <label htmlFor="author">Logged User:</label>
                    <input readOnly name="author" value={loggedUser} />
                    <div>
                        <label htmlFor="image">Choose a picture:</label>
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
                    </div>
                </form>
            </section>
        </>
     );
}
 
export default CreatePost;