import React from "react";


// Данные о пользователе
export const DS_USER = {
    "acls" : [
        94,
        92,
        62,
        73,
        57,
        60,
        53,
        52,
        51,
        75,
        149,
        141,
        142,
        143,
        144,
        145,
        146,
        147,
        148,
        5,
        17,
        61,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        77,
        107,
        96,
        95,
        88,
        87,
        86,
        85,
        118,
        108,
        84,
        81
      ],
    "companies": [
        {
            "id": 1,
            "name": "All companies",
            "description": "Everyting",
            "is_active": 1,
            "template_prefix": "all",
            "folder": "all",
            "color": "#2ccf2c",
            "ext_address_offers": "/",
            "path_logo": "/images/identics/iwtRd02l2h/logo.png",
            "created_at": null,
            "updated_at": null,
            "places": []
        },
        {
            "id": 3,
            "name": "Rondo",
            "description": "ООО Рондо",
            "is_active": 1,
            "template_prefix": "rond",
            "folder": "rondo",
            "color": "#2ccf2c",
            "ext_address_offers": "/",
            "path_logo": "/images/identics/iwtRd02l2h/logo.png",
            "created_at": null,
            "updated_at": null,
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
                }
            ]
        },
        {
            "id": 2,
            "name": "Arstel",
            "description": "ООО Арстел",
            "is_active": 1,
            "template_prefix": "ars",
            "folder": "arstel",
            "color": "#ff7700",
            "ext_address_offers": "/",
            "path_logo": "/images/identics/adw32jk2jl/Arstel_logo.svg",
            "created_at": null,
            "updated_at": null,
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
        "name" :'Игнат' ,
        "surname": 'Крудо',
        "patronymic": 'Мамонович',
        "occupy": "коммерческий директор",
        "passcard": null,
        "id_role": 2,
        "email": null,
        "sales_role": 2,
        "password2": "$2y$12$vwqewb1to3XkD3FUvSrgoeydtcmsswjQSp6DWvJfxZanevLwAq6BS",
        "active_company": 1,
        "id_departament": 11,
        "id_company" : 1,
    },
    "mode": 0,
    "duration": 0.0012869834899902344,
    "state": []
}


export const DS_DEFAULT_USER = {
    "companies": [],
    "user": {
        "id": null,
        "surname": null,
        "name": null,
        "secondname": null,
        "occupy": null,
        "passcard": null,
        "id_role": null,
        "email": null,
        "sales_role": 1,
        "password2": null,
        "active_company": null
    },
    "mode": null,
}

export const DS_SCHED_TYPES = [
    
    {
        key: 'schedtype1',
        value: 1,
        label: 'Односменный',
        description: "Установите начало и конец рабочего дня с учётом входящего времени обеда.\r\nСоздание односменного графика работы, с указанием фиксированного времени начала рабочего дня и его окончания.\nУказывается время начала и окончания рабочего дня. Указывается продолжительность рабочей недели. "
    },
    {
        key: 'schedtype2',
        value: 2,
        label: 'Гибкий',
        description: "Главное здесь - отработать требуемое количество часов в день.\nСоздание гибкого графика работы , без указания фиксированного времени начала рабочего дня и его окончания.\nУказывается количество часов, которые необходимо отработать в течение рабочего дня, продолжительность рабочей недели, диапазон рабочего времени.\n"
    },
    {
        key: 'schedtype3',
        value: 3,
        label: 'Свободнiй',
        description: "Ходите на работу когда хотите. Кайфуйте - жизнь одна!\nСоздание свободного графика работы без учета рабочего времени",
    },
    {
        key: 'schedtype4',
        value: 4,
        label: 'Сменный',
        description: "Указывается переодичность и продолжительность смен, количество рабочих часов в смене, время начала и окончания каждой рабочей смены."    },
    {
        key: 'schedtype5',
        value: 5,
        label: 'Суммированный',
        description: "Не важно кто ты... главное, чтобы отработал положенное количество рабочих часов.\nВ данном случае на работу ходить нужно, но в любой удобный день и находится на работе можно столько, сколько потребуется./n Указывается тип расчета (неделя/месяц/год) и количество времени, которое необходимо отрабоать за данный период",
        color: "#FIFA"
    },
];

export const DS_SCHED_TYPES_DB = [
    {
        id: 1,
        name: 'Стандартный',
        description: "Установите начало и конец рабочего дня с учётом входящего времени обеда.\r\nСоздание односменного графика работы, с указанием фиксированного времени начала рабочего дня и его окончания.\nУказывается время начала и окончания рабочего дня. Указывается продолжительность рабочей недели. ",
        color: "#FFFF99",
    },
    {
        id: 2,
        name: 'Гибкий',
        description: "Главное здесь - отработать требуемое количество часов в день.\nСоздание гибкого графика работы , без указания фиксированного времени начала рабочего дня и его окончания.\nУказывается количество часов, которые необходимо отработать в течение рабочего дня, продолжительность рабочей недели, диапазон рабочего времени.\n",
        color: "#CCFF99",
    },
    {
        id: 3,
        name: 'Свободный',
        description: "Ходите на работу когда хотите. Кайфуйте - жизнь одна!\nСоздание свободного графика работы без учета рабочего времени",
        color: "#CCFF99",
    },
    {
        id: 4,
        name: 'Сменный',
        description: "Указывается периодичность и продолжительность смен, количество рабочих часов в смене, время начала и окончания каждой рабочей смены.",
        color: "#FFCC99",
    },
    {
        id: 5,
        name: 'Суммированный',
        description: "Единственное требование - положенное количество рабочих часов.\nВ данном случае на работу ходить нужно, но в любой удобный день и находится на работе можно столько, сколько потребуется./n Указывается тип расчета (неделя/месяц/год) и количество времени, которое необходимо отработать за данный период",
        color: "#DEB5FF",
    },
];

export const DS_SCHED_UNITS = [
    {
        key: 'unittype1',
        value: 1,
        label: 'День',
    },
    {
        key: 'unittype2',
        value: 2,
        label: 'Неделя'
    },
    {
        key: 'unittype3',
        value: 3,
        label: 'Месяц'
    },
    {
        key: 'unittype4',
        value: 4,
        label: 'Год'
    },
];

export const DS_DEFAULT_USERS = [
    {
        key: '1',
        id: 1,
        name: 'Мартин Г.П.',
        surname: 'Гоал',
        patronymic: 'Cлэбб',
        enter: ['2025-01-10 11:05:04'],
        exit: ['2025-01-10 11:05:04'],
        exittime: { time: 61, count: 3 },
        losttime: 47,
        state: 0, // Отсутствует
        department: 1,
        id_company : 1,
    },
    {
        key: '2',
        id: 2,
        name: 'Студень Ф.Ш.',
        surname: 'Гоал',
        patronymic: 'Cлэбб',
        enter: ['2025-01-10 11:05:04'],
        exit: ['2025-01-10 11:05:04'],
        exittime: { time: 21, count: 1 },
        losttime: 17,
        state: 10, // На месте
        department: 1,
        id_company : 1,
    },
    {
        key: '3',
        id: 3,
        name: 'Григорий ',
        surname: 'Гоал',
        patronymic: 'Cлэбб',
        enter: ['2025-01-10 11:05:04'],
        exit: ['2025-01-10 11:05:04'],
        exittime: { time: 21, count: 1 },
        losttime: 17,
        state: 5, // Вышел (на обед или по делам)
        department: 1,
        id_company : 1,
    },
    {
        key: '4',
        id: 4,
        name: 'Смешарик ',
        surname: 'Киндерман',
        patronymic: 'Ауяф',
        enter: ['2025-01-10 09:00:00'],
        exit: ['2025-01-10 17:00:00'],
        exittime: { time: 480, count: 1 },
        losttime: 0,
        state:10, // На месте
        department: 2,
        id_company : 1,
    },
    {
        key: '5',
        id: 5,
        name: 'Петра',
        surname: 'Янсон',
        patronymic: 'Дженниновна',
        enter: ['2025-01-10 09:30:00'],
        exit: ['2025-01-10 15:30:00'],
        exittime: { time: 240, count: 2 },
        losttime: 20,
        state: 5, // Вышел (на обед или по делам)
        department: 2,
        id_company : 1,
    },
    {
        key: '6',
        id: 6,
        name: 'Лягушка ',
        surname: 'Жабка',
        patronymic: 'Киркоровна',
        enter: ['2025-01-10 08:45:00'],
        exit: ['2025-01-10 16:45:00'],
        exittime: { time: 420, count: 1 },
        losttime: 30,
        state: 0, // Отсутствует
        department: 5,
        id_company : 1,
    },
    {
        key: '7',
        id: 7,
        name: 'Кот ',
        surname: 'Матроскин',
        patronymic: 'Петрович',
        enter: ['2025-01-10 10:00:00'],
        exit:['2025-01-10 18:00;00'],
        exittime:{ time :480 , count :1},
         losttime :0 ,
         state : 10 , //На месте
         department: 6,
         id_company : 1,
    },
    {
      key:'8',
      id :8 ,
      name :'Бобер' ,
      surname: 'Вебер',
      patronymic: 'Бобрович',
      enter :['2025 -01 -10  11 :15 :00'] ,
      exit :['2025 -01 -10   19 :15 :00'] ,
      exittime :{ time :240 , count :2} ,
      losttime :15 ,
      state : 5 , //Вышел (на обед или по делам)
      department: 6,
      id_company : 1,
    },
    {
      key:'9',
      id :9 ,
      name :'Супермен ' ,
      surname: 'Себлинг',
      patronymic: 'Дженин',
      enter :['2025 -01 -10  09 :15 :00'] ,
      exit :['2025 -01 -10  17 :15 :00'] ,
      exittime :{ time :480 , count :1} ,
      losttime :0 ,
      state : 10 , //На месте
      department: 7,
      id_company : 1,
    },
    {
      key:'10',
      id :10 ,
      name :'Филипп ' ,
      surname: 'Фантазёр',
      patronymic: 'Cлэбб',
      enter :['2025 -01 -10  08 :30 :00'] ,
      exit :['2025 -01 -10  16 :30 :00'] ,
      exittime :{ time :420 , count :1} ,
      losttime :25 ,
      state : 0 , //Отсутствует
      department: 7,
      id_company : 1,
    },
    {
      key:'11',
      id :11 ,
      phone :'530-40-10' ,
      name :'Булька ' ,
      surname: 'Бульдозер',
      patronymic: 'Вайп-Дорф',
      enter:['2025 -01 -10  09 :45 :00'] ,
      exit:['2025 -01 -10  17 :45 ;00'] ,
      exittime:{ time :480 , count :1} ,
      losttime :0 ,
      state : 5 , //Вышел (на обед или по делам)
      department: 7,
      id_company : 2,
    },
    {
       key:'12',
       id :'12' ,
       name :'Капитан-Кот' ,
       surname: 'Гогг',
       patronymic: 'Глыба',
       enter:['2025 -01 -10  08 ;15 ;00'] ,
       exit:['2025 -01 -10  16 ;15 ;00'] ,
       exittime:{ time :'480' , count :'1'} ,
       losttime :'0' ,
       state : 10 , //На месте
       department: 7,
       id_company : 2,
     },
     {
       key:'13',
       id :'13' ,
       name :'Дядя Фёдор' ,
       surname: 'Кайдзо',
       patronymic: 'Сиен',
       enter:['2025 -01 -10  08 ;30 ;00'] ,
       exit:['2025 -01 -10  16 ;30 ;00'] ,
       exittime:{ time :'420' , count :'1'} ,
       losttime :'20' , 
       state :5 , //Вышел (на обед или по делам)
       department: 10,
       id_company : 1,
     },
     {
        key:'112',
        id :'112' ,
        name :'Желудь' ,
        surname: 'Стоклан',
        patronymic: 'Балабасович',
        enter:['2025 -01 -10  08 ;15 ;00'] ,
        exit:['2025 -01 -10  16 ;15 ;00'] ,
        exittime:{ time :'480' , count :'1'} ,
        losttime :'0' ,
        state : 10 , //На месте
        department: 11,
        id_company : 1,
      },
      {
        key:'46',
        id :'46' ,
        name :'Игнат' ,
        surname: 'Крудо',
        patronymic: 'Мамонович',
        enter:['2025 -01 -10  08 ;30 ;00'] ,
        exit:['2025 -01 -10  16 ;30 ;00'] ,
        exittime:{ time :'420' , count :'1'} ,
        losttime :'20' , 
        state :5 , //Вышел (на обед или по делам)
        department: 11,
        id_company : 2,
        occupy: "Дармоед",
        status: 0,
      }
];


