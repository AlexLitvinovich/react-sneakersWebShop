import Card from '../components/Card'
import { AppContext } from '../App'
import React from 'react'
import { useContext } from 'react'

function Favorites({ handlerFavorite }) {
  const { favItems } = useContext(AppContext)
  return (
    <div className="content p-40 ">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">Избраные товары</h1>
      </div>

      <div className="content-container d-flex  flex-wrap">
        {favItems.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavoriteClick={(obj) => handlerFavorite(obj)}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
