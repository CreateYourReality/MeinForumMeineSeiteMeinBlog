import './App.css'
import Home from './assets/pages/home'
import Categories from './assets/pages/Categories';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react';
import { categorieContext } from './context/Context';
import DetailPost from './assets/pages/DetailPost';
import SignUpPage from './assets/pages/SignUpPage';
import UserProfile from './assets/pages/UserProfile';
function App() {
  const [allCategories,setAllCategories] = useState([])
  
  return (
    <>
      <categorieContext.Provider value={{allCategories,setAllCategories}}>
       
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            {allCategories?
              allCategories.map((categorie,index) => {
                return <Route key={index} path="/categories/:name" element={<Categories/>}> {categorie} </Route>
              })
              : <p>WAIT FOR DATA...</p>
            }
            <Route path="/detailpost/:name/:id" element={<DetailPost/>}> </Route>
            <Route path="/signup" element={<SignUpPage/>}> </Route>
            <Route path="/profile" element={<UserProfile/>}> </Route>
          </Routes>
        </main>
      </categorieContext.Provider>
    </>
  )
}

export default App
