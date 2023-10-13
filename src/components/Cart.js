import React, { useState } from 'react'
import banner from '../img/banner.jpg'
import { useAppContext } from './AppContext'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Cart() {
  const { state, dispatch } = useAppContext();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false)

  const isFormValid = phone !== '' && address !== '' && agreement;

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAgreementChange = (e) => {
    setAgreement(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function postOrder() {
      setLoader(true)
      const url = 'http://localhost:7070/api/order';
      const requestData = {
        owner: {
          phone,
          address,
        },
        items: state.products.map((item) => {
          return {
            id: +item.id,
            price: item.price,
            count: item.amount,
          };
        }),
      };

      try{
        const response = await axios.post(url, JSON.stringify(requestData), {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(response.status > 199 && response.status < 300) {
          dispatch({
            type: 'REFRESH_CART'
          });
          setOrderSuccess(true);
          setLoader(false)
        }
      } catch(error){
        setError(error)
      }
    };

    postOrder();
    setPhone('');
    setAddress('')
    setAgreement(false);
  };

  const style = {
    maxWidth: '30rem',
    margin: '0 auto',
  }

  let totalPrice = 0;

  const deleteButtonHandler = (id) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: {
        id: id,
      },
    });
  };


  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>

                {state.products.map((item, index) => {

                  totalPrice = totalPrice + item.total;
                  return (
                    // :)
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td><Link to={`/products/${item.id}`}>{item.title}</Link></td>
                      <td>{item.size}</td>
                      <td>{item.amount}</td>
                      <td>{item.price} руб.</td>
                      <td>{item.total} руб.</td>
                      <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteButtonHandler(item.id)}>Удалить</button></td>
                    </tr>
                  );
                })}

                {totalPrice > 0 ?   <tr>
                                      <td colSpan="5" className="text-right">Общая стоимость</td>
                                      <td>{totalPrice} руб.</td>
                                    </tr> 
                                  : null}

              </tbody>
            </table>
          </section>
          {
            state.products.length > 0 ? 
            <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={style}>
              <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" 
                                                  placeholder="Ваш телефон" 
                                                  value={phone}
                                                  onChange={(e) => handlePhoneChange(e)}
                                                  required/>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" 
                                                  placeholder="Адрес доставки" 
                                                  value={address}
                                                  onChange={(e) => handleAddressChange(e)}
                                                  required />
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement"           
                                                                      checked={agreement}
                                                                      onChange={(e) => handleAgreementChange(e)}
                                                                      required />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary" disabled={!isFormValid}>Оформить</button>
              </form>
            </div>
          </section>
          : null
          }

          {orderSuccess ? <p>Заказ успешно отправлен!</p> : null}
          {error ? <p>Error: {error.message}</p> : null}
          {loader ?  <div className='preloader'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      : null }
        </div>
      </div>
    </main>
  )
}
