/* eslint-disable no-confusing-arrow */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
import Words from '../words/Words';
import { IProduct } from '../../types';
import { PAGE_SPRINT, PAGE_AUDIO } from '../../constants';
// import useNavgation, { navigationReducer, initialState } from '../../hooks/useNavigationReducer';
import './dictionary.scss';
import useNavigation from '../../hooks/useNavigation';
import Loader from '../loader/Loader';
import PaginatedItems from '../pagination/Pagination';
import DictionaryMenu from '../dictionary-menu/DictionaryMenu';
import useDictionaryData from '../../hooks/useDictionaryData';

export default function Dictionary() {
  const { navigate } = useNavigation();
  const {
    group,
    changeGroup,
    wordsData,
    loading,
    hardWordsData,
    handleClick,
    diffCards,
    learnCards,
    hardCard,
    selectedCart,
    learnedCard,
    currentPage,
    setCurrentPage,
  } = useDictionaryData();
  let pageStatus = 'dictionary__cards';
  let gameBtnStatus = false;
  if (wordsData.filter((i: IProduct) => learnedCard.includes(i.id)).length >= 20) {
    pageStatus += ' dictionary__cards_done';
    gameBtnStatus = true;
  }
  if (group === 6) {
    pageStatus = 'dictionary__cards dictionary__cards_hard';
  }
  return (
    <div className="dictionary">
      <h1 className="dictionary__title">Учебник</h1>
      <h2 className="dictionary__sub-title">Выберите уровень сложности слов.</h2>
      <DictionaryMenu group={group} changeGroup={changeGroup} />
      { loading && <Loader />}
      <div className={pageStatus}>
        {group === 6 ? (hardWordsData.map((product: IProduct) => <Words product={product} key={product._id} isActive={product._id === selectedCart} handleClick={handleClick} isHard={!!hardCard.includes(product._id)} diffCards={diffCards} isLearn={!!learnedCard.includes(product.id)} learnCards={learnCards} />))
          : (wordsData.map((product: IProduct) => <Words product={product} key={product.id} isActive={product.id === selectedCart} handleClick={handleClick} isHard={!!hardCard.includes(product.id)} diffCards={diffCards} isLearn={!!learnedCard.includes(product.id)} learnCards={learnCards} />))}
      </div>
      {group === 6 ? '' : (
        <div className="paginate-wrapper">
          <PaginatedItems itemsPerPage={1} setPage={setCurrentPage} forcePage={currentPage} />
        </div>
      )}
      <div className="dictionary__games-container">
        {/* <span>Go to sprint</span> */}
        <button type="button" className="" disabled={gameBtnStatus} onClick={() => navigate(PAGE_AUDIO, { group })}>Аудиовызов</button>
        <button type="button" className="" disabled={gameBtnStatus} onClick={() => navigate(PAGE_SPRINT, { group })}>Спринт</button>
      </div>
    </div>
  );
}
