import Home from './assets/pages/home'
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
              return <Route key={index} path="/categorie/:name"> {categorie} </Route>
            })
            :
            <p>WAIT FOR DATA...</p>
          }
                  
              
        </Routes>
      </BrowserRouter>
      </categorieContext.Provider>
    </>
  )
}

export default App
