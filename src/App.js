import './App.css';
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Page404 from './components/Page404';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />  
    </>
  );
}

export default App;
