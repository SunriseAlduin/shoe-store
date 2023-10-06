import React, { useEffect } from 'react'
import banner from '../img/banner.jpg'
import { useAppContext } from './AppContext'
import { Link } from 'react-router-dom';

//Исправить ссылки на страницы товаров

export default function Cart() {
  const { state, dispatch } = useAppContext();


  const style = {
    maxWidth: '30rem',
    margin: '0 auto',
  }

  let totalPrice = 0;

  const deleteButtonHandler = () => {
    // вот это надо сделать и плюсом избежать появления дублей одного товара
    // dispatch({
    //   type: 'DELETE_PRODUCT',
    //   payload: {}
    // })
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
                      <td><button className="btn btn-outline-danger btn-sm" onClick={deleteButtonHandler}>Удалить</button></td>
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
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={style}>
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон" />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки" />
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement" />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Оформить</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
