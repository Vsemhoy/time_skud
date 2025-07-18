import React, {useEffect, useState} from 'react';
import styles from "../style/charts.module.css";
import {Spin} from "antd";
import {useOutletContext} from "react-router-dom";
import {PRODMODE} from "../../../CONFIG/config";
import {ShortName} from "../../../components/Helpers/TextHelpers";
import dayjs from "dayjs";

const Chart = (props) => {
    const { isLoadingChart, usersPage, selectedChartState, reactiveColor, rangeValues, activeYear } = useOutletContext();

    const getDaysInMonth = (date) =>
        Array.from({ length: date.daysInMonth() }, (_, i) =>
            date.startOf('month').add(i, 'day')
        );

    return (
        <Spin spinning={isLoadingChart}>
            {usersPage && (
                <div className={styles.sk_chart}>
                    <div className={styles.month_row}>
                        <div></div>
                        <div className={styles.month}></div>
                    </div>
                    <div className={`${styles.user_row} ${styles.by_day}`} style={{gridTemplateColumns: `160px repeat(${dayjs().daysInMonth()}, 1fr)`}}>
                        <div className={styles.user_cell}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                        <div className={`${styles.chart_cell} ${styles.chart_header_cell}`}></div>
                    </div>
                    {usersPage.map((user, index) => (
                        <div className={styles.user_row} key={`user_${index}`} style={{gridTemplateColumns: `160px repeat(${dayjs().daysInMonth()}, 1fr)`}}>
                            <div className={styles.user_cell}>
                                <div>{ShortName(user.surname, user.name, user.patronymic)}</div>
                                <div style={{color: '#2788e1'}}>{(user.charts && user.charts.length > 0) ? user.charts.length : ''}</div>
                            </div>
                            {getDaysInMonth(dayjs('2023-11-01')).map((day, dayIndex) => (
                                <div className={styles.chart_cell} key={`day_${dayIndex}`}></div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </Spin>
    );
}

export default Chart;
