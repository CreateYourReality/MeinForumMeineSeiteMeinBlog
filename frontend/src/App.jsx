import Home from './assets/pages/home'
import Categories from './assets/pages/Categories';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useContext, useState } from 'react';
import { categorieContext } from './context/Context';


function App() {
  const [allCategories,setAllCategories] = useState([])


  return (
    <>
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
                  
                  <Route path="/categories/:name/:id" element={<Categories/>}> </Route>    
        </Routes>
      </BrowserRouter>
      </categorieContext.Provider>
    </>
  )
}

export default App