export const DS_COMPANIES =         [
    {key: 0,value: 0, label: 'Все компании'},
    {key: 1,value: 1, label: 'Arstel'},
    {key: 2,value: 2, label: 'Rondo'},
    {key: 3,value: 3, label: 'Maximus'}
];


// export const DS_DEPARTMENTS = [
//     {key: 0,value: 0, label: 'Все подразделения'},
//     {key: 1,value: 1, label: 'Администрация'},
//     {key: 2,value: 2, label: 'Бухгалтерия'},
//     {key: 3,value: 3, label: 'Отдел продаж'},
//     {key: 4,value: 4, label: 'IT отдел'},
//     {key: 5,value: 5, label: 'Сервисный отдел'},
//     {key: 6,value: 6, label: 'Логистика'}
// ];

export const DS_DEPARTMENTS = [
    {
        "id": 1,
        "name": "Администрация",
        "rang": 1,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 37, 
        "id_company" : 1,
    },
    {
        "id": 2,
        "name": "Отдел персонала",
        "rang": 30,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 27
    },
    {
        "id": 3,
        "name": "Бухгалтерия",
        "rang": 10,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 18
    },
    {
        "id": 4,
        "name": "Техническая группа проектного отдела",
        "rang": 140,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 3
    },
    {
        "id": 5,
        "name": "Отдел оптовых продаж",
        "rang": 50,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 67
    },
    {
        "id": 6,
        "name": "Отдел рекламы",
        "rang": 70,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 17
    },
    {
        "id": 7,
        "name": "Технический отдел трансляционного звука",
        "rang": 60,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 25
    },
    {
        "id": 8,
        "name": "Проектный отдел",
        "rang": 100,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 26
    },
    {
        "id": 9,
        "name": "Склад Санкт-Петербург",
        "rang": 120,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 11
    },
    {
        "id": 11,
        "name": "Строительный отдел",
        "rang": 110,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 14
    },
    {
        "id": 13,
        "name": "Дилерский отдел",
        "rang": 130,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 1
    },
    {
        "id": 14,
        "name": "Отдел информационных технологий",
        "rang": 90,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 24
    },
    {
        "id": 15,
        "name": "Отдел информации",
        "rang": 40,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 22
    },
    {
        "id": 17,
        "name": "Пулково КПП",
        "rang": 150,
        "visible": 0,
        "deleted": 0,
        "icon": null,
        "user_count": 9
    },
    {
        "id": 18,
        "name": "Пулково 19",
        "rang": 170,
        "visible": 0,
        "deleted": 0,
        "icon": null,
        "user_count": 20
    },
    {
        "id": 19,
        "name": "Контрагенты",
        "rang": 180,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 5
    },
    {
        "id": 20,
        "name": "Технический отдел профессионального звука",
        "rang": 80,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 3
    },
    {
        "id": 21,
        "name": "Отдел Логистики",
        "rang": 20,
        "visible": 1,
        "deleted": 0,
        "icon": null,
        "user_count": 2
    }
];

export const DS_PROD_CALENDAR = {
    "year": 2025,
    "months": [
      {
        "month": 1,
        "days": "1,2,3,4,5,6,7,8,11,12,18,19,25,26"
      },
      {
        "month": 2,
        "days": "1,2,8,9,15,16,22,23"
      },
      {
        "month": 3,
        "days": "1,2,7*,8,9,15,16,22,23,29,30"
      },
      {
        "month": 4,
        "days": "5,6,12,13,19,20,26,27,30*"
      },
      {
        "month": 5,
        "days": "1,2+,3,4,8+,9,10,11,17,18,24,25,31"
      },
      {
        "month": 6,
        "days": "1,7,8,11*,12,13+,14,15,21,22,28,29"
      },
      {
        "month": 7,
        "days": "5,6,12,13,19,20,26,27"
      },
      {
        "month": 8,
        "days": "2,3,9,10,16,17,23,24,30,31"
      },
      {
        "month": 9,
        "days": "6,7,13,14,20,21,27,28"
      },
      {
        "month": 10,
        "days": "4,5,11,12,18,19,25,26"
      },
      {
        "month": 11,
        "days": "1*,2,3+,4,8,9,15,16,22,23,29,30"
      },
      {
        "month": 12,
        "days": "6,7,13,14,20,21,27,28,31+"
      }
    ],
    "transitions": [
      {"from": "01.04", "to": "05.02"},
      {"from": "02.23", "to": "05.08"},
      {"from": "03.08", "to": "06.13"},
      {"from": "11.01", "to": "11.03"},
      {"from": "01.05", "to": "12.31"}
    ],
    "statistic": {
      "workdays": 247,
      "holidays": 118,
      "hours40": 1972,
      "hours36": 1774.4,
      "hours24": 1181.6
    }
  };

  export const DS_YEARMONTHS_SELECT = [
    {
        key: 'yearmonth00',
        value: 0,
        label: 'Все месяцы'
    },
    {
        key: 'yearmonth01',
        value: 1,
        label: 'Январь'
    },
    {
        key: 'yearmonth02',
        value: 2,
        label: 'Февраль'
    },
    {
        key: 'yearmonth03',
        value: 3,
        label: 'Март'
    },
    {
        key: 'yearmonth04',
        value: 4,
        label: 'Апрель'
    },
    {
        key: 'yearmonth05',
        value: 5,
        label: 'Май'
    },
    {
        key: 'yearmonth06',
        value: 6,
        label: 'Июнь'
    },
    {
        key: 'yearmonth07',
        value: 7,
        label: 'Июль'
    },
    {
        key: 'yearmonth08',
        value: 8,
        label: 'Август'
    },
    {
        key: 'yearmonth09',
        value: 9,
        label: 'Сентябрь'
    },
    {
        key: 'yearmonth10',
        value: 10,
        label: 'Октябрь'
    },
    {
        key: 'yearmonth11',
        value: 11,
        label: 'Ноябрь'
    },
    {
        key: 'yearmonth12',
        value: 12,
        label: 'Декабрь'
    }
];


export const DS_SKUD_SCHEDULE_TYPES = [
    {
        id: 1,
        name : "Пятидневный",
        description: "Обычная пятидневная рабочая неделя со всеми праздниками и выходными",
        color: "#FFFF99",
        disabled: 0
    },
    {
        id: 2,
        name : "Гибкий",
        description: "Прихожу в заданном интервале рабочего времени, цель здесь - набрать нужное кол-во часов за указанный период",
        color: "#CCFF99",
        disabled: 0
    },
    {
        id: 3,
        name : "Свободный",
        description: "Когда хочу, тогда и прихожу, сколько хочу, столько и сижу",
        color: "#CCFF99",
        disabled: 0
    },
    {
        id: 4,
        name : "Сменный",
        description: "Два через Два по 12 часов и подобные графики",
        color: "#FFCC99",
        disabled: 0
    },
    {
        id: 5,
        name : "Суммированный",
        description: "Работаю когда хочу, главное, чтобы набрал время",
        color: "#DEB5FF",
        disabled: 0
    },
];


const DS_OFFICIAL_SCHED = {
    "year": 2025,
    total: 365,
    wtotal:247,
    "htotal": 118,
    year: 2025,
    "months": [
        {
            "month": 1,
            "days": [
                {
                    "d": 1
                },
                {
                    "d": 2
                },
                {
                    "d": 3
                },
                {
                    "d": 4,
                    "mv_to": {
                        "l": 0,
                        "m": 5,
                        "d": 2
                    }
                },
                {
                    "d": 5,
                    "mv_to": {
                        "l": 4,
                        "m": 12,
                        "d": 31
                    }
                },
                {
                    "d": 6
                },
                {
                    "d": 7
                },
                {
                    "d": 8
                },
                {
                    "d": 11
                },
                {
                    "d": 12
                },
                {
                    "d": 18
                },
                {
                    "d": 19
                },
                {
                    "d": 25
                },
                {
                    "d": 26
                }
            ]
        },
        {
            "month": 2,
            "days": [
                {
                    "d": 1
                },
                {
                    "d": 2
                },
                {
                    "d": 8
                },
                {
                    "d": 9
                },
                {
                    "d": 15
                },
                {
                    "d": 16
                },
                {
                    "d": 22
                },
                {
                    "d": 23,
                    "mv_to": {
                        "l": 1,
                        "m": 5,
                        "d": 8
                    }
                }
            ]
        },
        {
            "month": 3,
            "days": [
                {
                    "d": 1
                },
                {
                    "d": 2
                },
                {
                    "d": 7,
                    "short": 1,
                    "w": 1
                },
                {
                    "d": 8,
                    "mv_to": {
                        "l": 2,
                        "m": 6,
                        "d": 13
                    }
                },
                {
                    "d": 9
                },
                {
                    "d": 15
                },
                {
                    "d": 16
                },
                {
                    "d": 22
                },
                {
                    "d": 23
                },
                {
                    "d": 29
                },
                {
                    "d": 30
                }
            ]
        },
        {
            "month": 4,
            "days": [
                {
                    "d": 5
                },
                {
                    "d": 6
                },
                {
                    "d": 12
                },
                {
                    "d": 13
                },
                {
                    "d": 19
                },
                {
                    "d": 20
                },
                {
                    "d": 26
                },
                {
                    "d": 27
                },
                {
                    "d": 30,
                    "short": 1,
                    "w": 1
                }
            ]
        },
        {
            "month": 5,
            "days": [
                {
                    "d": 1
                },
                {
                    "d": 2,
                    "mv_from": {
                        "l": 0,
                        "m": 1,
                        "d": 4
                    }
                },
                {
                    "d": 3
                },
                {
                    "d": 4
                },
                {
                    "d": 8,
                    "mv_from": {
                        "l": 1,
                        "m": 2,
                        "d": 23
                    }
                },
                {
                    "d": 9
                },
                {
                    "d": 10
                },
                {
                    "d": 11
                },
                {
                    "d": 17
                },
                {
                    "d": 18
                },
                {
                    "d": 24
                },
                {
                    "d": 25
                },
                {
                    "d": 31
                }
            ]
        },
        {
            "month": 6,
            "days": [
                {
                    "d": 1
                },
                {
                    "d": 7
                },
                {
                    "d": 8
                },
                {
                    "d": 11,
                    "short": 1,
                    "w": 1
                },
                {
                    "d": 12
                },
                {
                    "d": 13,
                    "mv_from": {
                        "l": 2,
                        "m": 3,
                        "d": 8
                    }
                },
                {
                    "d": 14
                },
                {
                    "d": 15
                },
                {
                    "d": 21
                },
                {
                    "d": 22
                },
                {
                    "d": 28
                },
                {
                    "d": 29
                }
            ]
        },
        {
            "month": 7,
            "days": [
                {
                    "d": 5
                },
                {
                    "d": 6
                },
                {
                    "d": 12
                },
                {
                    "d": 13
                },
                {
                    "d": 19
                },
                {
                    "d": 20
                },
                {
                    "d": 26
                },
                {
                    "d": 27
                }
            ]
        },
        {
            "month": 8,
            "days": [
                {
                    "d": 2
                },
                {
                    "d": 3
                },
                {
                    "d": 9
                },
                {
                    "d": 10
                },
                {
                    "d": 16
                },
                {
                    "d": 17
                },
                {
                    "d": 23
                },
                {
                    "d": 24
                },
                {
                    "d": 30
                },
                {
                    "d": 31
                }
            ]
        },
        {
            "month": 9,
            "days": [
                {
                    "d": 6
                },
                {
                    "d": 7
                },
                {
                    "d": 13
                },
                {
                    "d": 14
                },
                {
                    "d": 20
                },
                {
                    "d": 21
                },
                {
                    "d": 27
                },
                {
                    "d": 28
                }
            ]
        },
        {
            "month": 10,
            "days": [
                {
                    "d": 4
                },
                {
                    "d": 5
                },
                {
                    "d": 11
                },
                {
                    "d": 12
                },
                {
                    "d": 18
                },
                {
                    "d": 19
                },
                {
                    "d": 25
                },
                {
                    "d": 26
                }
            ]
        },
        {
            "month": 11,
            "days": [
                {
                    "d": 1,
                    "short": 1,
                    "w": 1,
                    "mv_to": {
                        "l": 3,
                        "m": 11,
                        "d": 3
                    }
                },
                {
                    "d": 2
                },
                {
                    "d": 3,
                    "mv_from": {
                        "l": 3,
                        "m": 11,
                        "d": 1
                    }
                },
                {
                    "d": 4
                },
                {
                    "d": 8
                },
                {
                    "d": 9
                },
                {
                    "d": 15
                },
                {
                    "d": 16
                },
                {
                    "d": 22
                },
                {
                    "d": 23
                },
                {
                    "d": 29
                },
                {
                    "d": 30
                }
            ]
        },
        {
            "month": 12,
            "days": [
                {
                    "d": 6
                },
                {
                    "d": 7
                },
                {
                    "d": 13
                },
                {
                    "d": 14
                },
                {
                    "d": 20
                },
                {
                    "d": 21
                },
                {
                    "d": 27
                },
                {
                    "d": 28
                },
                {
                    "d": 31,
                    "mv_from": {
                        "l": 4,
                        "m": 1,
                        "d": 5
                    }
                }
            ]
        }
    ]
};

