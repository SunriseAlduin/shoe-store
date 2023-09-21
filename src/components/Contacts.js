import React from 'react'
import Banner from './Banner'

export default function Contacts() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="top-sales">
            <h2 className="text-center">Контакты</h2>
            <p>Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17, бизнес-центр W Plaza.</p>
            <h5 className="text-center">Координаты для связи:</h5>
            <p>Телефон: <a href="tel:+7-922-929-67-99">+7 922 929 67 99</a> (ежедневно: с 09-00 до 21-00)</p>
            <p>Email: <a href="mailto:nikitagudin.ads@gmail.com">nikitagudin.ads@gmail.com</a></p>
          </section>
        </div>
      </div>
    </main>
  )
}
