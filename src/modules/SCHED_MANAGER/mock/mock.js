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

