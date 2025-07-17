import React, {useEffect, useState} from 'react';
import styles from "../style/charts.module.css";
import {Spin} from "antd";
import {useOutletContext} from "react-router-dom";
import {PRODMODE} from "../../../CONFIG/config";

const Chart = (props) => {
    const { isLoadingChart, selectedChartState, chartStates, rangeValues, } = useOutletContext();

    useEffect(() => {
        if (selectedChartState) {
            fetchInfo().then();
        }
    }, [selectedChartState]);

    const fetchInfo = async () => {
        if (PRODMODE) {

        } else {

        }
    };

    return (
        <Spin spinning={isLoadingChart}>
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
                <div className={styles.user_row}>
                    <div className={styles.user_cell}></div>
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
            </div>
        </Spin>
    );
}

export default Chart;