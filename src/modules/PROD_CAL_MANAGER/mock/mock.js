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

export const YEARS  = [{"id": 2025, "name": 2025}, {"id": 2024, "name": 2024}];

export const DEFAULT_SCHED = {
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

export const PROD_CALENDARS = [
    {
        id: 1,
        year: '2024',
        count_days: 100,
        count_work_days: 100,
        count_holidays: 100,
        archieved: 1,
        schedule: DEFAULT_SCHED,
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
        schedule: DEFAULT_SCHED,
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
        schedule: DEFAULT_SCHED,
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
        schedule: DEFAULT_SCHED,
        creator_id: 377,
        created_at: 1737782394,
        id_company: 2,

        company_color: '#2ccf2c',
        company_name: 'Rondo',
        count_links: 0,
    },
]