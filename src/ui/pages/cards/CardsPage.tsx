import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector, useDebounce } from '../../../bll/hooks';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../../routes/RoutesApp';
import { Paginator } from '../../common/Paginator/Paginator';
import {
  addCardTC,
  cardsActions,
  getCardsByPage,
  getCardsTC,
} from '../../../bll/cards/cards-reducer';
import style from './CardsPage.module.scss';
import paperStyle from '../../common/styles/classes.module.scss';
import { Skeleton } from '../../common/Skeleton/Skeleton';
import { InputTextSecondary } from '../../common/InputTextSecondary/InputTextSecondary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { Radio } from '../../common/Radio/Radio';
import { Card } from './Card/Card';
import { ButtonSecondary } from '../../common/ButtonSecondary/ButtonSecondary';
import { InputText } from '../../common/InputText/InputText';
import Modal from '../../common/Modal/Modal';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons/faArrowLeftLong';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { NothingFound } from '../../common/NothingFound/NothingFound';
import { Button } from '../../common/Button/Button';
import { Textarea } from '../../common/Textarea/Textarea';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { log } from 'util';
import { onChangeAttachAnswerImageCreator } from '../../../assets/utils';

enum SEARCH_BY_TYPES {
  BY_QUESTIONS = 'Questions',
  BY_ANSWERS = 'Answers'
}

enum UPLOAD_METHODS {
  AS_FILE = 'As file'
}

export const CardsPage = () => {
  const cards = useAppSelector(state => state.cards.cards);
  const userId = useAppSelector(state => state.profile.user._id);
  const { packUserId, cardsTotalCount } = useAppSelector(state => state.cards);
  const params = useAppSelector(state => state.cards.params);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const isAppFetching = useAppSelector(state => state.app.isAppFetching);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [cardQuestion, setCardQuestion] = useState<string>('');
  console.log(cardQuestion);
  const [cardAnswer, setCardAnswer] = useState<string>('');
  const [answerImg64, setAnswerImg64] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //signs for cards searching
  const singsSearch = [SEARCH_BY_TYPES.BY_QUESTIONS, SEARCH_BY_TYPES.BY_ANSWERS];
  const [singCardsSearch, setSingCardsSearch] = useState<SEARCH_BY_TYPES>(singsSearch[0]);

  //saving of searching value
  const [searchingValue, setSearchingValue] = useState<string>('');

  const onChangeRadioHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as SEARCH_BY_TYPES;
    if (value === SEARCH_BY_TYPES.BY_QUESTIONS) {
      dispatch(cardsActions.setQuestionSearch(searchingValue));
      dispatch(cardsActions.setAnswerSearch(''));
    } else {
      dispatch(cardsActions.setQuestionSearch(''));
      dispatch(cardsActions.setAnswerSearch(searchingValue));
    }
    setSingCardsSearch(value);
    dispatch(cardsActions.setSortCards(''));
  }, [dispatch, searchingValue]);

  //data from URL
  const urlParams = useParams<'*'>() as { '*': string };
  const cardsPack_id = urlParams['*'].split('/')[0];
  const packName = urlParams['*'].split('/')[1];

  //for rerender
  useEffect(() => {
    dispatch(getCardsTC(cardsPack_id));
  }, [params.sortCards, params.cardAnswer, params.cardQuestion, params.pageCount]);

  useEffect(() => {
    return () => {
      dispatch(cardsActions.setQuestionSearch(''));
      dispatch(cardsActions.setAnswerSearch(''));
    };
  }, []);
  //functionality for adding cards
  const addCardHandler = useCallback(() => {
  debugger
    dispatch(addCardTC({
      card: {
        cardsPack_id,
        question: cardQuestion,
        answer: cardAnswer,
        answerImg: answerImg64,
      },
    }));
    setModalActive(false);
    setCardQuestion('');
    setCardAnswer('');
    setAnswerImg64('');
  }, [dispatch, cardQuestion, cardAnswer, answerImg64, cardsPack_id]);

  //functionality for sorting
  const [sortQuestion, setSortQuestion] = useState<boolean>(false);
  const [sortAnswer, setSortAnswer] = useState<boolean>(false);
  const [sortUpdate, setSortUpdate] = useState<boolean>(false);
  const [sortGrade, setSortGrade] = useState<boolean>(false);

  const [questionDir, setQuestionDir] = useState(faSortUp);
  const [answerDir, setAnswerDir] = useState(faSortUp);
  const [updatedDir, setUpdatedDir] = useState(faSortUp);
  const [gradeDir, setGradeDir] = useState(faSortUp);
  type dirType = typeof faSortUp;

  const sortHandler = useCallback((e: React.MouseEvent<HTMLTableHeaderCellElement>,
                                   title: string,
                                   setHandler: (dir: dirType) => void,
                                   setSortHandler: (sortDir: boolean) => void,
                                   sortDir: boolean) => {
    if (e.currentTarget.dataset) {
      const trigger = e.currentTarget.dataset.sort;
      dispatch(cardsActions.setSortCards(`${Number(sortDir)}${trigger}`));
      if (trigger === title && sortDir) {
        setHandler(faSortUp);
      } else if (trigger === title && !sortDir) {
        setHandler(faSortDown);
      }
    }
    setSortHandler(!sortDir);
  }, [dispatch]);

  //pagination handlers
  const onChangePage = useCallback((pageNumber: number) => {
    dispatch(getCardsByPage(pageNumber, cardsPack_id));
  }, [dispatch, cardsPack_id]);
  const onChangePageSize = useCallback((pageCount: number) => {
    dispatch(cardsActions.setCardsPageCount(pageCount));
  }, [dispatch]);

  //debounced live search
  const innerDebounceCallback = useCallback((value: string) => {
    if (singCardsSearch === SEARCH_BY_TYPES.BY_QUESTIONS) {
      dispatch(cardsActions.setQuestionSearch(value));
    } else {
      dispatch(cardsActions.setAnswerSearch(value));
    }
  }, [dispatch]);
  const debouncedSearch = useDebounce(innerDebounceCallback, 800);
  const onSearchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchingValue(e.currentTarget.value);
    debouncedSearch(value);
  }, []);


