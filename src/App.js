import { Route, Routes } from 'react-router-dom'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Home from './pages/Home.jsx'

import Order from './pages/Order.jsx'
import { useEffect, useState } from 'react'
import React from 'react'

import axios from 'axios'
import Favorites from './pages/Favorites'
const arr = [
  {
    tittle: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12554,
    imageURL: '/img/image 5-1.jpg',
  },
  {
    tittle: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12554,
    imageURL: '/img/image 5-1.jpg',
  },
  {
    tittle: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 15454,
    imageURL: '/img/image 5-1.jpg',
  },
  {
    tittle: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12004,
    imageURL: '/img/image 5-1.jpg',
  },
]
export const AppContext = React.createContext()

function App() {
  const [isOpened, setIsOpened] = useState(false)

  const [items, setItems] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favItems, setFavItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      try {
        const [fetchItem, fetchCart, fetchFav, fetchOrder] = await Promise.all([
          axios.get(
            'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/items'
          ),
          axios.get(
            'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/cart'
          ),
          axios.get(
            'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/favorites'
          ),
          axios.get(
            'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/orders'
          ),
        ])
        setIsLoading(false)

        setCartItems(fetchCart.data)
        setFavItems(fetchFav.data)
        setOrderItems(fetchOrder.data)
        setItems(fetchItem.data)
      } catch (error) {
        console.error(error)
        alert('Error request')
      }
    }

    fetchData()
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
    console.log('render')
  }
  const onRemoveItem = (id) => {
    axios.delete(
      `https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/cart/${id}`
    )
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }
  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.num) === Number(obj.num))) {
        axios.delete(
          `https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/cart/${obj.id}`
        )
        setCartItems((prev) =>
          prev.filter((item) => Number(item.num) !== Number(obj.num))
        )
      } else {
        const { data } = await axios.post(
          'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/cart',
          obj
        )
        setCartItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const handlerFavorite = async (obj) => {
    try {
      if (favItems.find((favObj) => Number(favObj.num) === Number(obj.num))) {
        axios.delete(
          `https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/favorites/${obj.id}`
        )
        setFavItems((prev) =>
          prev.filter((item) => Number(item.num) !== Number(obj.num))
        )
      } else {
        const { data } = await axios.post(
          'https://6316398f5b85ba9b11f2c841.mockapi.io/dbOfSneakers/favorites',
          obj
        )
        setFavItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const isItemFavorited = (num) => {
    return favItems.some((item) => Number(item.num) === Number(num))
  }

  const isItemAdded = (num) => {
    return cartItems.some((item) => Number(item.num) === Number(num))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favItems,
        orderItems,
        isItemAdded,
        setIsOpened,
        setCartItems,
        isItemFavorited,
      }}
    >
      <div className="wrapper clear">
        {isOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setIsOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setIsOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                handlerFavorite={handlerFavorite}
                onAddToCart={onAddToCart}
                setSearchValue={setSearchValue}
                onChangeSearchValue={onChangeSearchValue}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites handlerFavorite={handlerFavorite} />}
          />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
