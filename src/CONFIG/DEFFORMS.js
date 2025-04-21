import { AppleOutlined, CarOutlined, CheckOutlined, MedicineBoxOutlined, MinusCircleOutlined, MoonOutlined, PictureOutlined, RestOutlined, RocketOutlined, SafetyCertificateOutlined, SmileOutlined } from "@ant-design/icons"

export const OPENMODE = {
    READ: 0,
    EDIT: 10,
    SHORTEDIT: 11,
    AFTERCREATE: 15,
    CREATE: 20
}

export const DEF_SCHEDULE = {
    "id": null,
    "id_company": null,
    "company_name": null,
    "company_color": null,
    "skud_schedule_type_id": 1,
    "name": null,
    "description": "",
    "start_time": 33300,
    "end_time": 64800,
    "target_time": (60*60*8),
    "target_unit": 1,
    "lunch_start": 46800,
    "lunch_end": 54000,
    "lunch_time": (2700),
    "schedule": [],
    "next_id": null,
    "deleted": 0,
    "skud_prod_calendar_id": null,
    "created_at": null,
    "creator_id": null
}

// текущее состояние юзера - 0 - нет и не был, 4 - вышел на обед, 10 - на работе, 5 - вышел на перерыв, 20 - ушел с работы, 30 - больняки
export   const USER_STATE_PLACES = {
    0: { title: "Не приходил в офис", text: "", color: "#fefefe", icon: <MinusCircleOutlined />},
    4: { title: "Вышел на обед", text: "обед", color: "#ffc582", icon:<AppleOutlined /> },
    5: { title: "Вышел на перерыв", text: "перерыв", color: "#fae5a9", icon: <RestOutlined />},
    10: { title: "На работе", text: "на месте", color: "#d0f5a5", icon: <CheckOutlined />},
    20: { title: "Рабочий день закончен", text: "ушел", color: "#e4e4e4", icon: <SafetyCertificateOutlined />},
    30: { title: "На больничном", text: "больничный", color: "#ffa8a8", icon: <MedicineBoxOutlined /> },
    45: { title: "Длительная командировка", text: "командировк.", color: "#e2b4e9", icon: <RocketOutlined />},
    40: { title: "Кратковременная локальная командировка", text: "местн.выезд", color: "#e3dbf1", icon: <CarOutlined /> },
    50: { title: "Отпуск за свой счёт", text: "св.отпуск", color: "#c4e8e5", icon: <MoonOutlined /> },
    55: { title: "Плановый отпуск", text: "отпуск", color: "#7adfd6", icon: <SmileOutlined /> },
}