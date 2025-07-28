import React, {useEffect, useMemo, useState} from 'react';
import styles from "../style/charts.module.css";
import {Button, Spin, Tooltip} from "antd";
import {useOutletContext} from "react-router-dom";
import {ShortName} from "../../../components/Helpers/TextHelpers";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {log10} from "chart.js/helpers";

dayjs.extend(isBetween);

const Chart = (props) => {
    const { isLoadingChart, usersPage, selectedChartState, reactiveColor, rangeValues, setRangeValues, activeYear, openDrawer, onPreviousMonth, onNextMonth } = useOutletContext();

    const [highlightedColumn, setHighlightedColumn] = useState(null);

    const months = useMemo(() => {
        const arr = [];
        for (let i = rangeValues[0]; i <= rangeValues[1] ; i++) {
            arr.push(i);
        }
        return arr;
    }, [rangeValues]);
    const getDaysInMonth = (date) => {
        return Array.from(
            {length: date.daysInMonth()}, (_, i) => date.startOf('month').add(i, 'day')
        );
    };
    const daysOrWeeksInMonth = useMemo(() => {
            if (months.length === 1) {
                return getDaysInMonth(dayjs(`${activeYear}-${months[0]}-01`)).length;
            } else if (months.length === 2) {
                const month1 = getDaysInMonth(dayjs(`${activeYear}-${months[0]}-01`)).length;
                const month2 = getDaysInMonth(dayjs(`${activeYear}-${months[1]}-01`)).length;
                return month1 + month2;
            } else {
                // Если выбрано несколько месяцев - вычисляем количество недель
                const firstMonth = Math.min(...months);
                const lastMonth = Math.max(...months);

                const startDate = dayjs(`${activeYear}-${firstMonth}-01`).startOf('month');
                const endDate = dayjs(`${activeYear}-${lastMonth}-01`).endOf('month');

                // Вычисляем разницу в неделях между начальной и конечной датой
                const res = endDate.diff(startDate, 'week') + 1; // + 1, чтобы включить начальную неделю
                console.log(endDate.diff(startDate, 'week') + 1)
                return res;
            }
        }, [activeYear, rangeValues]
    );
    const gridColumns = useMemo(() => {
            console.log(`160px repeat(${daysOrWeeksInMonth}, 1fr)`)
            return `160px repeat(${daysOrWeeksInMonth}, 1fr)`;
        }, [daysOrWeeksInMonth]
    );
    const isInChartRange = (charts, day) => {
        if (!charts || !day) return null;
        const currentDay = dayjs.isDayjs(day) ? day : dayjs(day);
        if (!currentDay.isValid()) return null;
        return charts.find(chart => {
            if (!chart?.start || !chart?.end) return false;
            const startDate = dayjs(chart.start);
            const endDate = dayjs(chart.end);
            return currentDay.isBetween(startDate, endDate, null, '[]');
        });
    };
    const getChartsInWeekRange = (charts, week) => {
        if (!charts?.length || !months?.length) return [];

        // Сортируем месяцы по возрастанию
        const sortedMonths = [...months].sort((a, b) => a - b);

        // Создаем диапазон дат для указанных месяцев
        const rangeStart = dayjs(`${activeYear}-${sortedMonths[0]}-01`).startOf('month');
        const rangeEnd = dayjs(`${activeYear}-${sortedMonths[sortedMonths.length - 1]}-01`).endOf('month');

        // Находим первый понедельник в диапазоне
        let firstMonday = rangeStart;
        while (firstMonday.day() !== 1 && firstMonday.isBefore(rangeEnd)) {
            firstMonday = firstMonday.add(1, 'day');
        }

        // Вычисляем даты начала и конца запрошенной недели
        const weekStart = firstMonday.add((week - 1) * 7, 'day');
        const weekEnd = weekStart.add(6, 'day');

        // Проверяем, что неделя входит в диапазон
        if (weekStart.isAfter(rangeEnd)) return [];

        // Фильтруем все подходящие графики
        return charts.filter(chart => {
            const chartStart = dayjs(chart.start);
            const chartEnd = dayjs(chart.end);

            // Проверяем пересечение временных периодов
            return (
                (chartStart.isBefore(weekEnd) || chartStart.isSame(weekEnd)) &&
                (chartEnd.isAfter(weekStart) || chartEnd.isSame(weekStart))
            );
        });
    };
    const getStartEndOfWeek = (week) => {
        if (!months?.length) return '';

        const sortedMonths = [...months].sort((a, b) => a - b);
        const year = activeYear; // Фиксируем год для примера

        // Начало диапазона (первый день первого месяца)
        const rangeStart = dayjs(`${year}-${sortedMonths[0]}-01`).startOf('month');
        // Конец диапазона (последний день последнего месяца)
        const rangeEnd = dayjs(`${year}-${sortedMonths[sortedMonths.length - 1]}-01`).endOf('month');

        // Вычисляем дату начала недели (понедельник)
        const weekStart = rangeStart.startOf('week').add((week - 1) * 7, 'day');
        // Вычисляем дату конца недели (воскресенье)
        const weekEnd = weekStart.endOf('week');

        // Корректировка, чтобы не выходить за границы диапазона
        const adjustedWeekStart = weekStart.isBefore(rangeStart) ? rangeStart : weekStart;
        const adjustedWeekEnd = weekEnd.isAfter(rangeEnd) ? rangeEnd : weekEnd;

        // Форматируем даты
        const formatDate = (date) => date.format('D MMMM');

        return `${formatDate(adjustedWeekStart)} - ${formatDate(adjustedWeekEnd)}`;
    };
    const ruWord = () => {
        switch (selectedChartState) {
            case 6:
                return 'больничного';
            case 7:
                return 'длительной командировки';
            case 8:
                return 'местной командировки';
            case 9:
                return 'отпуска за свой счет';
            case 10:
                return 'отпуска';
            case 11:
                return 'сверхурочных';
            case 13:
                return 'контейнеров';
        }
    };
    const hilightColumn = () => {

    };

    return (
        <Spin spinning={isLoadingChart}>
            {usersPage && (
                <div className={styles.sk_chart}>
                    <div className={styles.month_row}>
                        <div></div>
                        <div className={styles.month_container} style={{gridTemplateColumns: (rangeValues[1] - rangeValues[0] + 1) !== 12 ? '39px 1fr 39px' : '1fr'}}>
                            {(rangeValues[1] - rangeValues[0] + 1) !== 12 && (
                                <Button style={{width: '100%'}}
                                        icon={<ArrowLeftOutlined/>}
                                        color="default"
                                        variant="text"
                                        onClick={onPreviousMonth}
                                        disabled={rangeValues.includes(1)}
                                />
                            )}
                            <div className={styles.months}
                                 style={{gridTemplateColumns: `repeat(${rangeValues[1] - rangeValues[0] + 1}, 1fr)`}}
                            >
                                {months.map((month, index) => (
                                    <p className={styles.month_name_p}
                                       key={`month-${month}-${index}`}
                                       onClick={() => setRangeValues([month,month])}
                                    >
                                        {dayjs(`${activeYear}-${month}-01`).format('MMMM').charAt(0).toUpperCase() + dayjs(`${activeYear}-${month}-01`).format('MMMM').slice(1)}
                                    </p>
                                ))}
                            </div>
                            {(rangeValues[1] - rangeValues[0] + 1) !== 12 && (
                                <Button style={{width: '100%'}}
                                        icon={<ArrowRightOutlined />}
                                        color="default"
                                        variant="text"
                                        onClick={onNextMonth}
                                        disabled={rangeValues.includes(12)}
                                />
                            )}
                        </div>
                    </div>
                    <div className={`${styles.user_row} ${styles.by_day}`} style={{gridTemplateColumns: gridColumns}}>
                        <div className={styles.user_cell}></div>
                        {months.length <= 2 && months.map((month) => {
                            const daysInMonth = getDaysInMonth(dayjs(`${activeYear}-${month}-01`));

                            return daysInMonth.map((day, idx) => {
                                const isWeekend = day.day() === 0 || day.day() === 6;
                                const dayKey = `${activeYear}-${month}-${day.date()}`; // Уникальный ключ

                                return (
                                    <div
                                        className={`
                                            ${styles.chart_cell} 
                                            ${styles.chart_header_cell} 
                                            ${isWeekend ? styles.weekend : ''}
                                            ${idx === highlightedColumn ? styles.highlighted : ''}
                                        `}
                                        key={dayKey}
                                        onMouseEnter={() => setHighlightedColumn(idx)}
                                        onMouseLeave={() => setHighlightedColumn(null)}
                                    >
                                        <p className={styles.chart_cell_text}>{day.date()}</p>
                                    </div>
                                );
                            });
                        })}
                        {months.length > 2 &&  Array.from({ length: daysOrWeeksInMonth }).map((_, indexx) => {
                            return (
                                <div
                                    className={`
                                        ${styles.chart_cell} 
                                        ${styles.chart_header_cell}
                                        ${indexx === highlightedColumn ? styles.highlighted : ''}
                                    `}
                                    key={`we-week-${indexx}`}
                                    onMouseEnter={() => setHighlightedColumn(indexx)}
                                    onMouseLeave={() => setHighlightedColumn(null)}
                                >
                                    <p className={styles.chart_cell_text}>{indexx+1}</p>
                                </div>
                            );
                        })}
                    </div>
                    {usersPage.map((user, index) => (
                        <div className={styles.user_row} key={`user_${index}`} style={{gridTemplateColumns: gridColumns}}>
                            <div className={styles.user_cell}>
                                <div>{ShortName(user.surname, user.name, user.patronymic)}</div>
                                <div style={{color: '#2788e1'}}>{(user.charts && user.charts.length > 0) ? user.charts.length : ''}</div>
                            </div>
                            {months.length <= 2 && months.map((month, index) => (
                                    getDaysInMonth(dayjs(`${activeYear}-${month}-01`)).map((day, dayIndex) => {
                                        if (months[index-1] === months[index]) return '';
                                        const currentChart = isInChartRange(user.charts, day);
                                        const fullDate = day.format('DD.MM.YYYY');
                                        return currentChart ? (
                                            <Tooltip key={`${activeYear}-${month}-${day.date()}`} title={
                                                <div>
                                                    <div>{`${user.surname} ${user.name} ${user.patronymic}`}</div>
                                                    <div>Начало {ruWord()}: {dayjs(currentChart.start).format('DD.MM.YYYY')}</div>
                                                    <div>Конец {ruWord()}: {dayjs(currentChart.end).format('DD.MM.YYYY')}</div>
                                                    <div>Длительность: {dayjs(currentChart.end).diff(dayjs(currentChart.start), 'day') + 1} дней</div>
                                                    <div>{user.approved ? 'Согласовано' : ''}</div>
                                                </div>
                                            }>
                                                <div className={`
                                                        ${styles.chart_cell}
                                                        ${dayIndex === highlightedColumn ? styles.highlighted : ''}
                                                    `}
                                                     style={{backgroundColor: reactiveColor, cursor: 'pointer'}}
                                                     onClick={() => {
                                                         if (currentChart && user) {
                                                             openDrawer(currentChart, user);
                                                         }
                                                     }}
                                                     onMouseEnter={() => setHighlightedColumn(dayIndex)}
                                                     onMouseLeave={() => setHighlightedColumn(null)}
                                                ></div>
                                            </Tooltip>
                                        ) : (
                                            <div className={`
                                                    ${styles.chart_cell}
                                                    ${dayIndex === highlightedColumn ? styles.highlighted : ''}
                                                `}
                                                 key={`${activeYear}-${month}-${day.date()}`}
                                                 title={fullDate}
                                                 onDoubleClick={() => {
                                                     if (user) {
                                                         openDrawer(null, user, fullDate);
                                                     }
                                                 }}
                                                 onMouseEnter={() => setHighlightedColumn(dayIndex)}
                                                 onMouseLeave={() => setHighlightedColumn(null)}
                                            ></div>
                                        )
                                    })
                            ))}
                            {months.length > 2 && Array.from({ length: daysOrWeeksInMonth }).map((_, index) => {
                                const currentChart = getChartsInWeekRange(user.charts, index);
                                const fullDate = `${index+1} неделя, ${getStartEndOfWeek(index+1)}`;
                                return currentChart.length > 0 ? (
                                    <Tooltip key={`week_${index}`} title={
                                        <>
                                            <div>{`${user.surname} ${user.name} ${user.patronymic}`}</div>
                                            <ol>
                                                {currentChart.map((chart, dayIndex) => (
                                                    <li key={`week_chart_${dayIndex}`}>
                                                        <div>Начало {ruWord()}: {dayjs(chart.start).format('DD.MM.YYYY')}</div>
                                                        <div>Конец {ruWord()}: {dayjs(chart.end).format('DD.MM.YYYY')}</div>
                                                        <div>Длительность: {dayjs(chart.end).diff(dayjs(chart.start), 'day') + 1} дней</div>
                                                        <div>{user.approved ? 'Согласовано' : ''}</div>
                                                    </li>
                                                ))}
                                            </ol>
                                        </>
                                    }>
                                        <div className={`
                                                ${styles.chart_cell}
                                                ${index === highlightedColumn ? styles.highlighted : ''}
                                            `}
                                             style={{backgroundColor: reactiveColor, cursor: 'pointer'}}
                                             onClick={() => {
                                                 if (currentChart.length === 1 && user) {
                                                     openDrawer(currentChart[0], user);
                                                 }
                                             }}
                                             onMouseEnter={() => setHighlightedColumn(index)}
                                             onMouseLeave={() => setHighlightedColumn(null)}
                                        >
                                            <div>{currentChart.length > 1 ? currentChart.length : ''}</div>
                                        </div>
                                    </Tooltip>
                                ) : (
                                    <div className={`
                                            ${styles.chart_cell}
                                            ${index === highlightedColumn ? styles.highlighted : ''}
                                        `}
                                         key={`week_${index}`}
                                         title={fullDate}
                                         onDoubleClick={() => {
                                             if (user) {
                                                 openDrawer(null, user, fullDate);
                                             }
                                         }}
                                         onMouseEnter={() => setHighlightedColumn(index)}
                                         onMouseLeave={() => setHighlightedColumn(null)}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </Spin>
    );
}

export default Chart;
