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



export const ACL_STATES = [
    {
        "id": 9,
        "title": "св.отпуск",
        "text": "Отпуск за свой счёт",
        "color": "#c4e8e5",
        "icon": "MoonOutlined",
        "need_work": 1,
        "need_approved": 0,
        "sort_order": 1,
        "fillable": 1
    },
    {
        "id": 8,
        "title": "местн.выезд.",
        "text": "Кратковременная местная командировка",
        "color": "#e3dbf1",
        "icon": "CarOutlined",
        "need_work": 0,
        "need_approved": 0,
        "sort_order": 2,
        "fillable": 1
    },
    {
        "id": 7,
        "title": "командировк.",
        "text": "Длительная командировка",
        "color": "#e2b4e9",
        "icon": "RocketOutlined",
        "need_work": 0,
        "need_approved": 0,
        "sort_order": 3,
        "fillable": 1
    },
    {
        "id": 10,
        "title": "отпуск",
        "text": "Плановый отпуск",
        "color": "#7adfb8",
        "icon": "SmileOutlined",
        "need_work": 0,
        "need_approved": 0,
        "sort_order": 4,
        "fillable": 1
    },
    {
        "id": 11,
        "title": "сверхурочные",
        "text": "Работа вне установленного графиком рабочего времени",
        "color": "#b7ff5c",
        "icon": "DollarOutlined",
        "need_work": 3,
        "need_approved": 0,
        "sort_order": 5,
        "fillable": 1
    },
    {
        "id": 6,
        "title": "больничный",
        "text": "На больничном",
        "color": "#ffa8a8",
        "icon": "MedicineBoxOutlined",
        "need_work": 0,
        "need_approved": 0,
        "sort_order": 6,
        "fillable": 1
    },
    {
        "id": 13,
        "title": "контейнеры",
        "text": "Разгрузка контейнеров на складе",
        "color": "#ffc107",
        "icon": "TruckOutlined",
        "need_work": 0,
        "need_approved": 0,
        "sort_order": 7,
        "fillable": 1
    }
];


export const ACL_CLEAR_DEPARTS = [
    {
        "id": 1,
        "name": "Администрация",
        "rang": 1,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 2,
        "name": "Отдел персонала",
        "rang": 30,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 3,
        "name": "Бухгалтерия",
        "rang": 10,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 4,
        "name": "Техническая группа проектного отдела",
        "rang": 140,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 5,
        "name": "Отдел оптовых продаж",
        "rang": 50,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 6,
        "name": "Отдел рекламы",
        "rang": 70,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 7,
        "name": "Технический отдел трансляционного звука",
        "rang": 60,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 8,
        "name": "Проектный отдел",
        "rang": 100,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 9,
        "name": "Склад Санкт-Петербург",
        "rang": 120,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 11,
        "name": "Строительный отдел",
        "rang": 110,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 12,
        "name": "АХЧ",
        "rang": 200,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 13,
        "name": "Дилерский отдел",
        "rang": 130,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 14,
        "name": "Отдел информационных технологий",
        "rang": 90,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 15,
        "name": "Отдел информации",
        "rang": 40,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 17,
        "name": "Пулково КПП",
        "rang": 150,
        "visible": false,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 18,
        "name": "Пулково 19",
        "rang": 170,
        "visible": false,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 19,
        "name": "Контрагенты",
        "rang": 180,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 20,
        "name": "Технический отдел профессионального звука",
        "rang": 80,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    },
    {
        "id": 21,
        "name": "Отдел Логистики",
        "rang": 20,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "acls": []
    }
];


export const ACL_DEPARTS = [
    {
        "id": 1,
        "name": "Администрация",
        "rang": 1,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "2a2204a8-ecec-4473-aedb-d6a9bf007a4d",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "5177c5ff-3be3-400d-942d-9d3474d1e35b",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "bf22ed37-8ed5-4555-95c4-5148e1a0a7e4",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "137876e5-e244-4575-8628-96dc7b57df9c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "82cd1a44-b9d7-435c-8830-e848dca6899d",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "a66ff784-3220-4806-9daf-b40ffa517b23",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "49f1b366-b6b6-455f-9514-ceadd42db2b4",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 1
    },
    {
        "id": 2,
        "name": "Отдел персонала",
        "rang": 30,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [
            {
                "id": 1,
                "id_company": 2,
                "depart_id": 2,
                "skud_current_state_id": 13,
                "param_pers_create": true,
                "param_pers_edit": true,
                "param_pers_approve": true,
                "param_subo_create": true,
                "param_subo_edit": true,
                "param_subo_approve": false,
                "param_any_create": false,
                "param_any_edit": false,
                "param_any_approve": true
            }
        ],
        "acls": {
            "6": {
                "id": "dca9855e-5936-4397-bbff-ad5e5d8781ce",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "6070c125-61f6-48d9-9593-4c0fd5bf8b25",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "99f4ae43-c1cb-46cb-995a-d98b5138c99f",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "ff864ded-0fb8-43c5-a4fe-a8b1bc740709",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "37ddc49c-53a6-4581-8694-4015c018a518",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "c1925df7-157a-4d54-a955-3bf7f4b1dc14",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "89c143cb-77c6-4f45-8e7d-4114d3134b50",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": true,
                    "param_pers_edit": true,
                    "param_pers_approve": true,
                    "param_subo_create": true,
                    "param_subo_edit": true,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": true
                }
            }
        },
        "depart_id": 2
    },
    {
        "id": 3,
        "name": "Бухгалтерия",
        "rang": 10,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "d938640e-8df9-4550-9a87-790332ed6430",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "16068323-cbb6-4e0d-bce4-e845ec65acb8",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "ecf187d4-f653-4f6a-b56c-d3361b339394",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "8dca2afa-50c9-4f7f-9993-008250ad7156",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "eac8bd2c-6758-4407-8462-4dd194bda8c2",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "040b7405-7a84-43b9-9b06-339eb9e2ee76",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "681bd985-dfc1-48c2-9fcb-1ce3d3f516de",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 3
    },
    {
        "id": 4,
        "name": "Техническая группа проектного отдела",
        "rang": 140,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "78e202b8-df51-4fc0-a1cd-9f75158cda58",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "26095753-79a3-4026-bf27-0c0bfd4cc2ae",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "31c2fce5-210c-4103-9e33-b7db59beaa30",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "23ee4b0e-d08b-4fc4-8316-e382e84b4388",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "904c1e9a-2ae6-420f-a324-ad99fea06469",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "23c0854c-b5e8-4521-84dc-58b4e79f1ba1",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "184fe357-311a-42e0-a12a-f880e6e5166e",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 4
    },
    {
        "id": 5,
        "name": "Отдел оптовых продаж",
        "rang": 50,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "0d524b3d-1e95-4211-b47f-a3a00a9a4af3",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "aa61b451-be9a-454c-99a5-fc5a8ee404ea",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "3f9a1503-300d-43a7-9798-fdc0c2371a7e",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "2a137a4a-fac9-4b29-a654-868eccfe1498",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "1f5220c4-ce64-493a-8ac2-ffd4fff4ddbc",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "89302961-059c-4e42-b270-cb5faf402067",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "e7510778-f960-485d-8df2-ceb5bf41d2dc",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 5
    },
    {
        "id": 6,
        "name": "Отдел рекламы",
        "rang": 70,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "c838ad5c-aa7a-4e14-816d-49c7b13d1c19",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "f50b2626-c220-46b1-acb6-d20c4612fd07",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "1149af2e-a7f6-4d7d-b91b-3d1f3db8d2bc",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "6ecb813d-95b3-4b76-8c60-c75fc0aa8844",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "70fdc38e-e189-4b1b-87dd-de19723843f2",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "dc895f6e-7d8b-46fe-a803-d14252178b63",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "2d1634a6-57ba-4f8f-bc53-b68f82606d22",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 6
    },
    {
        "id": 7,
        "name": "Технический отдел трансляционного звука",
        "rang": 60,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "a2717f44-45fb-41e1-9d78-55f578f2ce37",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "05999af7-5113-474f-acba-5d727f3e968f",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "7d1ad359-92b5-44ed-81c8-1c87d3d2e599",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "bc3e29a2-6545-49c7-8134-9904245cfae4",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "4f9bd750-21f0-49bc-90f1-c097e32214a7",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "182f9b21-dd3a-4f86-8ceb-ddcbb09d538d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "27e9ad6f-ff79-406d-a918-0e622918aba2",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 7
    },
    {
        "id": 8,
        "name": "Проектный отдел",
        "rang": 100,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "ca382f23-6368-4c1b-b149-f2d9dd5c9dc7",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "cbd07fbb-f4a9-44e7-a37d-cd8cc7b43c0d",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "2276bba4-d104-46da-8ed7-56b5ad0e9763",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "43964a77-aa7b-461c-bd99-fc52e576b00c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "70881b18-5d80-41c3-a9ed-d6b058e8c509",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "223c5cc7-79ed-4c68-945b-62e90043d16f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "beaffc90-823c-4a89-bf97-9cabfa4930b5",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 8
    },
    {
        "id": 9,
        "name": "Склад Санкт-Петербург",
        "rang": 120,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "2b08f410-db25-4828-9b68-6e8a5f6aedd0",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "00fe51e9-2533-43e7-90bf-8b89112039f2",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "8fd805e2-109f-49da-bcab-f67c518953d3",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "ffd9ebd8-1a07-4906-a1af-0d049fdfd31e",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "fbef8663-2ffb-44a9-a295-297e965aa809",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "b63eb8fd-3d19-4da8-a91f-4628701295be",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "463637c7-e973-490f-a8d3-7515b8924d08",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 9
    },
    {
        "id": 11,
        "name": "Строительный отдел",
        "rang": 110,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "a4c6f0d4-8036-4201-90fd-f368e7e62475",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "e4523408-7e3e-4d32-addc-47784aa8f82c",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "2ceea065-6176-4637-81a7-d739910f1af1",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "83fa50c8-a222-4840-8a66-4d315fed5613",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "f7f96e06-e45b-43a7-8577-52d7104a59ac",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "fb10e835-8d17-441d-8d4f-a998c78730f8",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "f0758470-b59d-4dd5-ab45-60c28f555003",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 11
    },
    {
        "id": 12,
        "name": "АХЧ",
        "rang": 200,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "61cbe124-1138-4c45-9190-96de868f744d",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "688ccf5f-fe12-42d4-87e7-2f3194169217",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "cc1c38d7-0e99-49ee-8456-e1b2ec93958a",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "55376f50-f8a2-4833-a020-6506ad9d180d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "14bdc032-cb56-44cd-8847-b66dbdb468cf",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "192cc02e-f1e2-46b8-8f37-a18fe9ca0f65",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "13a87276-f578-401e-b52d-38cb5b987846",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 12
    },
    {
        "id": 13,
        "name": "Дилерский отдел",
        "rang": 130,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "eb4e2d99-0250-40eb-93a8-82bb21575419",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "c5ea422b-0d67-4743-996c-0a6ee62d53b5",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "152d120f-46b5-482e-9740-115eabcad43b",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "021cf58b-e517-4126-b295-be273edce12b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "932de024-dc2b-4656-99cf-cae12b615543",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "373a0b94-344b-431a-9271-beb40ca3d2a9",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "25b8093f-dcfc-41f2-9cb8-71bd339b8b20",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 13
    },
    {
        "id": 14,
        "name": "Отдел информационных технологий",
        "rang": 90,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "bf730cac-4de3-40d9-8ece-07c24bd503d6",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "f628c63d-df7c-43f5-b998-7bbc8d36381f",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "c608c794-b657-44c6-a7ac-31fcc1e0d56c",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "38e3bc2d-c738-4014-a2f6-67cc56c47c25",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "2522cbd8-e2bf-4f84-937c-667239854031",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "6ee6c078-e0df-4f33-b2c6-5de4ed91df21",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "eaaf7221-dcbd-475b-a22a-386566484798",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 14
    },
    {
        "id": 15,
        "name": "Отдел информации",
        "rang": 40,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "9da35bda-ebe4-48df-8a4e-ae8ea7e11970",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "65eca2c2-d3a3-486b-9a98-bc8182a3bf1d",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "3f95f9d1-923e-411a-a76d-726135e77d2d",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "15a8fca7-a4ec-451f-9f00-6a9560122535",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "c34a55f7-51fb-4178-9782-731709428360",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "00c839db-2ec4-437e-a295-2524f1a96b2f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "69de6c2c-93d5-4bd6-b574-e93f2583cafb",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 15
    },
    {
        "id": 19,
        "name": "Контрагенты",
        "rang": 180,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "b04b0394-bc69-4a61-b4b6-4e968f84c8e6",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "ab52e2fb-0185-47fe-a747-1d46d875dd19",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "1e0750a5-8a5c-421c-88aa-de803554ec75",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "7f2a9da9-ee14-4341-953d-cb37cdf039cb",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "4e3d1a07-5283-46dc-96ec-f90759da6ebb",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "7e083965-a631-40c5-aa64-23a2a319d1af",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "bf9e7ce9-a907-4cba-9ab1-80e18b79eab4",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 19
    },
    {
        "id": 20,
        "name": "Технический отдел профессионального звука",
        "rang": 80,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "531cf918-b6c9-4e51-8bca-3c2f9a75605e",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "0158dcce-4d6a-4526-a5fe-9052ccbb7fa5",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "74e776cb-30d4-40c6-a6d2-aa866a063be6",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "fd4add34-f7c7-4fba-89ce-9d354d16d37f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "95d3119e-cad6-4eb9-a0b4-d4b44af0ba57",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "c78f772e-db8e-4fc4-a146-f0d34b8197b3",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "adaaef82-8c60-4130-8d26-099135df303a",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 20
    },
    {
        "id": 21,
        "name": "Отдел Логистики",
        "rang": 20,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "8da83b5f-e4e9-4111-adb9-0fde101e191f",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "43277750-eb95-491b-954a-b7c91f46b1f5",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "a5916f76-36f0-439c-86c8-78932c99df79",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "7eafc1b5-2917-4955-bd92-5e182742d94d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "b5eaa7e4-bcef-4ae7-8a47-335dfbf57f2c",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "20e394ab-5a73-4e0b-a9b5-2e594665866d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "5acaa42e-8864-4443-a86e-9c7d1a7cfeea",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "depart_id": 21
    }
];






