import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { DS_DEFAULT_USERS } from '../../../CONFIG/DEFAULTSTATE';

const UserModal = ({ userId, visible, onClose }) => {
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = useState(null);



    const getUserData = async (user_id) => {
        const user = JSON.parse(JSON.stringify(DS_DEFAULT_USERS)).filter(item => item.id == user_id);
        console.log(user);
        setUserData(user[0]);
    }

    useEffect(() => {
        if (visible) {
            setLoading(true);
            // Здесь вы можете сделать запрос к серверу для получения данных пользователя по userId
            // Например:
            // fetch(`/api/users/${userId}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         // Обработайте полученные данные
            //         setLoading(false);
            //     });
            getUserData(userId);
            // Для примера просто имитируем задержку
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [userId, visible]);

    return (
        <Modal
        centered
            title={"Детали пользователя " + (userData !== null ? (userData.surname + " " + userData.name + " " + userData.patronymic) : '') + " (" + userId + ")"   }
            visible={visible}
            footer={
                <Button type="primary" onClick={onClose}>
                    Закрыть
                </Button>
            }
            onCancel={onClose}
        >
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div>
                    <table className={'sk-user-view-table'}>
                        <tbody>
                            <tr>
                                <td>Телефон</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>Отдел</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>Подразделение</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>Начало работы</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>Окончание работы</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>График</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>Статус</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>Руководитель</td>
                                <td>Value</td>
                            </tr>
                            <tr>
                                <td>Подчиненные</td>
                                <td>Value</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                // Здесь вы можете отобразить данные пользователя
            )}
        </Modal>
    );
};

export default UserModal;
