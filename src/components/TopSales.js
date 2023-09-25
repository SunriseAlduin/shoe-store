import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TopSales() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:7070/api/top-sales');
        if(response.data.length === 0) {
          setLoading(false);
          setProducts(null);
        } else {
          console.log(response)
          setProducts(response.data);
          setLoading(false);
        };
      } catch(error) {
        setError(error);
        setLoading(false);
      };
    }

    fetchData();
  }, []);

  if(loading) {
    return (
      <div className='preloader'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  };

  if(error) {
    return (
      <p>Error: {error.message}</p>
    );
  };

  if(products === null) {
    return null;
  }

  return (



    <section className="top-sales">
    <h2 className="text-center">Хиты продаж</h2>
    <div className="row">
      {products.map((product) => {
        return (
          <div className='col-4'>
            <div className='card'>
              <img src={product.images[0]}
                className='card-img-top img-fluid' alt={product.title} />
              <div className='card-body'>
                <p className='card-text'>{product.title}</p>
                <p className='card-text'>{product.price + ' руб.'}</p>
                <Link to={`/products/${product.id}`} className="btn btn-outline-primary">Заказать</Link>
              </div>  
            </div>
          </div>
        );
      })}
    </div>
  </section>
  )
}
