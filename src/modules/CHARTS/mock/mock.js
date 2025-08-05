export const CHART_STATES = [
    {
        "id": 1,
        "badge": "",
        "text": "Не приходил в офис",
        "color": "#fefefe",
        "icon": "MinusCircleOutlined",
        "need_work": 1,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 2,
        "badge": "обед",
        "text": "Вышел на обед",
        "color": "#ffc582",
        "icon": "AppleOutlined",
        "need_work": 2,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 3,
        "badge": "перерыв",
        "text": "Вышел на перерыв",
        "color": "#fae5a9",
        "icon": "RestOutlined",
        "need_work": 2,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 4,
        "badge": "на месте",
        "text": "На работе",
        "color": "#d0f5a5",
        "icon": "CheckOutlined",
        "need_work": null,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 5,
        "badge": "ушел",
        "text": "Рабочий день закончен",
        "color": "#e4e4e4",
        "icon": "SafetyCertificateOutlined",
        "need_work": null,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 6,
        "badge": "больничный",
        "text": "Больничный",
        "color": "#ffa8a8",
        "icon": "MedicineBoxOutlined",
        "need_work": 0,
        "need_approved": 0,
        "sort_order": 6,
        "fillable": 1,
        "title": "Больничные",
        "name": "sickleave"
    },
    {
        "id": 7,
        "badge": "командировк.",
        "text": "Длительная командировка",
        "color": "#e2b4e9",
        "icon": "RocketOutlined",
        "need_work": 0,
        "need_approved": 1,
        "sort_order": 3,
        "fillable": 1,
        "title": "Командировка длительная",
        "name": "longtrip"
    },
    {
        "id": 8,
        "badge": "местн.выезд.",
        "text": "Кратковременная местная командировка",
        "color": "#e3dbf1",
        "icon": "CarOutlined",
        "need_work": 0,
        "need_approved": 1,
        "sort_order": 2,
        "fillable": 1,
        "title": "Местная командировка",
        "name": "shorttrip"
    },
    {
        "id": 9,
        "badge": "св.отпуск",
        "text": "Отпуск за свой счёт",
        "color": "#c4e8e5",
        "icon": "MoonOutlined",
        "need_work": 1,
        "need_approved": 1,
        "sort_order": 1,
        "fillable": 1,
        "title": "Отпуск за свой счёт",
        "name": "shortvacation"
    },
    {
        "id": 10,
        "badge": "отпуск",
        "text": "Плановый отпуск",
        "color": "#7adfb8",
        "icon": "SmileOutlined",
        "need_work": 0,
        "need_approved": 1,
        "sort_order": 4,
        "fillable": 1,
        "title": "Очередные отпуска",
        "name": "longvacation"
    },
    {
        "id": 11,
        "badge": "сверхурочные",
        "text": "Работа вне установленного графиком рабочего времени",
        "color": "#b7ff5c",
        "icon": "DollarOutlined",
        "need_work": 3,
        "need_approved": 1,
        "sort_order": 5,
        "fillable": 1,
        "title": "Сверхурочные",
        "name": "overtime"
    },
    {
        "id": 12,
        "badge": "опоздание",
        "text": "Опоздания на работу или выход раньше установленных границ рабочего времени",
        "color": "#ddd7b5",
        "icon": "HeatMapOutlined",
        "need_work": 1,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 13,
        "badge": "контейнеры",
        "text": "Разгрузка контейнеров на складе",
        "color": "#ffc107",
        "icon": "TruckOutlined",
        "need_work": 0,
        "need_approved": 1,
        "sort_order": 7,
        "fillable": 1,
        "title": "Разгрузка контейнеров",
        "name": "containers"
    },
    {
        "id": 14,
        "badge": "рабоч. время.",
        "text": "рабочее время",
        "color": "#85FF93",
        "icon": "CheckOutlined",
        "need_work": null,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 15,
        "badge": "ранний приход",
        "text": "пришел раньше",
        "color": "#85E7FF",
        "icon": "LoginOutlined",
        "need_work": null,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 16,
        "badge": "опоздание",
        "text": "опоздал",
        "color": "#FFC085",
        "icon": "WarningOutlined",
        "need_work": 1,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 17,
        "badge": "отработка ПВ",
        "text": "рабочее время для отработки ПВ",
        "color": "#0077EE",
        "icon": "FireOutlined",
        "need_work": 1,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 18,
        "badge": "ранний уход",
        "text": "ушел раньше",
        "color": "#FFC085",
        "icon": "ExlamationCircleOutlined",
        "need_work": 1,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 19,
        "badge": "поздн. уход",
        "text": "ушел позже",
        "color": "#85E7FF",
        "icon": "Logoutoutlined",
        "need_work": null,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 20,
        "badge": "обед. перерыв.",
        "text": "обеденное время",
        "color": "#85A3FF",
        "icon": "JavaOutlined",
        "need_work": null,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 21,
        "badge": "своб. выход",
        "text": "Свободный выход на перерыв",
        "color": "#b7a882",
        "icon": "TwitterOutlined",
        "need_work": 0,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    },
    {
        "id": 22,
        "badge": "накопление вр.",
        "text": "рабочее время для накопления запаса времени",
        "color": "#447799",
        "icon": "GoldOutlined",
        "need_work": null,
        "need_approved": 0,
        "sort_order": 0,
        "fillable": 0,
        "title": null,
        "name": null
    }
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
export const USERS = [
    {
        "name": "Админатор",
        "patronymic": "Паникулович",
        "surname": "Пультов",
        "id": 1,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Весёлая",
        "patronymic": "Пирожковна",
        "surname": "Чернышовна",
        "id": 8,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Танцующая",
        "patronymic": "Безотчетовна",
        "surname": "Гуляшкина",
        "id": 9,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Елочка",
        "patronymic": "Кексиковна",
        "surname": "Мороженова",
        "id": 10,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Леночка",
        "patronymic": "Пончикова",
        "surname": "Апельсинова",
        "id": 32,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Конфеттин",
        "patronymic": "Вафельевич",
        "surname": "Ананасов",
        "id": 33,
        "boss_id": 73,
        "match": 1
    },
    {
        "name": "Ириска",
        "patronymic": "Пончикова",
        "surname": "Бубликова",
        "id": 34,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Карамель",
        "patronymic": "Вафлевич",
        "surname": "Барбарисов",
        "id": 35,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Ягодка",
        "patronymic": "Медовна",
        "surname": "Блинникова",
        "id": 36,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Драже",
        "patronymic": "Кремовна",
        "surname": "Булочникова",
        "id": 37,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Дима",
        "patronymic": "Пельмешкович",
        "surname": "Вафлев",
        "id": 38,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Маруся",
        "patronymic": "Пончикова",
        "surname": "Вафлёва",
        "id": 39,
        "boss_id": 133,
        "match": 1
    },
    {
        "name": "Маринка",
        "patronymic": "Тортовна",
        "surname": "Пирожкова",
        "id": 40,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Танюшка",
        "patronymic": "Шоколадовна",
        "surname": "Дрожжина",
        "id": 41,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Дениска",
        "patronymic": "Карамельевич",
        "surname": "Дынёв",
        "id": 42,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Елка",
        "patronymic": "Печенюшковна",
        "surname": "Почемучкина",
        "id": 43,
        "boss_id": 46,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Серёжа",
        "patronymic": "Мармеладович",
        "surname": "Золотистый",
        "id": 44,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Лёша",
        "patronymic": "Шоколадович",
        "surname": "Зефиринов",
        "id": 45,
        "boss_id": 161,
        "match": 1
    },
    {
        "name": "Шоколандер",
        "patronymic": "Конфетный",
        "surname": "Кекселёв",
        "id": 46,
        "boss_id": 46,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Валюша",
        "patronymic": "Пончикова",
        "surname": "Плюшкина",
        "id": 47,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Аннюта",
        "patronymic": "Десертевна",
        "surname": "Лакомкина",
        "id": 48,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Мариша",
        "patronymic": "Бисквитовна",
        "surname": "Сладкова",
        "id": 49,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Валера",
        "patronymic": "Пудингович",
        "surname": "Пирожков",
        "id": 50,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Сашка",
        "patronymic": "Шоколадовна",
        "surname": "Оладушкина",
        "id": 51,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Игорька",
        "patronymic": "Марципанович",
        "surname": "Мармеладов",
        "id": 52,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Юрик",
        "patronymic": "Вафлёвич",
        "surname": "Пончиков",
        "id": 53,
        "boss_id": 46,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Анатолий",
        "patronymic": "Морожоварович",
        "surname": "Морожкин",
        "id": 54,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Юра",
        "patronymic": "Пончикович",
        "surname": "Клубничкин",
        "id": 55,
        "boss_id": 73,
        "match": 1
    },
    {
        "name": "Игорёк",
        "patronymic": "Вафлёвич",
        "surname": "Тортиков",
        "id": 56,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Дима",
        "patronymic": "Печенькович",
        "surname": "Пирожков",
        "id": 57,
        "boss_id": 46,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Васька",
        "patronymic": "Вафлёнович",
        "surname": "Плюшкинов",
        "id": 58,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Димон",
        "patronymic": "Иваныч",
        "surname": "Пончиков",
        "id": 59,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Димчик",
        "patronymic": "Сахаревич",
        "surname": "Пряничкин",
        "id": 60,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Алекс",
        "patronymic": "Вафлёнович",
        "surname": "Пакетиков",
        "id": 61,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Жанна",
        "patronymic": "Пончиковна",
        "surname": "Рогаликовна",
        "id": 62,
        "boss_id": 251,
        "match": 0
    },
    {
        "name": "Сашка",
        "patronymic": "Вафлинский",
        "surname": "Рябинов",
        "id": 63,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Леша",
        "patronymic": "Пончикович",
        "surname": "Сахаринов",
        "id": 64,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Сережа",
        "patronymic": "Пломбиревич",
        "surname": "Комаров",
        "id": 65,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Танюша",
        "patronymic": "Вафлёвна",
        "surname": "Тортикова",
        "id": 66,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Ирочка",
        "patronymic": "Пончиковна",
        "surname": "Пирожкова",
        "id": 67,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Елка",
        "patronymic": "Шоколадовна",
        "surname": "Пудингова",
        "id": 68,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Алёша",
        "patronymic": "Вафлёнович",
        "surname": "Ульянович",
        "id": 69,
        "boss_id": 0,
        "id_company": 2,
        "match": 1
    },
    {
        "name": "Юля",
        "patronymic": "Пирожковна",
        "surname": "Чекмушарова",
        "id": 70,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Оксанка",
        "patronymic": "Пирожковна",
        "surname": "Чегонина",
        "id": 71,
        "boss_id": 73,
        "match": 1
    },
    {
        "name": "Алина",
        "patronymic": "Иваныч",
        "surname": "Чупочкина",
        "id": 72,
        "boss_id": 0,
        "id_company": 2,
        "match": 0
    },
    {
        "name": "Наташа",
        "patronymic": "Пончикова",
        "surname": "Юдишкина",
        "id": 73,
        "boss_id": 46,
        "id_company": 2,
        "match": 1
    }
];
export const USERS_PAGE = [
        {
            "id": 43,
            "name": "Улыбка",
            "surname": "Пузырёва",
            "patronymic": "Бубновна",
            "charts": [
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-07-07",
                    "end": "2025-07-08",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-07-12",
                    "end": "2025-07-13",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
            ]
        },
        {
            "id": 46,
            "name": "Кександр",
            "surname": "Пирожков",
            "patronymic": "Тортович",
            "charts": [
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-03-20",
                    "end": "2025-04-15",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }
            ]
        },
        {
            "id": 47,
            "name": "Блинытина",
            "surname": "Желева",
            "patronymic": "Мармеладовна",
            "charts": [
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-03-10",
                    "end": "2025-03-15",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-04-15",
                    "end": "2025-04-28",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-09-01",
                    "end": "2025-09-10",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }
            ]
        },
        {
            "id": 57,
            "name": "Пельмирий",
            "surname": "Лапшиков",
            "patronymic": "Весёлович",
            "charts": [
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-03-04",
                    "end": "2025-03-05",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-05-01",
                    "end": "2025-08-31",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-09-15",
                    "end": "2025-09-20",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }
            ]
        },
        {
            "id": 91,
            "name": "Сыргей",
            "surname": "Мышкин",
            "patronymic": "Котикович",
            "charts": [
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-03-04",
                    "end": "2025-03-05",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-09-25",
                    "end": "2025-09-28",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }
            ]
        },
        {
            "id": 133,
            "name": "Вафлория",
            "surname": "Сироповейко",
            "patronymic": "Мёдовна",
            "charts": [
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-03-11",
                    "end": "2025-03-15",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-09-25",
                    "end": "2025-10-02",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }
            ]
        },
        {
            "id": 134,
            "name": "Барсей",
            "surname": "Беззубов",
            "patronymic": "Карамельевич",
            "charts": [
                /*{
                    "id": 71,
                    "approved": 0,
                    "start": "2025-03-04",
                    "end": "2025-03-05",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-09-25",
                    "end": "2025-09-28",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }*/
            ]
        },
        {
            "id": 180,
            "name": "ЛеоНЛО",
            "surname": "Апельсин",
            "patronymic": "Мандаринович",
            "charts": [
                /*{
                    "id": 71,
                    "approved": 0,
                    "start": "2025-03-04",
                    "end": "2025-03-05",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-05-01",
                    "end": "2025-08-31",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-09-15",
                    "end": "2025-09-20",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }*/
            ]
        },
        {
            "id": 198,
            "name": "Валясолнечка",
            "surname": "Рогаликова",
            "patronymic": "Булочковна",
            "charts": [
                /*{
                    "id": 72,
                    "approved": 0,
                    "start": "2025-03-10",
                    "end": "2025-03-15",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 72,
                    "approved": 0,
                    "start": "2025-04-15",
                    "end": "2025-04-28",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                },
                {
                    "id": 71,
                    "approved": 0,
                    "start": "2025-09-01",
                    "end": "2025-09-10",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }*/
            ]
        },
        {
            "id": 226,
            "name": "Антанасия",
            "surname": "Плетёнова",
            "patronymic": "Веничковна",
            "charts": [
                /*{
                    "id": 71,
                    "approved": 0,
                    "start": "2025-03-20",
                    "end": "2025-04-15",
                    "user_id": 43,
                    "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
                }*/
            ]
        },
    {
        "id": 43,
        "name": "Улыбка",
        "surname": "Пузырёва",
        "patronymic": "Бубновна",
        "charts": [
            {
                "id": 71,
                "approved": 0,
                "start": "2025-07-07",
                "end": "2025-07-08",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 71,
                "approved": 0,
                "start": "2025-07-12",
                "end": "2025-07-13",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
        ]
    },
    {
        "id": 46,
        "name": "Кександр",
        "surname": "Пирожков",
        "patronymic": "Тортович",
        "charts": [
            {
                "id": 71,
                "approved": 0,
                "start": "2025-03-20",
                "end": "2025-04-15",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }
        ]
    },
    {
        "id": 47,
        "name": "Блинытина",
        "surname": "Желева",
        "patronymic": "Мармеладовна",
        "charts": [
            {
                "id": 72,
                "approved": 0,
                "start": "2025-03-10",
                "end": "2025-03-15",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 72,
                "approved": 0,
                "start": "2025-04-15",
                "end": "2025-04-28",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 71,
                "approved": 0,
                "start": "2025-09-01",
                "end": "2025-09-10",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }
        ]
    },
    {
        "id": 57,
        "name": "Пельмирий",
        "surname": "Лапшиков",
        "patronymic": "Весёлович",
        "charts": [
            {
                "id": 71,
                "approved": 0,
                "start": "2025-03-04",
                "end": "2025-03-05",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 71,
                "approved": 0,
                "start": "2025-05-01",
                "end": "2025-08-31",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 72,
                "approved": 0,
                "start": "2025-09-15",
                "end": "2025-09-20",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }
        ]
    },
    {
        "id": 91,
        "name": "Сыргей",
        "surname": "Мышкин",
        "patronymic": "Котикович",
        "charts": [
            {
                "id": 71,
                "approved": 0,
                "start": "2025-03-04",
                "end": "2025-03-05",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 72,
                "approved": 0,
                "start": "2025-09-25",
                "end": "2025-09-28",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }
        ]
    },
    {
        "id": 133,
        "name": "Вафлория",
        "surname": "Сироповейко",
        "patronymic": "Мёдовна",
        "charts": [
            {
                "id": 71,
                "approved": 0,
                "start": "2025-03-11",
                "end": "2025-03-15",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 72,
                "approved": 0,
                "start": "2025-09-25",
                "end": "2025-10-02",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }
        ]
    },
    {
        "id": 134,
        "name": "Барсей",
        "surname": "Беззубов",
        "patronymic": "Карамельевич",
        "charts": [
            /*{
                "id": 71,
                "approved": 0,
                "start": "2025-03-04",
                "end": "2025-03-05",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 72,
                "approved": 0,
                "start": "2025-09-25",
                "end": "2025-09-28",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }*/
        ]
    },
    {
        "id": 180,
        "name": "ЛеоНЛО",
        "surname": "Апельсин",
        "patronymic": "Мандаринович",
        "charts": [
            /*{
                "id": 71,
                "approved": 0,
                "start": "2025-03-04",
                "end": "2025-03-05",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 71,
                "approved": 0,
                "start": "2025-05-01",
                "end": "2025-08-31",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 72,
                "approved": 0,
                "start": "2025-09-15",
                "end": "2025-09-20",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }*/
        ]
    },
    {
        "id": 198,
        "name": "Валясолнечка",
        "surname": "Рогаликова",
        "patronymic": "Булочковна",
        "charts": [
            /*{
                "id": 72,
                "approved": 0,
                "start": "2025-03-10",
                "end": "2025-03-15",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 72,
                "approved": 0,
                "start": "2025-04-15",
                "end": "2025-04-28",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            },
            {
                "id": 71,
                "approved": 0,
                "start": "2025-09-01",
                "end": "2025-09-10",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }*/
        ]
    },
    {
        "id": 226,
        "name": "Антанасия",
        "surname": "Плетёнова",
        "patronymic": "Веничковна",
        "charts": [
            /*{
                "id": 71,
                "approved": 0,
                "start": "2025-03-20",
                "end": "2025-04-15",
                "user_id": 43,
                "info": "{\"description\":\"вафыва фы а фы ва фы ва ф ывафывафы вафы\"}",
            }*/
        ]
    }
    ];
