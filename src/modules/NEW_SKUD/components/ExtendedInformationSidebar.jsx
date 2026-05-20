import React, { useEffect, useState } from "react";
import UserlistEventDumpCard from "./UserlistEventDumpCard";
import {Affix, Button, Drawer, Empty, Spin, Tag, Tooltip} from "antd";

import dayjs from "dayjs";
import { formatMoscowDateTime, formatMoscowUnix, moscowDateTime } from "../../../components/Helpers/DateTimeHelpers";
import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";
import {CSRF_TOKEN, PRODMODE, ROUTE_PREFIX} from "../../../CONFIG/config"
import { PROD_AXIOS_INSTANCE } from "../../../API/API";
import { LIST_SCHED_N_RULES_RESPONSE } from "../../../CONFIG/DEFAULTSTATE";
import UmScheduleMiniCard from "./UmScheduleMiniCard";
import {
    DownOutlined, UpOutlined,
    BarChartOutlined, IssuesCloseOutlined, RobotOutlined,
    MinusCircleOutlined,
    AppleOutlined,
    RestOutlined,
    CheckOutlined,
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    RocketOutlined,
    CarOutlined,
    MoonOutlined,
    SmileOutlined,
    DollarOutlined,
    HeatMapOutlined, CloseOutlined, EnterOutlined, IdcardOutlined,
    FileWordOutlined, DownloadOutlined, PrinterOutlined
} from "@ant-design/icons";

const iconMap = {
    MinusCircleOutlined,
    AppleOutlined,
    RestOutlined,
    CheckOutlined,
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    RocketOutlined,
    CarOutlined,
    MoonOutlined,
    SmileOutlined,
    DollarOutlined,
    HeatMapOutlined
};

const DynamicIcon = ({ iconName, ...props }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
};

const getMutedDrawerAccent = (color) => {
    if (!color || typeof document === 'undefined') {
        return color;
    }

    if (!document.documentElement.classList.contains('sk-theme-dark')) {
        return color;
    }

    return `color-mix(in srgb, ${color} 38%, var(--app-surface-color))`;
};

const COMPANY_LOGOS = [
    { key: 'arstel', src: '/company-logos/arstel.svg', className: 'sk-userlist-company-logo--arstel' },
    { key: 'арстел', src: '/company-logos/arstel.svg', className: 'sk-userlist-company-logo--arstel' },
    { key: 'rondo', src: '/company-logos/rondo.svg', className: 'sk-userlist-company-logo--rondo' },
    { key: 'рондо', src: '/company-logos/rondo.svg', className: 'sk-userlist-company-logo--rondo' },
];

const getCompanyLogo = (companyName) => {
    if (!companyName) {
        return null;
    }

    const normalizedName = String(companyName).toLowerCase();
    return COMPANY_LOGOS.find((item) => normalizedName.includes(item.key)) ?? null;
};
const EMPTY_STATE_DOCUMENTS = [
    {
        id: 'unpaid-vacation',
        title: 'Заявление на отпуск за свой счет',
        size: 'DOC',
        href: 'http://192.168.1.14/files/docs/svo.doc',
        printHref: 'http://192.168.1.14/files/docs/svo.pdf',
    },
    {
        id: 'vacation',
        title: 'Заявление на отпуск',
        size: 'DOCX',
        href: 'http://192.168.1.14/files/docs/vacation.docx',
        printHref: 'http://192.168.1.14/files/docs/vacation.pdf',
    },
    {
        id: 'vacation-bypass-sheet',
        title: 'Обходной лист отпуск',
        size: 'DOCX',
        href: 'http://192.168.1.14/files/docs/vacation_bypass_sheet.docx',
        printHref: 'http://192.168.1.14/files/docs/vacation_bypass_sheet.pdf',
    },
    {
        id: 'vacation-transfer',
        title: 'Заявление на перенос отпуска',
        size: 'DOCX',
        href: 'http://192.168.1.14/files/docs/vacation_transfer.docx',
        printHref: 'http://192.168.1.14/files/docs/vacation_transfer.pdf',
    },
    {
        id: 'free-form',
        title: 'Заявление свободная форма',
        size: 'DOCX',
        href: 'http://192.168.1.14/files/docs/free_form.docx',
        printHref: 'http://192.168.1.14/files/docs/free_form.pdf',
    },
    {
        id: 'dismissal',
        title: 'Заявление на увольнение',
        size: 'DOC',
        href: 'http://192.168.1.14/files/docs/dismissal.doc',
        printHref: 'http://192.168.1.14/files/docs/dismissal.pdf',
    },
    {
        id: 'dismissal-clearance-sheet',
        title: 'Обходной лист увольнение',
        size: 'DOCX',
        href: 'http://192.168.1.14/files/docs/dismissal_clearance_sheet.docx',
        printHref: 'http://192.168.1.14/files/docs/dismissal_clearance_sheet.pdf',
    },
];



