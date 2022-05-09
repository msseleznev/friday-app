import { instance } from '../../../api/api';
import { CardsParamsType } from './cards-reducer';

export const cardsAPI = {
  getCards(params: Partial<CardsParamsType>) {
    return instance.get<CardsResponseType>('cards/card', { params })
      .then(res => res.data);
  },
  addCard(card: NewCardType) {
    return instance.post<newCardResponseType>('cards/card', { card });
  },
  deleteCard(cardId: string) {
    return instance.delete<{}>(`cards/card?id=${cardId}`);
  },
  updateCard(card: ) {
    return instance.put<newCardResponseType>(`cards/card`, card);
  },

};

//types
//что приходит
export type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: null
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

//что отправить на бек
export type NewCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}
export type Updated
card: {
_id: "5eb6a2f72f849402d46c6ac7"
question: "new question" // не обязательно
... // не обязательно
comments: "new comments" // не обязателен
}