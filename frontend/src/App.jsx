import Home from './assets/pages/home'
import Categories from './assets/pages/Categories';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react';
import { categorieContext,loggedUserContext } from './context/Context';
import DetailPost from './assets/pages/DetailPost';


function App() {
  const [allCategories,setAllCategories] = useState([])
  const [loggedUser,setLoggedUser] = useState("64b92ffff9daec0e06c57674")

  
  return (
    <>
  
    <loggedUserContext.Provider value={{loggedUser,setLoggedUser}}>
    <categorieContext.Provider value={{allCategories,setAllCategories}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          {allCategories?
            allCategories.map((categorie,index) => {
              return <Route key={index} path="/categories/:name" element={<Categories/>}> {categorie} </Route>
            })
            :
            <p>WAIT FOR DATA...</p>
          }
                  
                  <Route path="/detailpost/:name/:id" element={<DetailPost/>}> </Route>    
        </Routes>
      </BrowserRouter>
      </categorieContext.Provider>
      </loggedUserContext.Provider>
    </>
  )
}

export default App
