import { useContext } from "react";
import Header from "../components/Header";
import "./UserProfile.css"
import { UserContext } from "../user/UserContext";
const UserProfile = () => {
    const {user} = useContext(UserContext)
    return ( 
        <>
        {console.log(user)}
            <Header/>
            <section className="userProfileSection">
                <h2>USERPROFILE</h2>
                <p>Username: {user?user.userName:"wait for userName data"}</p>
            </section>
        </>
     );
}
 
export default UserProfile;