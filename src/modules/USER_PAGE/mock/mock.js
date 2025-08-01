export const MOCK_USER = {
    company: {
        id: 2,
        name: 'Arstel',
        color: '#f2914a'
    },
    surname: 'Арчи',
    name: 'Гавриил',
    patronymic: 'Дессус',
    department: {
        id: 1,
        name: 'Монтажный отдел',
    },
    occupy: 'Руководитель',
    innerPhone: '228',
    telegramID: '22834525453',
    email: 'arstel@arstel.com',
    dateLeave: '12.09.2025',
    dateEnter: '12.09.2029',
    rating: '40',
    status: {
        id: 0,
        name: 'Работает',
    },
    boss: {
        id: 46,
        name: 'Ковалев Б.Р.',
    },
    login: 'agd',
    password: '',
    cardNumber: '55GKEK24MM',
    conditionalCard: {
        id: 1,
        name: 'Нормальная',
    },
    allowEntry: {
        id: 0,
        name: 'Да',
    }
};
export const COMPANIES = [
    {
        value: 1,
        label: 'FreeCompany'
    },
    {
        value: 2,
        label: 'Arstel'
    },
    {
        value: 3,
        label: 'Rondo'
    },
];
export const DEPARTMENTS = [
    {
        value: 1,
        label: 'Администрация'
    },
    {
        value: 2,
        label: 'Монтажный отдел'
    },
    {
        value: 3,
        label: 'IT отдел'
    },
];

export const USDA = {
    "companies": [
        {
            "id": 1,
            "name": "FreeCompany",
            "description": "Свободная компания",
            "is_active": 1,
            "template_prefix": "free",
            "folder": "free",
            "color": "#ff7700",
            "ext_address_offers": null,
            "path_logo": "",
            "created_at": null,
            "updated_at": null,
            "phone": null,
            "places": [
                {
                    "id": 89,
                    "name": "bidmanager",
                    "label": "Роль менеджер",
                    "accessgroup": 4,
                    "accessname": "Менеджер",
                    "position": 210,
                    "place": 1
                },
                {
                    "id": 91,
                    "name": "bidadministrator",
                    "label": "Роль администратора",
                    "accessgroup": 4,
                    "accessname": "Администратор",
                    "position": 220,
                    "place": 2
                },
                {
                    "id": 90,
                    "name": "bidbuch",
                    "label": "Роль бухгалтера",
                    "accessgroup": 4,
                    "accessname": "Бухгалтер",
                    "position": 230,
                    "place": 3
                }
            ]
        },
        {
            "id": 2,
            "name": "Arstel",
            "description": "OOO Арстел",
            "is_active": 1,
            "template_prefix": "ars",
            "folder": "arstel",
            "color": "#ff7700",
            "ext_address_offers": null,
            "path_logo": "/images/identics/adw32jk2jl/Arstel_logo.svg",
            "created_at": null,
            "updated_at": null,
            "phone": null,
            "places": [
                {
                    "id": 89,
                    "name": "bidmanager",
                    "label": "Роль менеджер",
                    "accessgroup": 4,
                    "accessname": "Менеджер",
                    "position": 210,
                    "place": 1
                },
                {
                    "id": 91,
                    "name": "bidadministrator",
                    "label": "Роль администратора",
                    "accessgroup": 4,
                    "accessname": "Администратор",
                    "position": 220,
                    "place": 2
                },
                {
                    "id": 90,
                    "name": "bidbuch",
                    "label": "Роль бухгалтера",
                    "accessgroup": 4,
                    "accessname": "Бухгалтер",
                    "position": 230,
                    "place": 3
                }
            ]
        },
        {
            "id": 3,
            "name": "Rondo",
            "description": "ООО Рондо",
            "is_active": 1,
            "template_prefix": "rond",
            "folder": "rondo",
            "color": "#229922",
            "ext_address_offers": null,
            "path_logo": "/images/identics/iwtRd02l2h/logo_LDA.svg",
            "created_at": null,
            "updated_at": null,
            "phone": null,
            "places": [
                {
                    "id": 89,
                    "name": "bidmanager",
                    "label": "Роль менеджер",
                    "accessgroup": 4,
                    "accessname": "Менеджер",
                    "position": 210,
                    "place": 1
                },
                {
                    "id": 91,
                    "name": "bidadministrator",
                    "label": "Роль администратора",
                    "accessgroup": 4,
                    "accessname": "Администратор",
                    "position": 220,
                    "place": 2
                },
                {
                    "id": 90,
                    "name": "bidbuch",
                    "label": "Роль бухгалтера",
                    "accessgroup": 4,
                    "accessname": "Бухгалтер",
                    "position": 230,
                    "place": 3
                }
            ]
        }
    ],
    "user": {
        "id": 46,
        "surname": "Ковалев",
        "name": "Антон",
        "secondname": "Бигстэнович",
        "occupy": "коммерческий директор",
        "id_departament": 1,
        "id_role": 2,
        "email": "",
        "phone": "100",
        "id_company": 2,
        "sales_role": 1,
        "active_company": 2,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 1,
        "active_company_name": "Arstel"
    },
    "duration": 0.005259037017822266,
    "message": "OK",
    "status": 200,
    "notifications": [],
    "acls": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        27,
        28,
        33,
        34,
        36,
        37,
        39,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86,
        87,
        88,
        89,
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
        111,
        112,
        113,
        114,
        115,
        116,
        117,
        118,
        119,
        120,
        121,
        122,
        123,
        124,
        125,
        126,
        127,
        128,
        129,
        130,
        131,
        132,
        133,
        134,
        135,
        136,
        137,
        138,
        139,
        140,
        141,
        142,
        143,
        144,
        145,
        146,
        147,
        148,
        149
    ]
};

