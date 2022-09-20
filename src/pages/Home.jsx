import React from 'react'
import { useContext } from 'react'
import Card from '../components/Card'
import { AppContext } from '../App'

function Home({
  searchValue,
  items,
  onAddToCart,
  handlerFavorite,
  setSearchValue,
  onChangeSearchValue,
  isLoading,
}) {
  const { isItemAdded } = useContext(AppContext)
  const renderItem = () => {
    const filtredItem = items.filter((item) =>
      item.tittle.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? [...Array(8)] : filtredItem).map((item, index) => (
      <Card
        key={index}
        onFavoriteClick={(obj) => handlerFavorite(obj)}
        onPlusClick={(obj) => onAddToCart(obj)}
        isLoading={isLoading}
        {...item}
      />
    ))
  }
  return (
    <div className="content p-40 ">
      <div className="d-flex align-center mb-40 justify-between">
        <h1 className="">
          {searchValue ? `Поиск по: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <div className="search-block d-flex align-center">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue('')
              }}
              className="clear cu-p"
              src="/img/bnt-remove.svg"
            />
          )}
          <input
            onChange={onChangeSearchValue}
            value={searchValue}
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="content-container d-flex  flex-wrap">{renderItem()}</div>
    </div>
  )
}

export default Home
