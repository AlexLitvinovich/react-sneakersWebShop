import 'macro-css'
import { useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'

function Header(props) {
  const { cartItems } = useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)
  return (
    <header className="d-flex justify-between mr-30 p-40">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img
            style={{ borderRadius: '20px' }}
            width={40}
            height={40}
            src="/img/logo.png"
          />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="header-right d-flex">
        <li className="mr-15 cu-p" onClick={props.onClickCart}>
          <img className="mr-5" width={14} height={14} src="./img/cart.svg" />
          <span>{totalPrice} rub</span>
        </li>
        <li>
          <Link to="favorites">
            <img
              className="cu-p mr-15 "
              width={14}
              height={14}
              src="./img/heard.svg"
            />
          </Link>
        </li>
        <li>
          <Link to="orders">
            <img width={14} height={14} src="./img/user.svg" />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
