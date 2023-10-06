import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import headerLogo from '../img/header-logo.png'
import { useAppContext } from './AppContext';

export default function Header() {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const searchInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  
  
  const toggleFormVisibility = () => {

    if(isFormVisible === false){
      setIsFormVisible(true);
    };

    if(isFormVisible && searchText){
      submitButtonRef.current.click();
    };

  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText('');
    setIsFormVisible(false);
    navigate(`/catalog?search=${encodeURIComponent(searchText)}`);
  };

  /* Пример реализации добавления активного класса пункту меню
  className={`navbar-brand ${testMatch ? 'active' : ''}`
  */

  return (
    <header className='container'>
      <div className='row'>
        <div className='col'>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <Link to='/' className='navbar-brand'>
              <img src={headerLogo} alt='Bosa Noga' />
            </Link>

            <div className='collapse navbar-collapse' id='navbarMain'>
              <ul className='navbar-nav mr-auto'>
                <li className={`nav-item ${isActive('/')}`}>
                  <Link to='/' className='nav-link'>Главная</Link>
                </li>
                <li className={`nav-item ${isActive('/catalog')}`}>
                  <Link to='/catalog' className='nav-link'>Каталог</Link>
                </li>
                <li className={`nav-item ${isActive('/about')}`}>
                  <Link to='/about' className='nav-link'>О магазине</Link>
                </li>
                <li className={`nav-item ${isActive('/contacts')}`}>
                  <Link to='/contacts' className='nav-link'>Контакты</Link>
                </li>
              </ul>
              <div>
                <div className='header-controls-pics'>
                  <div data-id='search-expander' className='header-controls-pic header-controls-search' onClick={toggleFormVisibility}></div>
                  <Link to='/cart' className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">{state.productsAmount}</div>
                    <div className="header-controls-cart-menu"></div>
                  </Link>
                </div>
                <form data-id='search-form' className={isFormVisible ? 'header-controls-search-form form-inline' : 'header-controls-search-form form-inline invisible'} onSubmit={(e) => handleSearchSubmit(e)}>
                  <input className='form-control' placeholder='Поиск' ref={searchInputRef} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                  <button type='submit' style={{ display: 'none' }} ref={submitButtonRef}></button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
