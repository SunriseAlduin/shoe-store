import React from 'react'
import banner from '../img/banner.jpg'
import TopSales from './TopSales'
import Catalog from './Catalog'

export default function MainPage() {
  return (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          <div className='banner'>
            <img src={banner} className='img-fluid' alt='К весне готовы!' />
            <h2 className='banner-header'>К весне готовы!</h2>
          </div>
          <TopSales />
          <Catalog />
        </div>
      </div>
    </main>
  )
}