export const DS_DEFAULT_SCHED = {
    "year": 2025,
    "total": 365,
    "wtotal":247,
    "htotal": 118,
    "year": 2025,
    "months": [
        {
            "month": 1,
            "days": [
            ]
        },
        {
            "month": 2,
            "days": [
            ]
        },
        {
            "month": 3,
            "days": [
            ]
        },
        {
            "month": 4,
            "days": [
            ]
        },
        {
            "month": 5,
            "days": [
            ]
        },
        {
            "month": 6,
            "days": [
            ]
        },
        {
            "month": 7,
            "days": [
            ]
        },
        {
            "month": 8,
            "days": [
            ]
        },
        {
            "month": 9,
            "days": [
            ]
        },
        {
            "month": 10,
            "days": [
            ]
        },
        {
            "month": 11,
            "days": [
            ]
        },
        {
            "month": 12,
            "days": [  
            ]
        }
    ]
};

export const DS_PROD_CALENDARS = [
    {
        id: 1,
        year: '2024',
        count_days: 100,
        count_work_days: 100,
        count_holidays: 100,
        archieved: 1,
        schedule: DS_OFFICIAL_SCHED,
        creator_id: 377,
        created_at: 1737782394,
        id_company: 1,

        company_color: '#ff7700',
        company_name: 'Arstel',
        count_links: 2,
    },
    {
        id: 2,
        year: '2025',
        count_days: 100,
        count_work_days: 100,
        count_holidays: 100,
        archieved: 0,
        schedule: DS_OFFICIAL_SCHED,
        creator_id: 377,
        created_at: 1737782394,
        id_company: 1,

        company_color: '#ff7700',
        company_name: 'Arstel',
        count_links: 16,
    },
    {
        id: 3,
        year: '2025',
        count_days: 100,
        count_work_days: 100,
        count_holidays: 100,
        archieved: 0,
        schedule: DS_OFFICIAL_SCHED,
        creator_id: 377,
        created_at: 1737782394,
        id_company: 2,

        company_color: '#2ccf2c',
        company_name: 'Rondo',
        count_links: 1,
    },
    {
        id: 4,
        year: '2026',
        count_days: 100,
        count_work_days: 100,
        count_holidays: 100,
        archieved: -1,
        schedule: DS_OFFICIAL_SCHED,
        creator_id: 377,
        created_at: 1737782394,
        id_company: 2,

        company_color: '#2ccf2c',
        company_name: 'Rondo',
        count_links: 0,
    },
]


export const DS_SCHEDULE_LIST = [
    
    {
        "id": 5,
        "id_company" : 2,
        "company_name": "Arstel",
        "company_color": "#FF9900",
        "skud_schedule_type_id": 1,
        "name": "Super schedule F1RST",
        "description": "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        "start_time": 32400,
        "end_time": 1738968722,
        "target_time": (60*60*8),
        "target_unit": 1,
        "lunch_start": 53600,
        "lunch_end": 55000,
        "lunch_time": (1*60*45),
        "schedule": ["2025-02-18", 46230, 55500],
        "next_id": null,
        "deleted": 0,
        "skud_prod_calendar_id": 2,
        "created_at": 1739895051,
        "creator_id": 377
    },
    {
        "id": 6,
        "id_company" : 2,
        "company_name": "Arstel",
        "company_color": "#FF9900",
        "skud_schedule_type_id": 2,
        "name": "Super schedule SCND",
        "description": "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        "start_time": 32400,
        "end_time": 1738968722,
        "target_time": (60*60*8),
        "target_unit": 1,
        "lunch_start": 53600,
        "lunch_end": 55000,
        "lunch_time": (1*60*45),
        "schedule": ["2025-02-18", 36800, 74000],
        "next_id": null,
        "deleted": 0,
        "skud_prod_calendar_id": 2,
        "created_at": 1738968722,
        "creator_id": 377
    },
    {
        id: 7,
        created_at: 1738068722,
        id_company: 2,
        company_name: "Arstel",
        company_color: "#FF9900",
        skud_schedule_type_id: 3,
        name: "Super schedule 33333",
        description: "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        start_time: 38400,
        end_time: 1738968722,
        target_time: (60*60*8),
        target_unit: 1,
        lunch_start: 53600,
        lunch_end: 55000,
        lunch_time: (1*60*45),
        schedule: [],
        next_id: null,
        deleted: 0,
        skud_prod_calendar_id: 1,
        created_at: 1738968722,
        creator_id: 377
    },
    {
        id: 8,
        created_at: 1738068722,
        id_company: 2,
        company_name: "Arstel",
        company_color: "#FF9900",
        skud_schedule_type_id: 4,
        name: "Super schedule 33333",
        description: "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        start_time: 36400,
        end_time: 1738968722,
        target_time: (60*60*8),
        target_unit: 1,
        lunch_start: 53600,
        lunch_end: 55000,
        lunch_time: (1*60*45),
        schedule: [],
        next_id: null,
        deleted: 0,
        skud_prod_calendar_id: 4,
        created_at: 1738968722,
        creator_id: 377
    },
    {
        id: 9,
        created_at: 1738068722,
        id_company: 2,
        company_name: "Arstel",
        company_color: "#FF9900",
        skud_schedule_type_id: 5,
        name: "Super schedule 33333",
        description: "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        start_time: 22800,
        end_time: 1738968722,
        target_time: (60*60*8),
        target_unit: 1,
        lunch_start: 53600,
        lunch_end: 55000,
        lunch_time: (1*60*45),
        schedule: [],
        next_id: null,
        deleted: 0,
        skud_prod_calendar_id: 5,
        created_at: 1738968722,
        creator_id: 377
    }
];


export const SKUD_SCHED_HISTORY = [
    {
        id: 423,
        enabled_at: '2024-01-22',
        start_time: 45130,
        end_time: 46320
    },
    {
        id: 424,
        enabled_at: '2024-10-21',
        start_time: 45130,
        end_time: 56320
    },
    {
        id: 425,
        enabled_at: '2024-10-22',
        start_time: 45130,
        end_time: 49320
    },
    {
        id: 426,
        enabled_at: '2025-11-22',
        start_time: 45130,
        end_time: 66320
    }
];



