import React from 'react';
import s from './styles.module.css'
import avatar from '../../../assets/img/avatar.png'
import Button from "../../../component/button";
import {ReactComponent as TgIcon} from "../../../assets/svg/tg.svg";

const Author = () => {
    return (
        <div className={s.main}>
            <div className={s.main_top}>
                <div className={s.main_top_left}>
                    <p className={s.desc}>Автор и тренер курса</p>
                    <p className={s.name}>Александр Зорас</p>

                    <div className={s.ul}>
                        <p>Знаком с покером более 15 лет</p>
                        <p>Сыграл первые раздачи в онлайне 10 лет назад</p>
                        <p>За время профессиональной карьеры сменил несколько дисциплин. Последняя - Spin`n`Go</p>
                    </div>

                    <p className={s.sub_desc}>Более двух лет занимался с начинающими игроками низких лимитов, сейчас -
                        руководитель направления образования в команде. Накопленный им за годы игры и обучения опыт в
                        соавторстве с другими тренерами команды лежит в основе курса Beginner для игроков с нулевым
                        уровнем понимания стратегии.</p>
                </div>
                <img src={avatar} className={s.avatar} alt="avatar"/>
            </div>

            <div className={s.main_bottom}>
                <h2 className={s.title}>Начать учиться можно <br/> без регистрации</h2>
                <p className={s.sub_title}>Просто переходи по ссылке в телеграм бот и получи доступ к первым 3 урокам.
                    Как только успешно завершишь по ним практику, сможешь пройти дальше. И да, еще раз, курс полностью
                    бесплатный</p>

                <Button className={s.btn}>
                    <div className={s.btn_content}>
                        <TgIcon/>
                        <p>Начать учиться</p>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default Author;
