import React, {useEffect, useMemo, useState} from 'react';
import styles from "../style/charts.module.css";
import {Button, Spin, Tooltip} from "antd";
import {useOutletContext} from "react-router-dom";
import {ShortName} from "../../../components/Helpers/TextHelpers";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";

dayjs.extend(isBetween);

const Chart = (props) => {
    const { isLoadingChart, usersPage, selectedChartState, reactiveColor, rangeValues, activeYear, openDrawer, onPreviousMonth, onNextMonth } = useOutletContext();

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
            // getDaysInMonth(dayjs(`${activeYear}-${rangeValues[0]}-01`))
            if (months.length === 1) {
                console.log(1)
                return getDaysInMonth(dayjs(`${activeYear}-${months[0]}-01`)).length;
            } else {
                console.log(2)
                // Если выбрано несколько месяцев - вычисляем количество недель
                const firstMonth = Math.min(...months);
                const lastMonth = Math.max(...months);

                const startDate = dayjs(`${activeYear}-${firstMonth}-01`).startOf('month');
                const endDate = dayjs(`${activeYear}-${lastMonth}-01`).endOf('month');

                // Вычисляем разницу в неделях между начальной и конечной датой
                const res = endDate.diff(startDate, 'week') + 1; // +1 чтобы включить начальную неделю
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
                            <div className={styles.months} style={{gridTemplateColumns: `repeat(${rangeValues[1] - rangeValues[0] + 1}, 1fr)`}}>
                                {months.map((month, index) => (
                                    <p className={styles.month_name_p} key={`month-${month}-${index}`}>
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
                        {getDaysInMonth(dayjs(`${activeYear}-${rangeValues[0]}-01`)).map((day, dayIndex) => {
                            const isWeekend = day.day() === 0 || day.day() === 6;
                            return (
                                <div className={`${styles.chart_cell} ${styles.chart_header_cell} ${isWeekend ? styles.weekend : ''}`}
                                     key={`${day.date()}-${day.day()}`}
                                >
                                    <p className={styles.chart_cell_text}>{day.date()}</p>
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
                            {getDaysInMonth(dayjs(`${activeYear}-${rangeValues[0]}-01`)).map((day, dayIndex) => {
                                const currentChart = isInChartRange(user.charts, day);
                                const fullDate = day.format('DD.MM.YYYY');
                                return currentChart ? (
                                    <Tooltip key={`day_${dayIndex}`} title={
                                        <div>
                                            <div>{`${user.surname} ${user.name} ${user.patronymic}`}</div>
                                            <div>Начало {ruWord()}: {dayjs(currentChart.start).format('DD.MM.YYYY')}</div>
                                            <div>Конец {ruWord()}: {dayjs(currentChart.end).format('DD.MM.YYYY')}</div>
                                            <div>Длительность: {dayjs(currentChart.end).diff(dayjs(currentChart.start), 'day') + 1} дней</div>
                                            <div>{user.approved ? 'Согласовано' : ''}</div>
                                        </div>
                                    }>
                                        <div className={styles.chart_cell}
                                             style={{backgroundColor: reactiveColor, cursor: 'pointer'}}
                                             onClick={() => {
                                                 if (currentChart && user) {
                                                     openDrawer(currentChart, user);
                                                 }
                                             }}
                                        ></div>
                                    </Tooltip>
                                    ) : (
                                    <div className={styles.chart_cell}
                                         key={`day_${dayIndex}`}
                                         title={fullDate}
                                         onDoubleClick={() => {
                                             if (user) {
                                                 openDrawer(null, user, fullDate);
                                             }
                                         }}
                                    ></div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            )}
        </Spin>
    );
}

export default Chart;
