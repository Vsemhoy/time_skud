import React, { memo } from 'react';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';

const DayCell = memo(({ day, user, vacations, countOfMonths }) => {
  const vacation = findUserVacation(user.id, day);
  const isWeekend = day.day() === 0 || day.day() === 6;
  
  return (
    <Tooltip title={getTooltipContent(day, vacation)}>
      <div 
        className={`sk-grot-cell ${getCellClasses(day, vacation, countOfMonths)}`}
        data-months={countOfMonths > 3 ? '3+' : countOfMonths}
      >
        {renderDayContent(day, countOfMonths)}
      </div>
    </Tooltip>
  );
});

// Вынесенные функции для чистоты кода
const findUserVacation = (userId, day) => {
  return vacations[userId]?.find(v => day.isBetween(v.start, v.end, 'day', '[]'));
};

const getTooltipContent = (day, vacation) => (
  vacation 
    ? `Отпуск: ${vacation.start.format('DD.MM')}-${vacation.end.format('DD.MM')}`
    : day.format('DD.MM.YYYY')
);

const getCellClasses = (day, vacation, countOfMonths) => {
  const classes = [];
  if (vacation) classes.push('sk-grot-vacc-cell');
  if (vacation?.approved) classes.push('sk-grot-vacc-cell-approved');
  if (countOfMonths > 3) classes.push('sk-grot-compact');
  return classes.join(' ');
};

const renderDayContent = (day, countOfMonths) => {
  if (countOfMonths === 1) return day.date();
  if (countOfMonths === 2 && day.date() % 2 === 0) return day.date();
  if (countOfMonths >= 3 && day.date() % 5 === 0) return day.date();
  return null;
};

export default DayCell;