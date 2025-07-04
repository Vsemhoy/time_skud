import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider, theme } from 'antd';
import { StateProvider } from './components/ComStateProvider25/ComStateProvider25';
import ruRU from 'antd/lib/locale/ru_RU'; // Импорт русской локали
import ru from "antd/es/date-picker/locale/ru_RU";
import moment from "moment";

const buddhistLocale = {
    ...ru,
    lang: {
        ...ru.lang,
    },
};
export const globalBuddhistLocale = {
    ...ruRU,
    DatePicker: {
        ...ruRU.DatePicker,
        lang: buddhistLocale.lang,
    },
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ConfigProvider
            locale={globalBuddhistLocale}
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