export const SCHEDULES = [
    {
        "id": 201,
        "start": "2025-12-12 00:00:00",
        "end": null,
        "enter": 26100,
        "leave": 82800,
        "lunch_start": 33300,
        "lunch_end": 64800,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "created_at": "2025-04-11 19:42:46",
        "deleted": false,
        "schedule_name": "Стандартный Арстел с 9 до 18",
        "schedule_type": 4,
        "schedule_id": 7,
        "schedule_type_name": "Стандартный",
        "schedule_type_color": "#ffe000"
    },
    {
        "id": 200,
        "start": "2025-01-09 00:00:00",
        "end": "2025-12-09 23:59:59",
        "enter": 26100,
        "leave": 82800,
        "lunch_start": 33300,
        "lunch_end": 64800,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "created_at": "2025-04-11 19:42:46",
        "deleted": false,
        "schedule_name": "Стандартный Арстел с 9 до 18",
        "schedule_type": 4,
        "schedule_id": 7,
        "schedule_type_name": "Стандартный",
        "schedule_type_color": "#ffe000"
    },
    /*{
        "id": 169,
        "start": "2025-01-01 00:00:00",
        "end": "2025-01-08 23:59:59",
        "enter": "00:00:00",
        "leave": "23:59:59",
        "lunch_start": "00:00:00",
        "lunch_end": "23:59:59",
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "created_at": "2025-06-23 17:01:05",
        "deleted": false,
        "schedule_name": "Стандартный Арстел с 9 до 18",
        "schedule_type": 2,
        "schedule_id": 7,
        "schedule_type_name": "Стандартный",
        "schedule_type_color": "#ffe000"
    },
    {
        "id": 134,
        "start": "2024-04-12 00:00:00",
        "end": "2024-12-31 23:59:59",
        "enter": "00:00:00",
        "leave": "23:59:59",
        "lunch_start": "00:00:00",
        "lunch_end": "23:59:59",
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "created_at": "2025-04-11 19:42:46",
        "deleted": false,
        "schedule_name": "Стандартный Арстел с 9 до 18",
        "schedule_type": 1,
        "schedule_id": 7,
        "schedule_type_name": "Стандартный",
        "schedule_type_color": "#ffe000"
    },
    {
        "id": 133,
        "start": "2023-03-11 00:00:00",
        "end": "2023-04-11 23:59:59",
        "enter": "00:00:00",
        "leave": "23:59:59",
        "lunch_start": "00:00:00",
        "lunch_end": "23:59:59",
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "created_at": "2025-04-11 19:42:46",
        "deleted": false,
        "schedule_name": "Стандартный Арстел с 9 до 18",
        "schedule_type": 3,
        "schedule_id": 7,
        "schedule_type_name": "Стандартный",
        "schedule_type_color": "#ffe000"
    },
    {
        "id": 132,
        "start": "2022-02-10 00:00:00",
        "end": "2022-03-10 23:59:59",
        "enter": "00:00:00",
        "leave": "23:59:59",
        "lunch_start": "00:00:00",
        "lunch_end": "23:59:59",
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "created_at": "2025-04-11 19:42:46",
        "deleted": false,
        "schedule_name": "Стандартный Арстел с 9 до 18",
        "schedule_type": 5,
        "schedule_id": 7,
        "schedule_type_name": "Стандартный",
        "schedule_type_color": "#ffe000"
    },*/
];
export const SCHEDULES_TYPES_SELECT = [
    {
        "id": 0,
        "name": "Все типы графиков",
    },
    {
        "id": 1,
        "name": "Стандартный",
        "description": "Установите начало и конец рабочего дня с учётом входящего времени обеда.\r\nСоздание односменного графика работы, с указанием фиксированного времени начала рабочего дня и его окончания.\nУказывается время начала и окончания рабочего дня. Указывается продолжительность рабочей недели.",
        "color": "#ffe000"
    },
    {
        "id": 2,
        "name": "Гибкий",
        "description": "Главное здесь - отработать требуемое количество часов в день.\nСоздание гибкого графика работы, без указания фиксированного времени начала рабочего дня и его окончания.\nУказывается количество часов, которые необходимо отработать в течение рабочего дня, продолжительность рабочей недели, диапазон рабочего времени.",
        "color": "#CCFF99"
    },
    {
        "id": 3,
        "name": "Свободный",
        "description": "Ходите на работу когда хотите. Кайфуйте - жизнь одна!\nСоздание свободного графика работы без учета рабочего времени",
        "color": "#7aefc4"
    },
    {
        "id": 4,
        "name": "Сменный",
        "description": "Указывается периодичность и продолжительность смен, количество рабочих часов в смене, время начала и окончания каждой рабочей смены.",
        "color": "#FFCC99"
    },
    {
        "id": 5,
        "name": "Суммированный",
        "description": "Единственное требование - положенное количество рабочих часов.\nВ данном случае на работу ходить нужно, но в любой удобный день и находится на работе можно столько, сколько потребуется.\nУказывается тип расчета (неделя/месяц/год) и количество времени, которое необходимо отработать за данный период",
        "color": "#DEB5FF"
    }
];
export const SCHEDULES_NAMES_SELECTS = [
    {
        "id": 11,
        "skud_schedule_type_id": 3,
        "name": "График 2025",
        "description": "Свободный график для арстелловцевъ",
        "start_time": 26100,
        "end_time": 82800,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1750772234,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 10,
        "skud_schedule_type_id": 1,
        "name": "Стд. Ранний. с 8:15 до 17",
        "description": "Ранний график для утренних менеджеров",
        "start_time": 29700,
        "end_time": 61200,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1744389211,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 9,
        "skud_schedule_type_id": 1,
        "name": "*Стандартный с 10 до 18:45",
        "description": "Для умеренных сыпунов",
        "start_time": 36000,
        "end_time": 67500,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1744388921,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 8,
        "skud_schedule_type_id": 1,
        "name": "*Стандартный с 10:45 до 19:30",
        "description": "Для тех, кто любит поспать",
        "start_time": 38700,
        "end_time": 70200,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1744388819,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 7,
        "skud_schedule_type_id": 1,
        "name": "Стандартный Рондо с 9 до 18",
        "description": "е",
        "start_time": 33300,
        "end_time": 64800,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "next_id": 0,
        "skud_prod_calendar_id": 2,
        "deleted": false,
        "created_at": 1744386682,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 6,
        "skud_schedule_type_id": 3,
        "name": "Свободный график - хожу когда хочу",
        "description": "Свободный и абсолютно свободный графи",
        "start_time": 33300,
        "end_time": 79200,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1744386353,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 5,
        "skud_schedule_type_id": 2,
        "name": "Гибкий с 8 до 21",
        "description": "Для Алана свободный график",
        "start_time": 28800,
        "end_time": 75600,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1744386189,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 4,
        "skud_schedule_type_id": 1,
        "name": "Стандартный с 9:30 до 18:15",
        "description": "Для Гранченкоа М. и Шаранда А",
        "start_time": 34200,
        "end_time": 65700,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1744386031,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 3,
        "skud_schedule_type_id": 1,
        "name": "Стандартный график с 9 до 18",
        "description": "Самый стандартный из возможных графиков",
        "start_time": 33300,
        "end_time": 64800,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1744385725,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 2,
        "skud_schedule_type_id": 2,
        "name": "Гибкий  GRAFIK",
        "description": "ALTERNATE",
        "start_time": 33300,
        "end_time": 73800,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1741012410,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    },
    {
        "id": 1,
        "skud_schedule_type_id": 1,
        "name": "OXY ENNY GRFIK",
        "description": "OXY ENNY GRFIK",
        "start_time": 33300,
        "end_time": 64800,
        "target_time": 28800,
        "target_unit": 1,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "next_id": 0,
        "skud_prod_calendar_id": 1,
        "deleted": false,
        "created_at": 1741009871,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "lunch_start": 46800,
        "lunch_end": 54000,
        "lunch_time": 2700
    }
];

