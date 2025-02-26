import dayjs from "dayjs";
import { DS_YEARMONTHS_SELECT } from "../../CONFIG/DEFAULTSTATE";

/**
 * Укорачиваем полное имя до инициалов с фамилией
 * @param {*} surname 
 * @param {*} name 
 * @param {*} patronymic 
 * @returns 
 */
export const ShortName = (surname, name, patronymic) => {
    // Начинаем с фамилии
    let shortName = surname ? surname.trim() : '';
    // Добавляем первую букву имени, если оно есть
    if (name) {
        shortName += ` ${name.charAt(0)}.`; // Добавляем первую букву имени с точкой
    }
    // Добавляем первую букву отчества, если оно есть
    if (patronymic) {
        shortName += ` ${patronymic.charAt(0)}.`; // Добавляем первую букву отчества с точкой
    }

    return shortName;
};


export const generateYearOptions = () => {
    const startYear = 2014;
    let endYear = dayjs().year(); // Текущий год + 1

    if (dayjs().month() > 9){
        endYear = dayjs().year() + 1;
    }

    const yearsArray = [];
    for (let year = startYear; year <= endYear; year++) {
        yearsArray.push({
            key: 'yearkey_' + year.toString(),
            value: year,
            label: year.toString() // Преобразуем номер года в строку для label
        });
    }

    return yearsArray;
};

export const getMonthName = (number) => {
    let month = DS_YEARMONTHS_SELECT.find((el) => el.value === parseInt(number));
    return month.label;
};

export const secondsValueToGlobalTime = (seconds) => {
    const currentDate = dayjs();
    const startOfDay = currentDate.startOf('day');
    // return currentDate.diff(startOfDay, 'second');
    const timeForPicker = startOfDay.add(seconds, 'second');
    // console.log('SVGT', seconds, timeForPicker);
    return timeForPicker;
}

export const globalTimeToDaySeconds = (daytime) => {
    let seconds = daytime.unix();
    let start = daytime.startOf('day').unix();
    return seconds - start;
}

export const formatUnixToStringTime = (time)=>{
    let timeObj = dayjs.unix(time);
    return timeObj.format("HH:mm");
}


export const generateGradientBackground = (colors) => {
    // Проверяем, что массив не пустой
    if (!colors || colors.length === 0) {
        return '';
    }
    let steps = 100 / colors.length;

    let result = `linear-gradient(111deg, `;
    result += colors[0] + " 0%, ";
    for (let i = 1; i < colors.length; i++) {
        const prev = colors[i - 1];
        const current = colors[i];
        result += prev + " " + (steps * i - 0.1) + "%, ";
        result += current + " " + (steps * i) + "%, ";
    }
    result += colors[colors.length - 1] + " " + " 100%";
    result += ")";
    console.log(result);
    return result;
};


export const WordDayNumerate = (value) => {
    if (value % 10 === 1 && value % 100 !== 11) {
        return "день";
    } else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) {
        return "дня";
    } else {
        return "дней";
    }
}