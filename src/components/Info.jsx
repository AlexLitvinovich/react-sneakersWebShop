import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'
function Info({ image, tittle, description }) {
  const { setIsOpened } = useContext(AppContext)
  return (
    <div className="emptyBox d-flex align-center justify-center">
      <img width={155} height={155} src={image} />
      <h3>{tittle}</h3>
      <p>{description}</p>
      <button className="greenBtn" onClick={() => setIsOpened(false)}>
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
