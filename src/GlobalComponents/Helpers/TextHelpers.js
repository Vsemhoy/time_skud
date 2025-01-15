

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