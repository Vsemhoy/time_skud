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
            "color": "#22ff22",
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
        "surname": "Кошелев",
        "name": "Александр",
        "secondname": "Станиславович",
        "occupy": "коммерческий директор",
        "passcard": null,
        "id_role": 2,
        "email": null,
        "sales_role": 2,
        "password2": "$2y$12$vwqewb1to3XkD3FUvSrgoeydtcmsswjQSp6DWvJfxZanevLwAq6BS",
        "active_company": 1
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
    },
    {
      key:'11',
      id :11 ,
      name :'Булька ' ,
      surname: 'Бульдозер',
      patronymic: 'Вайп-Дорф',
      enter:['2025 -01 -10  09 :45 :00'] ,
      exit:['2025 -01 -10  17 :45 ;00'] ,
      exittime:{ time :480 , count :1} ,
      losttime :0 ,
      state : 5 , //Вышел (на обед или по делам)
      department: 7,
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
        "user_count": 37
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
]