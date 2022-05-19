import {CardType} from '../../api/cardsApi';
import {LearnInitialStateType, learnReducer, setCards, setCurrentCard, setNewGrade} from './learnReducer';

let startState: LearnInitialStateType;

beforeEach(() => {
    startState = {
        cards: [] as CardType[],
        currentCard: {} as CardType,
    }
});

test('new cards array should be set at state', () => {
    const cards: CardType[] = [
        {
            _id: '1',
            answer: 'answer',
            cardsPack_id: '1',
            created: 'today',
            grade: 5,
            question: 'question',
            shots: 1,
            updated: 'today',
            user_id: '1'
        }
    ]
    const endState = learnReducer(startState, setCards(cards));
    expect(startState.cards).toStrictEqual([]);
    expect(endState.cards).toStrictEqual(cards)
});

test('new current card should be set at state', () => {
    const currentCard: CardType = {
        _id: '1',
        answer: 'answer',
        cardsPack_id: '1',
        created: 'today',
        grade: 5,
        question: 'question',
        shots: 1,
        updated: 'today',
        user_id: '1'
    };
    const endState = learnReducer(startState, setCurrentCard(currentCard));
    expect(startState.currentCard).toStrictEqual({});
    expect(endState.currentCard).toStrictEqual(currentCard)
});

test('new grade should be changed in correct card', () => {
const someStartState:LearnInitialStateType = {
    cards: [
        {
            _id: '1',
            answer: 'answer',
            cardsPack_id: '1',
            created: 'today',
            grade: 5,
            question: 'question',
            shots: 1,
            updated: 'today',
            user_id: '1'
        },
        {
            _id: '2',
            answer: 'answer',
            cardsPack_id: '1',
            created: 'today',
            grade: 5,
            question: 'question',
            shots: 1,
            updated: 'today',
            user_id: '1'
        },
        {
            _id: '3',
            answer: 'answer',
            cardsPack_id: '1',
            created: 'today',
            grade: 5,
            question: 'question',
            shots: 1,
            updated: 'today',
            user_id: '1'
        }
    ],
    currentCard: {
        _id: '2',
        answer: 'answer',
        cardsPack_id: '1',
        created: 'today',
        grade: 5,
        question: 'question',
        shots: 1,
        updated: 'today',
        user_id: '1'
    }
}
    const endState = learnReducer(someStartState, setNewGrade(2, '2'));
    expect(endState.cards[0].grade).toBe(5);
    expect(endState.cards[1].grade).toBe(2);
    expect(endState.cards[2].grade).toBe(5);

});
