import React from "react";


// Данные о пользователе
export const DS_USER = {
    "companies": [
        {
            "id": 2,
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
            "id": 1,
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
        "id": 123,
        "id_company": 1,
        "company_name": "Arstel",
        "company_color": "#FF9900",
        "skud_schedule_type_id": 1,
        "name": "Super schedule 33333",
        "description": "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        "start_time": 1738068722,
        "end_time": 1738968722,
        "target_time": (60*60*8),
        "target_unit": 1,
        "lunch_start": 53600,
        "lunch_end": 55000,
        "lunch_time": (1*60*45),
        "schedule": ["2025-02-18", 46230, 55500],
        "next_id": null,
        "deleted": 0,
        "skud_prod_calendar_id": 3,
        "created_at": 1739895051,
        "creator_id": 377
    },
    {
        "id": 513,
        "id_company": 1,
        "company_name": "Arstel",
        "company_color": "#FF9900",
        "skud_schedule_type_id": 2,
        "name": "Super schedule 33333",
        "description": "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        "start_time": 1738068722,
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
        id: 13233,
        created_at: 1738068722,
        id_company: 1,
        company_name: "Arstel",
        company_color: "#FF9900",
        skud_schedule_type_id: 3,
        name: "Super schedule 33333",
        description: "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        start_time: 1738068722,
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
        id: 13433,
        created_at: 1738068722,
        id_company: 1,
        company_name: "Arstel",
        company_color: "#FF9900",
        skud_schedule_type_id: 4,
        name: "Super schedule 33333",
        description: "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        start_time: 1738068722,
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
        id: 13353,
        created_at: 1738068722,
        id_company: 1,
        company_name: "Arstel",
        company_color: "#FF9900",
        skud_schedule_type_id: 5,
        name: "Super schedule 33333",
        description: "Hell world if yaoudfdf asdfas dfasdf asdasdifa sd",
        start_time: 1738068722,
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
        company_name: "Arstel",
        company_color: "#ee7700",
        id_company: 1,
    },
    {
        id: 2,
        name: "Группа странных пингвинов",
        description: "Эти пингвины любят танцевать под дождем и собирать редкие камни.",
        id_company: 1,
        company_name: "Arstel",
        company_color: "#ee7700",
    },
    {
        id: 3,
        name: "Клуб любителей невидимых единорогов",
        description: "Мы собираемся каждую пятницу, чтобы обсуждать их последние приключения.",
        id_company: 1,
        company_name: "Arstel",
        company_color: "#ee7700",
    },
    {
        id: 4,
        name: "Ассоциация котов-экспертов по лазанью",
        description: "Наши коты знают все о лазанье и готовы делиться секретами приготовления.",
        id_company: 1,
        company_name: "Arstel",
        company_color: "#ee7700",
    },
    {
        id: 71,
        name: "Общество любителей обосранных штанов",
        description: "Каждая пара штанов имеет свою историю. Мы собираем их продаем под видом дизайнерских.",
        id_company: 1,
        company_name: "Arstel",
        company_color: "#ee7700",
    },
    {
        id: 5,
        name: "Команда по исследованию параллельных вселенных",
        description: "Мы изучаем альтернативные реальности, где все наоборот.",
        id_company: 2,
        company_name: "RONDO",
        company_color: "#44bb00",
    },
    {
        id: 6,
        name: "Группа по защите прав летающих картошек",
        description: "Мы боремся за права картошки, которая хочет взлететь и увидеть мир.",
        id_company: 2,
        company_name: "Rondo",
        company_color: "#44bb00",
    },
    {
        id: 7,
        name: "Общество любителей странных шляп",
        description: "Каждая шляпа имеет свою историю. Мы собираем их и рассказываем сказки.",
        id_company: 2,
        company_name: "RONDO",
        company_color: "#44bb00",
    },
];

export const DS_GROUP_USERS = [
    {
        id: 1,
        name: 'Кетчуп',
        surname: 'Помидорчатый',
        patronymic: 'Со-специями',
        department: 1,
        id_company: 1,
        user_group_id: 0,
    },
    {
        id: 21,
        name: 'Кирилл',
        surname: 'Овечкин',
        patronymic: 'Степанович',
        department: 4,
        id_company: 1,
        user_group_id: 0,
    },
    {
        id: 2,
        name: 'Майонез',
        surname: 'Сливочный',
        patronymic: 'Супер-легкий',
        department: 1,
        id_company: 1,
        user_group_id: 0,
    },
    {
        id: 3,
        name: 'Гарнир',
        surname: 'Овощной',
        patronymic: 'Смешанный',
        department: 1,
        id_company: 1,
        user_group_id: 7,
    },
    {
        id: 4,
        name: 'Паста',
        surname: 'Макаронная',
        patronymic: 'Сосисочная',
        department: 1,
        id_company: 1,
        user_group_id: 7,
    },
    {
        id: 5,
        name: 'Томатный',
        surname: 'Соусик',
        patronymic: 'Легкий',
        department: 1,
        id_company: 1,
        user_group_id: 7,
    },
    {
        id: 6,
        name: 'Чесночный',
        surname: 'Волшебник',
        patronymic: 'Зеленый',
        department: 1,
        id_company: 1,
        user_group_id: 0,
    },
    {
        id: 7,
        name: 'Луковый',
        surname: 'Мечтатель',
        patronymic: 'Сладкий',
        department: 1,
        id_company: 1,
        user_group_id: 3,
    },
    {
        id: 8,
        name: 'Перечный',
        surname: 'Фантазер',
        patronymic: 'Острый',
        department: 1,
        id_company: 1,
        user_group_id: 3,
    },
    {
        id: 9,
        name: 'Сырный',
        surname: 'Гуру',
        patronymic: 'Деревенский',
        department: 1,
        id_company: 1,
        user_group_id: 1,
    },
    {
        id: 10,
        name: 'Шпинатный',
        surname: 'Зеленец',
        patronymic: 'Витаминный',
        department: 1,
        id_company: 1,
        user_group_id: 1,
    },
    {
        id: 11,
        name: 'Фруктовый',
        surname: 'Пирожок',
        patronymic: 'Сладкий',
        department: 1,
        id_company: 1,
        user_group_id: 7,
    },
    {
        id: 12,
        name: 'Карамельный',
        surname: 'Обманщик',
        patronymic: 'Липкий',
        department: 1,
        id_company: 1,
        user_group_id: 1,
    },
    {
         id :13, 
         name : "Пирожковый", 
         surname : "Тестоед", 
         patronymic : "Сдобный", 
         department : 1, 
         id_company : 1, 
         user_group_id :7 
     },
     {
         id :14, 
         name : "Ванильный", 
         surname : "Мороженчик", 
         patronymic : "Холодный", 
         department : 1, 
         id_company : 1, 
         user_group_id :0 
     },
     {
         id :15, 
         name : "Кокосовый", 
         surname : "Нежный", 
         patronymic : "Тропический", 
         department : 1, 
         id_company : 1, 
         user_group_id :0 
     },
     {
         id :16, 
         name : "Мятный", 
         surname : "Свежак", 
         patronymic : "Зеленый", 
         department : 1, 
         id_company : 1, 
         user_group_id :0 
     },
     {
         id :17, 
         name : "Шоколадный", 
         surname : "Какаоед", 
         patronymic : "Горький", 
         department : 1, 
         id_company : 1, 
         user_group_id :2 
     },
     {
         id :18, 
         name :"Лимонный",  
         surname :"Цитрусовый",  
         patronymic :"Кислый",  
         department :1,  
         id_company :1,  
         user_group_id :2  
     },
     {
          id :19,  
          name :"Ореховый",  
          surname :"Хрустик",  
          patronymic :"Мотоциклетный",  
          department :1,  
          id_company :1,  
          user_group_id :2  
      },
      {
          id :20,  
          name :"Ягодный",  
          surname :"Вкусняшка",  
          patronymic :"Сочный",  
          department :1,  
          id_company :1,  
          user_group_id :0  
      }
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
    },
    {
        "id": 2,
        "name": "Переработка",
        "description": "Правило, разрешающее пользователю приходить раньше и уходить раньше, или приходить позже и уходить позже в границах t1, то есть сдвигать начало и конец рабочего дня на t без потери времени при условии отработки положенных часов.",
        "deleted" : 0,
        "variable_a" : "Разрешено приходить раньше на {###} мин. и уходить позже на {###} мин., то есть сдвигать начало и конец рабочего дня",
        "variable_b" : "Разрешено приходить позже и уходить уходить позже на {###} мин.",
    },
    {
        "id": 3,
        "name": "Кратовременные выходы",
        "description": "Правило, разрешающее пользователю выходить на перекуры или другие кратковременные нужды и определяющее, можно ли это время отработать после смены.",
        "deleted" : 0,
        "variable_a" : "Кратковременные выходы добавляются в потерянное время и не отрабатываются.",
        "variable_b" : "Можно ли отработать перекуры: максимальная общая длительность перекуров - {###} мин.",
    },
    {
        "id": 4,
        "name": "Отработка общего ПВ",
        "description": "Правило, разрешающее пользователю приходить раньше или уходить позже, чтобы уменьшить глобальное ПВ",
        "deleted" : 0,
        "variable_a" : "Можно приходить раньше начала установленного рабочего дня на {###} мин., это время будет вычтено из общего потерянного времени",
        "variable_b" : "Можно уходить позже конца установленного рабочего дня на {###} мин., это время будет вычтено из общего потерянного времени",
    },
    {
        "id": 5,
        "name": "Накопительная система",
        "description": "Правило, разрешающее пользователю приходить раньше или уходить позже, чтобы накапливать время, превышающее длительность РД про запас",
        "deleted" : 0,
        "variable_a" : "Можно приходить раньше начала установленного рабочего дня на {###} мин. Это время будет засчитано в накопительной системе.",
        "variable_b" : "Можно уходить позже конца установленного рабочего дня {###} мин. Это время будет засчитано накопительной системой.",
    },
];

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
        "id_company" :1,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 2,
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
        "id_company" :1,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 32,
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
        "id_company" :1,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 12,
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
        "id_company" :1,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 22,
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
        "id_company" :1,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
    {
        "id": 224,
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
        "id_company" :1,
        "linked_users" : 12,
        "linked_groups" : 2,
        "user_count" : 12,
        "group_count" : 2
    },
]