export const RULES = [
    {
        "id": 7,
        "rule_type_id": 2,
        "name": "Сдвиг графика",
        "name_2": "Сдвиг графика",
        "start": "2025-07-14 00:00:00",
        "end": null,
        "duration_time": 3600,
        "variable_a": 0,
        "variable_b": 0,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "group_count": null,
        "type_color": "#ff91004b"
    },
    {
        "id": 6,
        "rule_type_id": 2,
        "name": "Автозакрытие смены для Склада - завершение рабочего дня автоматом",
        "name_2": "Автозакрытие смены для Склада - завершение рабочего дня автоматом",
        "start": "2025-07-07 00:00:00",
        "end": "2025-07-13 23:59:59",
        "duration_time": 3600,
        "variable_a": 0,
        "variable_b": 1,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "group_count": null,
        "type_color": "#00f5ab69"
    },
    {
        "id": 5,
        "rule_type_id": 2,
        "name": "Автозакрытие смены для Склада - завершение рабочего дня автоматом",
        "name_2": "Автозакрытие смены для Склада - завершение рабочего дня автоматом",
        "start": "2025-06-30 00:00:00",
        "end": "2025-07-06 23:59:59",
        "duration_time": 3600,
        "variable_a": 0,
        "variable_b": 1,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "group_count": null,
        "type_color": "#00f5ab69"
    },
    {
        "id": 4,
        "rule_type_id": 3,
        "name": "Правило хорошего тона для Арстел",
        "name_2": "Правило хорошего тона для Арстел",
        "start": "2025-07-14 00:00:00",
        "end": "2025-07-20 23:59:59",
        "duration_time": 3600,
        "variable_a": 1,
        "variable_b": 1,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "group_count": null,
        "type_color": "#7c550069"
    },
    {
        "id": 3,
        "rule_type_id": 3,
        "name": "Правило хорошего тона 2 - переработка",
        "name_2": "Правило хорошего тона 2 - переработка",
        "start": "2025-07-07 00:00:00",
        "end": "2025-07-13 23:59:59",
        "duration_time": 3600,
        "variable_a": 1,
        "variable_b": 1,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "group_count": null,
        "type_color": "#ff91004b"
    },
    /*{
        "id": 2,
        "rule_type_id": 1,
        "name": "Правило_1741014647",
        "name_2": "Правило_1741014647",
        "start": "2025-07-14 00:00:00",
        "end": "2025-07-20 23:59:59",
        "duration_time": 3600,
        "variable_a": 1,
        "variable_b": 0,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "group_count": null,
        "type_color": "#ff000069"
    },*/
    {
        "id": 1,
        "rule_type_id": 1,
        "name": "Правило_1741014647",
        "name_2": "Правило_1741014647",
        "start": "2025-07-07 00:00:00",
        "end": "2025-07-13 23:59:59",
        "duration_time": 3600,
        "variable_a": 1,
        "variable_b": 0,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "group_count": null,
        "type_color": "#ff000069"
    }
];
export const RULES_TYPES_SELECT = [
    {
        "id": 0,
        "name": "Все типы правил"
    },
    {
        "id": 1,
        "name": "Опоздания"
    },
    {
        "id": 2,
        "name": "Ранний приход"
    },
    {
        "id": 3,
        "name": "Кратковременные выходы"
    },
    {
        "id": 4,
        "name": "Отработка общего ПВ утром"
    },
    {
        "id": 5,
        "name": "Отработка общего ПВ вечером"
    },
    {
        "id": 6,
        "name": "Накопительная система"
    },
    {
        "id": 7,
        "name": "Автозакрытие смены"
    }
];
export const RULES_NAMES_SELECT = [
    {
        "id": 12,
        "rule_type_id": 7,
        "name": "dfghdfghgfdhdfghdgfhdfghdfgnbvcncbvnpenis",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "users_count": 0,
        "type_color": "#9c27b059"
    },
    {
        "id": 11,
        "rule_type_id": 3,
        "name": "sdgfghjdffghjhdfghdgf",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "users_count": 0,
        "type_color": "#7c550069"
    },
    {
        "id": 10,
        "rule_type_id": 3,
        "name": "sdfsdfsdfsdfsd",
        "duration_time": 36120,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "users_count": 0,
        "type_color": "#7c550069"
    },
    {
        "id": 9,
        "rule_type_id": 3,
        "name": "Правило_1751958365",
        "duration_time": 36060,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "users_count": 0,
        "type_color": "#7c550069"
    },
    {
        "id": 8,
        "rule_type_id": 1,
        "name": "Правило_1751957921",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 0,
        "type_color": "#ff000069"
    },
    {
        "id": 7,
        "rule_type_id": 2,
        "name": "Тестовое вот так\"",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "users_count": 0,
        "type_color": "#ff91004b"
    },
    {
        "id": 6,
        "rule_type_id": 2,
        "name": "Сдвиг графика\"",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 0,
        "type_color": "#ff91004b"
    },
    {
        "id": 5,
        "rule_type_id": 6,
        "name": "Автозакрытие смены для Склада - завершение рабочего дня автоматом",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 0,
        "type_color": "#00f5ab69"
    },
    {
        "id": 4,
        "rule_type_id": 3,
        "name": "Правило хорошего тона для Арстел",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 1,
        "type_color": "#7c550069"
    },
    {
        "id": 2,
        "rule_type_id": 2,
        "name": "Правило хорошего тона 2 - переработка",
        "duration_time": 3600,
        "deleted": false,
        "deleted_at": null,
        "creator_id": 46,
        "creator_name": "Антон",
        "creator_surname": "Ковалев",
        "creator_patronymic": "Бигстэнович",
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 2,
        "type_color": "#ff91004b"
    }
];

