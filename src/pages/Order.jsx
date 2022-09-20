import Card from '../components/Card'
import { AppContext } from '../App'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'

function Order() {
  const { favItems, orderItems } = useContext(AppContext)
  const renderItems = orderItems.reduce(
    (prev, item) => [...prev, ...item.items],
    []
  )
  console.log(renderItems)
  return (
    <div className="content p-40 ">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Ваши покупки</h1>
      </div>

      <div className="content-container d-flex  flex-wrap">
        {renderItems.map((item, index) => (
          <Card key={index} favorited={true} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Order
