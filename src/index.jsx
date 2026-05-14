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

const THEME_STORAGE_KEY = 'skud_theme';
const THEME_CHANGE_EVENT = 'skud-theme-change';

const getSavedThemeMode = () => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
};

const BrowserThemeProvider = () => {
    const [themeMode, setThemeMode] = useState(getSavedThemeMode);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const handleThemeChange = (event) => {
            setThemeMode(event.detail?.theme === 'dark' ? 'dark' : 'light');
        };
        const handleStorageChange = (event) => {
            if (event.key === THEME_STORAGE_KEY) {
                setThemeMode(event.newValue === 'dark' ? 'dark' : 'light');
            }
        };

        window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const isDarkMode = themeMode === 'dark';
        const themeClass = isDarkMode ? 'sk-theme-dark' : 'sk-theme-light';
        const oppositeThemeClass = isDarkMode ? 'sk-theme-light' : 'sk-theme-dark';

        document.documentElement.classList.remove(oppositeThemeClass);
        document.body.classList.remove(oppositeThemeClass);
        document.documentElement.classList.add(themeClass);
        document.body.classList.add(themeClass);
        document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
        document.body.style.colorScheme = isDarkMode ? 'dark' : 'light';
    }, [themeMode]);

    const antdTheme = useMemo(() => ({
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }), [themeMode]);

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
