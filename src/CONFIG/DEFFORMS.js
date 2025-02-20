
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