import { useContext } from "react";
import "./createNewPostSection.css"
import { categorieContext } from "../../context/Context";
const CreatePost = () => {
    const {allCategories,setAllCategories} = useContext(categorieContext)

    return ( 
        <>
            <section className="createNewPostSection">
                <form action="">
                    <h3>Create new Post</h3>
                    <select name="" id="">
                        {allCategories?
                            allCategories.map((categorie,index) => {
                                return(
                                    <option key={index}>{categorie}</option>
                                )
                            }) : <p>Wait for Categories...</p>
                        } 
                    </select>
                    <label htmlFor="titleField">Title:</label>
                    <input name="titleField" type="text" />
                    <label htmlFor="contentField">Content:</label>
                    <textarea name="contentField" type="text" />
                    <input type="submit" value={"neuen Post erstellen"}/>
                </form>
            </section>
        </>
     );
}
 
export default CreatePost;