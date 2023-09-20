import './App.css';
import { Routes, Route } from 'react-router-dom'
import TestPage from './components/TestPage'
import MainPage from './components/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/test' element={<TestPage />} />
        <Route path='/' element={<MainPage />} />
      </Routes>
      <Footer />  
    </>
  );
}
// реализовать route /catalog /about /contacts
export default App;