export const DS_SKUD_GROUPS = [
    {
        id: 1,
        name: "Первая группа захвата пользователей",
        description: "Что-то здесь должно было быть написано, но не судьба, кажись...",
        company_name: "Rondo",
        company_color: "#007799",
        id_company: 3,
        linked_schedule: null,
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "duration_time": 3600,
                "variable_a" : 0,
                "variable_b" : 1,
            },
            {
                "id": 9,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
            },
            {
                "id": 8,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
            },
            {
                "id": 6,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
            },
            {
                "id": 4,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
            },
        ]
    },
    {
        id: 2,
        name: "Группа странных пингвинов",
        description: "Эти пингвины любят танцевать под дождем и собирать редкие камни.",
        id_company: 2,
        company_name: "Arstel",
        company_color: "#ee7700",
        linked_schedule: {
            "id": 5,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
        ]
    },
    {
        id: 3,
        name: "Клуб любителей невидимых единорогов",
        description: "Мы собираемся каждую пятницу, чтобы обсуждать их последние приключения.",
        id_company: 2,
        company_name: "Arstel",
        company_color: "#ee7700",
        linked_schedule: {
            "id": 5,
            "type": 2,
            "name": "Grafir grafik simple simple",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [

            {
                "id": 4,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 6,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 8,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 4,
        name: "Ассоциация котов-экспертов по лазанью",
        description: "Наши коты знают все о лазанье и готовы делиться секретами приготовления.",
        id_company: 2,
        company_name: "Arstel",
        company_color: "#ee7700",
        linked_schedule: {
            "id": 6,
            "type": 5,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 9,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 8,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 7,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 6,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 71,
        name: "Общество любителей обосранных штанов",
        description: "Каждая пара штанов имеет свою историю. Мы собираем их продаем под видом дизайнерских.",
        id_company: 2,
        company_name: "Arstel",
        company_color: "#ee7700",
        linked_schedule: {
            "id": 7,
            "type": 4,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 9,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 7,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 5,
        name: "Команда по исследованию параллельных вселенных",
        description: "Мы изучаем альтернативные реальности, где все наоборот.",
        id_company: 3,
        company_name: "RONDO",
        company_color: "#44bb00",
        linked_schedule: {
            "id": 8,
            "type": 3,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 6,
        name: "Группа по защите прав летающих картошек",
        description: "Мы боремся за права картошки, которая хочет взлететь и увидеть мир.",
        id_company: 3,
        company_name: "Rondo",
        company_color: "#44bb00",
        linked_schedule: null,
        "linked_rules": [
        ]
    },
    {
        id: 7,
        name: "Общество любителей странных шляп",
        description: "Каждая шляпа имеет свою историю. Мы собираем их и рассказываем сказки.",
        id_company: 3,
        company_name: "RONDO",
        company_color: "#44bb00",
        linked_schedule: {
            "id": 5,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
];

export const DS_GROUP_USERS = [
    {
        id: 1,
        name: 'Мирослав',
        surname: 'Германов',
        patronymic: 'Виосыч',
        department: 1,
        id_company: 3,
        user_group_id: 0,

        company_name: "Rondo",
        company_color: "#44bb00",

        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 6,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 7,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 8,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 9,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 6,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 21,
        name: 'Кирилл',
        surname: 'Овечкин',
        patronymic: 'Степанович',
        department: 4,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 0,
        groups: [1,3, 2],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 8,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 7,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 9,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 8,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 4,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 5,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 2,
        name: 'Майонез',
        surname: 'Сливочный',
        patronymic: 'Супер-легкий',
        department: 1,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 0,
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 9,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 8,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 3,
        name: 'Гарнир',
        surname: 'Овощной',
        patronymic: 'Смешанный',
        department: 1,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 7,
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 9,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 4,
        name: 'Паста',
        surname: 'Макаронная',
        patronymic: 'Сосисочная',
        department: 1,
        id_company: 3,
        company_name: "Rondo",
        company_color: "#44bb00",
        user_group_id: 7,
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 7,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 5,
        name: 'Томатный',
        surname: 'Соусик',
        patronymic: 'Легкий',
        department: 1,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 7,
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 6,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 6,
        name: 'Чесночный',
        surname: 'Волшебник',
        patronymic: 'Зеленый',
        department: 1,
        id_company: 3,
        company_name: "Rondo",
        company_color: "#44bb00",
        user_group_id: 0,
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 9,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 7,
        name: 'Луковый',
        surname: 'Мечтатель',
        patronymic: 'Сладкий',
        department: 1,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 3,
        company_name: "Rondo",
        company_color: "#44bb00",
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 9,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 8,
        name: 'Перечный',
        surname: 'Фантазер',
        patronymic: 'Острый',
        department: 2,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 3,
        company_name: "Rondo",
        company_color: "#44bb00",
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 5,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 9,
        name: 'Сырный',
        surname: 'Гуру',
        patronymic: 'Деревенский',
        department: 2,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 1,
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 5,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 10,
        name: 'Шпинатный',
        surname: 'Зеленец',
        patronymic: 'Витаминный',
        department: 1,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 1,
        groups: [1,3],
        occupy: "Лошадиный бог",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 5,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 11,
        name: 'Фруктовый',
        surname: 'Пирожок',
        patronymic: 'Сладкий',
        department: 4,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 7,
        groups: [4,3],
        occupy: "Стервенец от бога",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 5,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
        id: 12,
        name: 'Карамельный',
        surname: 'Обманщик',
        patronymic: 'Липкий',
        department: 6,
        id_company: 2,
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        user_group_id: 1,
        groups: [1,3],
        occupy: "Программист",
        department_name: "Отдел профилактики",
        linked_schedule: {
            "id": 5,
            "type": 1,
            "name": "Antoxa hey",
            "start": 452352345,
            "end": 23452345, //nullable
            "next_count": 4
        },
        "linked_rules": [
            {
                "id": 5,
                "type" : 1,
                "name": "Fired by fire",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 11,
                "type" : 2,
                "name": "Second rule type",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 0
            },
            {
                "id": 51,
                "type" : 3,
                "name": "Third rule type sat",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 4
            },
            {
                "id": 15,
                "type" : 4,
                "name": "Broken leg worse than broken dreams",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 2
            },
            {
                "id": 65,
                "type" : 5,
                "name": "If you wanna buy a house, just stop being beggar",
                "start": 452352345,
                "end": 23452345, //nullable
                "next_count": 43
            },
        ]
    },
    {
         id :13, 
         name : "Пирожковый", 
         surname : "Тестоед", 
         patronymic : "Сдобный", 
         department : 7, 
         id_company : 3, 
         company_name: "Rondo",
         company_color: "#44bb00",
         user_group_id :7 ,
         groups: [1,3],
         occupy: "Программист",
         department_name: "Отдел профилактики",
         linked_schedule: {
             "id": 5,
             "type": 1,
             "name": "Antoxa hey",
             "start": 452352345,
             "end": 23452345, //nullable
             "next_count": 4
         },
         "linked_rules": [
             {
                 "id": 5,
                 "type" : 1,
                 "name": "Fired by fire",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 11,
                 "type" : 2,
                 "name": "Second rule type",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 0
             },
             {
                 "id": 51,
                 "type" : 3,
                 "name": "Third rule type sat",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 15,
                 "type" : 4,
                 "name": "Broken leg worse than broken dreams",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 2
             },
             {
                 "id": 65,
                 "type" : 5,
                 "name": "If you wanna buy a house, just stop being beggar",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 43
             },
         ]
     },
     {
         id :14, 
         name : "Ванильный", 
         surname : "Мороженчик", 
         patronymic : "Холодный", 
         department : 7, 
         id_company : 2,
         "company_name" :"Arstel",
         "company_color" :"#EE7700",
         user_group_id :0 ,
         groups: [1,3],
         occupy: "Программист",
         department_name: "Отдел профилактики",
         linked_schedule: {
             "id": 5,
             "type": 1,
             "name": "Antoxa hey",
             "start": 452352345,
             "end": 23452345, //nullable
             "next_count": 4
         },
         "linked_rules": [
             {
                 "id": 5,
                 "type" : 1,
                 "name": "Fired by fire",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 11,
                 "type" : 2,
                 "name": "Second rule type",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 0
             },
             {
                 "id": 51,
                 "type" : 3,
                 "name": "Third rule type sat",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 15,
                 "type" : 4,
                 "name": "Broken leg worse than broken dreams",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 2
             },
             {
                 "id": 65,
                 "type" : 5,
                 "name": "If you wanna buy a house, just stop being beggar",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 43
             },
         ]
     },
     {
         id :15, 
         name : "Кокосовый", 
         surname : "Нежный", 
         patronymic : "Тропический", 
         department : 1, 
         id_company : 2, 
         "company_name" :"Arstel",
         "company_color" :"#EE7700",
         user_group_id :0 ,
         groups: [1,3],
         occupy: "Программист",
         department_name: "Отдел профилактики",
         linked_schedule: {
             "id": 5,
             "type": 1,
             "name": "Antoxa hey",
             "start": 452352345,
             "end": 23452345, //nullable
             "next_count": 4
         },
         "linked_rules": [
             {
                 "id": 5,
                 "type" : 1,
                 "name": "Fired by fire",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 11,
                 "type" : 2,
                 "name": "Second rule type",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 0
             },
             {
                 "id": 51,
                 "type" : 3,
                 "name": "Third rule type sat",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 15,
                 "type" : 4,
                 "name": "Broken leg worse than broken dreams",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 2
             },
             {
                 "id": 65,
                 "type" : 5,
                 "name": "If you wanna buy a house, just stop being beggar",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 43
             },
         ]
     },
     {
         id :16, 
         name : "Мятный", 
         surname : "Свежак", 
         patronymic : "Зеленый", 
         department : 1, 
         id_company : 3,
         company_name: "Rondo",
         company_color: "#44bb00", 
         user_group_id :0 ,
         groups: [1,3],
         occupy: "Лошадиный бог",
         department_name: "Отдел профилактики",
         linked_schedule: {
             "id": 5,
             "type": 1,
             "name": "Antoxa hey",
             "start": 452352345,
             "end": 23452345, //nullable
             "next_count": 4
         },
         "linked_rules": [
             {
                 "id": 5,
                 "type" : 1,
                 "name": "Fired by fire",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 11,
                 "type" : 2,
                 "name": "Second rule type",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 0
             },
             {
                 "id": 51,
                 "type" : 3,
                 "name": "Third rule type sat",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 15,
                 "type" : 4,
                 "name": "Broken leg worse than broken dreams",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 2
             },
             {
                 "id": 65,
                 "type" : 5,
                 "name": "If you wanna buy a house, just stop being beggar",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 43
             },
         ]
     },
     {
         id :17, 
         name : "Шоколадный", 
         surname : "Какаоед", 
         patronymic : "Горький", 
         department : 1, 
         id_company : 2, 
         "company_name" :"Arstel",
         "company_color" :"#EE7700",
         user_group_id :2 ,
         groups: [4,5,6,7],
         occupy: "Лошадиный бог",
         department_name: "Отдел профилактики",
         linked_schedule: {
             "id": 5,
             "type": 1,
             "name": "Antoxa hey",
             "start": 452352345,
             "end": 23452345, //nullable
             "next_count": 4
         },
         "linked_rules": [
             {
                 "id": 5,
                 "type" : 1,
                 "name": "Fired by fire",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 11,
                 "type" : 2,
                 "name": "Second rule type",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 0
             },
             {
                 "id": 51,
                 "type" : 3,
                 "name": "Third rule type sat",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 15,
                 "type" : 4,
                 "name": "Broken leg worse than broken dreams",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 2
             },
             {
                 "id": 65,
                 "type" : 5,
                 "name": "If you wanna buy a house, just stop being beggar",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 43
             },
         ]
     },
     {
         id :18, 
         name :"Лимонный",  
         surname :"Цитрусовый",  
         patronymic :"Кислый",  
         department :1,  
         id_company :3,
         company_name: "Rondo",
         company_color: "#44bb00",  
         user_group_id :2  ,
         groups: [1,3,3],
         occupy: "Лошадиный бог",
         department_name: "Продажный отдел",
         linked_schedule: {
             "id": 5,
             "type": 1,
             "name": "Antoxa hey",
             "start": 452352345,
             "end": 23452345, //nullable
             "next_count": 4
         },
         "linked_rules": [
             {
                 "id": 5,
                 "type" : 1,
                 "name": "Fired by fire",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 11,
                 "type" : 2,
                 "name": "Second rule type",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 0
             },
             {
                 "id": 51,
                 "type" : 3,
                 "name": "Third rule type sat",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 4
             },
             {
                 "id": 15,
                 "type" : 4,
                 "name": "Broken leg worse than broken dreams",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 2
             },
             {
                 "id": 65,
                 "type" : 5,
                 "name": "If you wanna buy a house, just stop being beggar",
                 "start": 452352345,
                 "end": 23452345, //nullable
                 "next_count": 43
             },
         ]
     },
     {
          id :19,  
          name :"Ореховый",  
          surname :"Хрустик",  
          patronymic :"Мотоциклетный",  
          department :1,  
          id_company :3,
          company_name: "Rondo",
          company_color: "#44bb00",  
          user_group_id :2  ,
          groups: [1,3, 5],
          occupy: "Лошадиный бог",
          department_name: "Отдел высоких продаж",
          linked_schedule: {
              "id": 5,
              "type": 1,
              "name": "Antoxa hey",
              "start": 452352345,
              "end": 23452345, //nullable
              "next_count": 4
          },
          "linked_rules": [
              {
                  "id": 5,
                  "type" : 1,
                  "name": "Fired by fire",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 4
              },
              {
                  "id": 11,
                  "type" : 2,
                  "name": "Second rule type",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 0
              },
              {
                  "id": 51,
                  "type" : 3,
                  "name": "Third rule type sat",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 4
              },
              {
                  "id": 15,
                  "type" : 4,
                  "name": "Broken leg worse than broken dreams",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 2
              },
              {
                  "id": 65,
                  "type" : 5,
                  "name": "If you wanna buy a house, just stop being beggar",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 43
              },
          ]
      },
      {
          id :20,  
          name :"Ягодный",  
          surname :"Вкусняшка",  
          patronymic :"Сочный",  
          department :1,  
          id_company :2,  
          "company_name" :"Arstel",
          "company_color" :"#EE7700",
          user_group_id :0,
          groups: [1,3],
          occupy: "Лошадиный бог",
          department_name: "Отдел профилактики",
          linked_schedule: {
              "id": 5,
              "type": 1,
              "name": "Antoxa hey",
              "start": 452352345,
              "end": 23452345, //nullable
              "next_count": 4
          },
          "linked_rules": [
              {
                  "id": 5,
                  "type" : 1,
                  "name": "Fired by fire",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 4
              },
              {
                  "id": 11,
                  "type" : 2,
                  "name": "Second rule type",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 0
              },
              {
                  "id": 51,
                  "type" : 3,
                  "name": "Third rule type sat",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 4
              },
              {
                  "id": 15,
                  "type" : 4,
                  "name": "Broken leg worse than broken dreams",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 2
              },
              {
                  "id": 65,
                  "type" : 5,
                  "name": "If you wanna buy a house, just stop being beggar",
                  "start": 452352345,
                  "end": 23452345, //nullable
                  "next_count": 43
              },
          ]
      },
];

export const DS_SCHEDULE_ENTITIES = [
    {
        id: 1,
        type : 3,
        name: 'Jacob',
        surname: 'вафыва фывафывафы',
        patronymic: 'Со-специями',
        description: null,
        schedule_id : 0,
        id_company :1,  
        rule_links: [],
    },
    {
        id: 337,
        type : 2,
        name: 'Группа выходного дня',
        surname: null,
        patronymic: null,
        description: "Описание группы",
        schedule_id : 0,
        id_company :2, 
        rule_links: [],
    },
    {
        id: 2,
        type : 3,
        name: 'Борис авыафывафыфффффф ',
        surname: 'аааааааааааааааааа',
        patronymic: 'Владимирович',
        description: null,
        schedule_id : 0,
        id_company :1,
        rule_links: [],
    },
    {
        id: 436,
        type : 2,
        name: 'MASTER вв GROUP',
        surname: null,
        patronymic: null,
        description: "Описание группы",
        schedule_id : 0,
        id_company :1,
        rule_links: [{rule_id:5, type: 1}],
    },
    {
        id: 1451,
        type : 3,
        name: 'Jacob фывафыва ',
        surname: 'аааааааааыфыыыыыыыыыыы',
        patronymic: 'Со-специями',
        description: null,
        schedule_id : 0,
        id_company :1,
        rule_links: [],
    },
    {
        id: 3437,
        type : 2,
        name: ' а Группа выходного вфаыва фывафы',
        surname: null,
        patronymic: null,
        description: "Описание группы",
        schedule_id : 0,
        id_company :2,
        rule_links: [],
    },
    {
        id: 267,
        type : 3,
        name: 'Борис афывафыва',
        surname: 'Качанов',
        patronymic: 'Владимирович',
        description: null,
        schedule_id : 0,
        id_company :1,
        rule_links: [],
    },
    {
        id: 426,
        type : 2,
        name: 'фффы фываMASTER GROUP',
        surname: null,
        patronymic: null,
        description: "Описание группы",
        schedule_id : 0,
        id_company :1,
        rule_links: [],
    }
];


    export const DS_RULE_TYPES = [
    {
        "id": 1,
        "name": "Опоздание",
        "description": "Правило, описывающее зачисление потерянного времени при опоздании и возможность его отработать. Если этого правила нет, то пользователю все опоздания идут в ПВ",
        "deleted" : 0,
        "variable_a" : "Не засчитывать опоздание в пределах времени t как потерянное, система запишет его как отработанное. / В ином случае, система запишет поздний приход в потернянное время.",
        "variable_b" : "Можно ли отрабатывать потерянное время в день опоздания после конца установленного рабочего дня. Пользователь может задержаться на {###} мин.",
        "color" : "#ff000069"
    },
    {
        "id": 2,
        "name": "Переработка",
        "description": "Правило, разрешающее пользователю приходить раньше и уходить раньше, или приходить позже и уходить позже в границах t1, то есть сдвигать начало и конец рабочего дня на t без потери времени при условии отработки положенных часов.",
        "deleted" : 0,
        "variable_a" : "Разрешено приходить раньше на {###} мин. и уходить позже на {###} мин., то есть сдвигать начало и конец рабочего дня",
        "variable_b" : "Разрешено приходить позже и уходить уходить позже на {###} мин.",
        "color" : "#ff91004b"
    },
    {
        "id": 3,
        "name": "Кратовременные выходы",
        "description": "Правило, разрешающее пользователю выходить на перекуры или другие кратковременные нужды и определяющее, можно ли это время отработать после смены.",
        "deleted" : 0,
        "variable_a" : "Кратковременные выходы добавляются в потерянное время и не отрабатываются.",
        "variable_b" : "Можно ли отработать перекуры: максимальная общая длительность перекуров - {###} мин.",
        "color" : "#7c550069"
    },
    {
        "id": 4,
        "name": "Отработка общего ПВ",
        "description": "Правило, разрешающее пользователю приходить раньше или уходить позже, чтобы уменьшить глобальное ПВ",
        "deleted" : 0,
        "variable_a" : "Можно приходить раньше начала установленного рабочего дня на {###} мин., это время будет вычтено из общего потерянного времени",
        "variable_b" : "Можно уходить позже конца установленного рабочего дня на {###} мин., это время будет вычтено из общего потерянного времени",
        "color" : "#00a2ff69"
    },
    {
        "id": 5,
        "name": "Накопительная система",
        "description": "Правило, разрешающее пользователю приходить раньше или уходить позже, чтобы накапливать время, превышающее длительность РД про запас",
        "deleted" : 0,
        "variable_a" : "Можно приходить раньше начала установленного рабочего дня на {###} мин. Это время будет засчитано в накопительной системе.",
        "variable_b" : "Можно уходить позже конца установленного рабочего дня {###} мин. Это время будет засчитано накопительной системой.",
        "color" : "#00f5ab69"
    },
];


// [ {"id": 1, "color": "#ff000069"},{"id": 2, "color": "#ff91004b"},{"id": 3, "color": "#7c550069"},{"id": 4, "color": "#00a2ff69"},{"id": 5, "color": "#00f5ab69"}]

// export const DS_RULE_TYPES = [
//     {
//         "id": 1,
//         "name": "Опоздание",
//         "description": "Правило, описывающее з...",
//         "deleted" : 0,
//         "variable_a" : "текст",
//         "variable_b" : "текст",
//     },
//     {
//         "id": 2,
//         "name": "Переработка",
//         "description": "Правило, разрешающее... часов.",
//         "deleted" : 0,
//         "variable_a" : "текст",
//         "variable_b" : "текст",
//     },
//     {
//         "id": 3,
//         "name": "Кратовременные выходы",
//         "description": "Правило, разрешающее пользователю...",
//         "deleted" : 0,
//         "variable_a" : "текст",
//         "variable_b" : "текст",
//     },
//     {
//         "id": 4,
//         "name": "Отработка общего ПВ",
//         "description": "Правило, разрешающее пользователю....",
//         "deleted" : 0,
//         "variable_a" : "текст",
//         "variable_b" : "текст",
//     },
//     {
//         "id": 5,
//         "name": "Накопительная система",
//         "description": "Правило, разрешающее пользователю...",
//         "deleted" : 0,
//         "variable_a" : "текст",
//         "variable_b" : "текст",
//     },
// ];

export const DS_RULES = [
    {
        "id": 5,
        "rule_type_id" : 1,
        "name": "Если проспал - отработай!",
        "duration_time": 960,
        "variable_a": 1,
        "variable_b": 1,
        "deleted" : 0,
        "deleted_at" :null,
        "creator_id" :377,
        "creator_name" : "Мария",
        "creator_surname" : "Бутузова",
        "creator_patronymic" :"Себастьяновна",
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        "id_company" : 2,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 6,
        "rule_type_id" : 5,
        "name": "Можно работать про запас, время копится, лавэ мутится",
        "duration_time": 960,
        "variable_a": 0,
        "variable_b": 0,
        "deleted" : 0,
        "deleted_at" :null,
        "creator_id" :377,
        "creator_name" : "Мария",
        "creator_surname" : "Бутузова",
        "creator_patronymic" :"Себастьяновна",
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        "id_company" : 2,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 7,
        "rule_type_id" : 3,
        "name": "Сходил покурить - потерял честь",
        "duration_time": 960,
        "variable_a": 1,
        "variable_b": 0,
        "deleted" : 0,
        "deleted_at" :null,
        "creator_id" :377,
        "creator_name" : "Мария",
        "creator_surname" : "Бутузова",
        "creator_patronymic" :"Себастьяновна",
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        "id_company" : 2,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 8,
        "rule_type_id" : 2,
        "name": "Приходи раньше и уходи раньше, твой график - буйный",
        "duration_time": 960,
        "variable_a": 0,
        "variable_b": 1,
        "deleted" : 0,
        "deleted_at" :null,
        "creator_id" :377,
        "creator_name" : "Мария",
        "creator_surname" : "Бутузова",
        "creator_patronymic" :"Себастьяновна",
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        "id_company" : 2,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 9,
        "rule_type_id" : 4,
        "name": "Оставайся после работы и отрабатывай и отрабатывай всё, что ты потерял",
        "duration_time": 960,
        "variable_a": 1,
        "variable_b": 1,
        "deleted" : 0,
        "deleted_at" :null,
        "creator_id" :377,
        "creator_name" : "Мария",
        "creator_surname" : "Бутузова",
        "creator_patronymic" :"Себастьяновна",
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        "id_company" : 2,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 4,
        "rule_type_id" : 4,
        "name": "A this is proverochni plunk",
        "duration_time": 960,
        "variable_a": 1,
        "variable_b": 1,
        "deleted" : 0,
        "deleted_at" :null,
        "creator_id" :377,
        "creator_name" : "Мария",
        "creator_surname" : "Бутузова",
        "creator_patronymic" :"Себастьяновна",
        "company_name" :"Arstel",
        "company_color" :"#EE7700",
        "id_company" : 2,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },


    {
        "id": 10,
        "rule_type_id": 1,
        "name": "Опоздал - останься допоздна!",
        "duration_time": 720,
        "variable_a": 1,
        "variable_b": 0,
        "deleted": 0,
        "deleted_at": null,
        "creator_id": 422,
        "creator_name": "Иван",
        "creator_surname": "Петров",
        "creator_patronymic": "Сергеевич",
        "company_name": "TechCorp",
        "company_color": "#3366CC",
        "id_company": 3,
        "linked_users": 15,
        "linked_groups": 3,
        "user_count": 15,
        "group_count": 3
    },
    {
        "id": 11,
        "rule_type_id": 2,
        "name": "Гибкий график - твой выбор",
        "duration_time": 480,
        "variable_a": 0,
        "variable_b": 1,
        "deleted": 0,
        "deleted_at": null,
        "creator_id": 422,
        "creator_name": "Иван",
        "creator_surname": "Петров",
        "creator_patronymic": "Сергеевич",
        "company_name": "TechCorp",
        "company_color": "#3366CC",
        "id_company": 3,
        "linked_users": 15,
        "linked_groups": 3,
        "user_count": 15,
        "group_count": 3
    },
    {
        "id": 12,
        "rule_type_id": 3,
        "name": "Перекуры сокращают твой отпуск",
        "duration_time": 240,
        "variable_a": 1,
        "variable_b": 1,
        "deleted": 0,
        "deleted_at": null,
        "creator_id": 422,
        "creator_name": "Иван",
        "creator_surname": "Петров",
        "creator_patronymic": "Сергеевич",
        "company_name": "TechCorp",
        "company_color": "#3366CC",
        "id_company": 3,
        "linked_users": 15,
        "linked_groups": 3,
        "user_count": 15,
        "group_count": 3
    },
    {
        "id": 13,
        "rule_type_id": 5,
        "name": "Накопительные часы - твой финансовый резерв",
        "duration_time": 600,
        "variable_a": 0,
        "variable_b": 0,
        "deleted": 0,
        "deleted_at": null,
        "creator_id": 422,
        "creator_name": "Иван",
        "creator_surname": "Петров",
        "creator_patronymic": "Сергеевич",
        "company_name": "TechCorp",
        "company_color": "#3366CC",
        "id_company": 3,
        "linked_users": 15,
        "linked_groups": 3,
        "user_count": 15,
        "group_count": 3
    },
    {
        "id": 14,
        "rule_type_id": 4,
        "name": "Вечерние часы - твой вклад в успех",
        "duration_time": 540,
        "variable_a": 1,
        "variable_b": 1,
        "deleted": 0,
        "deleted_at": null,
        "creator_id": 422,
        "creator_name": "Иван",
        "creator_surname": "Петров",
        "creator_patronymic": "Сергеевич",
        "company_name": "TechCorp",
        "company_color": "#3366CC",
        "id_company": 3,
        "linked_users": 15,
        "linked_groups": 3,
        "user_count": 15,
        "group_count": 3
    },
    {
        "id": 15,
        "rule_type_id": 4,
        "name": "Test rule for verification",
        "duration_time": 300,
        "variable_a": 0,
        "variable_b": 1,
        "deleted": 0,
        "deleted_at": null,
        "creator_id": 422,
        "creator_name": "Иван",
        "creator_surname": "Петров",
        "creator_patronymic": "Сергеевич",
        "company_name": "TechCorp",
        "company_color": "#3366CC",
        "id_company": 3,
        "linked_users": 15,
        "linked_groups": 3,
        "user_count": 15,
        "group_count": 3
    }
]



export const DS_RULE_LINKS_INGROUP =
{
    "data": [
        {
            "id": 8,
            "start": "2025-05-01 00:00:00",
            "end": "2025-05-31 23:59:59",
            "creator_id": 377,
            "creator_name": "Всеволод",
            "creator_surname": "Суворов",
            "created_at": "2025-02-25 14:20:41",
            "deleted": false,
            "rule_name": "Правило не для всех",
            "rule_type": 2,
            "rule_id": 2,
        },
        {
            "id": 18,
            "start": "2025-02-26 00:00:00",
            "end": "2025-02-28 23:59:59",
            "creator_id": 377,
            "creator_name": "Всеволод",
            "creator_surname": "Суворов",
            "created_at": "2025-02-25 17:11:24",
            "deleted": false,
            "rule_name": "Правило не для всех",
            "rule_type": 2,
            "rule_id": 2,
        },
        {
            "id": 79,
            "start": "2025-03-29 00:00:00",
            "end": "2025-03-31 23:59:59",
            "creator_id": 377,
            "creator_name": "Всеволод",
            "creator_surname": "Суворов",
            "created_at": "2025-02-26 11:48:26",
            "deleted": false,
            "rule_name": "Правило не для всех",
            "rule_type": 2,
            "rule_id": 2,
        },
        {
            "id": 80,
            "start": "2025-03-29 00:00:00",
            "end": "2025-03-31 23:59:59",
            "creator_id": 377,
            "creator_name": "Всеволод",
            "creator_surname": "Суворов",
            "created_at": "2025-02-26 11:49:32",
            "deleted": false,
            "rule_name": "Правило не для всех",
            "rule_type": 2,
            "rule_id": 2,
        },
        {
            "id": 81,
            "start": "2025-02-27 00:00:00",
            "end": "2027-02-18 23:59:59",
            "creator_id": 377,
            "creator_name": "Всеволод",
            "creator_surname": "Суворов",
            "created_at": "2025-02-26 11:51:52",
            "deleted": false,
            "rule_name": "Правило не для всех",
            "rule_type": 2,
            "rule_id": 2,
        }
    ],
    "total": 5, // Всего привязано правил всех типов
    "status": 0,
    "message": "OK"
}


export const DS_SKUD_FILIALS = 
[
    {
        "id": 1,
        "id_company" : 2,
        "name": "Без филиала",
        "description": null,
        "deleted": 0
    },
    {
        "id": 2,
        "id_company": 2,
        "name": "Арстел главный",
        "description": "Главный офис, склад и прочие места",
        "deleted": 0
    },
    {
        "id": 3,
        "id_company": 2,
        "name": "Северный офис",
        "description": "Северный офис Арстел",
        "deleted": 0
    },
    {
        "id": 4,
        "id_company": 3,
        "name": "Рондо главный",
        "description": "Основной офис рондо",
        "deleted": 0
    }
]




export const DS_USERLIST_USERS = [
    {
        "user_id": 568,
        "user_name": "Гавриил",
        "user_surname": "Арчи",
        "user_patronymic": "Дессус",
        "user_occupy": "Special agent of BGI",
        "phone": "",
        "email": null,
        "id_company": 3,
        "recrut": 1735689600,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Администрация",
        "department_id": 1,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 493,
        "user_name": "Юрий",
        "user_surname": "Дегелевич",
        "user_patronymic": "Евгеньевич",
        "user_occupy": "Технический директор",
        "phone": "217",
        "email": null,
        "id_company": 2,
        "recrut": 1648760400,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Администрация",
        "department_id": 1,
        "row_id": 1217,
        "enter_time": "2025-04-25 08:21:06",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:21:06\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 46,
        "user_name": "Александр",
        "user_surname": "Кошелев",
        "user_patronymic": "Станиславович",
        "user_occupy": "коммерческий директор",
        "phone": "100",
        "email": "",
        "id_company": 2,
        "recrut": 742597200,
        "boss_id": 46,
        "sales_role": 1,
        "super": 1,
        "department_name": "Администрация",
        "department_id": 1,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 334,
        "user_name": "Мария",
        "user_surname": "Глинтерник",
        "user_patronymic": "Алексеевна",
        "user_occupy": "менеджер по персоналу",
        "phone": "216",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел персонала",
        "department_id": 2,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 564,
        "user_name": "Михаил",
        "user_surname": "Новосёлов",
        "user_patronymic": "Скудович",
        "user_occupy": "Грушевый лаффе",
        "phone": "99213366688",
        "email": "pablo@zhu.ev",
        "id_company": 3,
        "recrut": 1741996800,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел персонала",
        "department_id": 2,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 566,
        "user_name": "Рондо",
        "user_surname": "Тест",
        "user_patronymic": "Кузьмич",
        "user_occupy": "Самая первая",
        "phone": "250",
        "email": "test@test.ru",
        "id_company": 3,
        "recrut": 1741564800,
        "boss_id": 0,
        "sales_role": 1,
        "super": 0,
        "department_name": "Отдел персонала",
        "department_id": 2,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 133,
        "user_name": "Виктория",
        "user_surname": "Друговейко",
        "user_patronymic": "Юрьевна",
        "user_occupy": "главный бухгалтер",
        "phone": "221",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Бухгалтерия",
        "department_id": 3,
        "row_id": 1230,
        "enter_time": "2025-04-25 09:04:51",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:04:51\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 531,
        "user_name": "Анна",
        "user_surname": "Захарова",
        "user_patronymic": "Юрьевна",
        "user_occupy": "Бухгалтер",
        "phone": "222",
        "email": null,
        "id_company": 2,
        "recrut": 1684886400,
        "boss_id": 133,
        "sales_role": 0,
        "super": 0,
        "department_name": "Бухгалтерия",
        "department_id": 3,
        "row_id": 1229,
        "enter_time": "2025-04-25 09:03:13",
        "exit_time": "2025-04-25 13:31:52",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:03:13\"},{\"d\":32768,\"t\":\"2025-04-25 13:31:52\"},{\"d\":0,\"t\":\"2025-04-25 14:16:49\"}]",
        "job_time_count": 16116,
        "all_time_count": 16119,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Виктория",
        "boss_surname": "Друговейко",
        "boss_patronymic": "Юрьевна",
        "boss_occupy": "главный бухгалтер",
        "boss_phone": "221",
        "boss_email": null
    },
    {
        "user_id": 560,
        "user_name": "Наталия",
        "user_surname": "Минина",
        "user_patronymic": "Юрьевна",
        "user_occupy": "Администратор",
        "phone": "201",
        "email": null,
        "id_company": 3,
        "recrut": 1736294400,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Бухгалтерия",
        "department_id": 3,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 521,
        "user_name": "Любовь",
        "user_surname": "Палагушина",
        "user_patronymic": "Владимировна",
        "user_occupy": "Бухгалтер",
        "phone": "223",
        "email": null,
        "id_company": 2,
        "recrut": 1671926400,
        "boss_id": 133,
        "sales_role": 0,
        "super": 0,
        "department_name": "Бухгалтерия",
        "department_id": 3,
        "row_id": 1234,
        "enter_time": "2025-04-25 09:12:28",
        "exit_time": "2025-04-25 13:31:55",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:12:28\"},{\"d\":32768,\"t\":\"2025-04-25 13:31:55\"},{\"d\":0,\"t\":\"2025-04-25 14:16:53\"}]",
        "job_time_count": 15565,
        "all_time_count": 15567,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Виктория",
        "boss_surname": "Друговейко",
        "boss_patronymic": "Юрьевна",
        "boss_occupy": "главный бухгалтер",
        "boss_phone": "221",
        "boss_email": null
    },
    {
        "user_id": 567,
        "user_name": "Rondovec",
        "user_surname": "Rondov",
        "user_patronymic": "Grechedoll",
        "user_occupy": "A little guy who lives in the pin hole",
        "phone": "88008000000",
        "email": "krest@like.fm",
        "id_company": 3,
        "recrut": 1741824000,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 547,
        "user_name": "Геннадий",
        "user_surname": "Балымов",
        "user_patronymic": "Робертович",
        "user_occupy": "Региональный менеджер",
        "phone": "230",
        "email": null,
        "id_company": 2,
        "recrut": 1713733200,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1228,
        "enter_time": "2025-04-25 08:58:08",
        "exit_time": "2025-04-25 14:10:17",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:58:08\"},{\"d\":32768,\"t\":\"2025-04-25 14:10:17\"},{\"d\":0,\"t\":\"2025-04-25 14:51:37\"}]",
        "job_time_count": 18509,
        "all_time_count": 18729,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 134,
        "user_name": "Сергей",
        "user_surname": "Безбородов",
        "user_patronymic": "Дмитриевич",
        "user_occupy": "менеджер проектов",
        "phone": "227",
        "email": "proekt@arstel.com",
        "id_company": 2,
        "recrut": 0,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1216,
        "enter_time": "2025-04-25 08:20:18",
        "exit_time": "2025-04-25 14:05:39",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:20:18\"},{\"d\":32768,\"t\":\"2025-04-25 14:05:39\"},{\"d\":0,\"t\":\"2025-04-25 14:59:59\"}]",
        "job_time_count": 20161,
        "all_time_count": 20721,
        "lost_time_count": 560,
        "exit_time_count": 560,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 339,
        "user_name": "Ксения",
        "user_surname": "Горяева",
        "user_patronymic": "Викторовна",
        "user_occupy": "менеджер-координатор",
        "phone": "219",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 304,
        "user_name": "Ирина",
        "user_surname": "Зеленко",
        "user_patronymic": "Вячеславовна",
        "user_occupy": "менеджер-координатор",
        "phone": "225",
        "email": "sales@arstel.com",
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1248,
        "enter_time": "2025-04-25 12:31:43",
        "exit_time": "2025-04-25 14:04:53",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 12:31:43\"},{\"d\":32768,\"t\":\"2025-04-25 14:04:53\"},{\"d\":0,\"t\":\"2025-04-25 14:53:08\"}]",
        "job_time_count": 5395,
        "all_time_count": 5590,
        "lost_time_count": 195,
        "exit_time_count": 195,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 562,
        "user_name": "Анастасия",
        "user_surname": "Коляскина",
        "user_patronymic": "Константиновна",
        "user_occupy": "Руководитель отдела продаж Рондо",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1737493200,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1214,
        "enter_time": "2025-04-25 08:08:43",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:08:43\"},{\"d\":0,\"t\":\"2025-04-25 08:08:50\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 374,
        "user_name": "Евгений",
        "user_surname": "Котоликов",
        "user_patronymic": "Алексеевич",
        "user_occupy": "региональный менеджер",
        "phone": "224",
        "email": null,
        "id_company": 2,
        "recrut": 1536872400,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 555,
        "user_name": "Мария",
        "user_surname": "Ладыгина",
        "user_patronymic": "Владимировна",
        "user_occupy": "Региональный менеджер",
        "phone": "215",
        "email": null,
        "id_company": 2,
        "recrut": 1724014800,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1231,
        "enter_time": "2025-04-25 09:05:59",
        "exit_time": "2025-04-25 13:52:18",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:05:59\"},{\"d\":32768,\"t\":\"2025-04-25 13:52:18\"},{\"d\":0,\"t\":\"2025-04-25 14:33:58\"}]",
        "job_time_count": 16979,
        "all_time_count": 17179,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 340,
        "user_name": "Павел",
        "user_surname": "Петровский",
        "user_patronymic": "Сергеевич",
        "user_occupy": "менеджер региональный",
        "phone": "220",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1211,
        "enter_time": "2025-04-25 07:58:07",
        "exit_time": "2025-04-25 13:03:04",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 07:58:07\"},{\"d\":32768,\"t\":\"2025-04-25 13:03:04\"},{\"d\":0,\"t\":\"2025-04-25 13:25:20\"}]",
        "job_time_count": 16933,
        "all_time_count": 18297,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 57,
        "user_name": "Дмитрий",
        "user_surname": "Печников",
        "user_patronymic": "Валерьевич",
        "user_occupy": "менеджер региональный",
        "phone": "226",
        "email": "a-dealer@arstel.com",
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1245,
        "enter_time": "2025-04-25 10:45:23",
        "exit_time": "2025-04-25 14:59:42",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 10:45:23\"},{\"d\":32768,\"t\":\"2025-04-25 14:59:42\"},{\"d\":0,\"t\":\"2025-04-25 15:21:27\"}]",
        "job_time_count": 13864,
        "all_time_count": 15259,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 226,
        "user_name": "Анна ",
        "user_surname": "Столярова",
        "user_patronymic": "Владимировна",
        "user_occupy": "Ведущий менеджер",
        "phone": "251",
        "email": "d-dealer@arstel.com",
        "id_company": 2,
        "recrut": 1408914000,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1219,
        "enter_time": "2025-04-25 08:44:25",
        "exit_time": "2025-04-25 14:26:09",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:44:25\"},{\"d\":32768,\"t\":\"2025-04-25 14:26:09\"},{\"d\":0,\"t\":\"2025-04-25 15:14:04\"}]",
        "job_time_count": 20329,
        "all_time_count": 20504,
        "lost_time_count": 175,
        "exit_time_count": 175,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 405,
        "user_name": "Максим",
        "user_surname": "Турлов",
        "user_patronymic": "Георгиевич",
        "user_occupy": "менеджер-координатор",
        "phone": "209",
        "email": null,
        "id_company": 2,
        "recrut": 1565038800,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел оптовых продаж",
        "department_id": 5,
        "row_id": 1212,
        "enter_time": "2025-04-25 07:59:55",
        "exit_time": "2025-04-25 13:04:28",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 07:59:55\"},{\"d\":32768,\"t\":\"2025-04-25 13:04:28\"},{\"d\":0,\"t\":\"2025-04-25 13:46:48\"}]",
        "job_time_count": 18113,
        "all_time_count": 18273,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 563,
        "user_name": "Сергей",
        "user_surname": "Гельмбрехт",
        "user_patronymic": "Сергеевич",
        "user_occupy": "Инженер",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1738270800,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел трансляционного звука",
        "department_id": 7,
        "row_id": 1238,
        "enter_time": "2025-04-25 09:21:51",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:21:51\"},{\"d\":0,\"t\":\"2025-04-25 09:21:57\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 337,
        "user_name": "Олег",
        "user_surname": "Иванов",
        "user_patronymic": "Рудольфович",
        "user_occupy": "радиоинженер",
        "phone": "244",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел трансляционного звука",
        "department_id": 7,
        "row_id": 1233,
        "enter_time": "2025-04-25 09:11:08",
        "exit_time": "2025-04-25 13:41:40",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:11:08\"},{\"d\":32768,\"t\":\"2025-04-25 13:41:40\"},{\"d\":0,\"t\":\"2025-04-25 14:07:11\"}]",
        "job_time_count": 16232,
        "all_time_count": 16232,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 537,
        "user_name": "Сергей",
        "user_surname": "Иванов",
        "user_patronymic": "Алексеевич",
        "user_occupy": "Инженер",
        "phone": "212",
        "email": null,
        "id_company": 2,
        "recrut": 1693515600,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел трансляционного звука",
        "department_id": 7,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 411,
        "user_name": "Павел",
        "user_surname": "Мельников",
        "user_patronymic": "Валерьевич",
        "user_occupy": "инженер-консультант",
        "phone": "213",
        "email": null,
        "id_company": 2,
        "recrut": 1569790800,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел трансляционного звука",
        "department_id": 7,
        "row_id": 1237,
        "enter_time": "2025-04-25 09:19:31",
        "exit_time": "2025-04-25 13:04:34",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:19:31\"},{\"d\":32768,\"t\":\"2025-04-25 13:04:34\"},{\"d\":0,\"t\":\"2025-04-25 13:46:41\"}]",
        "job_time_count": 13330,
        "all_time_count": 13503,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 91,
        "user_name": "Сергей",
        "user_surname": "Фокин",
        "user_patronymic": "Петрович",
        "user_occupy": "радиоинженер",
        "phone": "242",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел трансляционного звука",
        "department_id": 7,
        "row_id": 1239,
        "enter_time": "2025-04-25 09:26:40",
        "exit_time": "2025-04-25 13:58:52",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:26:40\"},{\"d\":32768,\"t\":\"2025-04-25 13:58:52\"},{\"d\":0,\"t\":\"2025-04-25 14:38:46\"}]",
        "job_time_count": 16026,
        "all_time_count": 16332,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 400,
        "user_name": "Сергей",
        "user_surname": "Шевченко",
        "user_patronymic": "Витальевич",
        "user_occupy": "радиоинженер",
        "phone": "237",
        "email": null,
        "id_company": 2,
        "recrut": 1557694800,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел трансляционного звука",
        "department_id": 7,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 371,
        "user_name": "Константин",
        "user_surname": "Батов",
        "user_patronymic": "Александрович",
        "user_occupy": "радиоинженер",
        "phone": "243",
        "email": null,
        "id_company": 2,
        "recrut": 1531861200,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Проектный отдел",
        "department_id": 8,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 309,
        "user_name": "Александр ",
        "user_surname": "Бобко ",
        "user_patronymic": "Владимирович ",
        "user_occupy": "инженер-проектировщик",
        "phone": "253",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Проектный отдел",
        "department_id": 8,
        "row_id": 1215,
        "enter_time": "2025-04-25 08:14:15",
        "exit_time": "2025-04-25 14:17:35",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:14:15\"},{\"d\":32768,\"t\":\"2025-04-25 14:17:35\"},{\"d\":0,\"t\":\"2025-04-25 15:00:27\"}]",
        "job_time_count": 21672,
        "all_time_count": 21800,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 180,
        "user_name": "Леонид",
        "user_surname": "Александров",
        "user_patronymic": "Алексеевич",
        "user_occupy": "водитель-экспедитор",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Склад Санкт-Петербург",
        "department_id": 9,
        "row_id": 1227,
        "enter_time": "2025-04-25 08:58:05",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:58:05\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 436,
        "user_name": "Владимир",
        "user_surname": "Горев",
        "user_patronymic": "Сергеевич",
        "user_occupy": "грузчик-комплектовщик",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Склад Санкт-Петербург",
        "department_id": 9,
        "row_id": 1223,
        "enter_time": "2025-04-25 08:57:52",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:57:52\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 43,
        "user_name": "Елена",
        "user_surname": "Дурнева",
        "user_patronymic": "Витальевна",
        "user_occupy": "начальник оптового склада СПб",
        "phone": "",
        "email": "",
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Склад Санкт-Петербург",
        "department_id": 9,
        "row_id": 1225,
        "enter_time": "2025-04-25 08:58:01",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:58:01\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 528,
        "user_name": "Роман",
        "user_surname": "Карташов",
        "user_patronymic": "Станиславович",
        "user_occupy": "Кладовщик",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1678827600,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Склад Санкт-Петербург",
        "department_id": 9,
        "row_id": 1224,
        "enter_time": "2025-04-25 08:57:57",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:57:57\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 283,
        "user_name": "Жанна",
        "user_surname": "Булгакова",
        "user_patronymic": "Владимировна",
        "user_occupy": "дизайнер интерьеров",
        "phone": "208",
        "email": null,
        "id_company": 2,
        "recrut": 1462309200,
        "boss_id": 282,
        "sales_role": 0,
        "super": 0,
        "department_name": "Строительный отдел",
        "department_id": 11,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Руслан",
        "boss_surname": "Шалин",
        "boss_patronymic": "Викторович",
        "boss_occupy": "главный инженер",
        "boss_phone": "255",
        "boss_email": null
    },
    {
        "user_id": 463,
        "user_name": "Дмитрий",
        "user_surname": "Нестеренко",
        "user_patronymic": "Сергеевич",
        "user_occupy": "Заместитель директора",
        "phone": "254",
        "email": null,
        "id_company": 2,
        "recrut": 1624222800,
        "boss_id": 282,
        "sales_role": 0,
        "super": 0,
        "department_name": "Строительный отдел",
        "department_id": 11,
        "row_id": 1221,
        "enter_time": "2025-04-25 08:53:00",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:53:00\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Руслан",
        "boss_surname": "Шалин",
        "boss_patronymic": "Викторович",
        "boss_occupy": "главный инженер",
        "boss_phone": "255",
        "boss_email": null
    },
    {
        "user_id": 393,
        "user_name": "отдел",
        "user_surname": "Строительный",
        "user_patronymic": "",
        "user_occupy": "",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 1554843600,
        "boss_id": 282,
        "sales_role": 0,
        "super": 0,
        "department_name": "Строительный отдел",
        "department_id": 11,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Руслан",
        "boss_surname": "Шалин",
        "boss_patronymic": "Викторович",
        "boss_occupy": "главный инженер",
        "boss_phone": "255",
        "boss_email": null
    },
    {
        "user_id": 282,
        "user_name": "Руслан",
        "user_surname": "Шалин",
        "user_patronymic": "Викторович",
        "user_occupy": "главный инженер",
        "phone": "255",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 282,
        "sales_role": 0,
        "super": 0,
        "department_name": "Строительный отдел",
        "department_id": 11,
        "row_id": 1220,
        "enter_time": "2025-04-25 08:53:00",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:53:00\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Руслан",
        "boss_surname": "Шалин",
        "boss_patronymic": "Викторович",
        "boss_occupy": "главный инженер",
        "boss_phone": "255",
        "boss_email": null
    },
    {
        "user_id": 533,
        "user_name": "Татьяна",
        "user_surname": "Балабанова",
        "user_patronymic": "Алексеевна",
        "user_occupy": "Графический дизайнер",
        "phone": "239",
        "email": null,
        "id_company": 2,
        "recrut": 1685912400,
        "boss_id": 540,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": 1232,
        "enter_time": "2025-04-25 09:09:01",
        "exit_time": "2025-04-25 14:07:42",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:09:01\"},{\"d\":32768,\"t\":\"2025-04-25 14:07:42\"},{\"d\":0,\"t\":\"2025-04-25 14:18:57\"}]",
        "job_time_count": 15896,
        "all_time_count": 17921,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Лидия",
        "boss_surname": "Точилина",
        "boss_patronymic": "Львовна",
        "boss_occupy": "Начальник",
        "boss_phone": "247",
        "boss_email": null
    },
    {
        "user_id": 482,
        "user_name": "Артём",
        "user_surname": "Дрюков",
        "user_patronymic": "Владимирович",
        "user_occupy": "3д-дизайнер",
        "phone": "248",
        "email": null,
        "id_company": 2,
        "recrut": 1641848400,
        "boss_id": 540,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": 1240,
        "enter_time": "2025-04-25 09:35:16",
        "exit_time": "2025-04-25 13:08:43",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:35:16\"},{\"d\":32768,\"t\":\"2025-04-25 13:08:43\"},{\"d\":0,\"t\":\"2025-04-25 13:27:09\"}]",
        "job_time_count": 11213,
        "all_time_count": 12807,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Лидия",
        "boss_surname": "Точилина",
        "boss_patronymic": "Львовна",
        "boss_occupy": "Начальник",
        "boss_phone": "247",
        "boss_email": null
    },
    {
        "user_id": 558,
        "user_name": "Богдан",
        "user_surname": "Красников",
        "user_patronymic": "Юрьевич",
        "user_occupy": "Самый лучший программист",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1732136400,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": 1235,
        "enter_time": "2025-04-25 09:15:04",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:15:04\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 483,
        "user_name": "Максим",
        "user_surname": "Матченков",
        "user_patronymic": "Юрьевич",
        "user_occupy": "Программист",
        "phone": "231",
        "email": null,
        "id_company": 2,
        "recrut": 1641848400,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": 1241,
        "enter_time": "2025-04-25 09:35:22",
        "exit_time": "2025-04-25 13:45:18",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:35:22\"},{\"d\":32768,\"t\":\"2025-04-25 13:45:18\"},{\"d\":0,\"t\":\"2025-04-25 14:05:51\"}]",
        "job_time_count": 13529,
        "all_time_count": 14996,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 499,
        "user_name": "София",
        "user_surname": "Сорокина",
        "user_patronymic": "Евгеньевна",
        "user_occupy": "Графический дизайнер",
        "phone": "232",
        "email": null,
        "id_company": 2,
        "recrut": 1658178000,
        "boss_id": 540,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Лидия",
        "boss_surname": "Точилина",
        "boss_patronymic": "Львовна",
        "boss_occupy": "Начальник",
        "boss_phone": "247",
        "boss_email": null
    },
    {
        "user_id": 540,
        "user_name": "Лидия",
        "user_surname": "Точилина",
        "user_patronymic": "Львовна",
        "user_occupy": "Начальник",
        "phone": "247",
        "email": null,
        "id_company": 2,
        "recrut": 1696194000,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 474,
        "user_name": "Алексей",
        "user_surname": "Федянин",
        "user_patronymic": "Валерьевич",
        "user_occupy": "вэб-дизайнер",
        "phone": "238",
        "email": null,
        "id_company": 2,
        "recrut": 1634590800,
        "boss_id": 540,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": 1244,
        "enter_time": "2025-04-25 10:41:30",
        "exit_time": "2025-04-25 13:53:15",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 10:41:30\"},{\"d\":32768,\"t\":\"2025-04-25 13:53:15\"},{\"d\":0,\"t\":\"2025-04-25 14:34:04\"}]",
        "job_time_count": 11254,
        "all_time_count": 11505,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Лидия",
        "boss_surname": "Точилина",
        "boss_patronymic": "Львовна",
        "boss_occupy": "Начальник",
        "boss_phone": "247",
        "boss_email": null
    },
    {
        "user_id": 486,
        "user_name": "Андрей",
        "user_surname": "Шаранда",
        "user_patronymic": "Дмитриевич",
        "user_occupy": "Программист",
        "phone": "211",
        "email": null,
        "id_company": 2,
        "recrut": 1644181200,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информационных технологий",
        "department_id": 14,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 198,
        "user_name": "Валентина",
        "user_surname": "Рогалева",
        "user_patronymic": "Евгеньевна",
        "user_occupy": "менеджер отдела информации",
        "phone": "202",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информации",
        "department_id": 15,
        "row_id": 1247,
        "enter_time": "2025-04-25 11:50:35",
        "exit_time": null,
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 11:50:35\"}]",
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 536,
        "user_name": "Екатерина",
        "user_surname": "Филиппова",
        "user_patronymic": "Юрьевна",
        "user_occupy": "Менеджер",
        "phone": "229",
        "email": null,
        "id_company": 2,
        "recrut": 1692738000,
        "boss_id": 304,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел информации",
        "department_id": 15,
        "row_id": 1236,
        "enter_time": "2025-04-25 09:15:35",
        "exit_time": "2025-04-25 13:04:31",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 09:15:35\"},{\"d\":32768,\"t\":\"2025-04-25 13:04:31\"},{\"d\":0,\"t\":\"2025-04-25 13:46:45\"}]",
        "job_time_count": 13570,
        "all_time_count": 13736,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Ирина",
        "boss_surname": "Зеленко",
        "boss_patronymic": "Вячеславовна",
        "boss_occupy": "менеджер-координатор",
        "boss_phone": "225",
        "boss_email": "sales@arstel.com"
    },
    {
        "user_id": 287,
        "user_name": "Олег",
        "user_surname": "Бибик",
        "user_patronymic": "Николаевич",
        "user_occupy": "контролер ",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1707685200,
        "boss_id": 43,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково КПП",
        "department_id": 17,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Елена",
        "boss_surname": "Дурнева",
        "boss_patronymic": "Витальевна",
        "boss_occupy": "начальник оптового склада СПб",
        "boss_phone": "",
        "boss_email": ""
    },
    {
        "user_id": 327,
        "user_name": "Вячеслав",
        "user_surname": "Кобяков",
        "user_patronymic": "Борисович",
        "user_occupy": "контроллер КПП",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 43,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково КПП",
        "department_id": 17,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Елена",
        "boss_surname": "Дурнева",
        "boss_patronymic": "Витальевна",
        "boss_occupy": "начальник оптового склада СПб",
        "boss_phone": "",
        "boss_email": ""
    },
    {
        "user_id": 289,
        "user_name": "Геннадий",
        "user_surname": "Рябков",
        "user_patronymic": "Иванович",
        "user_occupy": "контролер КПП",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 1715547600,
        "boss_id": 43,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково КПП",
        "department_id": 17,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Елена",
        "boss_surname": "Дурнева",
        "boss_patronymic": "Витальевна",
        "boss_occupy": "начальник оптового склада СПб",
        "boss_phone": "",
        "boss_email": ""
    },
    {
        "user_id": 530,
        "user_name": "Станислав",
        "user_surname": "Самарин",
        "user_patronymic": "Александрович",
        "user_occupy": "Контролер КПП",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1713128400,
        "boss_id": 43,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково КПП",
        "department_id": 17,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Елена",
        "boss_surname": "Дурнева",
        "boss_patronymic": "Витальевна",
        "boss_occupy": "начальник оптового склада СПб",
        "boss_phone": "",
        "boss_email": ""
    },
    {
        "user_id": 556,
        "user_name": "Юнус",
        "user_surname": "Азизкулов",
        "user_patronymic": "Хусаинович",
        "user_occupy": "контролер",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1729112400,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково 19",
        "department_id": 18,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 271,
        "user_name": "Раджаббой ",
        "user_surname": "Ашуров ",
        "user_patronymic": "Фуркатович ",
        "user_occupy": "рабочий",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 43,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково 19",
        "department_id": 18,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Елена",
        "boss_surname": "Дурнева",
        "boss_patronymic": "Витальевна",
        "boss_occupy": "начальник оптового склада СПб",
        "boss_phone": "",
        "boss_email": ""
    },
    {
        "user_id": 272,
        "user_name": "Фуркат",
        "user_surname": "Ашуров  ",
        "user_patronymic": "Пардакулович ",
        "user_occupy": "рабочий",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 43,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково 19",
        "department_id": 18,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Елена",
        "boss_surname": "Дурнева",
        "boss_patronymic": "Витальевна",
        "boss_occupy": "начальник оптового склада СПб",
        "boss_phone": "",
        "boss_email": ""
    },
    {
        "user_id": 361,
        "user_name": "Иван",
        "user_surname": "Журба",
        "user_patronymic": "Анатольевич",
        "user_occupy": "прораб",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 1520283600,
        "boss_id": 43,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково 19",
        "department_id": 18,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Елена",
        "boss_surname": "Дурнева",
        "boss_patronymic": "Витальевна",
        "boss_occupy": "начальник оптового склада СПб",
        "boss_phone": "",
        "boss_email": ""
    },
    {
        "user_id": 557,
        "user_name": "Маруфжон",
        "user_surname": "Назаров",
        "user_patronymic": "Одилович",
        "user_occupy": "Подсобный рабочий",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1730754000,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Пулково 19",
        "department_id": 18,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 280,
        "user_name": "",
        "user_surname": "Администратор",
        "user_patronymic": "",
        "user_occupy": "Администратор",
        "phone": "",
        "email": null,
        "id_company": 2,
        "recrut": 0,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Контрагенты",
        "department_id": 19,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 553,
        "user_name": "Людмила",
        "user_surname": "Владимирская",
        "user_patronymic": "Павловна",
        "user_occupy": "Уборщица",
        "phone": "0",
        "email": null,
        "id_company": 2,
        "recrut": 1718571600,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Контрагенты",
        "department_id": 19,
        "row_id": 1246,
        "enter_time": "2025-04-25 11:05:39",
        "exit_time": "2025-04-25 15:46:32",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 11:05:39\"},{\"d\":32768,\"t\":\"2025-04-25 15:46:32\"}]",
        "job_time_count": 16853,
        "all_time_count": 16853,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 5,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "ушел",
        "state_text": "Рабочий день закончен",
        "state_icon": "SafetyCertificateOutlined",
        "state_color": "#e4e4e4",
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 47,
        "user_name": "Валентина",
        "user_surname": "Кошелева",
        "user_patronymic": "Григорьевна",
        "user_occupy": "финансовый директор",
        "phone": "",
        "email": "valentina@arstel.su",
        "id_company": 2,
        "recrut": 0,
        "boss_id": 0,
        "sales_role": 0,
        "super": 0,
        "department_name": "Контрагенты",
        "department_id": 19,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": null,
        "boss_surname": null,
        "boss_patronymic": null,
        "boss_occupy": null,
        "boss_phone": null,
        "boss_email": null
    },
    {
        "user_id": 538,
        "user_name": "Геннадий",
        "user_surname": "Бакланов",
        "user_patronymic": "Валентинович",
        "user_occupy": "Инженер",
        "phone": "252",
        "email": null,
        "id_company": 2,
        "recrut": 1693774800,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел профессионального звука",
        "department_id": 20,
        "row_id": 1218,
        "enter_time": "2025-04-25 08:28:02",
        "exit_time": "2025-04-25 13:48:09",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:28:02\"},{\"d\":32768,\"t\":\"2025-04-25 13:48:09\"},{\"d\":0,\"t\":\"2025-04-25 14:15:24\"}]",
        "job_time_count": 18142,
        "all_time_count": 19207,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 549,
        "user_name": "Алан",
        "user_surname": "Рясянен",
        "user_patronymic": "Раймович",
        "user_occupy": "Начальник",
        "phone": "250",
        "email": null,
        "id_company": 2,
        "recrut": 1714597200,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел профессионального звука",
        "department_id": 20,
        "row_id": 1243,
        "enter_time": "2025-04-25 10:07:56",
        "exit_time": "2025-04-25 14:24:02",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 10:07:56\"},{\"d\":32768,\"t\":\"2025-04-25 14:24:02\"},{\"d\":0,\"t\":\"2025-04-25 14:57:30\"}]",
        "job_time_count": 14674,
        "all_time_count": 15366,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    },
    {
        "user_id": 522,
        "user_name": "Александр",
        "user_surname": "Степанченко",
        "user_patronymic": "Николаевич",
        "user_occupy": "Инженер",
        "phone": "241",
        "email": null,
        "id_company": 2,
        "recrut": 1673557200,
        "boss_id": 493,
        "sales_role": 0,
        "super": 0,
        "department_name": "Технический отдел профессионального звука",
        "department_id": 20,
        "row_id": null,
        "enter_time": null,
        "exit_time": null,
        "event_dump": null,
        "job_time_count": 0,
        "all_time_count": 0,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": 0,
        "current_state": 0,
        "is_late": false,
        "control_date": null,
        "state_title": null,
        "state_text": null,
        "state_icon": null,
        "state_color": null,
        "state_nwork": null,
        "boss_name": "Юрий",
        "boss_surname": "Дегелевич",
        "boss_patronymic": "Евгеньевич",
        "boss_occupy": "Технический директор",
        "boss_phone": "217",
        "boss_email": null
    },
    {
        "user_id": 498,
        "user_name": "Ольга",
        "user_surname": "Булышева",
        "user_patronymic": "Александровна",
        "user_occupy": "менеджер ВЭД",
        "phone": "204",
        "email": null,
        "id_company": 2,
        "recrut": 1653253200,
        "boss_id": 46,
        "sales_role": 0,
        "super": 0,
        "department_name": "Отдел Логистики",
        "department_id": 21,
        "row_id": 1213,
        "enter_time": "2025-04-25 08:06:22",
        "exit_time": "2025-04-25 13:28:01",
        "event_dump": "[{\"d\":0,\"t\":\"2025-04-25 08:06:22\"},{\"d\":32768,\"t\":\"2025-04-25 13:28:01\"},{\"d\":0,\"t\":\"2025-04-25 14:03:28\"}]",
        "job_time_count": 19299,
        "all_time_count": 19299,
        "lost_time_count": 0,
        "exit_time_count": 0,
        "time_need_work": 0,
        "current_place": null,
        "current_state": 4,
        "is_late": 0,
        "control_date": "2025-04-25",
        "state_title": "на месте",
        "state_text": "На работе",
        "state_icon": "CheckOutlined",
        "state_color": "#d0f5a5",
        "state_nwork": null,
        "boss_name": "Александр",
        "boss_surname": "Кошелев",
        "boss_patronymic": "Станиславович",
        "boss_occupy": "коммерческий директор",
        "boss_phone": "100",
        "boss_email": ""
    }
]


export const LIST_SCHED_N_RULES_RESPONSE =  {
    "schedules": [
        {
            "id": 145,
            "skud_schedule_id": 10,
            "creator_id": 46,
            "deleted_at": null,
            "deleted": false,
            "created_at": "2025-04-11 20:09:10",
            "start": "2025-04-12 00:00:00",
            "end": null,
            "skud_user_id": 340,
            "actual": 1,
            "skud_schedule": {
                "id": 10,
                "skud_schedule_type_id": 1,
                "name": "Стд. Ранний. с 8:15 до 17",
                "description": "Ранний график для утренних менеджеров",
                "start_time": 29700,
                "end_time": 68400,
                "target_time": 28800,
                "target_unit": 1,
                "schedule": [],
                "id_company": 2,
                "next_id": 0,
                "skud_prod_calendar_id": 1,
                "deleted": false,
                "created_at": 1744389211,
                "creator_id": 46,
                "lunch_start": 46800,
                "lunch_end": 54000,
                "lunch_time": 2700,
                "skud_schedule_type": {
                    "id": 1,
                    "name": "Стандартный",
                    "description": "Установите начало и конец рабочего дня с учётом входящего времени обеда.\r\nСоздание односменного графика работы, с указанием фиксированного времени начала рабочего дня и его окончания.\nУказывается время начала и окончания рабочего дня. Указывается продолжительность рабочей недели.",
                    "color": "#ffe000",
                    "disabled": false
                }
            }
        }
    ],
    "rules": []
}


// {
//     "enter": {
//         "Дмитрий": [
//             {
//                 "2025-04-23": 1745396792
//             }
//         ]
//     },
//     "exit": {
//         "Дмитрий": [
//             {
//                 "2025-04-23": 1745405860
//             }
//         ]
//     },
//     "job_time_count": {
//         "Дмитрий": [
//             {
//                 "2025-04-23": 6529
//             }
//         ]
//     },
//     "all_time_count": {
//         "Дмитрий": [
//             {
//                 "2025-04-23": 9068
//             }
//         ]
//     },
//     "lost_time_count": {
//         "Дмитрий": [
//             {
//                 "2025-04-23": 0
//             }
//         ]
//     },
//     "exit_time_count": {
//         "Дмитрий": [
//             {
//                 "2025-04-23": 0
//             }
//         ]
//     },
//     "time_need_work": {
//         "Дмитрий": [
//             {
//                 "2025-04-23": 0
//             }
//         ]
//     }
// }