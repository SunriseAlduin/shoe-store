import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from './AppContext';

export default function Product() {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [amount, setAmount] = useState(1);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [errorProduct, setErrorProduct] = useState(null);
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    async function fetchProduct() {
      try{
        const response = await axios.get(`http://localhost:7070/api/items/${id}`);
        console.log(response.data);
        if(response.data.length === 0){
          setLoadingProduct(false);
          setProduct(null);
        } else{
          setProduct(response.data);
          setLoadingProduct(false);
        };
      } catch(error){
        setErrorProduct(error);
        setLoadingProduct(false);
      };
    };

    fetchProduct();
  }, [id])

  const sizeClickHandler = (e) => { 
    setActiveSize(e.target.innerText);

    if(activeSize === e.target.innerText){
      setActiveSize(null);
    }
  }

  const decrementClickHandler = () => {
    if(amount > 1){
      setAmount(prevAmount => prevAmount - 1);
    };
  };

  const incrementClickHandler = () => {
    if(amount < 10){
      setAmount(prevAmount => prevAmount + 1);
    };
  };

  const addToCartClickHandler = () => {
    console.log(product, activeSize, amount);

    dispatch({
      type: 'ADD_PRODUCT',
      payload: { 
        title: product.title,
        size: activeSize,
        amount: amount,
        price: product.price,
        total: amount * product.price,
        id: id,
      }
    });
  };

  if(loadingProduct) {
    return (
      <div className='preloader'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  };

  if(errorProduct) {
    return (
      <p>Error: {errorProduct.message}</p>
    );
  };

  if(product === null) {
    return null;
  }

  return (
    <main className='container'>
    <div className='row'>
    <div className='col'>
    <section className='catalog-item'>
      <h2 className='text-center'>{product.title}</h2>
      <div className='row'>
        <div className='col-5'>
          <img src={product.images[0]}
               className='img-fluid'
               alt={product.title} />
        </div>
        <div className='col-7'>
          <table className='table table-bordered'>
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product.sku || ''}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product.manufacturer || ''}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product.color || ''}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product.material || ''}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product.season || ''}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product.reason || ''}</td>
              </tr>
            </tbody>
          </table>
          <div className='text-center'>
            <p>Выберите размер: {product.sizes.map((size) => {
              if(size.available){
                return (<span className={`catalog-item-size ${size.size === activeSize ? `selected` : ``}`} onClick={(e) => sizeClickHandler(e)} key={size.size}>{size.size}</span>)
              };
            })}
            </p>

            {(product.sizes.length !== 0 && activeSize) ?
            <>         
              <p>Количество: <span className="btn-group btn-group-sm pl-2">
                <button className="btn btn-secondary" onClick={decrementClickHandler}>-</button>
                <span className="btn btn-outline-primary">{amount}</span>
                <button className="btn btn-secondary" onClick={incrementClickHandler}>+</button>
                </span>
              </p>
              <Link to={`/cart`} className='btn btn-danger btn-block btn-lg' onClick={() => addToCartClickHandler()}>В корзину</Link> 
            </> 
          : null}
          </div>

        </div>
      </div>
    </section>
    </div>
    </div>
    </main>
  )
}