export const USER_GROUPS = [
    {
        "id": 9,
        "name": "СКЛАДУ",
        "description": "",
        "deleted": 0,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 4
    },
    {
        "id": 8,
        "name": "Инженеры",
        "description": "Все инженеры",
        "deleted": 0,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 9
    },
];
export const POSSIBLE_GROUPS = [
    {
        "id": 7,
        "name": "Креативный отдел",
        "description": "Нетакие люди",
        "deleted": 0,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 7
    },
    {
        "id": 6,
        "name": "Нестандартное время графика",
        "description": "Все челы, у которых нестандартное время стандартного графика",
        "deleted": 0,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 3
    },
    {
        "id": 5,
        "name": "Рондовцы",
        "description": "Rondosoundovcy zdes zhivut",
        "deleted": 0,
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "users_count": 5
    },
    {
        "id": 4,
        "name": "А это рондосаундная группа 3",
        "description": "Емай ай нид хелпхер!",
        "deleted": 0,
        "id_company": 3,
        "company_name": "Rondo",
        "company_color": "#229922",
        "users_count": 0
    },
    {
        "id": 3,
        "name": "Айтишники - отдел",
        "description": "афывафы",
        "deleted": 0,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 3
    },
    {
        "id": 2,
        "name": "Бухгалтерия",
        "description": "Для тестов, сюда ничего не добавлять!",
        "deleted": 0,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 3
    },
    {
        "id": 1,
        "name": "Продажники",
        "description": "Группа с ординарным графиком",
        "deleted": 0,
        "id_company": 2,
        "company_name": "Arstel",
        "company_color": "#ff7700",
        "users_count": 10
    },
]