import React, { useEffect, useRef, useState } from 'react'
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
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
          console.log(response.data)
          setProducts(response.data);

          if(response.data.length < 6){
            setMoreButtonVisible(false)
          } else{
            setMoreButtonVisible(true)
          };
        } catch(error){
          console.log('error')
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
          console.log(response.data)
          setProducts(response.data);

          if(response.data.length < 6){
            setMoreButtonVisible(false)
          } else{
            setMoreButtonVisible(true)
          };
        } catch(error){
          console.log('error')
        };
      };
    };

    fetchParams();
  }, []);

  useEffect(() => {

    async function fetchProducts() {

      let url = `http://localhost:7070/api/items`;
      // const response = await axios.get(`http://localhost:7070/api/items?categoryId=${categoryId}&offset=${offset}&q=${actualSearch}`)

      if(actualSearch === ''){
        if(activeCategory === 0){
          try{
            const response = await axios.get('http://localhost:7070/api/items');
            setProducts(response.data);

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
  
            if(response.data.length < 6){
              setMoreButtonVisible(false)
            } else{
              setMoreButtonVisible(true)
            }
            console.log(response.data);
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
  
              if(response.data.length < 6){
                setMoreButtonVisible(false)
              } else{
                setMoreButtonVisible(true)
              }
              console.log(response.data);
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
    setActiveCategory(categoryId)
    setOffset(6);
    if(!(products.length < 6)){
      setMoreButtonVisible(true)
    }
  };

  const moreButtonClickHandler = async () => {
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

    } catch(error){
      console.log(error)
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
      console.log(response)
    } catch(error){
      console.log(error);
    }
  };
  
  const inputChangeHandler = (e) => {
    setFormData(e.target.value);
  };

  return (
  <>
      {/* PRELOADER для категорий поищи другой лодер, может горизонтальный какой-нибудь <section className='catalog'>
      <h2 className='text-center'>Каталог</h2>
      <div className='preloader'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section> */}

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
            </ul>
            <div className="row">
              {products.map((product) => {
                return(
                  <div className='col-4' key={product.id}>
                    <div className="card catalog-item-card">
                      <img src={product.images[0]}
                      className="card-img-top img-fluid" alt={product.title} />
                      <div className="card-body">
                        <p className="card-text">{product.title}</p>
                        <p className="card-text">{product.price}</p>
                        <Link to={`/products/${product.id}`} className="btn btn-outline-primary">Заказать</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
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
