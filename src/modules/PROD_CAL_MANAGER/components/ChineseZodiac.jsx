import React from 'react';


import Snake from "../../../media/zodiac/snake-svgrepo-com.svg";
import Rabbit from "../../../media/zodiac/rabbit-shape-svgrepo-com.svg";
import Dragon from "../../../media/zodiac/tyrannosaurus-rex-silhouette-svgrepo-com.svg";
import Pig from "../../../media/zodiac/pig-side-view-silhouette-svgrepo-com.svg";
import Bull from "../../../media/zodiac/bull-silhouette-svgrepo-com.svg";
import Monkey from "../../../media/zodiac/monkey-svgrepo-com.svg";
import Dog from "../../../media/zodiac/running-dog-silhouette-svgrepo-com.svg";
import Horse from "../../../media/zodiac/horse-black-shape-svgrepo-com.svg";
import Rooster from "../../../media/zodiac/pigeon-bird-shape-svgrepo-com.svg";
import Goat from "../../../media/zodiac/gazelle-running-silhouette-svgrepo-com.svg";
import Tiger from "../../../media/zodiac/domestic-cat-shape-svgrepo-com.svg";
import Mouse from "../../../media/zodiac/mouse-svgrepo-com.svg";

import Owl from "../../../media/zodiac/owl-bird-shape-svgrepo-com.svg";




import { HOST_COMPONENT_ROOT } from '../../../CONFIG/config';

const ChineseZodiac = ({ year }) => {


    const zodiacAnimals = [
        'Rat',     // Мышь
        'Ox',      // Бык
        'Tiger',   // Тигр
        'Rabbit',  // Кролик
        'Dragon',  // Дракон
        'Snake',   // Змея
        'Horse',   // Лошадь
        'Goat',    // Коза
        'Monkey',  // Обезьяна
        'Rooster', // Петух
        'Dog',     // Собака
        'Pig'      // Свинья
    ];

    const getZodiacAnimal = (year) => {
        const animalIndex = (year - 4) % 12;
        return zodiacAnimals[animalIndex];
    };

    const zodiacAnimal = getZodiacAnimal(year);

    const getZodiacImage = (animal) => {
        switch (animal) {
            case 'Rat':
                return ( <img src={HOST_COMPONENT_ROOT + Mouse} title='Год крысы'/>);
            case 'Ox':
                return ( <img src={HOST_COMPONENT_ROOT + Bull} title='Год быка'/>);
            case 'Tiger':
                return ( <img src={HOST_COMPONENT_ROOT + Tiger} title='Год домашнего тигра'/>);
            case 'Rabbit':
                return ( <img src={HOST_COMPONENT_ROOT + Rabbit} title='Год кролика'/>);
            case 'Dragon':
                return ( <img src={HOST_COMPONENT_ROOT + Dragon} title='Год дракона'/>);
            case 'Snake':
                return ( <img src={HOST_COMPONENT_ROOT + Snake} title='Год змеи'/>);
            case 'Horse':
                return ( <img src={HOST_COMPONENT_ROOT + Horse} title='Год лошади'/>);
            case 'Goat':
                return ( <img src={HOST_COMPONENT_ROOT + Goat} title='Год козы'/>);
            case 'Monkey':
                return ( <img src={HOST_COMPONENT_ROOT + Monkey} title='Год обехьянки'/>);
            case 'Rooster':
                return ( <img src={HOST_COMPONENT_ROOT + Rooster} title='Год петушка'/>);
            case 'Dog':
                return ( <img src={HOST_COMPONENT_ROOT + Dog} title='Год собаки'/>);
            case 'Pig':
                return ( <img src={HOST_COMPONENT_ROOT + Pig} title='Год свиньи'/>);
            default:
                return ( <img src={HOST_COMPONENT_ROOT + Owl} title='Не тот год'/>);
        }
    };

    const zodiacImage = getZodiacImage(zodiacAnimal);

    return (
        <div>
            {zodiacImage}
        </div>
    );
};

export default ChineseZodiac;