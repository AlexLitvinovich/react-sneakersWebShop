import styles from './Card.module.scss'
import { useContext, useState } from 'react'
import Favorites from '../../pages/Favorites'
import ContentLoader from 'react-content-loader'
import { AppContext } from '../../App'

function Card({
  id,
  num,
  onFavoriteClick,
  price,
  imageURL,
  tittle,
  onPlusClick,
  favorited = false,

  isLoading = false,
}) {
  const { isItemAdded, isItemFavorited } = useContext(AppContext)

  const handleClickPlus = () => {
    onPlusClick({ id, num, tittle, price, imageURL })
    //console.log(id, isItemAdded(num))
  }
  // const [isAddFavorite, setIsFavorite] = useState(favorited)

  const fav = () => {
    //setIsFavorite(!isAddFavorite)
    onFavoriteClick({ num, tittle, price, imageURL, id })
  }

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="15" ry="15" width="155" height="155" />
          <rect x="0" y="169" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="95" rx="5" ry="5" width="85" height="15" />
          <rect x="0" y="115" rx="5" ry="5" width="85" height="15" />
          <rect x="0" y="70" rx="5" ry="5" width="155" height="15" />
          <rect x="118" y="97" rx="10" ry="10" width="35" height="35" />
        </ContentLoader>
      ) : (
        <>
          <img
            onClick={fav}
            width={33}
            height={33}
            src={isItemFavorited(num) ? '/img/heard1.svg' : '/img/heard0.svg'}
            alt="liked"
          />
          <img width={130} height={110} src={imageURL} alt="" />
          <p>{tittle}</p>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column mr-30">
              <span>ЦЕНА:</span>
              <b>{price} rub</b>
            </div>

            <img
              onClick={handleClickPlus}
              width={17}
              height={17}
              src={isItemAdded(num) ? '/img/check.svg' : '/img/Vector.svg'}
              alt=""
              className={styles.add}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Card
