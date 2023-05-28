import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Favorites from './components/favorites/Favorites';
import Description from './components/Description';
import Form from './components/Form';
import "./App.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import Basket from './components/basket/Basket'

export const AppContext = React.createContext({})

function App() {

  const [tyrs, setTyrs] = useState([])
  const [favorites, setFavorites] = useState([])
  const [overlayItems, setOverlayItems] = useState([])

  useEffect(() => {
    async function axiosData() {
      const tyrsData = 
      await axios.get('https://637f91ca2f8f56e28e904e7d.mockapi.io/tyrs')
      const favoritesData = 
      await axios.get('https://637f91ca2f8f56e28e904e7d.mockapi.io/favorites')
      const cartData = 
      await axios.get('https://637f91ca2f8f56e28e904e7d.mockapi.io/cart')
      setTyrs(tyrsData.data)
      setFavorites(favoritesData.data)
      setOverlayItems(cartData.data)
    }
    // fetch('https://646e079d9c677e23218ae46a.mockapi.io/tyrs').then((myJson)=>{
    //   return myJson.json();
    // }).then((myJson)=>{
    //   setTyrs(myJson)
    // })
    axiosData();
  },[])

  const deleteItems=(id)=>{
    axios.delete(`https://637f91ca2f8f56e28e904e7d.mockapi.io/cart/${id}`)
    setOverlayItems((objDelete)=> objDelete.filter(item=> item.id !==id))
  }

  const isAdded=(myId)=>{
    return overlayItems.some((objIsAdded)=> objIsAdded.myId === myId)
  }

  const isFav=(myId)=>{
    return favorites.some((objIsFav)=> objIsFav.myId === myId)
  }
  

  return (
    <AppContext.Provider
    value={
      {
        tyrs,
        setTyrs,
        overlayItems,
        setOverlayItems,
        favorites,
        setFavorites,
        isAdded,
        isFav
      }
    }>
      <div>
        <Router>
          <Header/>
            <Routes>
              <Route path='/favorites'
                element={
                  <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    item={tyrs}
                    overlayItems={overlayItems}
                    setOverlayItems={setOverlayItems}
                  />
                }/>
              <Route path='/'
                element={
                  <Home 
                    item={tyrs}
                    overlayItems={overlayItems}
                    setOverlayItems={setOverlayItems}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                }/>  
              <Route path='/description'
                element={
                  <Description/>
                }
              />
              <Route path='/form'
                element={
                  <Form/>
                }
              />
              <Route path='/cart'
                element={
                  <Basket
                    totalPrice={
                      overlayItems.reduce((element = overlayItems.length, obj)=>
                      element+obj.price, 0)
                    }
                    overlayProp={overlayItems}
                    deleteItems={deleteItems}
                  />
                }
              />
            </Routes>
        </Router>
        <Footer/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
