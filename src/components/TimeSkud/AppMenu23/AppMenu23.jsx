import {Affix, Avatar, Badge, Button, Drawer, Dropdown, Menu} from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import React, { useContext, useState } from 'react';
import { HTTP_ROOT } from '../../../CONFIG/config';
import { HomeOutlined, LoginOutlined, NotificationOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Link, NavLink, useLocation  } from 'react-router-dom';
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
    const location = useLocation();
    const selectedKey = location.pathname;

    // alert(selectedKey);
    console.log(selectedKey);

  const showNotyBar = () => {
    setNotificatorOpened(true);
    setNotificatorLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setNotificatorLoading(false);
    }, 2000);
  };

    const userMenu = (
      <Menu  selectedKeys={[selectedKey]}>
        <Menu.Item key="status">Статус: Онлайн</Menu.Item>
        {/* <Menu.Item key="settings" icon={<SettingOutlined />}>
          Настройки
        </Menu.Item> */}
        {/* <Menu.Item key="block" icon={<ThunderboltOutlined />}>
          Заблокировать
        </Menu.Item> */}
        <Menu.Item key="hr/notify" icon={<ThunderboltOutlined />}>
            {/* <Her href={'notificator'} >
                Нотификатор
            </Her> */}
            <NavLink to="/hr/notify" className={({ isActive }) => (isActive ? 'active' : '')}>
            Нотификатор
            </NavLink>
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
       


       <Menu mode="horizontal" style={{ background: '#00000000', flex: 1}}
       selectedKeys={[selectedKey]}>
          <Menu.Item key="home" icon={<HomeOutlined  style={{ fontSize: '20px', color: '#3b3b3b', marginTop: '6px',
           textAlign: 'center', paddingLeft: '6px' }} />} ><a href={HTTP_ROOT}></a></Menu.Item>
          
          
          <MenuItem
              
              key={'menu_52s34'}>
                <NavLink to="/" >
                  Сотрудники
                </NavLink>
            </MenuItem>

            <MenuItem
            key={'/claims'}>
                <NavLink to="/claims">
                  Заявки
                </NavLink>
            </MenuItem>

          {/* <Menu.SubMenu key="menu1" title="Моё">

            <MenuItem
              
              key={'menu_52s34'}>
                <NavLink to="/" >
                  Список сотрудников
                </NavLink>
            </MenuItem>

            <MenuItem
              key={'/monitor/stat'}>
                <NavLink to="/monitor/stat">
                  Статистика
                </NavLink>
            </MenuItem>



          </Menu.SubMenu>

          <Menu.SubMenu key="menu109" title="Администратор">
            <MenuItem
            key={'/claims'}>
                <NavLink to="/claims">
                  Заявки
                </NavLink>
            </MenuItem>



          </Menu.SubMenu> */}


          <Menu.SubMenu key="menu2" title="Персонал">
          <MenuItem
            key={'/hr/usersettings'}>
                <NavLink to="/hr/usersettings">
                  Управление пользователями
                </NavLink>
            </MenuItem>

          <MenuItem
            key={'/hr/rules'}>
                <NavLink to="/hr/rules">
                  Правила
                </NavLink>
            </MenuItem>

            <MenuItem
            key={'/hr/schedules'}>
                <NavLink to="/hr/schedules">
                  Графики работы
                </NavLink>
            </MenuItem>



            <MenuItem
            key={'/hr/calendars'}>
                <NavLink to="/hr/calendars">
                Производственные календари
                </NavLink>
            </MenuItem>


            {/* <MenuItem>
              <Link 
              onClick={()=>{ changePage(1)}}
              >Заявки на смену графика</Link>
            </MenuItem>  */}

            <MenuItem
            key={'/hr/groups'}>
                <NavLink to="/hr/groups">
                Группы пользователей
                </NavLink>
            </MenuItem>

            {/* <MenuItem
            key={'menu_5235644'}>
              <Link 
              onClick={()=>{ changePage(4)}}
              >RMXR</Link>
            </MenuItem> */}

          <MenuItem
            key={'/monitor/events'}>
                <NavLink to="/monitor/events" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Монитор событий
                </NavLink>
            </MenuItem>
          </Menu.SubMenu>

           <Menu.SubMenu key="menu228" title="Персонал_2">
               <MenuItem
                   key={'/hr/usermanager'}>
                   <NavLink to="/hr/usermanager">
                       Управление пользователями
                   </NavLink>
               </MenuItem>
           </Menu.SubMenu>


          <Menu.SubMenu key="menu634" title="ACL">
            <MenuItem
            key={'/admin/aclskud'}>
                <NavLink to="admin/aclskud">
                  СКУД доступы и права
                </NavLink>
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
