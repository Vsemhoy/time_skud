import React, {useState} from 'react';
import styles from '../style/charts.module.css';

const MonthsRange = (props) => {
    const isInRange = (monthId) => {
        return (monthId >= props.rangeValues[0] && monthId <= props.rangeValues[1]);
    };
    const handleMonthClick = (event, monthId) => {
        if (event.shiftKey) {
            if (props.rangeValues[0] === props.rangeValues[1]) {
                const start = Math.min(props.rangeValues[0], monthId);
                const end = Math.max(props.rangeValues[0], monthId);
                props.setRangeValues([start, end]);
            } else {
                const distanceToStart = Math.abs(monthId - props.rangeValues[0]);
                const distanceToEnd = Math.abs(monthId - props.rangeValues[1]);
                if (distanceToStart < distanceToEnd) {
                    props.setRangeValues([monthId, props.rangeValues[1]]);
                } else {
                    props.setRangeValues([props.rangeValues[0], monthId]);
                }
            }
        } else {
            props.setActiveMonth(monthId);
        }
    };
    return (
        <div className={styles.range}>
            {props.range && props.range.length > 0 && props.range.map(month => (
                <div className={`${styles.month} ${isInRange(month.id) ? styles.active_month : ''}`}
                     key={`month-${month.name}-${month.id}`}
                     onClick={(e) => handleMonthClick(e, month.id)}
                >
                    {month.name}
                </div>
            ))}
        </div>
    );
}

export default MonthsRange;
