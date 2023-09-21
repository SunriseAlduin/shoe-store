import React from 'react'
import banner from '../img/banner.jpg'
import TopSales from './TopSales'
import Catalog from './Catalog'
import Banner from './Banner'

export default function MainPage() {
  return (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          <Banner />
          <TopSales />
          <Catalog />
        </div>
      </div>
    </main>
  )
}
