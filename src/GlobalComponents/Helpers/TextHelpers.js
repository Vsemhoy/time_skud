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
