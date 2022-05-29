import {instance} from './api';
import {CardsParamsType} from '../bll/cards/cards-reducer';
import axios from 'axios';

//доработать типизацию
export const cardsAPI = {
    getCards(params: CardsParamsType) {
        return instance.get<CardsResponseType>('cards/card', {params})
            .then(res => res.data);
    },
    addCard(card: NewCardType) {
        return instance.post<CardsResponseType>('cards/card', card);
    },
    deleteCard(cardId: string) {
        return instance.delete<{}>(`cards/card?id=${cardId}`);
    },
    updateCard(card: UpdateCardModelType) {
        return instance.put<CardsResponseType>(`cards/card`, card);
    },
    updateRate(payload: RateType) {
        return instance.put<RateResponseType>(`cards/grade`, payload)
            .then(res => res.data.updatedGrade);
    },
    sendCardAnswerImage(formData: any) {
        return axios.post('https://dry-forest-56016.herokuapp.com/file', formData);
    },
    getCardAnswerImage () {
        return axios.get('https://dry-forest-56016.herokuapp.com/file', {responseType: 'blob'})
    },
};


//types
//что приходит
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    packName: string
}

export type CardType = {
    answer: string
    question: string
    answerImg?: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type UpdateCardModelType = {
    card: {
        answer: string
        question: string
        answerImg?: string
        _id: string
    }
}

//что отправить на бек
export type NewCardType = {
    card: {
        cardsPack_id: string
        answer?: string
        question?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}

export type RateType = {
    grade: number
    card_id: string
}

export type RateResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}

export type UpdatedCard = {
    card: {
        _id: string
        question: string
        comments: string
    }
}

export type GetCardType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    answerImg?: string
    min?: number //grade
    max?: number //grade
    sortCards?: string
    page?: number
    pageCount?: number
}