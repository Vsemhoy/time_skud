import React, {useEffect, useState} from "react";
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {Affix, Button, Tag} from "antd";
import styles from './style/user_page.module.css'
import {CSRF_TOKEN, PRODMODE} from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
const UserPage = (props) => {
    const location = useLocation();
    const {userId} = useParams();
    const navigate = useNavigate();
    const [userIdState, setUserIdState] = useState(userId);
    const [userFIO, setUserFIO] = useState("");

    const [disableSaveInfo, setdDisableSavingInfo] = useState(false);
    const [savingInfo, setSavingInfo] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

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
                    const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userfio/${userIdState}`,
                        {
                            _token: CSRF_TOKEN
                        }
                    );
                    if (serverResponse.data.content) {
                        setUserFIO(serverResponse.data.content);
                    }
                } catch (error) {
                    console.error('Error fetching user fio:', error);
                }
            } else {
                setUserFIO('Арчи Гавриил Дессус');
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
                    <Button variant={activeTab === 'base' ? 'solid' : 'outlined'}
                            color="default"
                            onClick={() => userIdState !== 'new' && navigate(`/hr/users/${userIdState}`)}
                    >Основная информация</Button>
                    <Button variant={activeTab === 'schedules' ? 'solid' : 'outlined'}
                            color="default"
                            disabled={userIdState === 'new'}
                            onClick={() => userIdState !== 'new' && navigate(`/hr/users/${userIdState}/schedules`)}
                    >График работы</Button>
                    <Button variant={activeTab === 'rules' ? 'solid' : 'outlined'}
                            color="default"
                            disabled={userIdState === 'new'}
                            onClick={() => userIdState !== 'new' && navigate(`/hr/users/${userIdState}/rules`)}
                    >Правила учёта РВ</Button>
                    <Button variant={activeTab === 'groups' ? 'solid' : 'outlined'}
                            color="default"
                            disabled={userIdState === 'new'}
                            onClick={() => userIdState !== 'new' && navigate(`/hr/users/${userIdState}/groups`)}
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
                        backgroundColor: '#f2914a',
                        borderColor: '#f2914a',
                        marginRight: 0,
                    }}>#{'Arstel'}</Tag>
                )}
            </div>
            </Affix>
            <div className={styles.sk_workspace}>
                <Outlet context={{
                    currentUser: props.userdata,
                    userIdState,
                    userFIO,
                    savingInfo,
                    onUpdateBaseInfo: (isCanSave) => setdDisableSavingInfo(!isCanSave),
                    onUpdateSavingInfo: (isLoading, newUserId) => {
                        setSavingInfo(isLoading);
                        if (newUserId) {
                            setUserIdState(newUserId);
                        }
                    },
                }}/>
            </div>
        </div>
    )
}

export default UserPage;
