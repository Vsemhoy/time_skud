import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider, theme } from 'antd';
import { StateProvider } from './components/ComStateProvider25/ComStateProvider25';

/* + LOCALE */
import ruRU from 'antd/lib/locale/ru_RU'; // Импорт русской локали
import ru from "antd/es/date-picker/locale/ru_RU";

import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // русская локаль
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.locale('ru');
dayjs.extend(updateLocale);

// Устанавливаем понедельник первым днём недели
dayjs.updateLocale('ru', {
    weekStart: 1,
});

const buddhistLocale = {
    ...ru,
    lang: {
        ...ru.lang,
    },
};
const customLocale = {
    ...ruRU,
    DatePicker: {
        ...ruRU.DatePicker,
        lang: {
            ...ruRU.DatePicker.lang,
            firstDayOfWeek: 1, // 0 - вс, 1 - пн, 2 - вт и т.д.
        },
    },
};
/* - LOCALE */

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ConfigProvider
            locale={customLocale}
            theme={{
            // 1. Use dark algorithm
            //   algorithm: theme.darkAlgorithm,

            // 2. Combine dark algorithm and compact algorithm
            //   algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
        >
          <StateProvider>
            <App />
          </StateProvider>
        </ConfigProvider>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
