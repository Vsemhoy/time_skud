import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';

const UserModal = ({ userId, visible, onClose }) => {
    const [loading, setLoading] = React.useState(true);

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
            
            // Для примера просто имитируем задержку
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [userId, visible]);

    return (
        <Modal
            title="Детали пользователя"
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
                <p>Данные пользователя с ID: {userId}</p>
                // Здесь вы можете отобразить данные пользователя
            )}
        </Modal>
    );
};

export default UserModal;