const ExtendedInformationSidebar = (props) => {

    const userdata = props.userdata;
    const [isMounted, setIsMounted] = useState(false);
    const [targetUserGuys, setTargetUserGuys] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [targetUserInfo, setTargetUserInfo] = useState(null);

    const [badger, setBadger] = useState(null);

    const [baseSchedules, setBaseSchedules] = useState([]);
    const [baseRules, setBaseRules] = useState([]);
    const [isScheduleLoading, setIsScheduleLoading] = useState(false);

    const [targetDate, setTargetDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

    const [openStateInfoSection, setOpenStateInfoSection] = useState(false);

    useEffect(() => {
        setTargetUserGuys(props.target_user_guys);
    }, [props.target_user_guys])

    useEffect(() => {
        if (props.target_user_info){
            setTargetUserInfo(props.target_user_info);

            if (props.target_user_info.current_state != 0)
            {
                setBadger({ title: props.target_user_info.state_text, text: props.target_user_info.state_title, color: props.target_user_info?.state_color, icon: <DynamicIcon iconName={props.target_user_info.state_icon} />});
            } else {
                setBadger(USER_STATE_PLACES[0]);
            }

            //if (PRODMODE){
                let data = {
                    date: props.target_date,
                    user_id: props.target_user_info.id,
                };
                setBaseSchedules([]);
                setBaseRules([]);
                setIsScheduleLoading(true);
                get_user_schedule_and_rules(data);
            //}
            // else {
            //     setBaseSchedules(LIST_SCHED_N_RULES_RESPONSE.schedules);
            //     setBaseRules(LIST_SCHED_N_RULES_RESPONSE.rules);
            // }
        } else {
            setTargetUserInfo(null);
            setBadger(null);
            setBaseSchedules([]);
            setBaseRules([]);
            setIsScheduleLoading(false);
        }
    }, [props.target_user_info])

    useEffect(() => {
        setOpenUserInfo(props.open_user_info);

        console.log('HANDLE OPEN', props.open_user_info);
    }, [props.open_user_info])


    const handleClear = () =>{
        if (props.on_clear){
            props.on_clear();
        }
    }

    const capitalize = (s) =>
    {
        if (s.length > 2){
            return String(s[0]).toUpperCase() + String(s).slice(1);
        } else {
            return s;
        }
    }




    /** ------------------ FETCHES ---------------- */


    /**
     * Получение актуального на выбранную дату графика и правил для этого юзера
     * @param {*} req
     * @param {*} res
     */
    const get_user_schedule_and_rules = async (data, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/userlist/getuserschedrules`,
                {
                    data: data,
                    _token: CSRF_TOKEN
                });
            if (response && response.data){
                setBaseSchedules(response.data.content.schedules);
                setBaseRules(response.data.content.rules);
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsScheduleLoading(false);
        }
    }


    /** ------------------ FETCHES END ---------------- */



    useEffect(()=>{
        console.log(props.target_date);
        if (props.open_user_info){
            setTargetDate(props.target_date);
        }
    },[props.target_date]);

    const closeSider = () => {
        handleClear();
    };

    const hasTargetUser = Boolean(targetUserInfo);
    const targetCompany = targetUserInfo?.id_company
        ? userdata.companies.find((item) => item.id === targetUserInfo.id_company)
        : null;
    const targetCompanyLogo = getCompanyLogo(targetCompany?.name);
    const visibleTargetUserGuys = targetUserInfo
        ? props.base_user_list_data.filter((item) => item.boss_id === targetUserInfo.id)
        : targetUserGuys;

    const handleOpenUserDetails = (userId) => {
        const nextUserInfo = props.base_user_list_data.find((item) => item.id === userId)
            ?? props.base_user_list_data.find((item) => item.user_id === userId);

        if (!nextUserInfo) {
            return;
        }

        setTargetUserInfo(nextUserInfo);

        if (props.on_mark_user) {
            props.on_mark_user(nextUserInfo.id ?? userId);
        }
    };

    const renderStatusHeader = () => (
        <div className="sk-state-intgra-card-backdrop">
            <div
                style={{background: hasTargetUser ? getMutedDrawerAccent(badger?.color) : undefined}}
                className={`sk-state-intgra-card ${hasTargetUser ? '' : 'sk-state-intgra-card--empty'}`}
            >
                {hasTargetUser ? (
                    <>
                        <span style={{textAlign: 'center', paddingLeft: '4px'}}>{badger?.icon}</span>
                        <span>{badger?.title}</span>
                        <div onClick={() => {
                            setOpenStateInfoSection(!openStateInfoSection)
                        }}>
                            {/* <Tag>{targetUserInfo?.id}</Tag>*/}
                            <CloseOutlined onClick={closeSider}/>
                        </div>
                    </>
                ) : (
                    <span className="sk-state-intgra-card-empty-title">
                        <IdcardOutlined />
                        Детализация по сотруднику
                    </span>
                )}
            </div>
        </div>
    );

    const renderEventInfo = () => {
        if (targetUserInfo && targetUserInfo.event_dump && targetUserInfo.event_dump.length) {
            return <UserlistEventDumpCard data={targetUserInfo.event_dump} themeSafe={true}/>;
        }

        if (targetUserInfo.state_data != null) {
            return (
                <div className={'sk-w-padding-18 sk-umsmi-card'}>
                    <table className="sk-uml-table-dumper"
                           style={{borderCollapse: 'collapse'}}>
                        <tbody>
                        <tr>
                            <td style={{textAlign: 'left'}}>Дата и время начала</td>
                            <td style={{textAlign: 'left'}}>{formatMoscowDateTime(targetUserInfo.state_data.start, "DD-MM-YYYY")} {
                                formatMoscowDateTime(targetUserInfo.state_data.start) != '00:00' && (
                                    <span>{formatMoscowDateTime(targetUserInfo.state_data.start)}</span>
                                )
                            }</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Дата и время завершения</td>
                            <td style={{textAlign: 'left'}}>{formatMoscowDateTime(targetUserInfo.state_data.end, "DD-MM-YYYY")} {
                                formatMoscowDateTime(targetUserInfo.state_data.end) != '23:59' && (
                                    <span>{formatMoscowDateTime(targetUserInfo.state_data.end)}</span>
                                )
                            }</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Количество дней всего</td>
                            <td style={{textAlign: 'left'}}>{targetUserInfo.state_data.days_count}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Количество дней осталось
                            </td>
                            <td style={{textAlign: 'left'}}>{(moscowDateTime(targetUserInfo.state_data.end)?.diff(moscowDateTime(dayjs()), 'day') ?? 0) > 0 ? moscowDateTime(targetUserInfo.state_data.end)?.diff(moscowDateTime(dayjs()), 'day') : ""}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div className={'sk-w-padding-18 sk-umsmi-card'}>
                <table className="sk-uml-table-dumper"
                       style={{borderCollapse: 'collapse'}}>
                    <tbody>
                    <tr>
                        <td style={{textAlign: 'center'}}>Нет данных</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const handlePrintDocument = (href) => {
        if (!href) {
            return;
        }

        window.open(href, '_blank', 'noopener,noreferrer');
    };

    return (
        <div>
            {!hasTargetUser && (
                <div className="sk-userlist-details-scroll">
                    <section className="sk-userlist-details-card sk-userlist-details-card--empty">
                        {renderStatusHeader()}
                        <div className="sk-userlist-details-empty">
                            <span>Выберите сотрудника для детализации</span>
                            <EnterOutlined className="sk-userlist-details-empty-icon" />
                        </div>
                    </section>

                    <section className="sk-userlist-details-card sk-userlist-details-card--documents">
                        <div className="sk-userlist-details-card-title">Документы</div>
                        <div className="sk-userlist-documents-list">
                            {EMPTY_STATE_DOCUMENTS.map((documentItem) => (
                                <div className="sk-userlist-document-row" key={documentItem.id}>
                                    <FileWordOutlined className="sk-userlist-document-icon" />
                                    <div className="sk-userlist-document-title">{documentItem.title}</div>
                                    <div className="sk-userlist-document-size">{documentItem.size}</div>
                                    <Tooltip title={documentItem.href ? 'Скачать' : 'Файл еще не добавлен'}>
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<DownloadOutlined />}
                                            disabled={!documentItem.href}
                                            href={documentItem.href ?? undefined}
                                            download={documentItem.href ? true : undefined}
                                        />
                                    </Tooltip>
                                    <Tooltip title={documentItem.printHref ? 'В печать' : 'PDF еще не добавлен'}>
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<PrinterOutlined />}
                                            disabled={!documentItem.printHref}
                                            onClick={() => handlePrintDocument(documentItem.printHref)}
                                        />
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
            {openUserInfo && hasTargetUser && (
                <div className="sk-userlist-details-scroll">
                    <section className="sk-userlist-details-card sk-userlist-details-card--employee">
                        {renderStatusHeader()}
                        <div className="sk-w-padding-18">
                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>ФИО</div>
                                <div
                                    className={'sk-contend-um sk-userlist-details-link'}
                                    onClick={() => handleOpenUserDetails(targetUserInfo.id)}
                                >{targetUserInfo.surname ? targetUserInfo.surname : ''} {targetUserInfo.name ? targetUserInfo.name : ''} {targetUserInfo.patronymic ? targetUserInfo.patronymic : ''}
                                </div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>Должность</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.user_occupy ? capitalize(targetUserInfo.user_occupy) : targetUserInfo.occupy ? capitalize(targetUserInfo.occupy) : '-'}</div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>Отдел</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.department_name ? targetUserInfo.department_name : '-'}</div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>Внутренний телефон</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.phone && targetUserInfo.phone != 0 ? targetUserInfo.phone : "-"}</div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>E-mail</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.email && targetUserInfo.email != 0 ? targetUserInfo.email : "-"}</div>
                            </div>

                            {targetUserInfo.recrut && targetUserInfo.user_id === 483 ? (
                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Работает с</div>
                                    <div
                                        className={'sk-contend-um'}>{formatMoscowUnix(targetUserInfo.recrut)}</div>
                                </div>
                            ) : ""}

                            {targetUserInfo.id_company && targetUserInfo.id_company > 1 && (
                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Компания</div>
                                    <div className={'sk-contend-um'}>
                                        {targetCompanyLogo ? (
                                            <span className="sk-userlist-company-logo-frame">
                                                <img
                                                    className={`sk-userlist-company-logo ${targetCompanyLogo.className}`}
                                                    src={targetCompanyLogo.src}
                                                    alt={targetCompany?.name ?? 'Компания'}
                                                />
                                            </span>                                        ) : (
                                            <>
                                                <span className={'sk-usermonic-comround'}
                                                      style={{
                                                          background: `${targetCompany?.color}`
                                                      }}>
                                                </span>
                                                {targetCompany?.name}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="sk-userlist-details-card sk-userlist-details-card--schedule">
                        <div className="sk-userlist-details-card-title">График</div>
                        <Spin spinning={isScheduleLoading}>
                            <div className="sk-userlist-details-card-loader-body">
                                {baseSchedules && baseSchedules.length > 0 && (
                                    <div className="sk-userlist-details-schedule-list">
                                        {baseSchedules.map((item) => (
                                            <UmScheduleMiniCard
                                                data={item}
                                                key={`umscard_${item.id}`}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="sk-userlist-details-card-subtitle">Входы и выходы</div>
                                {renderEventInfo()}
                            </div>
                        </Spin>
                    </section>

                    {targetUserInfo.boss_id && targetUserInfo.boss_id !== 0 && targetUserInfo.user_id != 46 ? (
                        <section className="sk-userlist-details-card sk-userlist-details-card--boss">
                            <div className="sk-userlist-details-card-title">
                                <span
                                    onClick={() => handleOpenUserDetails(targetUserInfo.boss_id)}
                                    className={'sk-usermonic-drawer-rukop-title'}
                                >Руководитель</span>
                            </div>
                            <div className="sk-w-padding-18">
                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>ФИО</div>
                                    <div
                                        className={'sk-contend-um sk-userlist-details-link'}
                                        onClick={() => handleOpenUserDetails(targetUserInfo.boss_id)}
                                    >{targetUserInfo.boss_surname} {targetUserInfo.boss_name} {targetUserInfo.boss_patronymic}</div>
                                </div>

                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Должность</div>
                                    <div className={'sk-contend-um'}>{targetUserInfo.boss_occupy}</div>
                                </div>

                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Внутренний телефон</div>
                                    <div className={'sk-contend-um'}>{targetUserInfo.boss_phone}</div>
                                </div>
                            </div>
                        </section>
                    ) : ""}

                    {visibleTargetUserGuys && visibleTargetUserGuys.length > 0 && (
                        <section className="sk-userlist-details-card sk-userlist-details-card--guys">
                            <div className="sk-userlist-details-card-title">Сотрудники</div>
                            <div className="sk-w-padding-18">
                                {visibleTargetUserGuys.map((item, index) => (
                                    <div className={'sk-boss-guy-card'}
                                         key={`taurkey_${index}`}
                                         onClick={() => handleOpenUserDetails(item.id)}
                                    >{index + 1} - {item.surname} {item.name} {item.patronymic}</div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}

export default ExtendedInformationSidebar;

