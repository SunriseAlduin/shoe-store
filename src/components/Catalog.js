import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'   
import Banner from './Banner'
import axios from 'axios'

export default function Catalog() {
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [offset, setOffset] = useState(6);
  const [moreButtonVisible, setMoreButtonVisible] = useState(true);
  const [formData, setFormData] = useState('');
  const [actualSearch, setActualSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const [errorCategories, setErrorCategories] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);



  useEffect(() => {
    async function fetchParams() {
      const searchQuery = searchParams.get('search') || '';
      if(searchQuery){
        setFormData(searchQuery);
        setActualSearch(searchQuery)
        setActiveCategory(0)
        try{
          const response = await axios.get(`http://localhost:7070/api/items?q=${searchQuery}`);
          setProducts(response.data);

          if(response.data.length < 6){
            setMoreButtonVisible(false)
          } else{
            setMoreButtonVisible(true)
          };
        } catch(error){
          console.error(error)
        };
      };
    };

    fetchParams();
  }, [searchParams]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:7070/api/categories');
        if(response.data.length === 0){
          setCategories([]);
        } else {
          setCategories(response.data);
          setErrorCategories(null);
        }
      } catch(error) {
        setErrorCategories(error);
      };
    };
    
    fetchCategories(); 
    
    async function fetchParams() {
      const searchQuery = searchParams.get('search') || '';
      if(searchQuery){
        setFormData(searchQuery);
        setActualSearch(searchQuery)
        setActiveCategory(0)
        try{
          const response = await axios.get(`http://localhost:7070/api/items?q=${searchQuery}`);
          setProducts(response.data);

          if(response.data.length < 6){
            setMoreButtonVisible(false)
          } else{
            setMoreButtonVisible(true)
          };
        } catch(error){
          console.error(error)
        };
      };
    };

    fetchParams();
  }, []);

  useEffect(() => {

    async function fetchProducts() {

      if(actualSearch === ''){
        if(activeCategory === 0){
          try{
            const response = await axios.get('http://localhost:7070/api/items');
            setProducts(response.data);
            setLoadingProducts(false);
            setErrorProducts(null);

            if(response.data.length < 6){
              setMoreButtonVisible(false)
            } else{
              setMoreButtonVisible(true)
            }
          } catch(error){
            setErrorProducts(error);
            setLoadingProducts(false);
          };
        } else{
          try{
            const response = await axios.get(`http://localhost:7070/api/items?categoryId=${activeCategory}`);
            setProducts(response.data);
            setLoadingProducts(false);
            setErrorProducts(null);
  
            if(response.data.length < 6){
              setMoreButtonVisible(false)
            } else{
              setMoreButtonVisible(true)
            }
          } catch(error){
            setErrorProducts(error);
            setLoadingProducts(false);
          };
        };
      } else {
        if(activeCategory === 0){
          try{
            const response = await axios.get(`http://localhost:7070/api/items?q=${actualSearch}`);
            setProducts(response.data);
            setLoadingProducts(false);
            setErrorProducts(null);

            if(response.data.length < 6){
              setMoreButtonVisible(false)
            } else{
              setMoreButtonVisible(true)
            }
          } catch(error){
            setErrorProducts(error);
            setLoadingProducts(false);
          }
        } else{
            try{
              const response = await axios.get(`http://localhost:7070/api/items?q=${actualSearch}&categoryId=${activeCategory}`);
              setProducts(response.data);
              setLoadingProducts(false);
              setErrorProducts(null);
  
              if(response.data.length < 6){
                setMoreButtonVisible(false)
              } else{
                setMoreButtonVisible(true)
              }
            } catch(error){
              setErrorProducts(error);
              setLoadingProducts(false);
            };
          };
        }

    };

    fetchProducts();
  }, [activeCategory]);
  
  const categoryClickHandler = (categoryId) => {
    setLoadingProducts(true);
    setActiveCategory(categoryId)
    setOffset(6);
    if(!(products.length < 6)){
      setMoreButtonVisible(true)
    }
  };

  const moreButtonClickHandler = async () => {
    setLoadingProducts(true);
    let url;
    if(activeCategory === 0){
      actualSearch === '' ? url = `http://localhost:7070/api/items?offset=${offset}`
                            : url = `http://localhost:7070/api/items?offset=${offset}&q=${actualSearch}`
    } else{
      actualSearch === '' ? url = `http://localhost:7070/api/items?categoryId=${activeCategory}&offset=${offset}`
                            : url = `http://localhost:7070/api/items?categoryId=${activeCategory}&offset=${offset}&q=${actualSearch}`
    };

    try{
      const response = await axios.get(url);
      if(response.data.length < 6){
        setMoreButtonVisible(false);
      };

      setOffset((prevOffset) => prevOffset + 6)
      setProducts((prevProducts) => [...prevProducts, ...response.data])      
      setLoadingProducts(false);
      setErrorProducts(null);
    } catch(error){
      setErrorProducts(error)
    };  
    
  };
  


  const formSubmitHandler = async (formData) => {
    const search = formData;


    try{
      const response = await axios.get(`http://localhost:7070/api/items?q=${formData}&categoryId=${activeCategory}`);
      setActualSearch(search);
      if(response.data.length < 6){
        setMoreButtonVisible(false);
        setProducts((prevProducts) => [...prevProducts, ...response.data])
      } else{
        setMoreButtonVisible(true);
      }
      setProducts(response.data);
    } catch(error){
      console.error(error);
    }
  };
  
  const inputChangeHandler = (e) => {
    setFormData(e.target.value);
  };

  return (
  <>
    <main className="container">
      <div className="row">
        <div className="col">
          {location.pathname === '/catalog' && <Banner />}  
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {location.pathname === '/catalog' && <form className="catalog-search-form form-inline"
                                                       onSubmit={(e) => {
                                                        e.preventDefault();
                                                        formSubmitHandler(formData);
                                                       }}>
                                                   <input className="form-control" placeholder="Поиск" onChange={inputChangeHandler} value={formData}/>
                                                  </form>
            }

            <ul className='catalog-categories nav justify-content-center'>
              <li className='nav-item' key={0}>
                <a href='#' className={`nav-link ${activeCategory === 0 ? 'active' : ''}`} onClick={(e) => {
                  e.preventDefault();
                  categoryClickHandler(0);
                }}>
                Все</a>
              </li>
              {categories.map((category) => {
               return(
                 <li className='nav-item' key={category.id}>
                   <a href='#' className={`nav-link ${activeCategory === category.id ? 'active' : ''}`} onClick={(e) => {
                      e.preventDefault();
                      categoryClickHandler(category.id)
                   }}>
                   {category.title}</a>   
                 </li> 
               );
              })}
              {errorCategories ? errorCategories.message : null}
            </ul>
            <div className='row d-flex'>
            {products.map((product) => {
                return(
                  <div className='col-4' key={product.id}>
                    <div className="card catalog-item-card flex-fill">
                      <img src={product.images[0]}
                      className="card-img-top img-fluid" alt={product.title} />
                      <div className="card-body">
                        <p className="card-text">{product.title}</p>
                        <p className="card-text">{product.price} руб.</p>
                        <Link to={`/products/${product.id}`} className="btn btn-outline-primary">Заказать</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              {loadingProducts ?       <div className='preloader'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                       </div>
                                      : null }
              {errorProducts ? errorProducts.message : null}                        
            </div>
            {moreButtonVisible ? (<div className="text-center">
                                     <button className="btn btn-outline-primary" onClick={moreButtonClickHandler}>Загрузить ещё</button>
                                   </div>)
                               : (<div className='text-center'>
                                  <p>Ой, больше ничего нет &#128517; </p>
                                 </div>)    }
          </section>
        </div>
      </div>
    </main>

  </>  
  )
}
