import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import Info from './Info'

function Drawer({ onClose, items = [], onRemove }) {
  const { favItems, setCartItems, cartItems } = useContext(AppContext)
  const [isOrder, setIsOrder] = useState()
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  const delay = (ms) => {
    new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  const clickOrder = async () => {
    try {
      const { data } = await axios.post(
        'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/orders',
        {
          items: cartItems,
        }
      )

      setIsOrder(data.id)
      setIsOrderComplete(true)
      setCartItems([])
      for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index]
        await axios.delete(
          'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/cart/' +
            item.id
        )
        await delay(1000)
      }
    } catch (error) {
      alert('Lox don`t create order')
    }
  }

  return (
    <div className="overlay">
      <div className="drawer ">
        <div className="d-flex justify-between">
          <h2>Корзина</h2>
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/bnt-remove.svg"
          />
        </div>
        {items.length == 0 ? (
          <Info
            image={
              isOrderComplete ? '/img/OrderComplete.png' : '/img/emptyBox.png'
            }
            description={
              isOrderComplete
                ? `Ваш заказ #${isOrder} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            tittle={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
          />
        ) : (
          <>
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <img
                    className="mr-20"
                    width={70}
                    height={70}
                    src={obj.imageURL}
                  />
                  <div className="mr-20">
                    <p>{obj.tittle}</p>
                    <b>{obj.price}руб.</b>
                  </div>

                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/bnt-remove.svg"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock ">
              <ul>
                <li className="d-flex">
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice}руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>

              <button onClick={clickOrder} className="greenBtn">
                Оплатить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Drawer
