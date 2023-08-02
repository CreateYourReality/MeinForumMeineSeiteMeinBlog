import "./Home.css"
import CreateThread from "../components/CreateThread";
import Header from "../components/Header";
import CategorieLinks from "../components/CategorieLinks";
const Home = () => {
    return (  
        <>
            <Header/>
            <main>
                <CategorieLinks/>
                <CreateThread/>
            </main>
        </>
    );
}
 
export default Home;