export const DEPARTMENTS = [
    {
        "id": 1,
        "name": "Администрация",
        "count": 3
    },
    {
        "id": 2,
        "name": "Отдел персонала",
        "count": 3
    },
    {
        "id": 3,
        "name": "Бухгалтерия",
        "count": 4
    },
    {
        "id": 4,
        "name": "Техническая группа проектного отдела",
        "count": 1
    },
    {
        "id": 5,
        "name": "Отдел оптовых продаж",
        "count": 13
    },
    {
        "id": 7,
        "name": "Технический отдел трансляционного звука",
        "count": 6
    },
    {
        "id": 8,
        "name": "Проектный отдел",
        "count": 2
    },
    {
        "id": 9,
        "name": "Склад Санкт-Петербург",
        "count": 4
    },
    {
        "id": 11,
        "name": "Строительный отдел",
        "count": 4
    },
    {
        "id": 14,
        "name": "Отдел информационных технологий",
        "count": 8
    },
    {
        "id": 15,
        "name": "Отдел информации",
        "count": 2
    },
    {
        "id": 17,
        "name": "Пулково КПП",
        "count": 4
    },
    {
        "id": 18,
        "name": "Пулково 19",
        "count": 5
    },
    {
        "id": 19,
        "name": "Контрагенты",
        "count": 3
    },
    {
        "id": 20,
        "name": "Технический отдел профессионального звука",
        "count": 3
    },
    {
        "id": 21,
        "name": "Отдел Логистики",
        "count": 1
    }
];
export const GROUPS = [
    {
        "id": 1,
        "name": "Продажники",
        "count": 0
    },
    {
        "id": 2,
        "name": "Бухгалтерия",
        "count": 0
    },
    {
        "id": 3,
        "name": "Айтишники - отдел",
        "count": 0
    },
    {
        "id": 4,
        "name": "А это рондосаундная группа 3",
        "count": 0
    },
    {
        "id": 5,
        "name": "Рондовцы",
        "count": 0
    },
    {
        "id": 6,
        "name": "Нестандартное время графика",
        "count": 0
    },
    {
        "id": 7,
        "name": "Креативный отдел",
        "count": 0
    },
    {
        "id": 8,
        "name": "Инженеры",
        "count": 0
    },
    {
        "id": 9,
        "name": "СКЛАДУ",
        "count": 0
    },
    {
        "id": 14,
        "name": "Глинтерники",
        "count": 0
    }
];
export const CLAIM_ACL_MOCK = {
    "2": {
        "6": [
            "ANY_CLAIM_APPROVE",
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "7": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "8": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "9": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "10": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "11": [
            "TEAM_CLAIM_UPDATE",
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "13": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ]
    },
    "3": {
        "6": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "7": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "8": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "9": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "10": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "11": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ],
        "13": [
            "PERS_CLAIM_CREATE",
            "PERS_CLAIM_UPDATE",
            "PERS_CLAIM_APPROVE",
            "TEAM_CLAIM_CREATE",
            "TEAM_CLAIM_UPDATE",
            "TEAM_CLAIM_APPROVE",
            "ANY_CLAIM_CREATE",
            "ANY_CLAIM_UPDATE",
            "ANY_CLAIM_APPROVE"
        ]
    }
};
export const STATUSES = [
    {
        "id": "0",
        "name": "Работают",
        "count": 66
    },
    {
        "id": "1",
        "name": "Уволенные",
        "count": 276
    }
];
export const COMPANIES = [
    {
        "id": 2,
        "name": "Arstel",
        "count": 336
    },
    {
        "id": 3,
        "name": "Rondo",
        "count": 7
    }
];
