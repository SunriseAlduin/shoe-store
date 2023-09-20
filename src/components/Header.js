import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import headerLogo from '../img/header-logo.png'

export default function Header() {

  const [isFormVisible, setIsFormvisible] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  
  const toggleFormVisibility = () => {
    setIsFormvisible((prevIsFormVisible) => !prevIsFormVisible);
    if(searchInputRef.current){
      searchInputRef.current.focus();
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
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
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">10</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id='search-form' className={isFormVisible ? 'header-controls-search-form form-inline' : 'header-controls-search-form form-inline invisible'}>
                  <input className='form-control' placeholder='Поиск' ref={searchInputRef}/>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
