import React from "react";

import dayjs from "dayjs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Legend } from "chart.js";



const DemoChart = () => {
  const data = [
    { name: '2023-10-01', uv: '08:15:23', pv: '14:30:45', amt: '19:45:12' },
    { name: '2023-10-02', uv: '09:20:10', pv: '15:55:33', amt: '20:10:00' },
    { name: '2023-10-03', uv: '07:45:50', pv: '13:10:20', amt: '18:30:45' },
    { name: '2023-10-04', uv: '10:00:00', pv: '16:22:11', amt: '21:15:30' },
    { name: '2023-10-05', uv: '11:30:05', pv: '17:40:59', amt: '22:05:17' },
    { name: '2023-10-06', uv: '06:55:42', pv: '12:15:08', amt: '17:50:33' },
    { name: '2023-10-07', uv: '12:10:37', pv: '18:25:14', amt: '23:00:01' },
    { name: '2023-10-01', uv: '08:15:23', pv: '14:30:45', amt: '19:45:12' },
    { name: '2023-10-02', uv: '09:20:10', pv: '15:55:33', amt: '20:10:00' },
    { name: '2023-10-03', uv: '07:45:50', pv: '13:10:20', amt: '18:30:45' },
    { name: '2023-10-04', uv: '10:00:00', pv: '16:22:11', amt: '21:15:30' },
    { name: '2023-10-05', uv: '11:30:05', pv: '17:40:59', amt: '22:05:17' },
    { name: '2023-10-06', uv: '06:55:42', pv: '12:15:08', amt: '17:50:33' },
    { name: '2023-10-07', uv: '12:10:37', pv: '18:25:14', amt: '23:00:01' },
    { name: '2023-10-01', uv: '08:15:23', pv: '14:30:45', amt: '19:45:12' },
    { name: '2023-10-02', uv: '09:20:10', pv: '15:55:33', amt: '20:10:00' },
    { name: '2023-10-03', uv: '07:45:50', pv: '13:10:20', amt: '18:30:45' },
    { name: '2023-10-04', uv: '10:00:00', pv: '16:22:11', amt: '21:15:30' },
    { name: '2023-10-05', uv: '11:30:05', pv: '17:40:59', amt: '22:05:17' },
    { name: '2023-10-06', uv: '06:55:42', pv: '12:15:08', amt: '17:50:33' },
    { name: '2023-10-07', uv: '12:10:37', pv: '18:25:14', amt: '23:00:01' },
    { name: '2023-10-01', uv: '08:15:23', pv: '14:30:45', amt: '19:45:12' },
    { name: '2023-10-02', uv: '09:20:10', pv: '15:55:33', amt: '20:10:00' },
    { name: '2023-10-03', uv: '07:45:50', pv: '13:10:20', amt: '18:30:45' },
    { name: '2023-10-04', uv: '10:00:00', pv: '16:22:11', amt: '21:15:30' },
    { name: '2023-10-05', uv: '11:30:05', pv: '17:40:59', amt: '22:05:17' },
    { name: '2023-10-06', uv: '06:55:42', pv: '12:15:08', amt: '17:50:33' },
    { name: '2023-10-07', uv: '12:10:37', pv: '18:25:14', amt: '23:00:01' },
    { name: '2023-10-04', uv: '10:00:00', pv: '16:22:11', amt: '21:15:30' },
    { name: '2023-10-05', uv: '11:30:05', pv: '17:40:59', amt: '22:05:17' },
    { name: '2023-10-06', uv: '06:55:42', pv: '12:15:08', amt: '17:50:33' },
    { name: '2023-10-07', uv: '12:10:37', pv: '18:25:14', amt: '23:00:01' },
    { name: '2023-10-07', uv: '12:10:37', pv: '18:25:14', amt: '23:00:01' },
    { name: '2023-10-04', uv: '10:00:00', pv: '16:22:11', amt: '21:15:30' },
    { name: '2023-10-05', uv: '11:30:05', pv: '17:40:59', amt: '22:05:17' },
    { name: '2023-10-06', uv: '06:55:42', pv: '12:15:08', amt: '17:50:33' },
    { name: '2023-10-07', uv: '12:10:37', pv: '18:25:14', amt: '23:00:01' },
    { name: '2023-10-01', uv: '08:15:23', pv: '14:30:45', amt: '19:45:12' },
    { name: '2023-10-02', uv: '09:20:10', pv: '15:55:33', amt: '20:10:00' },
    { name: '2023-10-03', uv: '07:45:50', pv: '13:10:20', amt: '18:30:45' },
    { name: '2023-10-04', uv: '10:00:00', pv: '16:22:11', amt: '21:15:30' },
    { name: '2023-10-05', uv: '11:30:05', pv: '17:40:59', amt: '22:05:17' },
    { name: '2023-10-02', uv: '09:20:10', pv: '15:55:33', amt: '20:10:00' },
  ];

  // Конвертация времени в минуты
  const timeToMinutes = (timeStr) => {
    const [hh, mm] = timeStr.split(':').map(Number);
    return hh * 60 + mm;
  };

  // Форматирование минут обратно в "HH:MM"
  const formatMinutesToTime = (minutes) => {
   
    const hh = Math.floor(minutes / 60);
    const mm = minutes % 60;
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data.map(item => ({
          ...item,
          uv: timeToMinutes(item.uv),
          pv: timeToMinutes(item.pv),
          amt: timeToMinutes(item.amt),
        }))}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={formatMinutesToTime} // Форматируем минуты в "HH:MM"
          domain={[0, 1440]} // 24 часа в минутах (опционально)
          tickValues={[0, 360, 480, 600, 720, 840, 960, 1080, 1440]}
        />
        <Tooltip 
          formatter={(value) => formatMinutesToTime(value)} // Форматируем подсказки
        />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DemoChart;