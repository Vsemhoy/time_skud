import React from 'react';


import Snake from "../../media/zodiac/snake-svgrepo-com.svg";
import Rabbit from "../../media/zodiac/rabbit-shape-svgrepo-com.svg";
import Dragon from "../../media/zodiac/tyrannosaurus-rex-silhouette-svgrepo-com.svg";
import Pig from "../../media/zodiac/pig-side-view-silhouette-svgrepo-com.svg";
import Bull from "../../media/zodiac/bull-silhouette-svgrepo-com.svg";
import Monkey from "../../media/zodiac/monkey-svgrepo-com.svg";
import Dog from "../../media/zodiac/running-dog-silhouette-svgrepo-com.svg";
import Horse from "../../media/zodiac/horse-black-shape-svgrepo-com.svg";
import Rooster from "../../media/zodiac/pigeon-bird-shape-svgrepo-com.svg";
import Goat from "../../media/zodiac/gazelle-running-silhouette-svgrepo-com.svg";
import Tiger from "../../media/zodiac/domestic-cat-shape-svgrepo-com.svg";
import Mouse from "../../media/zodiac/mouse-svgrepo-com.svg";

import Owl from "../../media/zodiac/owl-bird-shape-svgrepo-com.svg";




import { HOST_COMPONENT_ROOT } from '../../CONFIG/config';
import MouseZodiacIcon from "./Zodiac/MouseZodiacIcon";
import TigerZodiacIcon from "./Zodiac/TigerZodiacIcon";
import RabbitZodiacIcon from "./Zodiac/RabbitZodiacIcon";
import DragonZodiacIcon from "./Zodiac/DragonZodiacIcon";
import SnakeZodiacIcon from "./Zodiac/SnakeZodiacIcon";
import HorseZodiacIcon from "./Zodiac/HorseZodiacIcon";
import BullZodiacIcon from "./Zodiac/BullZodiacIcon";
import MonkeyZodiacIcon from "./Zodiac/MonkeyZodiacIcon";
import GazelleZodiacIcon from "./Zodiac/GazelleZodiacIcon";
import PigeonZodiacIcon from "./Zodiac/PigeonZodiacIcon";
import DogRunZodiacIcon from "./Zodiac/DogRunZodiacIcon";
import PigZodiacIcon from "./Zodiac/PigZodiacIcon";

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
                return ( <MouseZodiacIcon />);
            case 'Ox':
                return ( <BullZodiacIcon />);
            case 'Tiger':
                return ( <TigerZodiacIcon />);
            case 'Rabbit':
                return ( <RabbitZodiacIcon />);
            case 'Dragon':
                return ( <DragonZodiacIcon />);
            case 'Snake':
                return ( <SnakeZodiacIcon />);
            case 'Horse':
                return (<HorseZodiacIcon />);
            case 'Goat':
                return (<GazelleZodiacIcon />);
            case 'Monkey':
                return (<MonkeyZodiacIcon />);
            case 'Rooster':
                return (<PigeonZodiacIcon />);
            case 'Dog':
                return (<DogRunZodiacIcon />);
            case 'Pig':
                return (<PigZodiacIcon />);
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