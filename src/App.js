import './App.css';
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Page404 from './components/Page404';
import About from './components/About';
import Cart from './components/Cart';
import Contacts from './components/Contacts';
import Product from './components/Product';
import { useAppContext } from './components/AppContext';
import { useEffect } from 'react';


function App() {

  const { dispatch } = useAppContext();

  useEffect(() => {
    const savedCartData = localStorage.getItem('cartState');
    if(savedCartData){
      const parsedData = JSON.parse(savedCartData);
      dispatch({
        type: 'LOAD_CART_DATA',
        payload: parsedData,
      });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/products/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/about' element={<About />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
