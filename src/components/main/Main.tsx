import React from 'react';
import './main.scss';

export default function Main() {
  return (
    <main className="main">
      <div className="main-content">
        <div className="main-top">
          <div className="main-top-text">
            <h1 className="main-top__title">Изучай английский весело!</h1>
            <p className="main-top__text">
              Изучать английский можно и без скучной
              зубрежки! Узнавай, играй, запоминай и следи
              за своими достижениями!
            </p>
          </div>
          <div className="main-top-img" />
        </div>
        <div className="main-cards">
          <div className="main-cards-text">
            <h2 className="main-cards__title">Учиться с RS Lang это просто!</h2>
            <p className="main-cards__text">
              Самое сложное - начать. Следуй простым шагам и все обязательно получиться!
            </p>
          </div>
          <div className="main-cards-cards">
            <div className="main-cards-item">
              <img src="./assets/plant1.svg" alt="number1" className="main-cards-item__img" />
              <h3 className="main-cards-item__title">Узнавай!</h3>
              <p className="main-cards-item__text">
                Начни с простого, первого раздела учебника и постепенно двигайся вперед,
                наращивая сложность. Отмечай незнакомые слова чтобы потом их тренировать.
              </p>
            </div>
            <div className="main-cards-item">
              <img src="./assets/plant2.svg" alt="number2" className="main-cards-item__img" />
              <h3 className="main-cards-item__title">Играй!</h3>
              <p className="main-cards-item__text">
                Английский - это весело! Запоминай новые слова играя!
                Выбери одну из предложенных игр и тренируйся! Вперед!
              </p>
            </div>
            <div className="main-cards-item">
              <img src="./assets/plant3.svg" alt="number3" className="main-cards-item__img" />
              <h3 className="main-cards-item__title">Следи!</h3>
              <p className="main-cards-item__text">
                Зарегистрируйся и следи за своим ежедневным прогрессом!
                И не забывай себя хвалить за каждое маленькое достижение!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