const onChangeAttachAnswerImage = useCallback((target: HTMLInputElement) => onChangeAttachAnswerImageCreator(setAnswerImg64, target), [])

  //value for showing in block 'nothing found'
  const whatSearch = singCardsSearch === SEARCH_BY_TYPES.BY_QUESTIONS ? params.cardQuestion : params.cardAnswer;

  //value for identification
  const isMyPack = userId === packUserId;

  //for redirect if is not logged in
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return (
    <>
      <div className={style.cardsWrapper}>
        <div className={`${style.cardsContainer} ${paperStyle.shadowPaper}`}
             data-z='paper'>
          {isAppFetching && <Skeleton />}
          <div className={style.titleBlock}>
            <FontAwesomeIcon className={style.backIcon}
                             icon={faArrowLeftLong}
                             onClick={() => navigate(-1)} />
            <span>{packName}</span>
          </div>
          <div className={style.settingsBlock}>
            <div className={style.radioBlock}>
              <h4>Search cards by:</h4>
              <Radio
                name={'radio'}
                options={singsSearch}
                value={singCardsSearch}
                onChange={onChangeRadioHandler}
              />
            </div>
            <div className={style.inputBlock}>
              <InputTextSecondary type='text'
                                  value={searchingValue}
                                  onChange={onSearchHandler}
                                  placeholder={'Search'}
                                  className={style.input} />
            </div>
            {isMyPack && <div className={style.button}>
              <ButtonSecondary className={style.primaryButton}
                               onClick={() => setModalActive(true)}>
                Add card
              </ButtonSecondary>
            </div>}
          </div>
          <div className={style.tableBlock}>
            <table>
              <thead>
              <tr>
                <th
                  onClick={(e) => sortHandler(e, 'question', setQuestionDir, setSortQuestion, sortQuestion)}
                  data-sort='question'
                  className={style.questionCol}>
                  Question &ensp;
                  <FontAwesomeIcon icon={questionDir} />
                </th>
                <th
                  onClick={(e) => sortHandler(e, 'answer', setAnswerDir, setSortAnswer, sortAnswer)}
                  data-sort='answer'
                  className={style.answerCol}>
                  Answer &ensp;
                  <FontAwesomeIcon icon={answerDir} />
                </th>
                <th
                  onClick={(e) => sortHandler(e, 'updated', setUpdatedDir, setSortUpdate, sortUpdate)}
                  data-sort='updated'
                  className={style.updatedCol}>
                  Last Updated &ensp;
                  <FontAwesomeIcon icon={updatedDir} />
                </th>
                <th
                  onClick={(e) => sortHandler(e, 'grade', setGradeDir, setSortGrade, sortGrade)}
                  data-sort='grade'
                  className={style.gradeCol}>
                  Grade &ensp;
                  <FontAwesomeIcon icon={gradeDir} />
                </th>
                {isMyPack &&
                <th className={style.actions}>
                  Actions
                </th>}
              </tr>
              </thead>
              <tbody>
              {cards.length === 0 && !isAppFetching ?
                <NothingFound value={whatSearch} /> :
                cards.map(card => <Card key={card._id} card={card}
                                        cardsPack_id={cardsPack_id}
                                        userPackId={packUserId}
                                        // onChangeAttachAnswerImage={onChangeAttachAnswerImage}
                                        answerImg64={answerImg64}
                />)}
              </tbody>
            </table>
          </div>
          <div className={style.paginationBlock}>
            <Paginator portionSize={5}
                       currentPage={params.page}
                       pageSize={params.pageCount}
                       totalItemsCount={cardsTotalCount}
                       onChangePage={onChangePage}
                       onChangePageSize={onChangePageSize} />

          </div>
        </div>
      </div>
      <div className={style.modalBlock}>
        <Modal active={modalActive}
               setActive={setModalActive}>
          <h4 className={style.modalTitle}>Add card</h4>
          <p>Question</p>
          <InputText value={cardQuestion}
                     onChangeText={setCardQuestion}
                     className={style.questionInputBlock} />
          <p>Answer</p>
          <Textarea value={cardAnswer}
                    onChangeText={setCardAnswer}
                    className={style.answerTextareaBlock} />
          <div className={style.uploadImageButton}>
            <input ref={inputFileRef}
                   type='file'
                   accept='.image/jpeg, .png, .jpg'
                   onChange={(e) => onChangeAttachAnswerImage(e.target)}
                   style={{ display: 'none' }} />
            <ButtonSecondary className={style.downloadButton}
                             onClick={() => inputFileRef.current && inputFileRef.current.click()}>
              <span>Attach Image </span>
              <FontAwesomeIcon icon={faDownload} />
            </ButtonSecondary>
          </div>
          <div>
            {answerImg64.length > 0 &&
            <img src={answerImg64} alt='answerImg64 preview' width={'200px'} />}
          </div>
          <Button onClick={addCardHandler}>Create card</Button>
        </Modal>
      </div>
    </>
  );
};
