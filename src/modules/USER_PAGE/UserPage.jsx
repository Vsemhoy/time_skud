import React, {useEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {Affix, Alert, Button, Tag} from "antd";
import styles from './style/user_page.module.css'
import {CSRF_TOKEN, PRODMODE} from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import {USDA} from "./mock/mock";
import {RollbackOutlined} from "@ant-design/icons";
const UserPage = (props) => {
    const location = useLocation();
    const {userId} = useParams();
    const navigate = useNavigate();
    const [userIdState, setUserIdState] = useState(userId);
    const [userFIO, setUserFIO] = useState("");
    const [userCompanyState, setUserCompanyState] = useState({
        id: 0,
        name: '',
        color: ''
    });

    const [disableSaveInfo, setDisableSavingInfo] = useState(false);
    const [savingInfo, setSavingInfo] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertDescription, setAlertDescription] = useState('');

    const getActiveTab = () => {
        if (location.pathname.includes('schedules')) return 'schedules';
        if (location.pathname.includes('rules')) return 'rules';
        if (location.pathname.includes('groups')) return 'groups';
        return 'base';
    };
    const activeTab = getActiveTab();

    useEffect(() => {
        if (!isMounted) {
            fetchUserInfo().then();
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            fetchUserInfo().then();
        }
    }, [userId]);

    useEffect(() => {
        if (userIdState !== 'new' && activeTab === 'base') {
            navigate(`../${userIdState}`, { relative: 'path' });
        }
    }, [userIdState]);

    const fetchUserInfo = async () => {
        if (userIdState === 'new') {
            setUserFIO('Новый сотрудник');
        } else {
            if (PRODMODE) {
                try {
                    const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/selecteduserinfosmall/${userIdState}`,
                        {
                            _token: CSRF_TOKEN
                        }
                    );
                    if (serverResponse.data.content) {
                        setUserFIO(serverResponse.data.content.fio);
                        setUserCompanyState(serverResponse.data.content.company);
                    }
                } catch (error) {
                    console.error('Error fetching user fio:', error);
                }
            } else {
                setUserFIO('Арчи Гавриил Дессус');
                setUserCompanyState({
                    id: 2,
                    name: 'Arstel',
                    color: 'rgb(255, 119, 0)'
                })
            }
        }
    };
    const btnHeader = () => {
        if (userIdState === 'new') {
            return savingInfo ? 'Создаем' : 'Создать пользователя';
        } else {
            return savingInfo ? 'Сохраняем' : 'Сохранить';
        }
    };

    return (
        <div className={styles.sk_mega_layout}>
            <Affix>
                <div className={styles.sk_user_tabs}>
                    <Button variant={'outlined'}
                            color="primary"
                            onClick={() => navigate(`/hr/usermanager`)}
                            icon={<RollbackOutlined />}
                            title={'В список сотрудников'}
                    ></Button>
                    <Button variant={activeTab === 'base' ? 'solid' : 'outlined'}
                            color="default"
                            onClick={() => userIdState !== 'new' && navigate(`/hr/usermanager/${userIdState}`)}
                    >Основная информация</Button>
                    <Button variant={activeTab === 'schedules' ? 'solid' : 'outlined'}
                            color="default"
                            disabled={userIdState === 'new'}
                            onClick={() => userIdState !== 'new' && navigate(`/hr/usermanager/${userIdState}/schedules`)}
                    >График работы</Button>
                    <Button variant={activeTab === 'rules' ? 'solid' : 'outlined'}
                            color="default"
                            disabled={userIdState === 'new'}
                            onClick={() => userIdState !== 'new' && navigate(`/hr/usermanager/${userIdState}/rules`)}
                    >Правила учёта РВ</Button>
                    <Button variant={activeTab === 'groups' ? 'solid' : 'outlined'}
                            color="default"
                            disabled={userIdState === 'new'}
                            onClick={() => userIdState !== 'new' && navigate(`/hr/usermanager/${userIdState}/groups`)}
                    >Группы</Button>
                </div>
            </Affix>
            <Affix offsetTop={52}>
                <div className={styles.sk_user_header}>
                {userIdState !== 'new' && (<p className={styles.sk_user_id}>{userIdState}</p>)}
                <h1 className={styles.sk_user_name}>{userFIO}</h1>
                {activeTab === 'base' ? (
                    <Button type="primary"
                            disabled={disableSaveInfo}
                            loading={savingInfo}
                            iconPosition={'end'}
                            style={{width: '200px'}}
                            onClick={() => setSavingInfo(true)}
                    >{btnHeader()}</Button>
                ) : (
                    <Tag style={{
                        height: '30px',
                        lineHeight: '27px',
                        textAlign: 'center',
                        color: '#ffffff',
                        fontSize: '14px',
                        backgroundColor: userCompanyState.color,
                        borderColor: userCompanyState.color,
                        marginRight: 0,
                    }}>#{userCompanyState.name}</Tag>
                )}
            </div>
            </Affix>
            <div className={styles.sk_workspace}>
                <Outlet context={{
                    currentUser: PRODMODE ? props.userdata : USDA,
                    userIdState,
                    userCompanyState,
                    userFIO,
                    savingInfo,
                    onSavedInfo: () => setSavingInfo(false),
                    onUpdateBaseInfo: (isCanSave) => setDisableSavingInfo(!isCanSave),
                    onUpdateSavingInfo: (isLoading, newUserId) => {
                        setSavingInfo(isLoading);
                        if (newUserId) {
                            setUserIdState(newUserId);
                        }
                    },
                    prepareAndShowAlert: (type, message, description) => {
                        setIsAlertVisible(true);
                        setAlertType(type);
                        setAlertMessage(message);
                        setAlertDescription(description);
                    }
                }}/>
            </div>
            {isAlertVisible && (
                <Alert
                    message={alertMessage}
                    description={alertDescription}
                    type={alertType}
                    showIcon
                    closable
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 9999,
                        width: 350
                    }}
                    onClose={() => setIsAlertVisible(false)}
                />
            )}
        </div>
    )
}

export default UserPage;