export const ACL_SK_USERS = [
    {
        "id": 43,
        "surname": "Дурнева",
        "name": "Елена",
        "secondname": "Витальевна",
        "id_occupy": 36,
        "occupy": "начальник оптового склада СПб",
        "id_departament": 9,
        "rang": 115,
        "id_user": null,
        "id_komendant": 43,
        "status": "0",
        "passcard": "",
        "passcard_blob": "97010000009FCB32",
        "username": "skladspb1",
        "id_role": 17,
        "login_enabled": "no",
        "email": "",
        "qexit": "0",
        "boss": 0,
        "field": 11,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "e5bea261-b7e4-4149-986a-896112726307",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "7019d93f-a5f7-4f99-a5bd-fa7441ac2e5f",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "0a6f8d98-c699-4bfa-a67e-b18fd75e7796",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "8bc59a87-4177-4ef7-b89f-2395ef325a13",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "43f8ebcf-cb7a-4a3d-bbb8-72db00395be9",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "43adfe94-0717-4624-8c9c-a7f8e136a667",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "a05c5bdb-fed2-4d9a-b032-8ecb9faa6dae",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 43
    },
    {
        "id": 46,
        "surname": "Кошелев",
        "name": "Александр",
        "secondname": "Станиславович",
        "id_occupy": 21,
        "occupy": "коммерческий директор",
        "id_departament": 1,
        "rang": 9,
        "id_user": 6,
        "id_komendant": 2,
        "status": "0",
        "passcard": "10440958",
        "passcard_blob": "0801000000689FFE",
        "username": "alexander",
        "id_role": 2,
        "login_enabled": "yes",
        "email": "",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "100",
        "photo": "",
        "sigur_user_id": 73,
        "dismissal_date": 0,
        "recruitment_date": 742597200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 1,
        "active_company": 2,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 1,
        "skud_acls": [
            {
                "id": 1,
                "id_company": 2,
                "user_id": 46,
                "skud_current_state_id": 13,
                "param_pers_create": true,
                "param_pers_edit": true,
                "param_pers_approve": true,
                "param_subo_create": true,
                "param_subo_edit": false,
                "param_subo_approve": true,
                "param_any_create": true,
                "param_any_edit": true,
                "param_any_approve": true
            }
        ],
        "acls": {
            "6": {
                "id": "90e70c63-ccdd-4981-9534-0d8ae26627d8",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "ae0c0fed-9ec5-4329-a780-af7a7141fa0b",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "6740d6ad-9d3f-4d75-9261-fd3bdc0000a8",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "83c3354c-2787-4f5b-9339-70220302f9b9",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "23d7e07e-e139-471f-a00f-7ba0813a41bd",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "2a0e7271-34ea-413b-8ca5-9d161e66327c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "0d50c8d4-6727-47e7-9687-5b29458f3db1",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": true,
                    "param_pers_edit": true,
                    "param_pers_approve": true,
                    "param_subo_create": true,
                    "param_subo_edit": false,
                    "param_subo_approve": true,
                    "param_any_create": true,
                    "param_any_edit": true,
                    "param_any_approve": true
                }
            }
        },
        "user_id": 46
    },
    {
        "id": 47,
        "surname": "Кошелева",
        "name": "Валентина",
        "secondname": "Григорьевна",
        "id_occupy": 57,
        "occupy": "финансовый директор",
        "id_departament": 19,
        "rang": 130,
        "id_user": 26,
        "id_komendant": 3,
        "status": "0",
        "passcard": "11649065",
        "passcard_blob": "EE010000007BEBF1",
        "username": "valy",
        "id_role": 1,
        "login_enabled": "yes",
        "email": "valentina@arstel.su",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 0,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "47cb8f40-81e8-4fc9-bef6-0c5764821fc9",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "73d99025-e0ea-4c66-9323-59b2bb88951f",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "53ee558d-f697-42dc-910f-68f684167b82",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "1c1ca77e-7905-43c2-977e-030bee146242",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "535f8127-603c-4c28-bd1a-90e11a5cada2",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "d83a9814-416e-491b-a401-487eeee349f2",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "72796ee6-920f-4784-a27c-9e7cf4692a08",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 47
    },
    {
        "id": 57,
        "surname": "Печников",
        "name": "Дмитрий",
        "secondname": "Валерьевич",
        "id_occupy": 22,
        "occupy": "менеджер региональный",
        "id_departament": 5,
        "rang": 50,
        "id_user": 42,
        "id_komendant": 60,
        "status": "0",
        "passcard": "09559771",
        "passcard_blob": "36010000005FE97B",
        "username": "to",
        "id_role": 24,
        "login_enabled": "yes",
        "email": "a-dealer@arstel.com",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "226",
        "photo": "",
        "sigur_user_id": 47,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 1,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "89fedecf-098a-4757-8252-3676286e5b2b",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "355d3bcc-030e-44e6-a900-466faa56f757",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "34650fa2-94a3-48b4-aa5e-fb0dc07b002f",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "adc64783-2bc4-419c-bf8f-139b99269e37",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "277e07db-8301-4e27-89ca-df7ec200132e",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "7d4a718a-f0eb-46b0-8e00-904765cadc60",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "330b7ca1-1451-4d4b-972c-145337bf76b4",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 57
    },
    {
        "id": 91,
        "surname": "Фокин",
        "name": "Сергей",
        "secondname": "Петрович",
        "id_occupy": 47,
        "occupy": "радиоинженер",
        "id_departament": 7,
        "rang": 70,
        "id_user": null,
        "id_komendant": 38,
        "status": "0",
        "passcard": "23222767",
        "passcard_blob": "8F010000007439ED",
        "username": "sfokin",
        "id_role": 1,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "242",
        "photo": "",
        "sigur_user_id": 21,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "53eab323-b2f8-411a-8af6-0ce52296f466",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "792b5fa4-1e62-4d56-9c80-16500be5c084",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "95654471-062d-4595-9303-ecb6f9788283",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "5bd15f31-1c50-41ac-a9c2-03ccc11012b7",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "231abb50-bc4a-42a6-98d2-20bc3c0752ff",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "d560eec6-913d-4d49-b115-2c7fda5279ce",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "d58f6e7b-a7aa-4b28-ab8e-16acb259404d",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 91
    },
    {
        "id": 133,
        "surname": "Друговейко",
        "name": "Виктория",
        "secondname": "Юрьевна",
        "id_occupy": 9,
        "occupy": "главный бухгалтер",
        "id_departament": 3,
        "rang": 29,
        "id_user": null,
        "id_komendant": 83,
        "status": "0",
        "passcard": "499349",
        "passcard_blob": "1C01000000312485",
        "username": "vdrugoveiko",
        "id_role": 1,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "221",
        "photo": "",
        "sigur_user_id": 18,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "c38d7908-192f-4006-8229-4c820cd5ef05",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "15573c28-9bb0-4696-978c-5afe4984daf9",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "878d5207-fcba-4c73-8e40-45feb27dc15c",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "b67b5dc2-7db6-4922-8fa6-0e62f2be441e",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "5573672a-62fb-4229-bdf7-6255355156dc",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "d6deb759-2c63-4ed5-a12b-14dc0517e1f7",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "09d321b0-4d7b-4fd1-89d2-4bd7d7e46a25",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 133
    },
    {
        "id": 134,
        "surname": "Безбородов",
        "name": "Сергей",
        "secondname": "Дмитриевич",
        "id_occupy": 22,
        "occupy": "менеджер проектов",
        "id_departament": 5,
        "rang": 50,
        "id_user": 50,
        "id_komendant": 84,
        "status": "0",
        "passcard": "11633903",
        "passcard_blob": "A80100000074846F",
        "username": "sbe",
        "id_role": 6,
        "login_enabled": "yes",
        "email": "proekt@arstel.com",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "227",
        "photo": "",
        "sigur_user_id": 13,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 1,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "367fbec4-8977-4ee1-af1a-7632b63c591c",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "47728580-fcc5-46b1-8288-37871cbc7769",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "fec2e86a-d8c4-41f2-b908-3be056d13d84",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "6b937945-4032-4289-af9f-fb2ba7d867ef",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "3a602384-de2b-4928-90c1-db789da62758",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "06c39033-fa07-403f-b863-b40cf5155bac",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "5cdd54a6-5a09-4da5-b4fa-9abb48d6266e",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 134
    },
    {
        "id": 180,
        "surname": "Александров",
        "name": "Леонид",
        "secondname": "Алексеевич",
        "id_occupy": null,
        "occupy": "водитель-экспедитор",
        "id_departament": 9,
        "rang": 115,
        "id_user": null,
        "id_komendant": 131,
        "status": "0",
        "passcard": "",
        "passcard_blob": "5201000000748221",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "7fe44f0f-040d-4430-abe9-01876a4c982b",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "50b8a6bc-c653-4e4b-9d1c-8c8b6f6c59a3",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "77703419-2e77-47c1-ad72-6dcd2f462783",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "44f07799-4c6b-4534-a5c9-71a71fc629a0",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "5ef28299-9927-478f-9c3d-1d84a7a4d9e6",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "831ae56e-340b-4c1f-b6fc-299d6f5e679d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "09a37ca6-ebf9-4c6b-b5f1-de9f840fd658",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 180
    },
    {
        "id": 198,
        "surname": "Рогалева",
        "name": "Валентина",
        "secondname": "Евгеньевна",
        "id_occupy": null,
        "occupy": "менеджер отдела информации",
        "id_departament": 15,
        "rang": 40,
        "id_user": null,
        "id_komendant": 154,
        "status": "0",
        "passcard": "22228295",
        "passcard_blob": "3F01000000689FFF",
        "username": "rogalevainfo",
        "id_role": 8,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "202",
        "photo": "",
        "sigur_user_id": 56,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "bedbd74e-7274-434f-80cd-93b6cfe1ee51",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "f6d3b740-507c-4005-8d71-a8a38f3e84f2",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "f2d29441-69dc-4919-85a2-d5d0d7bf90b7",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "84157a5a-e9a0-4e07-8868-14c254494c0f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "69388c3b-a385-40c3-b01d-773f15599a17",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "fef68370-0b68-49fb-8d51-42d46e7c4e05",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "09eb4eec-4595-4d39-bc43-689224a1b8e7",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 198
    },
    {
        "id": 226,
        "surname": "Столярова",
        "name": "Анна ",
        "secondname": "Владимировна",
        "id_occupy": null,
        "occupy": "Ведущий менеджер",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": 180,
        "status": "0",
        "passcard": "10455115",
        "passcard_blob": "330100000068D74B",
        "username": "stolyar20",
        "id_role": 17,
        "login_enabled": "yes",
        "email": "d-dealer@arstel.com",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "251",
        "photo": "",
        "sigur_user_id": 77,
        "dismissal_date": 0,
        "recruitment_date": 1408914000,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "52ec35e1-f032-4326-9db8-1866e04d948c",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "6902d7b6-64a5-4fe4-b799-10ba2651fdfb",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "a6fab5d0-56a6-4219-a646-6fad966821bf",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "cd1892c2-975e-4f8c-8fe3-606f88b1ed49",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "809066d3-38ad-4766-a93b-c296fec1c97c",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "995bdc55-1ee2-45ce-b811-46fe7fae294c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "d5310226-1252-42d3-b9ad-287d52a70f6e",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 226
    },
    {
        "id": 271,
        "surname": "Ашуров ",
        "name": "Раджаббой ",
        "secondname": "Фуркатович ",
        "id_occupy": null,
        "occupy": "рабочий",
        "id_departament": 18,
        "rang": 900,
        "id_user": null,
        "id_komendant": 219,
        "status": "0",
        "passcard": "",
        "passcard_blob": "16008",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 43,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "26bf64d2-0c76-4b2e-8c35-60d2518267a8",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "cd92120f-b9d4-40e7-95a4-2e95c4c35858",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "a7eaea5c-0471-49bc-87f4-c6bd92c070f3",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "32b2f872-f9ab-47a2-bf35-97f20d25ee36",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "78ef2397-9ecb-4731-a792-3674aa9bfd6c",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "58973822-2ab4-4d0c-b0e2-47510dd685ec",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "783a27cb-bb37-4c8e-b8b5-74caccd96bb5",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 271
    },
    {
        "id": 272,
        "surname": "Ашуров  ",
        "name": "Фуркат",
        "secondname": "Пардакулович ",
        "id_occupy": null,
        "occupy": "рабочий",
        "id_departament": 18,
        "rang": 900,
        "id_user": null,
        "id_komendant": 219,
        "status": "0",
        "passcard": "",
        "passcard_blob": "16007",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 43,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "0eaa2fd9-9622-48ec-968e-1183e23ca078",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "13bfbc2f-c379-4617-a1c1-3a192504bff7",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "b87bee51-a94f-4d86-854d-886835a83d1c",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "43772900-5c62-45e2-b1e2-f066bbcdacaf",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "77f51112-190e-41ba-aa09-836fa6e5ce9f",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "2177ed26-2394-42b5-bdb3-223e480e9368",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "f56e8044-4f2e-4269-b256-95d8f307952f",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 272
    },
    {
        "id": 280,
        "surname": "Администратор",
        "name": "",
        "secondname": "",
        "id_occupy": null,
        "occupy": "Администратор",
        "id_departament": 19,
        "rang": 0,
        "id_user": null,
        "id_komendant": 219,
        "status": "0",
        "passcard": "11647318",
        "passcard_blob": "140000",
        "username": "igor",
        "id_role": 2,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 1,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 0,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "644ff2a5-3aaf-44de-846b-b57ac39f755c",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "f697d7af-4c7d-43a3-895e-6a024da84de6",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "599745f0-fdc5-4557-895a-ddd29d59e7d3",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "525ae2f0-53a8-48f6-9166-1dc71d544896",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "62299e89-1d60-4172-9a1e-a4892dab5b0b",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "a414f46f-04bd-4b68-8ffa-4bcd84927c61",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "c58ae1da-247e-4a66-94b2-62c2e0737bd9",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 280
    },
    {
        "id": 282,
        "surname": "Шалин",
        "name": "Руслан",
        "secondname": "Викторович",
        "id_occupy": null,
        "occupy": "главный инженер",
        "id_departament": 11,
        "rang": 113,
        "id_user": null,
        "id_komendant": 87,
        "status": "0",
        "passcard": "10440964",
        "passcard_blob": "0101000000170D02",
        "username": "rus5687",
        "id_role": 1,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 282,
        "visible": 1,
        "phone": "255",
        "photo": "",
        "sigur_user_id": 52,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "6a1c94df-2a71-4a49-bb0d-c77130fbe3f2",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "8f894e8e-4097-469e-abd6-bba030c3cf65",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "1d8c2f75-acb2-4e16-8b0b-b199c0fc4ff8",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "d0493026-09fc-498e-96a8-de01f92ae86b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "36d3c8dd-7d16-4b3e-bab9-44ed6da25c78",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "e68ccca5-677d-4211-90d5-5d20fb7601a3",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "15c9f6f6-81fe-4142-abfc-4b1f7cbd6a05",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 282
    },
    {
        "id": 283,
        "surname": "Булгакова",
        "name": "Жанна",
        "secondname": "Владимировна",
        "id_occupy": null,
        "occupy": "дизайнер интерьеров",
        "id_departament": 11,
        "rang": 112,
        "id_user": null,
        "id_komendant": 220,
        "status": "0",
        "passcard": "10533067",
        "passcard_blob": "54010000004A37E2",
        "username": "bulgakova0405",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 282,
        "visible": 1,
        "phone": "208",
        "photo": "",
        "sigur_user_id": 65,
        "dismissal_date": 0,
        "recruitment_date": 1462309200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "e29c4c61-4fa1-4c92-8bd6-fc7425423f63",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "cf891087-2efc-4063-ae36-1de7fc097a57",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "e9317a33-6383-47ea-898a-7685a0fef5b0",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "cf6b826b-9fbf-410e-b2bb-fcbfda2bb148",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "aa5421f0-f3b5-408c-b013-18b097e0718d",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "ce04d3f1-7f75-4c6d-a743-4115347f7159",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "d7e9323b-6712-4dcf-b5ce-80f3bd81e8f4",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 283
    },
    {
        "id": 287,
        "surname": "Бибик",
        "name": "Олег",
        "secondname": "Николаевич",
        "id_occupy": null,
        "occupy": "контролер ",
        "id_departament": 17,
        "rang": 1000,
        "id_user": null,
        "id_komendant": 226,
        "status": "0",
        "passcard": "",
        "passcard_blob": "1",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 43,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 184,
        "dismissal_date": 0,
        "recruitment_date": 1707685200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "dcd6bfdd-b322-4a9c-a1d1-f708d23a5e22",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "f3a90f50-2ffa-45bb-9ad2-f0766b0f65e5",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "dd2bfba6-7ae8-49a8-a133-bc3408e8b5f5",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "3d4f758a-2e7a-497c-84b7-7b7c26aaedeb",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "f5c8c9f3-b762-4d40-8a1b-03df8c7df324",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "1e19830d-9fb8-4d05-96a2-3c9bbcfa076e",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "47e2e481-56ec-42b5-91b9-f1b9f6da9105",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 287
    },
    {
        "id": 289,
        "surname": "Рябков",
        "name": "Геннадий",
        "secondname": "Иванович",
        "id_occupy": null,
        "occupy": "контролер КПП",
        "id_departament": 17,
        "rang": 1000,
        "id_user": null,
        "id_komendant": 226,
        "status": "0",
        "passcard": "",
        "passcard_blob": "1",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 43,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 193,
        "dismissal_date": 0,
        "recruitment_date": 1715547600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "fbc628ed-5feb-48e6-8aca-b8c3a4192bca",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "107a469f-e754-4d3b-836d-855355b94904",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "a45a3c0b-241f-41e0-b00b-174de28d5869",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "4d96feab-aba3-4995-af0d-6fb19d0607f4",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "ea032ae0-c6c0-45c8-890e-f7f7ace60f37",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "db7f8299-cdfc-4131-b47e-567ca9491686",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "3a6af52a-4a3d-42dd-89bd-aae7e076b952",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 289
    },
    {
        "id": 304,
        "surname": "Зеленко",
        "name": "Ирина",
        "secondname": "Вячеславовна",
        "id_occupy": null,
        "occupy": "менеджер-координатор",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": 235,
        "status": "0",
        "passcard": "2233942",
        "passcard_blob": "2345",
        "username": "ZIV1609",
        "id_role": 17,
        "login_enabled": "yes",
        "email": "sales@arstel.com",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "225",
        "photo": "",
        "sigur_user_id": 23,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "a67bcb61-2acb-4313-9e2c-30b29c05f050",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "dd96b284-ac30-4744-aaab-737cd76ce7e5",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "ee2cf21e-2e9a-4b49-9a7c-a28d37a814b6",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "14dec299-6b01-467d-a3b9-1473a81d8142",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "68a43090-373b-408b-83d8-a93447dac328",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "db2717eb-8275-4f95-af68-9129ced1a496",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "4f8a5951-0913-4295-8db3-224d3df4273c",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 304
    },
    {
        "id": 309,
        "surname": "Бобко ",
        "name": "Александр ",
        "secondname": "Владимирович ",
        "id_occupy": null,
        "occupy": "инженер-проектировщик",
        "id_departament": 8,
        "rang": 100,
        "id_user": null,
        "id_komendant": 242,
        "status": "0",
        "passcard": "10133460",
        "passcard_blob": "BF010000006582B4",
        "username": "BobAleV",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "253",
        "photo": "",
        "sigur_user_id": 32,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "66565ac2-7fc5-4d24-acb4-83aaaae9deaf",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "e84aa824-952b-4789-8233-9ce9dca92fff",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "5a0a214a-1961-4781-bf99-a8b53feeab82",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "6b3614b2-0ecc-4cb4-bc11-49f39035c57c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "266da94b-c1b2-42d8-b3d7-b8ebf0ecde84",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "85abfec5-6224-4d9d-b71f-73b196a506bf",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "342e97c0-e378-45f5-9e98-3642696517e6",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 309
    },
    {
        "id": 327,
        "surname": "Кобяков",
        "name": "Вячеслав",
        "secondname": "Борисович",
        "id_occupy": null,
        "occupy": "контроллер КПП",
        "id_departament": 17,
        "rang": 1000,
        "id_user": null,
        "id_komendant": 253,
        "status": "0",
        "passcard": "",
        "passcard_blob": "1",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 43,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "1a164fc2-33f4-4aa1-8247-bc0c4ecfdd98",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "f23373bc-6d68-4206-9e1d-0c869653efc0",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "f7b04920-6e75-4a6f-a30c-0c5dbf65f81a",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "4d6cbe09-c6ef-43eb-8c4c-53f4903e638c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "e3e771ed-bfa3-4a30-bcf9-44cc38561b38",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "a9beb6d2-b529-48ab-a4bb-ac89649aeddd",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "4cef6592-d7bf-43d1-b510-c6f146af8da0",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 327
    },
    {
        "id": 334,
        "surname": "Глинтерник",
        "name": "Мария",
        "secondname": "Алексеевна",
        "id_occupy": null,
        "occupy": "менеджер по персоналу",
        "id_departament": 2,
        "rang": 38,
        "id_user": null,
        "id_komendant": 258,
        "status": "0",
        "passcard": "632694",
        "passcard_blob": "C60100000092E36D",
        "username": "Glinternic",
        "id_role": 17,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "216",
        "photo": "",
        "sigur_user_id": 9,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "48b1dd57-c006-4d40-9879-28ebc6f0fb07",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "9470295e-c876-4e86-b268-ab1dcc9dadc0",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "b05172f1-9db2-4f4c-bb50-d2535592f3d5",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "8fdf2452-fdae-46b2-a6e5-2b49c512cc0d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "2f1984bb-8f3c-473c-bca6-875190d673eb",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "defd1175-8fce-4caa-928a-b309f02b26b3",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "0a6f5bf4-6263-4cab-814a-3355daa0b075",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 334
    },
    {
        "id": 337,
        "surname": "Иванов",
        "name": "Олег",
        "secondname": "Рудольфович",
        "id_occupy": null,
        "occupy": "радиоинженер",
        "id_departament": 7,
        "rang": 70,
        "id_user": null,
        "id_komendant": 261,
        "status": "0",
        "passcard": "1183620",
        "passcard_blob": "5401000000760E24",
        "username": "OlegIvanov",
        "id_role": 17,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "244",
        "photo": "",
        "sigur_user_id": 30,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "d5b49b11-ed7a-4e36-8037-b3d448563ab7",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "ccdadf2b-855d-42a4-a07d-6b12ed2e9c34",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "9822aa7e-c205-432f-bbc8-c83de6bd9e3d",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "6fb8434d-509e-4958-a674-62cd598d07e3",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "a8209f49-9ee6-470d-a152-e41aa454cd4b",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "d16b75af-5b1b-436f-8a85-3bf9fd76500d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "4dc40370-b1fd-4f82-b037-c44f5a220af6",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 337
    },
    {
        "id": 339,
        "surname": "Горяева",
        "name": "Ксения",
        "secondname": "Викторовна",
        "id_occupy": null,
        "occupy": "менеджер-координатор",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": 263,
        "status": "0",
        "passcard": "10350571",
        "passcard_blob": "11",
        "username": "goryaeva",
        "id_role": 17,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "219",
        "photo": "",
        "sigur_user_id": 8,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "073dfd0d-a731-4539-b8c0-c7e3d674f56d",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "d4005744-8931-4348-b3a6-d3f24e678369",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "62e39cda-921b-476f-9562-d58ce1af3bde",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "ba240bf0-fbb6-4fe5-a431-ec3a7bb28d30",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "29527b53-28b8-407b-ab63-b98adacf3449",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "6f21f631-34a6-496a-bc1c-1fb35e11b9d4",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "f4d5a873-7e31-43cc-b6e1-e109919c99d9",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 339
    },
    {
        "id": 340,
        "surname": "Петровский",
        "name": "Павел",
        "secondname": "Сергеевич",
        "id_occupy": null,
        "occupy": "менеджер региональный",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": 264,
        "status": "0",
        "passcard": "10350532",
        "passcard_blob": "C40100000067C564",
        "username": "pavelp",
        "id_role": 10,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "220",
        "photo": "",
        "sigur_user_id": 11,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 1,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "03038e5e-828e-4a1d-b561-01d2abbfbd7f",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "d1c670a7-1d3f-40a0-a4d7-5b2cdd6607ab",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "1abae7f1-55fa-4c46-8d92-2b941b0ea08a",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "188763db-a698-4052-8d5e-14a62aba61f2",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "dcb67b7e-952e-4696-a9d9-ed1aa7638420",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "34f5adf9-aaf9-49fd-b906-b2d8ca8580ce",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "ce2979e3-b7cb-447e-91fe-d06067113970",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 340
    },
    {
        "id": 361,
        "surname": "Журба",
        "name": "Иван",
        "secondname": "Анатольевич",
        "id_occupy": null,
        "occupy": "прораб",
        "id_departament": 18,
        "rang": 900,
        "id_user": null,
        "id_komendant": 285,
        "status": "0",
        "passcard": "",
        "passcard_blob": "88000",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 43,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 1520283600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "808b8b1e-3948-4174-a6e9-f002f9c97003",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "53c6e9c4-a69f-462f-a9de-2d1b0149f15a",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "5c063ac3-d9ad-4cd2-a925-17c486d7179e",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "c273eb74-8542-45b5-97bc-f45efb75d7f3",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "c0f294ba-c565-4f8a-93ef-9008b238cc79",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "05c13fbf-6906-470f-9533-d7fbb9458e0f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "edce76da-fa9a-4cc8-b23c-86b76498b6d4",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 361
    },
    {
        "id": 371,
        "surname": "Батов",
        "name": "Константин",
        "secondname": "Александрович",
        "id_occupy": null,
        "occupy": "радиоинженер",
        "id_departament": 8,
        "rang": 100,
        "id_user": null,
        "id_komendant": 286,
        "status": "0",
        "passcard": "13826121",
        "passcard_blob": "371",
        "username": "batov",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "243",
        "photo": "",
        "sigur_user_id": 10,
        "dismissal_date": 0,
        "recruitment_date": 1531861200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "8dddf1ee-3cfb-445a-a78d-d87dfe5da975",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "94fea2f0-c6d9-4477-b5fc-9af46ca68007",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "6516906e-64bf-4720-ae87-6211c59ec99d",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "ad051523-bab9-43fd-b6d8-80715f3f6189",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "718311c0-8b88-442f-9c6c-08496ec98471",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "38b84845-107b-4da6-a883-97b2041277e0",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "e42812da-fbd2-48ba-ade8-884ea18d5cc8",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 371
    },
    {
        "id": 374,
        "surname": "Котоликов",
        "name": "Евгений",
        "secondname": "Алексеевич",
        "id_occupy": null,
        "occupy": "региональный менеджер",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "10524068",
        "passcard_blob": "89000",
        "username": "katolic",
        "id_role": 17,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "224",
        "photo": "",
        "sigur_user_id": 26,
        "dismissal_date": 0,
        "recruitment_date": 1536872400,
        "deleted": 0,
        "no_uses_skud": 1,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "132786c3-a66e-41e0-bf02-3478762decc9",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "47c0c651-5353-4171-adba-0eb9d0ebffab",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "89db4827-aaa7-48e4-ac3f-9a5df7f6ff50",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "a2cdad1f-459a-493a-8741-520a0942b746",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "c286971e-c3f0-4e06-8919-e80964408a37",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "8ab4d61f-68df-4901-b08f-6a010eda47ad",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "d15f674f-3df3-425e-bc0c-11e4ce0ffcc0",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 374
    },
    {
        "id": 393,
        "surname": "Строительный",
        "name": "отдел",
        "secondname": "",
        "id_occupy": null,
        "occupy": "",
        "id_departament": 11,
        "rang": 120,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "23222731",
        "passcard_blob": "193000",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 282,
        "visible": 0,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 1554843600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "3c882f4f-7d5e-4a91-b765-4300fbdd6d8a",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "92b4a884-6ec5-40e4-ad1e-fc98187967ee",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "528d9c8f-15d5-45ff-ab57-52acc940df3b",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "7d8de025-787a-434c-abe4-bac907d0cac1",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "9d3b3ba7-a3e9-4c53-98a2-3b3cf8740371",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "67e5c623-0901-4e26-99cc-53554f851131",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "827712fb-8a88-4f73-b293-bdc33b3f7c24",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 393
    },
    {
        "id": 400,
        "surname": "Шевченко",
        "name": "Сергей",
        "secondname": "Витальевич",
        "id_occupy": null,
        "occupy": "радиоинженер",
        "id_departament": 7,
        "rang": 70,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "23744962",
        "passcard_blob": "210000",
        "username": "sheva",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "237",
        "photo": "",
        "sigur_user_id": 16,
        "dismissal_date": 0,
        "recruitment_date": 1557694800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "d9fbeaa8-e403-47db-9724-10159d698f1d",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "82ae3895-1276-4e8f-8158-609acd190d58",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "f6bb3990-5da8-4fb5-b124-0f076dbe419f",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "5d14f093-c6b5-40ff-8bbb-74f2998c9cb0",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "210fed28-ac2b-4571-b754-5f10aba86d5b",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "34ac9479-affa-4ba2-b779-acd2dd8923a7",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "02897a21-5258-4106-9c75-16c17cb6449e",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 400
    },
    {
        "id": 405,
        "surname": "Турлов",
        "name": "Максим",
        "secondname": "Георгиевич",
        "id_occupy": null,
        "occupy": "менеджер-координатор",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "10526921",
        "passcard_blob": "217000",
        "username": "Turlov",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "209",
        "photo": "",
        "sigur_user_id": 67,
        "dismissal_date": 0,
        "recruitment_date": 1565038800,
        "deleted": 0,
        "no_uses_skud": 1,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "90fcf5bd-e4fb-4462-8a25-140cb7f69fac",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "0ff8ee3d-c6d0-4f90-8f0b-3bd1c3e5e391",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "68ca31d0-27df-4960-aabc-bf9256217fb5",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "79e152b1-9b70-4830-97e8-d50704519c3d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "98df9ba6-8c33-44e8-a231-5a7a6742001c",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "ed60f583-24d0-45e1-860f-8fdca2e5e792",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "6e4e1fad-4efc-4c8f-9ae1-1b0bc7fcff07",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 405
    },
    {
        "id": 411,
        "surname": "Мельников",
        "name": "Павел",
        "secondname": "Валерьевич",
        "id_occupy": null,
        "occupy": "инженер-консультант",
        "id_departament": 7,
        "rang": 70,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "1056120",
        "passcard_blob": "223224",
        "username": "Pavel",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "213",
        "photo": "",
        "sigur_user_id": 212,
        "dismissal_date": 0,
        "recruitment_date": 1569790800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "9a987cb1-e7c8-4c13-a653-7855e8457335",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "bd634b77-1b56-4228-a6f8-7fab95e9b9e1",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "a1829503-418d-4ac0-9fc2-f0b469a90036",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "246d9c8d-82b3-4828-91c2-8d51307378dc",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "98100b0d-ff8b-40c0-a658-b9decc75de7f",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "f7259582-1c4c-4294-96df-c98e4e1b9bdf",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "269057c5-37b8-4965-b4e1-d7c0b4a9a0e2",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 411
    },
    {
        "id": 436,
        "surname": "Горев",
        "name": "Владимир",
        "secondname": "Сергеевич",
        "id_occupy": null,
        "occupy": "грузчик-комплектовщик",
        "id_departament": 9,
        "rang": 115,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "",
        "passcard_blob": "259000",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 0,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "60a02670-ea22-4692-944a-9e17b9e0ac73",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "b652cff7-48e9-478f-ad0f-3d7e3a223052",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "66896283-1917-42fd-a646-d31519ef1bda",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "b8003f82-bf89-4f2b-aa6c-83f34ccb915d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "c773f727-2827-496e-a608-65c11d4609e0",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "4d931883-5303-4a19-af3d-8e4fa619a043",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "37270661-03f3-4948-bc8e-77602451a2af",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 436
    },
    {
        "id": 463,
        "surname": "Нестеренко",
        "name": "Дмитрий",
        "secondname": "Сергеевич",
        "id_occupy": null,
        "occupy": "Заместитель директора",
        "id_departament": 11,
        "rang": 114,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "11647312",
        "passcard_blob": "327000",
        "username": "nesterenko",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 282,
        "visible": 1,
        "phone": "254",
        "photo": "",
        "sigur_user_id": 64,
        "dismissal_date": 0,
        "recruitment_date": 1624222800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "710830d2-52f7-4eee-9afd-3458177a0669",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "2a06c207-aef2-46a9-9c93-5c81b2e87e08",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "6b8c08f1-c9f7-4288-9bba-756f709504f8",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "d689c834-9162-4dbd-9ad8-704375046f9d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "7bed2842-4a4e-429b-a077-ebbcdb864d00",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "adb14f79-cd51-4591-a764-7eecee622c6f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "7a803873-d86f-4746-8d18-874452dfc5ab",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 463
    },
    {
        "id": 474,
        "surname": "Федянин",
        "name": "Алексей",
        "secondname": "Валерьевич",
        "id_occupy": null,
        "occupy": "вэб-дизайнер",
        "id_departament": 14,
        "rang": 90,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "13962097",
        "passcard_blob": "345000",
        "username": "fedyanin",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 540,
        "visible": 1,
        "phone": "238",
        "photo": "",
        "sigur_user_id": 39,
        "dismissal_date": 0,
        "recruitment_date": 1634590800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "643f2085-6550-460a-92f8-70b90a9d6d8b",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "7adbdb1e-f2c1-4ff2-b9eb-14cc6622b143",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "d9675caa-e2d6-415e-8291-a724c419866e",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "e70d12c1-9f37-4540-976d-3f68a0406eb6",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "f3dd225c-e386-4510-bb57-2d245ee340dd",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "486e5819-c3a3-483b-8300-1aa4bfc81105",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "1123e330-01ff-466c-8536-41c5b2eef3d2",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 474
    },
    {
        "id": 482,
        "surname": "Дрюков",
        "name": "Артём",
        "secondname": "Владимирович",
        "id_occupy": null,
        "occupy": "3д-дизайнер",
        "id_departament": 14,
        "rang": 90,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "1408018",
        "passcard_blob": "353000",
        "username": "adrukov",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 540,
        "visible": 1,
        "phone": "248",
        "photo": "",
        "sigur_user_id": 33,
        "dismissal_date": 0,
        "recruitment_date": 1641848400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "1ebacf3f-998c-41bc-a162-ddc792f2eefc",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "0d320986-8c6a-41a4-a5d3-2922490139b8",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "d847b1e8-577e-4c61-9578-4a765f14e6f6",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "d11825c7-6b67-49a9-898f-55c1f10d3c3f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "a799568c-035a-49f4-ae12-28e113aa996b",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "e72b5178-9c94-47cc-b7ce-1699f53e0354",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "c7ac645d-1705-49fe-ba9b-48aa49cc8549",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 482
    },
    {
        "id": 483,
        "surname": "Матченков",
        "name": "Максим",
        "secondname": "Юрьевич",
        "id_occupy": null,
        "occupy": "Программист",
        "id_departament": 14,
        "rang": 90,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "10524041",
        "passcard_blob": "354000",
        "username": "maxmatch",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "231",
        "photo": "",
        "sigur_user_id": 28,
        "dismissal_date": 0,
        "recruitment_date": 1641848400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "1a1befbe-c1e9-4545-8415-2aecfc8dd60e",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "33e9750f-e392-43da-80c0-e98d4011e344",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "953baa47-97a7-4210-b607-d79ead5b13ba",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "7447e522-c3b9-43a6-ab82-df1bf6ade89c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "950c3e43-2a9b-4bf2-84ac-44e4a50ced0d",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "d658f8d7-78cb-476c-8ca8-9c057d3200a0",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "e1a163b1-6dde-4275-8614-3d917425cdc8",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 483
    },
    {
        "id": 486,
        "surname": "Шаранда",
        "name": "Андрей",
        "secondname": "Дмитриевич",
        "id_occupy": null,
        "occupy": "Программист",
        "id_departament": 14,
        "rang": 75,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22231832",
        "passcard_blob": "357000",
        "username": "asharanda",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "211",
        "photo": "",
        "sigur_user_id": 37,
        "dismissal_date": 0,
        "recruitment_date": 1644181200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "d592dcb8-e7d7-4f9a-b8ea-8f50696c0ba7",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "00e5f73a-cc76-4a94-96e2-04a1fcc327f9",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "d0de82d1-3976-4980-8656-44fccf96df6a",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "609d1d1a-47d9-4a6b-b859-eafbb252de7c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "e5adccb1-2479-4bac-99a1-fbc45bfbe36e",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "173d576f-1b2f-4e8d-b10a-9533f17eb495",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "08ba6982-b5da-4cb0-a311-5aec6ac08ac9",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 486
    },
    {
        "id": 493,
        "surname": "Дегелевич",
        "name": "Юрий",
        "secondname": "Евгеньевич",
        "id_occupy": null,
        "occupy": "Технический директор",
        "id_departament": 1,
        "rang": 9,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22227652",
        "passcard_blob": "364000",
        "username": "jde",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "217",
        "photo": "",
        "sigur_user_id": 12,
        "dismissal_date": 0,
        "recruitment_date": 1648760400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "009c0827-5683-460f-a55b-6748aabe3eb2",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "178d6dd6-d6de-4f9b-b3f1-70c1ac3743fe",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "1a30d5a3-d362-4f0a-8398-14dc8a887f9a",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "222b1112-4ba5-4d29-a264-c030436ab69f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "ad9af821-e625-470e-bcd4-a591564fd122",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "c6d319d7-63a0-4a18-a529-7a3f9bf14eb8",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "01b55573-6d96-42fc-92ea-2fb45e526d71",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 493
    },
    {
        "id": 498,
        "surname": "Булышева",
        "name": "Ольга",
        "secondname": "Александровна",
        "id_occupy": null,
        "occupy": "менеджер ВЭД",
        "id_departament": 21,
        "rang": 35,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22635683",
        "passcard_blob": "369000",
        "username": "obulysheva",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "204",
        "photo": "",
        "sigur_user_id": 22,
        "dismissal_date": 0,
        "recruitment_date": 1653253200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "f4c110ae-b210-4cad-a6ea-9559f1484691",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "1d113072-2f43-4f98-bfd5-9619c333d848",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "ebf13072-0099-4df5-bc4c-46c3ae6bb959",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "a3a863de-44fc-4133-a1b7-aa80a45c6100",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "09d00dac-2625-413c-9aec-fb50a3d4ef0e",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "e820ad22-23f8-41ab-8e12-41b011619557",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "336c8bc0-7862-4e49-ae6f-e3164fc52f59",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 498
    },
    {
        "id": 499,
        "surname": "Сорокина",
        "name": "София",
        "secondname": "Евгеньевна",
        "id_occupy": null,
        "occupy": "Графический дизайнер",
        "id_departament": 14,
        "rang": 90,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22919101",
        "passcard_blob": "374000",
        "username": "ssorokina",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 540,
        "visible": 1,
        "phone": "232",
        "photo": "",
        "sigur_user_id": 41,
        "dismissal_date": 0,
        "recruitment_date": 1658178000,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "ef9285e5-03cd-4074-b7f7-231c90532662",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "a4003f23-eee8-49bb-a30d-3e550d0e51ba",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "375d5d11-5acb-40a4-b2ff-eacf682df353",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "2d896cdd-be60-4e36-867b-8c620f8a6b75",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "144ec4f6-7729-46e4-8828-7cf77df8de56",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "9ecfe51a-1325-45f0-a6c5-42e9b32c14fd",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "82a0a934-7f7a-4dda-882b-8a9359fb848e",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 499
    },
    {
        "id": 521,
        "surname": "Палагушина",
        "name": "Любовь",
        "secondname": "Владимировна",
        "id_occupy": null,
        "occupy": "Бухгалтер",
        "id_departament": 3,
        "rang": 29,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22635551",
        "passcard_blob": "102000",
        "username": "plv",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 133,
        "visible": 1,
        "phone": "223",
        "photo": "",
        "sigur_user_id": 102,
        "dismissal_date": 0,
        "recruitment_date": 1671926400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "e7e87118-ab95-49b6-b5a9-3633c5d8daca",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "794543a7-caa1-45e2-a493-4d8d5bfab6ec",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "591b53a4-e72a-45e8-bf9a-3565c03049cc",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "06de1f2f-da5e-490f-8447-f516930c086d",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "64dcf1c1-ff34-4c3f-a8f4-6f4950d5d39e",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "2e7df9f2-d976-4c45-818b-45c965c0cfc1",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "dd6245b5-5119-4a83-9e34-22935f130e19",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 521
    },
    {
        "id": 522,
        "surname": "Степанченко",
        "name": "Александр",
        "secondname": "Николаевич",
        "id_occupy": null,
        "occupy": "Инженер",
        "id_departament": 20,
        "rang": 75,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22226198",
        "passcard_blob": "104000",
        "username": "alst",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "241",
        "photo": "",
        "sigur_user_id": 104,
        "dismissal_date": 0,
        "recruitment_date": 1673557200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "ee9e425c-baa1-4e11-9454-4232e3ab75da",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "7f160deb-2102-45cd-9079-d5e77f0494a7",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "e39947e9-7db3-4c03-9ec0-5aa6b9a0404d",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "3c9da9f0-39af-4dab-9c8f-942028b65137",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "a5895f65-3a8b-4126-abac-e63e038bf35d",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "dd9a593f-7a99-4fa0-b237-1fd0aafe5f3b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "d082d33f-1a0e-4155-974e-365dc6f2d14d",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 522
    },
    {
        "id": 528,
        "surname": "Карташов",
        "name": "Роман",
        "secondname": "Станиславович",
        "id_occupy": null,
        "occupy": "Кладовщик",
        "id_departament": 9,
        "rang": 115,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "",
        "passcard_blob": "137000",
        "username": "kartashov",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 137,
        "dismissal_date": 0,
        "recruitment_date": 1678827600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "c3d06296-e8a8-4847-b31b-62b974a26488",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "1aff3d58-886d-4496-9b02-8f0dd181130d",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "12fb872e-e53c-49fd-afed-9d2f7e5dd59a",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "509fae05-9500-439a-a083-c4f0c0a4f342",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "b6d0ba8b-8cb1-44e2-a9af-670718f88c49",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "2ac5d97c-8488-4520-b51f-08887b243229",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "81e3d81f-7a49-4d6f-b47a-e7730f8a9bca",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 528
    },
    {
        "id": 530,
        "surname": "Самарин",
        "name": "Станислав",
        "secondname": "Александрович",
        "id_occupy": null,
        "occupy": "Контролер КПП",
        "id_departament": 17,
        "rang": 1000,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "",
        "passcard_blob": "146000",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 43,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 146,
        "dismissal_date": 0,
        "recruitment_date": 1713128400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "b938442c-fc53-4e17-b54c-3c0d086091a2",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "4a6d7d80-0dd5-44b6-8f47-07fd79329ba4",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "c56a0cad-76d3-4c5d-b3a4-4a16add728b6",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "e28cd33c-eb7e-40ea-9dbc-ec53d0cfd6cc",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "e9549e61-d2c9-4807-a989-2dfae5a8efb2",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "2393a1b4-7fb0-4ff8-9181-acdce7e1fc76",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "e51ac1e9-8386-4ce3-8ecc-91e066c3d233",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 530
    },
    {
        "id": 531,
        "surname": "Захарова",
        "name": "Анна",
        "secondname": "Юрьевна",
        "id_occupy": null,
        "occupy": "Бухгалтер",
        "id_departament": 3,
        "rang": 29,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22255167",
        "passcard_blob": "147000",
        "username": "azaharova",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 133,
        "visible": 1,
        "phone": "222",
        "photo": "",
        "sigur_user_id": 147,
        "dismissal_date": 0,
        "recruitment_date": 1684886400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "eaa8e8c2-a69f-40fa-bd33-b2102f079415",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "0b30f5fc-ba44-4add-81a5-001f4e311a63",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "8715c55c-84cb-43bd-8456-b59853c0f878",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "5ae43e2e-f400-4338-9322-6318b8b0573b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "ecde33c8-efd2-4dca-aa7e-e7fffa78efa3",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "5471396a-0007-4819-a80c-25b64d210316",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "f8a6c9a9-9acb-4778-90d0-1516040c9bde",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 531
    },
    {
        "id": 533,
        "surname": "Балабанова",
        "name": "Татьяна",
        "secondname": "Алексеевна",
        "id_occupy": null,
        "occupy": "Графический дизайнер",
        "id_departament": 14,
        "rang": 90,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "23223051",
        "passcard_blob": "149000",
        "username": "tba",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 540,
        "visible": 1,
        "phone": "239",
        "photo": "",
        "sigur_user_id": 149,
        "dismissal_date": 0,
        "recruitment_date": 1685912400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "20d9e315-fc27-4a0f-8385-ce20bbf41d08",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "f71c5580-9568-48e6-974c-67f3a213ad29",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "e629fedf-a545-4ef6-acb3-a9d18cde0941",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "82271f74-d041-4726-9afa-c30caf299d2c",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "38f6336b-3f78-46d6-9870-0ecda9377ea8",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "fca549ee-47b1-472d-b9e6-084face985fc",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "67171a01-575c-439c-b52a-156ff12accef",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 533
    },
    {
        "id": 536,
        "surname": "Филиппова",
        "name": "Екатерина",
        "secondname": "Юрьевна",
        "id_occupy": null,
        "occupy": "Менеджер",
        "id_departament": 15,
        "rang": 40,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22633201",
        "passcard_blob": "154000",
        "username": "filippova",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "229",
        "photo": "",
        "sigur_user_id": 154,
        "dismissal_date": 0,
        "recruitment_date": 1692738000,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "d9c9e408-4380-46f3-97d5-3589740ea7d1",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "7241b6f1-5031-4d13-9855-2855b15d2159",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "c29a368f-82a1-47ec-b6ed-6a8e7b90a1cd",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "2c60fa7b-2488-4b85-9f17-409e2e8bdf27",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "4b5f9335-ddee-4735-8fe7-a882faee1110",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "94b3441f-0a96-4e3c-9cae-f585c309493a",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "c021d31a-50e5-4bd0-a949-e43f08727da3",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 536
    },
    {
        "id": 537,
        "surname": "Иванов",
        "name": "Сергей",
        "secondname": "Алексеевич",
        "id_occupy": null,
        "occupy": "Инженер",
        "id_departament": 7,
        "rang": 70,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22634972",
        "passcard_blob": "155000",
        "username": "sivanov",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "212",
        "photo": "",
        "sigur_user_id": 155,
        "dismissal_date": 0,
        "recruitment_date": 1693515600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "50ed01d1-7e40-464f-bc3c-121940018996",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "ab9dfa62-220d-4a3b-b5af-55e8a5d1de3b",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "a2e6d1d9-c975-4468-979e-c8ba06f5a013",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "882aca6a-3661-49bb-af7f-5df9c0278fe4",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "f7217259-22cf-433d-bdd7-2d560458de40",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "0f68b837-2719-463a-a5ee-cdb9fa909b4e",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "b0eaeaad-ed5e-41dd-89fe-e53e61702453",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 537
    },
    {
        "id": 538,
        "surname": "Бакланов",
        "name": "Геннадий",
        "secondname": "Валентинович",
        "id_occupy": null,
        "occupy": "Инженер",
        "id_departament": 20,
        "rang": 75,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22255053",
        "passcard_blob": "158000",
        "username": "gbaklanov",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 493,
        "visible": 1,
        "phone": "252",
        "photo": "",
        "sigur_user_id": 158,
        "dismissal_date": 0,
        "recruitment_date": 1693774800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "b2f3c9a8-1475-48fd-893f-cb5285c4487f",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "ed6acc6b-7ec7-49aa-ac20-766e46f67e9d",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "1d9aaa0d-8f02-4686-b7a2-ea93e04c0d23",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "e093060e-8cce-4772-b72e-48ecab9be632",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "98ea0393-ce65-423c-923e-633383b4158e",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "ede9e7fe-cad3-4296-a3ef-f48740b2b995",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "e91d1990-14d0-4260-8435-871cdb8bf253",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 538
    },
    {
        "id": 540,
        "surname": "Точилина",
        "name": "Лидия",
        "secondname": "Львовна",
        "id_occupy": null,
        "occupy": "Начальник",
        "id_departament": 14,
        "rang": 90,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22163918",
        "passcard_blob": "162000",
        "username": "ltochilina",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "247",
        "photo": "",
        "sigur_user_id": 162,
        "dismissal_date": 0,
        "recruitment_date": 1696194000,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "eeece1a6-0571-41f5-85a5-732fc6a883bb",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "9f1e65a7-18af-4e7a-93a6-865532a9c401",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "19c46520-7690-4a51-8d8d-05d1066ae17c",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "16f19821-8528-4b31-960d-a1df9b310d8b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "14006561-0bfd-4820-92f9-101b2df08197",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "890d8f1e-c464-48fa-9e04-d6ae025adb6b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "bead0441-d819-437a-85cf-3ad709d1b8dc",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 540
    },
    {
        "id": 547,
        "surname": "Балымов",
        "name": "Геннадий",
        "secondname": "Робертович",
        "id_occupy": null,
        "occupy": "Региональный менеджер",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22255868",
        "passcard_blob": "186000",
        "username": "gbalymov",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "230",
        "photo": "",
        "sigur_user_id": 185,
        "dismissal_date": 0,
        "recruitment_date": 1713733200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "43e523f3-049e-432e-9a53-a71a2c6b8efc",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "c7babe69-2ba2-4d26-a30f-d698b51108b6",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "4c5f12fd-0de3-4e67-b2ec-1c800b1f2768",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "184c8a85-c52c-4a69-9b27-0155e2a0bd50",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "4f8425ee-9cce-4bec-857c-e2b6bb07df47",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "29a5f6fa-dedb-414a-b4e6-b2c206fb9bd7",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "fd5c9b6e-f8b7-442d-899f-ea7eec114194",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 547
    },
    {
        "id": 549,
        "surname": "Рясянен",
        "name": "Алан",
        "secondname": "Раймович",
        "id_occupy": null,
        "occupy": "Начальник",
        "id_departament": 20,
        "rang": 75,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22633398",
        "passcard_blob": "189000",
        "username": "aryas",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "250",
        "photo": "",
        "sigur_user_id": 189,
        "dismissal_date": 0,
        "recruitment_date": 1714597200,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "8e1c46ec-60ce-4e71-a72d-7362c0073f8c",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "a07492fe-9c88-42d9-8248-a0206c33e7d3",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "5669c777-1ed1-4757-bca9-667491508044",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "f4c3acdf-7adc-4ac1-ba6e-f1927d960240",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "4577e180-0f86-4293-b0da-96773883f60b",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "2662c6a2-7d2f-4a71-ad2d-72fe9b5f9f50",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "abc2babf-715b-439c-a4ab-175ada6a8b29",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 549
    },
    {
        "id": 553,
        "surname": "Владимирская",
        "name": "Людмила",
        "secondname": "Павловна",
        "id_occupy": null,
        "occupy": "Уборщица",
        "id_departament": 19,
        "rang": 120,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "23846373",
        "passcard_blob": "196000",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 196,
        "dismissal_date": 0,
        "recruitment_date": 1718571600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "05490b63-2b4f-49db-bace-c7f322f2438d",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "868c0f4f-181a-406a-8c56-eacda77af554",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "bcdf23f8-69cf-4640-92a5-76833c8779de",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "b3bd19c8-5dae-4369-b8c9-b4e24868203f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "9f8a18a6-49f0-441d-b936-c2701e64575b",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "27771df5-407a-4648-885e-710fc53f5488",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "a2abb196-793c-4865-8c1b-e88ec04957d0",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 553
    },
    {
        "id": 555,
        "surname": "Ладыгина",
        "name": "Мария",
        "secondname": "Владимировна",
        "id_occupy": null,
        "occupy": "Региональный менеджер",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22635365",
        "passcard_blob": "199000",
        "username": "lad",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 304,
        "visible": 1,
        "phone": "215",
        "photo": "",
        "sigur_user_id": 199,
        "dismissal_date": 0,
        "recruitment_date": 1724014800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "8368a942-cb35-4e9d-a74c-2e61fc4083c2",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "758d61ae-ad3f-4312-a591-d7a028250cf9",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "73150e44-64c0-46db-8690-7bc1214c7a04",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "a5c07b0d-5186-4072-be8d-2319ecb78df6",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "0cb2d718-652f-4355-835b-7f090ef91480",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "26348b29-40b1-4b03-854d-629e8666c0ea",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "78971fa4-128b-4fa3-9033-904aec457327",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 555
    },
    {
        "id": 556,
        "surname": "Азизкулов",
        "name": "Юнус",
        "secondname": "Хусаинович",
        "id_occupy": null,
        "occupy": "контролер",
        "id_departament": 18,
        "rang": 1000,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "",
        "passcard_blob": "201000",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 201,
        "dismissal_date": 0,
        "recruitment_date": 1729112400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "df011cdb-7410-4e8e-9abd-af601f55a0ad",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "c4ed07f2-d474-4605-8e83-302497fd7d2b",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "21fb39f6-5d6f-4c51-89ee-b6824e02ab6e",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "d4b44dec-3a40-43b1-87c6-b5b6e7a7788f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "0611e395-2c17-40f8-8897-59df8b6a3f4b",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "41162a6c-0f24-4d98-b05e-0d7e341c8e4b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "73784535-687e-44af-b889-049f5ee746ec",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 556
    },
    {
        "id": 557,
        "surname": "Назаров",
        "name": "Маруфжон",
        "secondname": "Одилович",
        "id_occupy": null,
        "occupy": "Подсобный рабочий",
        "id_departament": 18,
        "rang": 1000,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "",
        "passcard_blob": "203000",
        "username": "",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 203,
        "dismissal_date": 0,
        "recruitment_date": 1730754000,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "f4934eb9-612c-4ad7-847b-18133318e249",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "c9e099a0-b2ca-4403-9c30-69f50a3da8d0",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "3763e52f-aca5-43da-996a-d55247fced43",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "2f9a7559-6525-4e04-9529-ea796b05a6eb",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "1990793c-f18d-48b4-8be0-48a2d938dcf9",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "5e3d0daa-b91a-49bb-81e7-9bcdc2c8bcc7",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "b2c1fb97-92ff-4c06-b74d-73127bc7491d",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 557
    },
    {
        "id": 558,
        "surname": "Красников",
        "name": "Богдан",
        "secondname": "Юрьевич",
        "id_occupy": null,
        "occupy": "Самый лучший программист",
        "id_departament": 14,
        "rang": 90,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22633925",
        "passcard_blob": "205000",
        "username": "kbu",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 209,
        "dismissal_date": 0,
        "recruitment_date": 1732136400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 2,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "dac25122-e0d6-4b38-93ea-bac6a9766001",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "313d2afb-ff61-46fc-9a15-ed08ecd4e067",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "5fdce446-a869-4415-b5b5-a8a6a4188896",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "014bbb6b-2460-4d27-91de-d784749728e3",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "3e3dceea-3c68-4f01-9a9c-c50820b7a163",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "fa54bf5e-b50e-4cca-a5c6-bec4ebb4b052",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "4e0c1053-1232-4aab-97ba-71947af1a3fa",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 558
    },
    {
        "id": 560,
        "surname": "Минина",
        "name": "Наталия",
        "secondname": "Юрьевна",
        "id_occupy": null,
        "occupy": "Администратор",
        "id_departament": 3,
        "rang": 29,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "13759132",
        "passcard_blob": "223223",
        "username": "nminina",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "201",
        "photo": "",
        "sigur_user_id": 223,
        "dismissal_date": 0,
        "recruitment_date": 1736294400,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 3,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "a73b9596-811f-4ab5-893a-733d7cfd4541",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "27916584-d840-4402-967c-d16b14e017d1",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "9c35e24e-e343-4394-abca-f360944b9166",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "56f69ba5-dda3-4144-a974-f5e3af7cc79f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "61878731-be64-4fb8-a645-1d9be45c7cf3",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "9cfdca1c-eca5-4dfe-82c4-ec9e209a748b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "65b5e615-253a-4a22-b116-9696095c004c",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 560
    },
    {
        "id": 562,
        "surname": "Коляскина",
        "name": "Анастасия",
        "secondname": "Константиновна",
        "id_occupy": null,
        "occupy": "Руководитель отдела продаж Рондо",
        "id_departament": 5,
        "rang": 50,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "24405376",
        "passcard_blob": "225000",
        "username": "kolmax",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 46,
        "visible": 1,
        "phone": "403",
        "photo": "",
        "sigur_user_id": 225,
        "dismissal_date": 0,
        "recruitment_date": 1737417600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "1bab66a0-711b-4070-a835-95ed0ce4615f",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "4e9687e2-9d5d-48fc-860a-3731fa51d437",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "aa84d391-118b-4a38-957b-c6a94b6aa687",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "f930659a-ab53-4d0f-aa97-c891655d4ff9",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "79e0d4b7-5e78-48c7-85a0-dd6ff7b564ea",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "684619fb-f881-4932-a4c5-6df81942d408",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "de780deb-2ec1-4857-b2ac-b12aec381d67",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 562
    },
    {
        "id": 563,
        "surname": "Гельмбрехт",
        "name": "Сергей",
        "secondname": "Сергеевич",
        "id_occupy": null,
        "occupy": "Инженер",
        "id_departament": 7,
        "rang": 70,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "22635227",
        "passcard_blob": "226000",
        "username": "ssgemb",
        "id_role": 17,
        "login_enabled": "no",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "0",
        "photo": "",
        "sigur_user_id": 226,
        "dismissal_date": 0,
        "recruitment_date": 1738270800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 2,
        "sales_role": 0,
        "active_company": 0,
        "telegram_id": null,
        "skud_filial_id": 2,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "3e9fdd6c-9788-412c-bbb3-0db704765524",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "de8d9aaf-c95b-4576-b3ac-965967e3d38a",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "4605d879-546c-4454-b1e1-f54a1211b59d",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "552dbcd1-2b75-46f8-ad61-738dd651500f",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "f5682c7a-8b6e-4b7f-9ce4-a6ed42f5eddd",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "b71c0634-0355-4714-b514-21b161e309b2",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "ccbaf4fb-3960-494a-baf1-d673792686ba",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 563
    },
    {
        "id": 564,
        "surname": "Новосёлов",
        "name": "Михаил",
        "secondname": "Скудович",
        "id_occupy": null,
        "occupy": "Грушевый лаффе",
        "id_departament": 2,
        "rang": 5,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "534",
        "passcard_blob": null,
        "username": "Krest55",
        "id_role": 17,
        "login_enabled": "yes",
        "email": "pablo@zhu.ev",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "99213366688",
        "photo": null,
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 1741996800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 3,
        "sales_role": 0,
        "active_company": 3,
        "telegram_id": null,
        "skud_filial_id": 1,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "678beeed-a60e-41ce-96c7-a09a06bd575f",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "de0c1b39-27ef-4e93-b7c3-5cb005538b94",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "492fa73f-b234-4784-9a6e-98c7e82af4ee",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "4dd43a8a-3f41-49fe-9fb4-1a29c12b55f8",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "2752f570-1356-43c5-bce5-97bf2a15d1f9",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "ed65ae30-71e3-415c-a962-e135644bc14b",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "20eac03e-935a-47eb-a733-9cb467d5eebe",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 564
    },
    {
        "id": 566,
        "surname": "Тест",
        "name": "Рондо",
        "secondname": "Кузьмич",
        "id_occupy": null,
        "occupy": "Самая первая",
        "id_departament": 5,
        "rang": 1,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": "423423432",
        "passcard_blob": null,
        "username": "testRondo",
        "id_role": 17,
        "login_enabled": "yes",
        "email": "test@test.ru",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "250",
        "photo": null,
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 1741564800,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 3,
        "sales_role": 1,
        "active_company": 3,
        "telegram_id": null,
        "skud_filial_id": 1,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "e34db96a-4f5d-4b22-9595-23fd756da30c",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "6c8ee665-0e54-4ed6-af7a-854d0b2c5b8b",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "0f0f7d4b-3ddf-4bca-b5a9-f5166bc8806d",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "390ef829-4421-4d82-93f6-da5ef1ee55ce",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "70a69c6a-b1d8-45b5-ad1e-d0745912aec4",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "a62ff6a4-5a8f-4638-bce7-f9bc4e953f09",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "b04c9f7d-8c30-4ad8-97e5-8013d8771c21",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 566
    },
    {
        "id": 567,
        "surname": "Rondov",
        "name": "Rondovec",
        "secondname": "Grechedoll",
        "id_occupy": null,
        "occupy": "A little guy who lives in the pin hole",
        "id_departament": 5,
        "rang": 0,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": null,
        "passcard_blob": null,
        "username": "Krest",
        "id_role": 17,
        "login_enabled": "yes",
        "email": "krest@like.fm",
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "88008000000",
        "photo": null,
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 1741824000,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 3,
        "sales_role": 0,
        "active_company": 2,
        "telegram_id": null,
        "skud_filial_id": 1,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "e1ba1deb-3f4e-49be-b315-babd81223ff0",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "54a86982-b40a-474a-9e70-b82bdd807a33",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "c47fb5d2-69ae-45b5-8845-aeab9a77c133",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "6ec37ebc-44e0-4e92-b3e1-649ed36bf2b3",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "c206fcc9-db37-4b50-8fa1-2144b8f3c22c",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "7d92aebb-362d-42b2-93bf-c74647ce41b5",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "f6bac0ee-9f42-4421-afe1-ee274b9ababb",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 567
    },
    {
        "id": 568,
        "surname": "Арчи",
        "name": "Гавриил",
        "secondname": "Дессус",
        "id_occupy": null,
        "occupy": "Special agent of BGI",
        "id_departament": 1,
        "rang": 3,
        "id_user": null,
        "id_komendant": null,
        "status": "0",
        "passcard": null,
        "passcard_blob": null,
        "username": "sdfds",
        "id_role": 17,
        "login_enabled": "yes",
        "email": null,
        "qexit": "0",
        "boss": 0,
        "field": 0,
        "tempid": 0,
        "boss_id": 0,
        "visible": 1,
        "phone": "",
        "photo": "",
        "sigur_user_id": 0,
        "dismissal_date": 0,
        "recruitment_date": 1735689600,
        "deleted": 0,
        "no_uses_skud": 0,
        "id_company": 3,
        "sales_role": 0,
        "active_company": 3,
        "telegram_id": null,
        "skud_filial_id": 1,
        "super": 0,
        "skud_acls": [],
        "acls": {
            "6": {
                "id": "da9b5210-c020-4d75-ae2a-4b2a10cea334",
                "name": "Больничные",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "7": {
                "id": "27152c4b-de0d-4f8e-b27c-d818bf2df453",
                "name": "Длительная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "8": {
                "id": "cf4c6103-91b9-459d-af56-c625c7a25177",
                "name": "Кратковременная командировка",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "9": {
                "id": "43f2b6b3-f70c-48e7-85fb-f0d29015bedd",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "10": {
                "id": "101c6f57-cb99-406b-9c84-3b01a1a0077c",
                "name": "Отпуск",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "11": {
                "id": "cbc750ff-71d3-4c39-8757-7423d1444ea1",
                "name": "Отпуск за свой счёт",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            },
            "13": {
                "id": "bb7d1a86-e66e-46a7-a958-5b5098bdd828",
                "name": "Контейнеры",
                "items": {
                    "param_pers_create": false,
                    "param_pers_edit": false,
                    "param_pers_approve": false,
                    "param_subo_create": false,
                    "param_subo_edit": false,
                    "param_subo_approve": false,
                    "param_any_create": false,
                    "param_any_edit": false,
                    "param_any_approve": false
                }
            }
        },
        "user_id": 568
    }
]


export const ACL_ACTUAL_USERS = [
    {
        "id": 43,
        "name": "Елена",
        "surname": "Дурнева",
        "secondname": "Витальевна",
        "depart_id": 9,
        "id_company": 2,
        "occupy": "начальник оптового склада СПб",
        "acls": []
    },
    {
        "id": 46,
        "name": "Александр",
        "surname": "Кошелев",
        "secondname": "Станиславович",
        "depart_id": 1,
        "id_company": 2,
        "occupy": "коммерческий директор",
        "acls": []
    },
    {
        "id": 47,
        "name": "Валентина",
        "surname": "Кошелева",
        "secondname": "Григорьевна",
        "depart_id": 19,
        "id_company": 2,
        "occupy": "финансовый директор",
        "acls": []
    },
    {
        "id": 57,
        "name": "Дмитрий",
        "surname": "Печников",
        "secondname": "Валерьевич",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "менеджер региональный",
        "acls": []
    },
    {
        "id": 91,
        "name": "Сергей",
        "surname": "Фокин",
        "secondname": "Петрович",
        "depart_id": 7,
        "id_company": 2,
        "occupy": "радиоинженер",
        "acls": []
    },
    {
        "id": 133,
        "name": "Виктория",
        "surname": "Друговейко",
        "secondname": "Юрьевна",
        "depart_id": 3,
        "id_company": 2,
        "occupy": "главный бухгалтер",
        "acls": []
    },
    {
        "id": 134,
        "name": "Сергей",
        "surname": "Безбородов",
        "secondname": "Дмитриевич",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "менеджер проектов",
        "acls": []
    },
    {
        "id": 180,
        "name": "Леонид",
        "surname": "Александров",
        "secondname": "Алексеевич",
        "depart_id": 9,
        "id_company": 2,
        "occupy": "водитель-экспедитор",
        "acls": []
    },
    {
        "id": 198,
        "name": "Валентина",
        "surname": "Рогалева",
        "secondname": "Евгеньевна",
        "depart_id": 15,
        "id_company": 2,
        "occupy": "менеджер отдела информации",
        "acls": []
    },
    {
        "id": 226,
        "name": "Анна ",
        "surname": "Столярова",
        "secondname": "Владимировна",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "Ведущий менеджер",
        "acls": []
    },
    {
        "id": 271,
        "name": "Раджаббой ",
        "surname": "Ашуров ",
        "secondname": "Фуркатович ",
        "depart_id": 18,
        "id_company": 2,
        "occupy": "рабочий",
        "acls": []
    },
    {
        "id": 272,
        "name": "Фуркат",
        "surname": "Ашуров  ",
        "secondname": "Пардакулович ",
        "depart_id": 18,
        "id_company": 2,
        "occupy": "рабочий",
        "acls": []
    },
    {
        "id": 280,
        "name": "",
        "surname": "Администратор",
        "secondname": "",
        "depart_id": 19,
        "id_company": 2,
        "occupy": "Администратор",
        "acls": []
    },
    {
        "id": 282,
        "name": "Руслан",
        "surname": "Шалин",
        "secondname": "Викторович",
        "depart_id": 11,
        "id_company": 2,
        "occupy": "главный инженер",
        "acls": []
    },
    {
        "id": 283,
        "name": "Жанна",
        "surname": "Булгакова",
        "secondname": "Владимировна",
        "depart_id": 11,
        "id_company": 2,
        "occupy": "дизайнер интерьеров",
        "acls": []
    },
    {
        "id": 287,
        "name": "Олег",
        "surname": "Бибик",
        "secondname": "Николаевич",
        "depart_id": 17,
        "id_company": 2,
        "occupy": "контролер ",
        "acls": []
    },
    {
        "id": 289,
        "name": "Геннадий",
        "surname": "Рябков",
        "secondname": "Иванович",
        "depart_id": 17,
        "id_company": 2,
        "occupy": "контролер КПП",
        "acls": []
    },
    {
        "id": 304,
        "name": "Ирина",
        "surname": "Зеленко",
        "secondname": "Вячеславовна",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "менеджер-координатор",
        "acls": []
    },
    {
        "id": 309,
        "name": "Александр ",
        "surname": "Бобко ",
        "secondname": "Владимирович ",
        "depart_id": 8,
        "id_company": 2,
        "occupy": "инженер-проектировщик",
        "acls": []
    },
    {
        "id": 327,
        "name": "Вячеслав",
        "surname": "Кобяков",
        "secondname": "Борисович",
        "depart_id": 17,
        "id_company": 2,
        "occupy": "контроллер КПП",
        "acls": []
    },
    {
        "id": 334,
        "name": "Мария",
        "surname": "Глинтерник",
        "secondname": "Алексеевна",
        "depart_id": 2,
        "id_company": 2,
        "occupy": "менеджер по персоналу",
        "acls": []
    },
    {
        "id": 337,
        "name": "Олег",
        "surname": "Иванов",
        "secondname": "Рудольфович",
        "depart_id": 7,
        "id_company": 2,
        "occupy": "радиоинженер",
        "acls": []
    },
    {
        "id": 339,
        "name": "Ксения",
        "surname": "Горяева",
        "secondname": "Викторовна",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "менеджер-координатор",
        "acls": []
    },
    {
        "id": 340,
        "name": "Павел",
        "surname": "Петровский",
        "secondname": "Сергеевич",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "менеджер региональный",
        "acls": []
    },
    {
        "id": 361,
        "name": "Иван",
        "surname": "Журба",
        "secondname": "Анатольевич",
        "depart_id": 18,
        "id_company": 2,
        "occupy": "прораб",
        "acls": []
    },
    {
        "id": 371,
        "name": "Константин",
        "surname": "Батов",
        "secondname": "Александрович",
        "depart_id": 8,
        "id_company": 2,
        "occupy": "радиоинженер",
        "acls": []
    },
    {
        "id": 374,
        "name": "Евгений",
        "surname": "Котоликов",
        "secondname": "Алексеевич",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "региональный менеджер",
        "acls": []
    },
    {
        "id": 393,
        "name": "отдел",
        "surname": "Строительный",
        "secondname": "",
        "depart_id": 11,
        "id_company": 2,
        "occupy": "",
        "acls": []
    },
    {
        "id": 400,
        "name": "Сергей",
        "surname": "Шевченко",
        "secondname": "Витальевич",
        "depart_id": 7,
        "id_company": 2,
        "occupy": "радиоинженер",
        "acls": []
    },
    {
        "id": 405,
        "name": "Максим",
        "surname": "Турлов",
        "secondname": "Георгиевич",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "менеджер-координатор",
        "acls": []
    },
    {
        "id": 411,
        "name": "Павел",
        "surname": "Мельников",
        "secondname": "Валерьевич",
        "depart_id": 7,
        "id_company": 2,
        "occupy": "инженер-консультант",
        "acls": []
    },
    {
        "id": 436,
        "name": "Владимир",
        "surname": "Горев",
        "secondname": "Сергеевич",
        "depart_id": 9,
        "id_company": 2,
        "occupy": "грузчик-комплектовщик",
        "acls": []
    },
    {
        "id": 463,
        "name": "Дмитрий",
        "surname": "Нестеренко",
        "secondname": "Сергеевич",
        "depart_id": 11,
        "id_company": 2,
        "occupy": "Заместитель директора",
        "acls": []
    },
    {
        "id": 474,
        "name": "Алексей",
        "surname": "Федянин",
        "secondname": "Валерьевич",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "вэб-дизайнер",
        "acls": []
    },
    {
        "id": 482,
        "name": "Артём",
        "surname": "Дрюков",
        "secondname": "Владимирович",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "3д-дизайнер",
        "acls": []
    },
    {
        "id": 483,
        "name": "Максим",
        "surname": "Матченков",
        "secondname": "Юрьевич",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "Программист",
        "acls": []
    },
    {
        "id": 486,
        "name": "Андрей",
        "surname": "Шаранда",
        "secondname": "Дмитриевич",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "Программист",
        "acls": []
    },
    {
        "id": 493,
        "name": "Юрий",
        "surname": "Дегелевич",
        "secondname": "Евгеньевич",
        "depart_id": 1,
        "id_company": 2,
        "occupy": "Технический директор",
        "acls": []
    },
    {
        "id": 498,
        "name": "Ольга",
        "surname": "Булышева",
        "secondname": "Александровна",
        "depart_id": 21,
        "id_company": 2,
        "occupy": "менеджер ВЭД",
        "acls": []
    },
    {
        "id": 499,
        "name": "София",
        "surname": "Сорокина",
        "secondname": "Евгеньевна",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "Графический дизайнер",
        "acls": []
    },
    {
        "id": 521,
        "name": "Любовь",
        "surname": "Палагушина",
        "secondname": "Владимировна",
        "depart_id": 3,
        "id_company": 2,
        "occupy": "Бухгалтер",
        "acls": []
    },
    {
        "id": 522,
        "name": "Александр",
        "surname": "Степанченко",
        "secondname": "Николаевич",
        "depart_id": 20,
        "id_company": 2,
        "occupy": "Инженер",
        "acls": []
    },
    {
        "id": 528,
        "name": "Роман",
        "surname": "Карташов",
        "secondname": "Станиславович",
        "depart_id": 9,
        "id_company": 2,
        "occupy": "Кладовщик",
        "acls": []
    },
    {
        "id": 530,
        "name": "Станислав",
        "surname": "Самарин",
        "secondname": "Александрович",
        "depart_id": 17,
        "id_company": 2,
        "occupy": "Контролер КПП",
        "acls": []
    },
    {
        "id": 531,
        "name": "Анна",
        "surname": "Захарова",
        "secondname": "Юрьевна",
        "depart_id": 3,
        "id_company": 2,
        "occupy": "Бухгалтер",
        "acls": []
    },
    {
        "id": 533,
        "name": "Татьяна",
        "surname": "Балабанова",
        "secondname": "Алексеевна",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "Графический дизайнер",
        "acls": []
    },
    {
        "id": 536,
        "name": "Екатерина",
        "surname": "Филиппова",
        "secondname": "Юрьевна",
        "depart_id": 15,
        "id_company": 2,
        "occupy": "Менеджер",
        "acls": []
    },
    {
        "id": 537,
        "name": "Сергей",
        "surname": "Иванов",
        "secondname": "Алексеевич",
        "depart_id": 7,
        "id_company": 2,
        "occupy": "Инженер",
        "acls": []
    },
    {
        "id": 538,
        "name": "Геннадий",
        "surname": "Бакланов",
        "secondname": "Валентинович",
        "depart_id": 20,
        "id_company": 2,
        "occupy": "Инженер",
        "acls": []
    },
    {
        "id": 540,
        "name": "Лидия",
        "surname": "Точилина",
        "secondname": "Львовна",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "Начальник",
        "acls": []
    },
    {
        "id": 547,
        "name": "Геннадий",
        "surname": "Балымов",
        "secondname": "Робертович",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "Региональный менеджер",
        "acls": []
    },
    {
        "id": 549,
        "name": "Алан",
        "surname": "Рясянен",
        "secondname": "Раймович",
        "depart_id": 20,
        "id_company": 2,
        "occupy": "Начальник",
        "acls": []
    },
    {
        "id": 553,
        "name": "Людмила",
        "surname": "Владимирская",
        "secondname": "Павловна",
        "depart_id": 19,
        "id_company": 2,
        "occupy": "Уборщица",
        "acls": []
    },
    {
        "id": 555,
        "name": "Мария",
        "surname": "Ладыгина",
        "secondname": "Владимировна",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "Региональный менеджер",
        "acls": []
    },
    {
        "id": 556,
        "name": "Юнус",
        "surname": "Азизкулов",
        "secondname": "Хусаинович",
        "depart_id": 18,
        "id_company": 2,
        "occupy": "контролер",
        "acls": []
    },
    {
        "id": 557,
        "name": "Маруфжон",
        "surname": "Назаров",
        "secondname": "Одилович",
        "depart_id": 18,
        "id_company": 2,
        "occupy": "Подсобный рабочий",
        "acls": []
    },
    {
        "id": 558,
        "name": "Богдан",
        "surname": "Красников",
        "secondname": "Юрьевич",
        "depart_id": 14,
        "id_company": 2,
        "occupy": "Самый лучший программист",
        "acls": []
    },
    {
        "id": 562,
        "name": "Анастасия",
        "surname": "Коляскина",
        "secondname": "Константиновна",
        "depart_id": 5,
        "id_company": 2,
        "occupy": "Руководитель отдела продаж Рондо",
        "acls": []
    },
    {
        "id": 563,
        "name": "Сергей",
        "surname": "Гельмбрехт",
        "secondname": "Сергеевич",
        "depart_id": 7,
        "id_company": 2,
        "occupy": "Инженер",
        "acls": []
    }
];

export const ACL_DEPARTS_WITH_COUNT = [
    {
        "id": 1,
        "name": "Администрация",
        "rang": 1,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 2
    },
    {
        "id": 2,
        "name": "Отдел персонала",
        "rang": 30,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 1
    },
    {
        "id": 3,
        "name": "Бухгалтерия",
        "rang": 10,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 3
    },
    {
        "id": 4,
        "name": "Техническая группа проектного отдела",
        "rang": 140,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 0
    },
    {
        "id": 5,
        "name": "Отдел оптовых продаж",
        "rang": 50,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 11
    },
    {
        "id": 6,
        "name": "Отдел рекламы",
        "rang": 70,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 0
    },
    {
        "id": 7,
        "name": "Технический отдел трансляционного звука",
        "rang": 60,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 6
    },
    {
        "id": 8,
        "name": "Проектный отдел",
        "rang": 100,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 2
    },
    {
        "id": 9,
        "name": "Склад Санкт-Петербург",
        "rang": 120,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 4
    },
    {
        "id": 11,
        "name": "Строительный отдел",
        "rang": 110,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 4
    },
    {
        "id": 12,
        "name": "АХЧ",
        "rang": 200,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 0
    },
    {
        "id": 13,
        "name": "Дилерский отдел",
        "rang": 130,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 0
    },
    {
        "id": 14,
        "name": "Отдел информационных технологий",
        "rang": 90,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 8
    },
    {
        "id": 15,
        "name": "Отдел информации",
        "rang": 40,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 2
    },
    {
        "id": 17,
        "name": "Пулково КПП",
        "rang": 150,
        "visible": false,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 4
    },
    {
        "id": 18,
        "name": "Пулково 19",
        "rang": 170,
        "visible": false,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 5
    },
    {
        "id": 19,
        "name": "Контрагенты",
        "rang": 180,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 3
    },
    {
        "id": 20,
        "name": "Технический отдел профессионального звука",
        "rang": 80,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 3
    },
    {
        "id": 21,
        "name": "Отдел Логистики",
        "rang": 20,
        "visible": true,
        "deleted": false,
        "position": null,
        "icon": null,
        "users_count": 1
    }
]