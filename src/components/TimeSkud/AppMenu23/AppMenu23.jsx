import { Avatar, Badge, Button, Drawer, Dropdown, Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import React, { useContext, useState } from 'react';
import { HTTP_ROOT } from '../../../CONFIG/config';
import { HomeOutlined, LoginOutlined, NotificationOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { StateContext } from './../../ComStateProvider25/ComStateProvider25';
import Her from './../../HybridEmbeddedRouter/Her';

const AppMenu23 = (props) => {
      const { state, setState } = useContext(StateContext);
    const [notificatorOpened, setNotificatorOpened] = useState(false);
    const [notificatorLoading, setNotificatorLoading] = useState(true);
    const [countOfNotifications, setCountOfNotifications] = useState(0);
    const changePage = () =>{

    }



  const showNotyBar = () => {
    setNotificatorOpened(true);
    setNotificatorLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setNotificatorLoading(false);
    }, 2000);
  };

    const userMenu = (
      <Menu>
        <Menu.Item key="status">Статус: Онлайн</Menu.Item>
        {/* <Menu.Item key="settings" icon={<SettingOutlined />}>
          Настройки
        </Menu.Item> */}
        {/* <Menu.Item key="block" icon={<ThunderboltOutlined />}>
          Заблокировать
        </Menu.Item> */}
        <Menu.Item key="block" icon={<ThunderboltOutlined />}>
            <Her href={'notificator'} >
                Нотификатор
            </Her>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LoginOutlined />}>
          Выйти
        </Menu.Item>
      </Menu>
    );


  return (
    <div>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className={'sk-main-menu'}
      >
        {/* Первая группа */}
       


       <Menu mode="horizontal" style={{ background: '#00000000', flex: 1}}>
          <Menu.Item key="home" icon={<HomeOutlined  style={{ fontSize: '20px', color: '#3b3b3b', marginTop: '6px',
           textAlign: 'center', paddingLeft: '6px' }} />} ><a href={HTTP_ROOT}></a></Menu.Item>
            {/* <MenuItem
            key={'menu_52d34ds'}>
              <Link
                onClick={()=>{ changePage(2)}}
              >Моё</Link>
            </MenuItem> */}

          <Menu.SubMenu key="menu1" title="Моё">
            <MenuItem
            key={'menu_52s34'}>
                <Her href={'userlist'} >
                    Список сотрудников
                </Her>
            </MenuItem>

            <MenuItem
            key={'menu_52d3994'}>
                <Her href={'statistic'} >
                    Статистика
                </Her>
            </MenuItem>

          </Menu.SubMenu>

          <Menu.SubMenu key="menu109" title="Администратор">
            <MenuItem
            key={'menu_52d34'}>
                <Her href={'claims'} >
                    Администрирование заявок
                </Her>
            </MenuItem>

          </Menu.SubMenu>


          <Menu.SubMenu key="menu2" title="Персонал">
          <MenuItem
            key={'menu_5234734565'}>
                <Her href={'manager/usermanager'} >
                    Управление пользователями
                </Her>
            </MenuItem>

          <MenuItem
            key={'menu_52342'}>
                <Her href={'manager/rules'} >
                    Правила
                </Her>
            </MenuItem>

            <MenuItem
            key={'menu_5234qq'}>
                <Her href={'manager/schedules'} >
                    Графики работы
                </Her>
            </MenuItem>



            <MenuItem
            key={'menu_235234'}>
                <Her href={'manager/calendars'} >
                    Производственные календари
                </Her>
            </MenuItem>


            {/* <MenuItem>
              <Link 
              onClick={()=>{ changePage(1)}}
              >Заявки на смену графика</Link>
            </MenuItem>  */}

            <MenuItem
            key={'menu_5234765'}>
                <Her href={'manager/groups'} >
                    Группы пользователей
                </Her>
            </MenuItem>

            {/* <MenuItem
            key={'menu_5235644'}>
              <Link 
              onClick={()=>{ changePage(4)}}
              >RMXR</Link>
            </MenuItem> */}

            <MenuItem
            key={'menu_523566744'}>
                <Her href={'pro/eventmonitor'} >
                    Монитор событий
                </Her>
            </MenuItem>
          </Menu.SubMenu>



          <Menu.SubMenu key="menu634" title="Админ">
            <MenuItem
            key={'menu_52s354'}>
                <Her href={'admin/aclskud'} >
                    Права доступа к заявкам
                </Her>
            </MenuItem>

          </Menu.SubMenu>

        </Menu>

        {/* Вторая группа */}
        {/* <Input.Search placeholder="Поиск" style={{ maxWidth: '200px', margin: '0 20px' }} /> */}

        {/* Третья группа */}
        <div style={{ display: 'flex', alignItems: 'center'}}>
          {/* <input value={state.text} onChange={(e)=>{ setState(prevState => ({
                                                              ...prevState,
                                                              text: e.target.value
                                                            }))}}/>
          <input value={state.target_page} onChange={(e)=>{ setState({target_page: e.target.value})}}/>
          <span>{state.text}</span>
          <span>{state.target_page}</span> */}
            <div onClick={showNotyBar} style={{ cursor: "pointer", marginRight: '24px'}}>
            <Badge count={countOfNotifications} offset={[2, 24]}>
            <Avatar style={{ backgroundColor: '#33333300', marginRight: '0px' }}>
                { props.user_act ? (
                  // <SmileOutlined  style={{ fontSize: '36px', color: '#08c' }} />
                  <NotificationOutlined style={{ fontSize: '36px', color: '#3d3d3d' }} />
                ) : (
                  <ThunderboltOutlined />
                )}
              </Avatar>
              </Badge>
            </div>

          <Dropdown overlay={userMenu} trigger={['hover']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {/* <Avatar style={{ backgroundColor: '#87d068', marginRight: '8px' }}>
                { props.user_act ? (
                  // <SmileOutlined  style={{ fontSize: '36px', color: '#08c' }} />
                  <NotificationOutlined />
                ) : (
                  <ThunderboltOutlined />
                )}
              </Avatar> */}
              { props.user_act && props.user_act.user ? (
                <span style={{fontWeight: 500, color: "#3d3d3d"}}>{props.user_act.user.name} {props.user_act.user.patronymic}</span>
              ) : (
              <span>Пользователь</span>

              )}
            </div>
          </Dropdown>
        </div>
      </Header>


    <Drawer
        closable
        destroyOnClose
        title={<p>Уведомления</p>}
        placement="right"
        open={notificatorOpened}
        loading={notificatorLoading}
        onClose={() => setNotificatorOpened(false)}
      >
        <Button type="primary" style={{ marginBottom: 16 }} onClick={showNotyBar}>
          Reload
        </Button>
        <p>Новых уведомлений не найдено...</p>
      </Drawer>
    </div>
  );
}

export default AppMenu23;
