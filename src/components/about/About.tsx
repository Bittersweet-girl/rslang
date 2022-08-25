import React from 'react';
import './about.scss';

export default function About() {
  return (
    <section className="about">
      <div className="about-text">
        <h2 className="about__title">Наша команда</h2>
        <p className="about__text">
          Наша команда разработчиков постаралась сделать все возможное
          чтобы Вам было просто и интересно изучать английский.
          Процесс совершенствования бесконечный, поэтому мы будем работать
          и дальше над улучшением нашего приложения,
          как и вы над улучшением вашего английского языка!
        </p>
      </div>
      <div className="about-cards">
        <div className="about-item">
          <img src="./assets/img/ava-Nata.jpg" alt="number1" className="about-item__img" />
          <div className="about-item__hello">
            <img src="./assets/svg/hello-green.svg" alt="hello" />
          </div>
          <div className="about-item__plant">
            <img src="./assets/svg/plant-orange.svg" alt="plant" />
          </div>
          <h3 className="about-item__title">Наталья Сахно</h3>
          <p className="about-item__text">
            Тим-лид и идейный вдохновитель.
            Собрала команду и сделала одноименную страницу.
            Создала серию игры и держала руку на пульсе на протяжении всей разработки.
          </p>
        </div>
        <div className="about-item">
          <img src="./assets/img/ava-Jenya.jpg" alt="number2" className="about-item__img" />
          <div className="about-item__hello">
            <img src="./assets/svg/hello-pink.svg" alt="hello" />
          </div>
          <div className="about-item__plant">
            <img src="./assets/svg/plant-green.svg" alt="plant" />
          </div>
          <h3 className="about-item__title">Евгений Цаприлов</h3>
          <p className="about-item__text">
            Наш тех-лид и реактивный человек. Настроил бекэнд
            и внес огромный вклад в создание приложения.
            Создатель архитектуры приложения и серии игр.
          </p>
        </div>
        <div className="about-item">
          <img src="./assets/img/ava-Ira.jpg" alt="number3" className="about-item__img" />
          <div className="about-item__hello">
            <img src="./assets/svg/hello-orange.svg" alt="hello" />
          </div>
          <div className="about-item__plant">
            <img src="./assets/svg/plant-pink.svg" alt="plant" />
          </div>
          <h3 className="about-item__title">Ирина Удалова</h3>
          <p className="about-item__text">
            Предложила дизайн приложения,
            создала главную страницу и описание приложения.
            Предложила и создала игру на уровень знания английского языка.
          </p>
        </div>
      </div>
    </section>
  );
}
