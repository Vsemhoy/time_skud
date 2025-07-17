import { Button, Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { CSRF_TOKEN, PRODMODE } from '../../CONFIG/config';
import { PROD_AXIOS_INSTANCE } from '../../API/API';
import NotiCard from './NotiCard';
import { MOCK_NOTICES } from './mock/NoticeMock';

/**
 * Компонент нотификации - показывает уведомления, присланные с бэка
 * @param {*} props 
 * @returns 
 */
const NotifierDrawer = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [noticePage, setNoticePage] = useState(1);
  const [noticeIgnore, setNoticeIgnore] = useState([]);
  const [countOfNotifications, setCountOfNotifications] = useState(0);
  const [notificatorOpened, setNotificatorOpened] = useState(false);
  const [notificatorLoading, setNotificatorLoading] = useState(true);
  
    const notificationRead = (id) => {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, is_read: true } 
            : notification
        )
      );
      markNoteRead(id);
    };


    useEffect(() => {
      console.log(props.is_open);
      setNotificatorOpened(props.is_open);
    }, [props.is_open]);


      // EFFECTS
      useEffect(() => {
        if (PRODMODE){
          getFreshNotices();
        } else {

          setNotifications(MOCK_NOTICES);
          console.log("MANOK" , MOCK_NOTICES);
          
        }
      }, []);


      useEffect(() => {
        setNotificatorLoading(false);
      }, [notifications]);



    const markNoteRead = async (note_id, req, res) => {
    try {
              let response = await PROD_AXIOS_INSTANCE.put('/api/notice/read/' + note_id + '?_token=' + CSRF_TOKEN,
                  {   
                      data: note_id, 
                      _token: CSRF_TOKEN
                  }
              );
              
                // setBaseUserListData(response.data.data);
            } catch (e) {
                console.log(e)
                alert(e.response.data.message);
            } finally {

        }
    }


    const getFreshNotices = async (item)=> {
      try {
        // setLoadingOrgs(true)
        const format_data = {
            CSRF_TOKEN,
            data: {
            }
        }
        let response = await PROD_AXIOS_INSTANCE.get('/api/notice/fresh' + '?_token=' + CSRF_TOKEN);
        
        setNotifications(response.data.data);
        let ignore = [];
        for (let i = 0; i < response.data.data.length; i++){
          ignore.push(response.data.data[i].id);
        };
        setNoticeIgnore(ignore);
        setCountOfNotifications(ignore.length);

      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
          // window.location.reload();
      }
    }


    const getOldNotices = async ()=> {
      try {
        let response = await PROD_AXIOS_INSTANCE.post('/api/notice/old?_token=' + CSRF_TOKEN, 
          {   
            page: noticePage,
            ignore: noticeIgnore,
            _token: CSRF_TOKEN
        });
        
        if (response.data.data.length){
          setNoticePage(noticePage + 1);
          setNotifications(prev => [...prev, ...response.data.data]);

        } 
        if (response.data.data.length < 12){
          setNoticePage(-1);
        }

      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
          // window.location.reload();
      }
    }




    const handleClose = () => {
      setNotificatorOpened(false);
      if (props.on_close){
        props.on_close();
      }
    }



  return (
    <Drawer
        closable
        destroyOnClose
        title={<p>Уведомления</p>}
        placement="right"
        open={notificatorOpened}
        loading={notificatorLoading}
        onClose={handleClose}
      >
        {/* <Button type="primary" style={{ marginBottom: 16 }} onClick={showNotyBar}>
          Reload
        </Button>
        <p>Новых уведомлений не найдено...</p> */}
        <div>
          {notifications.map((item)=>(
            <NotiCard 
              data={item}
              key={`notic_${item.id}`}
              on_read={notificationRead}
            />
          ))}
        </div>
          
        { noticePage > 0 && (
          <Button type="dashed" block
            onClick={getOldNotices}
          >
            Показать старые уведомления
          </Button>
        )}

      </Drawer>
  );
};

export default NotifierDrawer;