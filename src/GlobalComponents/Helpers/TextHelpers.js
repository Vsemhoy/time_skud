import dayjs from "dayjs";

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
    const startYear = 2000;
    const endYear = dayjs().year() + 1; // Текущий год + 1
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
