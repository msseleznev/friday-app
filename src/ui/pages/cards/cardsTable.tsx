import s from 'cardsTable.module.scss'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCards } from 'src/ui/pages/cards/cards-reducer';

export const Cards = () => {
const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCardsTC())
  }, [])

return (
  <div className={s.cardsContainer}>

  </div>

)
}