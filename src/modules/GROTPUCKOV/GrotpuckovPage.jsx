import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

import './components/style/grotpuckov.css';
import { Affix, Slider, Tooltip } from 'antd';
import { DS_DEFAULT_USER, DS_DEFAULT_USERS, DS_USERLIST_USERS } from '../../CONFIG/DEFAULTSTATE';


import { DatePicker } from "antd"; 
import { getMonthName } from '../../components/Helpers/TextHelpers';
import { GROT_MOCK } from './components/GROTMOCK';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';


const marks = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь',
};



const GrotpuckovPage = (props) => {
const [cellWidth, setCellWidth] = useState(5); 
  const [baseUserList, setBaseUserList] = useState([]);
  const [days, setDays] = useState([]);

  const [targetYear, setTargetYear] = useState(dayjs());
  const [targetMonth, setTargetMonth] = useState([dayjs().startOf('month'), dayjs().endOf('month')])
  const [rangeValues, setrangeValues] = useState([dayjs().month(),dayjs().month()]);
  const [countOfMonths, setCountOfMonths] = useState(-1);
  const [monthNames, setMonthNames] = useState([]);

  const [cellUnitWidth, setCellUnitWidth] = useState(3);

  const [hoveredMonth, setHoveredMonth] = useState(0);
  const [hoveredDayMonth, setHoveredDayMonth] = useState('')

  const rowRef = useRef(null);

  const [vacations, setVacations] = useState(
    Object.entries(GROT_MOCK).reduce((acc, [userId, userVacations]) => {
      acc[userId] = userVacations.map(vacation => ({
        ...vacation,
        start: dayjs(vacation.start, 'DD.MM.YYYY'),
        end: dayjs(vacation.end, 'DD.MM.YYYY')
      }));
      return acc;
    }, {})
  );

  
  const handleResize = (newWidth) => {
    setCellWidth(newWidth);
  };

  useEffect(() => {
    // console.log('hoveredMonth', hoveredMonth)
  }, [hoveredMonth]);

  useEffect(() => {
    setBaseUserList(DS_USERLIST_USERS.map(item=>({
      id: item.user_id,
      name: item.user_name + " " + item.user_surname,
      key: item.user_id
    })));
  }, []);


  useEffect(() => {
    // console.log('baseUserList', baseUserList);
  }, [baseUserList]);


useEffect(() => {
  setTargetMonth([
    targetYear.clone().month(rangeValues[0] - 1).startOf('month'), // -1 так как месяцы в dayjs 0-11
    targetYear.clone().month(rangeValues[1] - 1).endOf('month')    // -1 аналогично
  ])
}, [rangeValues, targetYear]);

useEffect(() => {
  console.log('targetMonth', targetMonth)
  // console.log('baseUserList', baseUserList);
  let ds = [];
  let mn = [];
  let first = targetYear.clone().month( rangeValues[0] - 1 ).startOf('month').add(1, 'month');
  let last = targetYear.clone().month(rangeValues[1] - 1).endOf('month').add(1, 'month');

  let current = first.clone().add(-1, 'month');
  let counter = 0;

  console.log('first, last', rangeValues, first, last)

  const monthCount = (targetMonth[1].month() - targetMonth[0].month()) + 1;
  setCountOfMonths(monthCount);
  // console.log('monthCount', monthCount);
  let max = first.month() + monthCount;
  if (max > 12){ max = 13};
  for (let i = first.month(); i < max; i++) {
      // console.log('i', i)
      let n = i;
      if (n == 12){ n = 0;};
    mn.push({key: n ,name:  getMonthName(i == 0 ? 12 : i),
      dates: [first.clone().add(i, 'month'), first.clone().add(i, 'month')]},
    );
  }
  setMonthNames(mn);

  // Изменил условие на проверку даты
  last = last.clone().endOf('month');

  let colWeight = 1;
  if (mn.length > 2 && mn.length < 4){
    colWeight = 2;
  } else if (mn.length > 3){
    colWeight = 5
  }

  if (mn.length < 7){
    let prevBreakMonth = false;
  console.log('prevBreakMonth', prevBreakMonth)
    const getGroupingStrategy = () => {
      if (mn.length == 1) return { type: 'daily' };
      if (mn.length == 2) return { type: 'daily' };
      if (mn.length === 3) return { type: 'pattern', pattern: [2, 2, 3] };
      return { type: 'pattern', pattern: [5, 2] };
    };

  const strategy = getGroupingStrategy();
  let current = first.clone();
  let currentMonth = current.month();
  let patternIndex = 0;

    while (current.isBefore(last) || current.isSame(last, 'day')) {
      counter++;
      console.log('counter', counter)
      const isFirstDayOfMonth = current.date() === 1;
      const isMonthBoundary = current.month() !== currentMonth;

      if (isMonthBoundary) {
        currentMonth = current.month();
      }

       if (strategy.type === 'daily') {
          console.log('strategya', strategy)
         ds.push({
           date: current.clone(),
             lenght: 1,
             isFirstOfMonth: isFirstDayOfMonth
           });
       } else  {
          // Для 3+ месяцев - группируем по паттерну с учетом границ месяцев
          const groupLength = strategy.pattern[patternIndex % strategy.pattern.length];
          let actualLength = groupLength;
          
          // Проверяем, не пересекаем ли границу месяца
          const endOfGroup = current.clone().add(groupLength - 1, 'day');
          const endOfMonth = current.clone().endOf('month');
          
          if (endOfGroup.isAfter(endOfMonth)) {
          }
          actualLength = endOfMonth.diff(current, 'day') + 1;

          
          // ds.push({
          //   date: current.clone(),
          //   length: actualLength,
          //   isFirstDayOfMonth,
          //   isMonthBoundary: isFirstDayOfMonth,
          //   isPartial: actualLength < groupLength
          // });

          // current = current.add(actualLength, 'day');
          // patternIndex++;
          
          // // Сбрасываем индекс паттерна при переходе месяца
          // if (actualLength < groupLength) {
          //   patternIndex = 0;
          // }
          

        if (colWeight == 2 ){
          if (current.day() === 0 || current.day() === 2 ){
            ds.push({date: current.clone(), lenght: 2,
              isFirstOfMonth: !prevBreakMonth && current.date() < 3 
            });
            prevBreakMonth = current.date() < 3;
          // } else if (weekOffset > 0 && counter == 1){
          //   ds.push({date: current.clone(), lenght: weekOffset});
          } else if (current.day() === 4){
            ds.push({date: current.clone(), lenght: 3,
              isFirstOfMonth: !prevBreakMonth &&  current.date() < 4 
            });
            prevBreakMonth = current.date() < 4;
          }

        } else if (colWeight == 5) {
          if (current.day() === 0 && actualLength >= 5){
            // const nextDay
            ds.push({date: current.clone(), lenght: 5,
              isFirstOfMonth: !prevBreakMonth && current.date() < 5 
            });
            prevBreakMonth = current.date() < 5;
          // } else if (weekOffset > 0 && counter == 1){
          //   ds.push({date: current.clone(), lenght: weekOffset});
          } else if (current.day() === 5 && actualLength >= 2){
            ds.push({date: current.clone(), lenght: 2,
              isFirstOfMonth: !prevBreakMonth && current.date() < 6 
            });
            prevBreakMonth = current.date() < 6;

          } else {
            // ds.push({date: current.clone(), lenght: actualLength,
            //   isFirstOfMonth: !prevBreakMonth && current.date() < actualLength 
            // });
          }
       }
      }


      // if (counter == 1){
      //   weekOffset = 6 - current.day();
      // }

      // if (colWeight == 2 ){

      //   if (current.day() === 0 || current.day() === 2 ){
      //     ds.push({date: current.clone(), lenght: 2,
      //       isFirstOfMonth: !prevBreakMonth && current.date() < 3 
      //     });
      //     prevBreakMonth = current.date() < 3;
      //   // } else if (weekOffset > 0 && counter == 1){
      //   //   ds.push({date: current.clone(), lenght: weekOffset});
      //   } else if (current.day() === 4){
      //     ds.push({date: current.clone(), lenght: 3,
      //       isFirstOfMonth: !prevBreakMonth &&  current.date() < 4 
      //     });
      //     prevBreakMonth = current.date() < 4;
      //   }

      // } else if (colWeight == 5) {
      //   if (current.day() === 0 ){
      //     ds.push({date: current.clone(), lenght: 5,
      //       isFirstOfMonth: !prevBreakMonth && current.date() < 5 
      //     });
      //     prevBreakMonth = current.date() < 5;
      //   // } else if (weekOffset > 0 && counter == 1){
      //   //   ds.push({date: current.clone(), lenght: weekOffset});
      //   } else if (current.day() === 5){
      //     ds.push({date: current.clone(), lenght: 2,
      //       isFirstOfMonth: !prevBreakMonth && current.date() < 6 
      //     });
      //     prevBreakMonth = current.date() < 6;

      //   }

      // } else {
      //   ds.push({
      //     date: current.clone(),
      //       lenght: colWeight,
      //       isFirstOfMonth: isFirstDayOfMonth
      //     });
      // }
      
      current = current.add(1, 'day');
      
      // Защита от бесконечного цикла
      if (counter > 366) {
        console.error('Превышено максимальное количество дней!');
        break;
      }

    };
    if (rowRef.current) {
        // console.log();
        setCellUnitWidth(rowRef.current.offsetWidth / counter);
        console.log('first', rowRef.current.offsetWidth, counter);
    }

  } else {
    let weekStart = current.clone();
    let currentMonth = current.month();
  
    last = last.clone().add(-1, 'month').endOf('month');
    
  
    while (current.isBefore(last) || current.isSame(last, 'day')) {
        // Проверяем переход на новый месяц
        if (current.month() !== currentMonth) {
          // Если неделя началась в предыдущем месяце
          if (!weekStart.isSame(current, 'month')) {
            // Добавляем оставшиеся дни предыдущего месяца
            const daysInWeek = current.diff(weekStart, 'day');
            if (daysInWeek > 0) {
              ds.push({
                date: weekStart.clone(),
                length: daysInWeek,
                isPartial: true,
                isFirstOfMonth: false
              });
            }
            // Начинаем новую неделю с первого дня нового месяца
            weekStart = current.clone();
          }
          currentMonth = current.month();
        }
  
        // Если воскресенье или последний день диапазона
        if (current.day() === 6 || current.isSame(last, 'day')) {
          const daysInWeek = current.diff(weekStart, 'day') + 1;
          ds.push({
            date: weekStart.clone(),
            length: daysInWeek,
            isPartial: daysInWeek < 7,
            isFirstOfMonth: weekStart.date() === 1 
          });
          weekStart = current.clone().add(1, 'day');
        }
  
        current = current.add(1, 'day');
      }
  }



  setDays(ds);
  // console.log('Generated days:', ds);
}, [targetYear, targetMonth]);






  return (
    <div>
      <div>
        <Slider value={cellWidth}
          min={3}
          max={100}
          onChange={(ev)=>{setCellWidth(ev)}}
        />

        <div className={'sk-flex'} style={{width: '100%'}}>
          <div style={{padding: '6px 6px'}}>
            <DatePicker 
              value={targetYear}
              onChange={setTargetYear}
              picker="year"
              allowClear={false}
            ></DatePicker>
          </div>

          <div style={{padding: '6px 42px', width: '100%'}}>
            <Slider 
              style={{width: '100%'}} 
              range marks={marks} step={null} defaultValue={[3,5]}
              value={rangeValues}
              min={1}
              max={12}
              onChange={setrangeValues}
            />
          </div>
        </div>


      </div>

    <div className='sk-p-12'>

      <Affix >
       <div>
        <div className="sk-grot-line sk-g-affix">
            <div className={'sk-p-6 sk-grot-name'}>
            
          </div>
          <div className={'sk-grot-monthrow'}  ref={rowRef}>
          {monthNames.map((mon)=>(
            <div
              onClick={()=>{countOfMonths > 1 && setrangeValues([mon.key, mon.key])}}
             className={`${hoveredMonth == mon.key ? "sk-grot-month-hovered" : ""}`}>
            <div className="month-navigation" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {countOfMonths === 1 && rangeValues[0] != 1 && (
                <div 
                  className="nav-button"
                  onClick={() => {
                    setrangeValues([rangeValues[0] -1, rangeValues[0] -1]);
                  }}
                 
                >
                  <ArrowLeftOutlined />
                </div>
              )}
              
              <div>
                {mon.name}
              </div>
              
              {countOfMonths === 1 && rangeValues[1] != 12 && (
                <div 
                  className="nav-button"
                  onClick={() => {setrangeValues([rangeValues[0] +1, rangeValues[0] +1]);
                  }}
               
                >
                  <ArrowRightOutlined />
                </div>
              )}
            </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      </Affix>

      




        <Affix offsetTop={30}>
          <div className="sk-grot-line sk-g-affix">
          <div className={'sk-p-6 sk-grot-name sk-flex-space'}>
            <span></span> <span style={{fontSize: 'small', color: 'blue'}}></span>
          </div>
          <div className={`sk-grot-line-days ${countOfMonths < 2 ? "sk-grot-striped" : ""}`}>
          {days.map((d, index) => {
            const currentMonth = d.date.month();
            const nextmonth = index > 0 && currentMonth !== d.date.clone().add(1,'day').month();
            
            return (

              <Tooltip title={<div>
              <p>{d.date.format('DD.MM.YYYY')}</p>
              <p>{d.date.week()}</p>
              </div>}>
                <div
                  onMouseOver={()=>{setHoveredMonth(currentMonth + 1); setHoveredDayMonth(d.date.unix())}}
                  
                  key={d.date.toString()} // Важно: добавь ключ!
                  className={`sk-grot-cell ${d.isFirstOfMonth ? "sk-grot-nextmonth" : ""}`}
                  style={{ width: `${cellUnitWidth * d.lenght}px` }}
                >
                  <div className={` ${d.length == 0 && (d.date.day() === 0 || d.date.day() === 6) ? "sk-grot-wd" : ""} ${d.date.unix() == hoveredDayMonth ? 'sk-grot-hover-col':''}`}>
                    <div className={'sk-grot-item'}>
                    {countOfMonths == 1 ? d.date.date() : ""}
                    {countOfMonths == 2 && !(d.date.date() % 2 == 0) ? d.date.date() : ""}
                    {countOfMonths == 3  ? d.date.date() : ""}
                    {countOfMonths == 4 || countOfMonths == 5  ? d.date.date() : ""}
                    {/* {d.date.date()} */}
                    </div>
                  </div>
                </div>
                </Tooltip>
            );
          })}
        </div>
        </div>
        </Affix>

<div>
      
      {baseUserList.map((user)=>(
        <div className="sk-grot-line">
        
          <div className={'sk-p-6 sk-grot-name sk-flex-space'}>
            <span>{user.name}</span> <span style={{fontSize: 'small', color: 'blue'}}>{vacations[user.id]?.length}</span>
          </div>
          <div className={`sk-grot-line-days ${countOfMonths < 2 ? "sk-grot-striped" : ""}`}>
          {days.map((d, index) => {
            const currentMonth = d.date.month();
            const nextmonth = index > 0 && currentMonth !== d.date.clone().add(1,'day').month();
            let isVacation = false;
             let vacation = null;
             
  
            // Проверяем, есть ли отпуска у пользователя
            if (vacations[user.id]) {
              vacation = vacations[user.id].find(item => (
                
                (d.date.isSame(item.start, 'day') || d.date.isAfter(item.start, 'day')) && (d.date.isSame(item.end, 'day') || d.date.isBefore(item.end, 'day'))
              ));
              isVacation = !!vacation;
            }

            let isApproved = vacation != null ? vacation.approved : 0;

            return (
              <>
              {isVacation ? (
              <Tooltip title={<div>
              <p>Начало отпуска: {vacation.start.format('DD.MM.YYYY')}</p>
              <p>Конец отпуска: {vacation.end.format('DD.MM.YYYY')}</p>
              <p>{isApproved === 1 ? "Согласован":"Не согласован"}</p>
              </div>}>
                <div
                  onMouseOver={()=>{setHoveredMonth(currentMonth + 1); setHoveredDayMonth(d.date.unix())}}
                  title={d.date.format('DD.MM.YYYY')}
                  key={d.date.toString()} // Важно: добавь ключ!
                  className={`sk-grot-cell ${d.isFirstOfMonth ? "sk-grot-nextmonth" : ""} ${isVacation? "sk-grot-vacc-cell": ""} ${isApproved? "sk-grot-vacc-cell-approved": ""}`}
                  style={{ width: `${cellUnitWidth * d.lenght}px` }}
                >
                  <div className={` ${d.length == 0 && (d.date.day() === 0 || d.date.day() === 6) ? "sk-grot-wd" : ""} ${d.date.unix() == hoveredDayMonth ? 'sk-grot-hover-col':''}`}>
                    <div className={'sk-grot-item'}>
                    {/* {countOfMonths == 1 ? d.date() : ""}
                    {countOfMonths == 2 && d.date() % 2 == 0 ? d.date() : ""}
                    {countOfMonths == 3 && d.date() % 3 == 0 ?  d.date() : ""} */}
                    </div>
                  </div>
                </div>
                </Tooltip>
              ) : (
                <div
                  onMouseOver={()=>{setHoveredMonth(currentMonth + 1); setHoveredDayMonth(d.date.unix())}}
                  title={d.date.format('DD.MM.YYYY')}
                  key={d.date.toString()} // Важно: добавь ключ!
                  className={`sk-grot-cell ${d.isFirstOfMonth ? "sk-grot-nextmonth" : ""}` }
                  style={{ width: `${cellUnitWidth * d.lenght}px` }}
                >
                  <div className={` ${d.length == 0 && (d.date.day() === 0 || d.date.day() === 6) ? "sk-grot-wd" : ""} ${d.date.unix() == hoveredDayMonth ? 'sk-grot-hover-col':''}`}>
                    <div className={'sk-grot-item'}>
                    {/* {countOfMonths == 1 ? d.date() : ""}
                    {countOfMonths == 2 && d.date() % 2 == 0 ? d.date() : ""}
                    {countOfMonths == 3 && d.date() % 3 == 0 ?  d.date() : ""} */}
                    </div>
                  </div>
                </div>
              )}
              
              </>
            );
          })}
        </div>
        </div>

      ))}
    </div>
    </div>
    </div>
  );
};

export default GrotpuckovPage;
{/* d.isBetween(item.start, item.end, 'day', '[]') // включая границы */}