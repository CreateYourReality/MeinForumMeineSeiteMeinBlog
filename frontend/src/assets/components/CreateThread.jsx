import { useContext, useState } from "react";
import "./CreateThread.css"
import { categorieContext, loggedUserContext } from "../../context/Context";
import axios from "axios";
import { UserContext } from "../user/UserContext";

const CreateThread = () => {
    const {allCategories,setAllCategories} = useContext(categorieContext)
    const [categorie,setCategorie] = useState("generals")
    const {user} = useContext(UserContext)

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
                {console.log(user)}
                <form onSubmit={createNewPost}>
                    <h3>Create new Thread</h3>
                    <select onChange={handleSelect} name="" id="">
                        {allCategories?
                            allCategories.map((categorie,index) => {
                                return(
                                    <option key={index}>{categorie}</option>
                                )
                            }) : <p>Wait for Categories...</p>
                        } 
                    </select>
                        <input placeholder="Thread title..." id="threadTitle" name="threadTitle" type="text" />
                    <textarea placeholder="text..." name="content" type="text" />
                    <div>
                        <label htmlFor="image">Choose a picture:</label>
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg"></input>
                    </div>
                    <label htmlFor="author">Author:
                        <input readOnly name="author" value={user? user.userName : "GUEST"} />
                    </label>
                    <input type="submit" value={"neuen Post erstellen"}/>
                </form>
            </section>
        </>
     );
}
 
export default CreateThread;