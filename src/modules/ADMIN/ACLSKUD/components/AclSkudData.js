export const ACLSKUDROW = 
[
    // {
    //     title: 'Просмотр', byte: 1,
    // },
    {
        title: 'Создание - удаление', byte: 2,
    },
    {
        title: 'Редактирование - удаление', byte: 4,
    },
    // {
    //     title: 'Удаление', byte: 8,
    // },
    {
        title: 'Согласование-отклоненние', byte: 16,
    },
];

export const ACLSKUDROW2 = [
    {
        param_pers_create: false,
        param_pers_edit: false,
        param_pers_approve: false,
        param_subo_create: false,
        param_subo_edit: false,
        param_subo_approve: false,
        param_any_create: false,
        param_any_edit: false,
        param_any_approve: false,
    }
]