export const COMPANIES = [
    {
        id: 1,
        name: "FreeCompany"
    },
    {
        id: 2,
        name: "Arstel"
    },
    {
        id: 3,
        name: "Rondo"
    }
];

export const SCHED_TYPES = [

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

export const SCHEDULE_LIST = [
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

const OFFICIAL_SCHED = {
    year: 2025,
    total: 365,
    wtotal:247,
    htotal: 118,
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

export const PROD_CALENDARS = [
    {
        id: 1,
        year: '2024',
        count_days: 100,
        count_work_days: 100,
        count_holidays: 100,
        archieved: 1,
        schedule: OFFICIAL_SCHED,
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
        schedule: OFFICIAL_SCHED,
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
        schedule: OFFICIAL_SCHED,
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
        schedule: OFFICIAL_SCHED,
        creator_id: 377,
        created_at: 1737782394,
        id_company: 2,

        company_color: '#2ccf2c',
        company_name: 'Rondo',
        count_links: 0,
    },
]
