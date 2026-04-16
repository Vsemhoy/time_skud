import React, { useEffect, useMemo, useState } from 'react';
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

const BrowserThemeProvider = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return false;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return undefined;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = (event) => {
            setIsDarkMode(event.matches);
        };

        setIsDarkMode(mediaQuery.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleThemeChange);
            return () => mediaQuery.removeEventListener('change', handleThemeChange);
        }

        mediaQuery.addListener(handleThemeChange);
        return () => mediaQuery.removeListener(handleThemeChange);
    }, []);

    useEffect(() => {
        const themeClass = isDarkMode ? 'sk-theme-dark' : 'sk-theme-light';
        const oppositeThemeClass = isDarkMode ? 'sk-theme-light' : 'sk-theme-dark';

        document.documentElement.classList.remove(oppositeThemeClass);
        document.body.classList.remove(oppositeThemeClass);
        document.documentElement.classList.add(themeClass);
        document.body.classList.add(themeClass);
        document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
        document.body.style.colorScheme = isDarkMode ? 'dark' : 'light';
    }, [isDarkMode]);

    const antdTheme = useMemo(() => ({
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }), [isDarkMode]);

    return (
        <ConfigProvider
            locale={customLocale}
            theme={antdTheme}
        >
            <StateProvider>
                <App />
            </StateProvider>
        </ConfigProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserThemeProvider />
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
