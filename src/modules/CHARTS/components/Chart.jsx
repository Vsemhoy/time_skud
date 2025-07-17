import React, {useEffect, useState} from 'react';
import styles from "../style/charts.module.css";
import {Spin} from "antd";
import {useOutletContext} from "react-router-dom";
import {PRODMODE} from "../../../CONFIG/config";
import {ShortName} from "../../../components/Helpers/TextHelpers";

const Chart = (props) => {
    const { isLoadingChart, selectedChartState, usersPage } = useOutletContext();

    return (
        <Spin spinning={isLoadingChart}>
            {usersPage && (
                <div className={styles.sk_chart}>
                    <div className={styles.month_row}>
                        <div></div>
                        <div className={styles.month}></div>
                    </div>
                    <div className={`${styles.user_row} ${styles.by_day}`}>
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
                        <div className={styles.user_row}>
                            <div className={styles.user_cell}>
                                <div>{ShortName(user.surname, user.name, user.patronymic)}</div>
                                <div>{(user.charts && user.charts.length > 0) ? user.charts.length : ''}</div>
                            </div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                            <div className={styles.chart_cell}></div>
                        </div>
                    ))}
                </div>
            )}
        </Spin>
    );
}

export default Chart;