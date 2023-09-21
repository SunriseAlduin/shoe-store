import React from 'react'
import myer from '../img/products/sandals_myer.jpg'
import keyra from '../img/products/sandals_keira.jpg'
import supers from '../img/products/superhero_sneakers.jpg'

export default function TopSales() {
  return (
    // PRELOADER <section className='top-sales'>
    //   <h2 className='text-center'>Хиты продаж</h2>
    //   <div className='preloader'>
    //     <span></span>
    //     <span></span>
    //     <span></span>
    //     <span></span>
    //   </div>
    // </section>

    <section className="top-sales">
    <h2 className="text-center">Хиты продаж</h2>
    <div className="row">
      <div className="col-4">
        <div className="card">
          <img src={myer}
            className="card-img-top img-fluid" alt="Босоножки 'MYER'" />
          <div className="card-body">
            <p className="card-text">Босоножки 'MYER'</p>
            <p className="card-text">34 000 руб.</p>
            <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <img src={keyra}
            className="card-img-top img-fluid" alt="Босоножки 'Keira'" />
          <div className="card-body">
            <p className="card-text">Босоножки 'Keira'</p>
            <p className="card-text">7 600 руб.</p>
            <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <img src={supers}
            className="card-img-top img-fluid" alt="Супергеройские кеды" />
          <div className="card-body">
            <p className="card-text">Супергеройские кеды</p>
            <p className="card-text">1 400 руб.</p>
            <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
