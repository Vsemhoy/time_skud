import React from 'react';
import {Select} from 'antd';

export default function AccountingPeriodFilters({months, years, period, setPeriod}) {
    return (
        <div className="sk-accounting-period">
            <Select aria-label="Месяц" options={months} value={period.month}
                onChange={(month) => setPeriod(current => ({...current, month}))} />
            <Select aria-label="Год" options={years} value={period.year}
                onChange={(year) => setPeriod(current => ({...current, year}))} />
        </div>
    );
}
