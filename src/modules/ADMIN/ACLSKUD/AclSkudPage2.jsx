import React, { useEffect, useState, uuid } from 'react';
import './components/style/aclskud2.css';
import { BarsOutlined, BuildOutlined, CheckCircleOutlined, CheckOutlined, ClearOutlined, CloseCircleOutlined, ClusterOutlined, CopyOutlined, DeleteColumnOutlined, DeleteOutlined, DiffOutlined, DownSquareOutlined, EditOutlined, EyeOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DockerOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";
import { Affix, Checkbox, Dropdown, Radio, Select, Tabs } from 'antd';
import { CSRF_TOKEN, PRODMODE } from '../../../CONFIG/config';
import { DS_DEPARTMENTS, DS_USERLIST_USERS } from '../../../CONFIG/DEFAULTSTATE';
import AclSkudCardRow from './components/AclSkudCardRow';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import { ACL_ACTUAL_USERS, ACL_COLUMNS, ACL_DEPARTS, ACL_DEPARTS_WITH_COUNT, ACL_SK_USERS, ACL_STATES } from './components/AclSkudData';
import AclSkudChecker from './components/AclSkudChecker';
import AclCheckbox from './components/AclSkudCheckbox';



const AclSkudPage2 = (props) => {

    const [baseUserCollection, setBaseUserCollection] = useState([]);
    const [userCollection, setUserCollection] = useState([]);
    const [departments, setDepartments]  = useState([]);

    const [eventTypes, setEventTypes] = useState([]);
    const [aclColumns, setAclColumns] = useState([]);

    const [cooxStateDeparts, setCooxStateDepars] = useState([]);
    const [cooxStateUsers, setCooxStateUsers] = useState([]);

    const [visibleCompany, setVisibleCompany] = useState(2);

    const [triggerTemplates, setTriggerTemplates] = useState(false);

    const [copyRows, setCopyRows] = useState([]);

    const [pageLoaded, setPageLoaded] = useState(false);

    const [companiesOptions, setCompaniesOptions] = useState([]);
    const [openedTemplates, setOpenedTemplates] = useState([]);
    const [openedDeparts, setOpenedDeparts] = useState([]);
    const [openedUsers, setOpenedUsers] = useState([]);
    
    const rowMenuItems = [
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            Скопировать доступы
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            Вставить доступы
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <div>
            Очистить доступы
          </div>
        ),
      },
      {
        key: '4',
        label: (
          <div>
            Установить всем в отделе
          </div>
        ),
      },
      {
        key: '5',
        label: (
          <div>
            Установить в шаблон
          </div>
        ),
      },
      {
        key: '4',
        label: (
          <div>
            Установить всем выделенным
          </div>
        ),
      },
    ];


    useEffect(() => {
      if (PRODMODE){
        //   get_departments();
        //   get_users();
        //   get_departs2();
        //   get_departtemplates();
        //   get_states();
        //   get_departusers();
      } else {
          setDepartments(ACL_DEPARTS_WITH_COUNT);
          setEventTypes(ACL_STATES);
          setAclColumns(ACL_COLUMNS);
          setBaseUserCollection(ACL_ACTUAL_USERS);

      }
    }, []);

    useEffect(() => {
        // get_departments();
        // get_users();
    }, [visibleCompany]);

    useEffect(() => {
        setUserCollection(baseUserCollection);
    }, [baseUserCollection]);


    useEffect(() => {
      if (props.userdata?.companies){
        setCompaniesOptions( props.userdata?.companies.filter(item => item.id > 1)
        .map(item => ({
          label: item.name,
          value: item.id,
          key: `tkes_${uuid}`,
        })));
      }
    }, [props.userdata]);

    const toggleAllDepCooxed = () => {
        if (cooxStateDeparts.length){
            setCooxStateDepars([]);
        } else {
            let coox = [];
            for (let i = 0; i < departments.length; i++) {
                coox.push(departments[i].id);
            }
            setCooxStateDepars(coox);
        }
    }

const toggleTemplatesOpen = (ev, id) => {
    if (ev.shiftKey){
      if (openedTemplates.includes(id))
      {
        setOpenedTemplates([]);
      } else {
        let nt = [];
        for (let i = 0; i < departments.length; i++) {
          nt.push(departments[i].id);
          
        }
        setOpenedTemplates(nt);
      }
    } else {
    setOpenedTemplates(prev => {
      if (prev.includes(id)) {
        // Если id есть — удаляем его
        return prev.filter(item => item !== id);
      } else {
        // Если нет — добавляем
        return [...prev, id];
      }
    });
  }
};

const toggleDepartsOpen = (ev, id) => {
  console.log('ev', ev)
  if (ev.shiftKey){
    let opened = openedDeparts.includes(id);
    if (opened){
      setOpenedDeparts([]);
    } else {
      let ndeps = departments.map(itm => itm.id);
      setOpenedDeparts(ndeps);
    }
  } else {
    setOpenedDeparts(prev => {
      if (prev.includes(id)) {
        // Если id есть — удаляем его
        return prev.filter(item => item !== id);
      } else {
        // Если нет — добавляем
        return [...prev, id];
      }
    });
  }
};

const toggleUsersOpen = (ev, id, dep_id) => {
  if (ev.shiftKey){
    // if user opened - close all / else open all
    let opened = openedUsers.includes(id);
    let usersToOperate = userCollection.filter((item) => item.depart_id == dep_id).map(itm => itm.id);
    let nuds = [];
    if (opened){
      for (let index = 0; index < openedUsers.length; index++) {
        if (!usersToOperate.includes(openedUsers[index])){
          nuds.push(openedUsers[index]);
        }
      }
    } else {
      nuds = JSON.parse(JSON.stringify(openedUsers));
      for (let index = 0; index < usersToOperate.length; index++) {
        if (!nuds.includes(usersToOperate[index])){
          nuds.push(usersToOperate[index]);
        }
      }
    }
    setOpenedUsers(nuds);
  } else {
    setOpenedUsers(prev => {
      if (prev.includes(id)) {
        // Если id есть — удаляем его
        return prev.filter(item => item !== id);
      } else {
        // Если нет — добавляем
        return [...prev, id];
      }
    });
  }
};


  const toggleDoubleClickDepart = (row_id) => {
    toggleDepartsOpen({}, row_id);
  }


  const setColumnChecked = (ev, targtype, column, id ) =>
  {
    console.log(targtype, column, id );
  }
  
  const setRowChecked = (ev, targtype, column, id ) =>
  {
      
      console.log(targtype, column, id );
  }


    return (
        <div className='sk-page-body'>
                <div style={{padding: '6px'}} className={'sk-mw-1400'}>
                    <div>
                        dkfajslkdjfkas
                    </div>
                    <br/>
                    <div className={'sk-flex-space'}>
                        <div className={'sk-flex'}>
                            <div className={'sk-select-visicom'}>Доступы к компании: </div>
                            <div>
                            <Radio.Group
                            block
                            const options = {companiesOptions}
                            defaultValue={2}
                            value={visibleCompany}
                            optionType="button"
                            buttonStyle="solid"
                            onChange={(ev)=>{setVisibleCompany(ev.target.value)}}
                        />
                                </div>
                        </div>
                        <div className={'sk-flex'}>
                            <div className={'sk-select-visicom'}>Показать сотрудников компании: </div>
                            <div>
                                <Select
                                  const options = { [
                                    { label: "Пользователи всех компаний", value: null, key: "allusr" },
                                    ...companiesOptions,
                                  ]}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
        
                    <br/>
        
                       
                <div style={{padding: '6px'}} className={'sk-mw-1400'} key={'fashdjkfjaklsjdf'}>
        
                    <div className={'sk-table-aclskud'}>
                        <Affix offsetTop={0}>                
                            <div className={'sk-table-aclskud-row sk-table-aclskud-header'}>
                            <div className='sk-tas-inwrap'>
                                <div>
                                    {/* <Checkbox></Checkbox> */}
                                </div>
                            <div>
                                <div className='sk-cooxer-arrow' onClick={toggleAllDepCooxed}>
                                    <DownSquareOutlined />
                                </div>
                            </div>
                            <div>
                                <div>
                                    Имя сотрудника
                                </div>
                            </div>
                            <div>
                                <div className={'sk-table-aclskud-multicol2'}
                                 style={{
                                    gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                  }}
                                >
                                    {aclColumns.map((item)=>(
                                      <div 
                                      className='sk-table-aclskud-cell'
                                        style={{background: `${item.color}26`}}
                                        title={item.text}
                                      >
                                        <div>
                                        <div>
                                        {item.title}
                                        </div>
                                        </div>
                                      
                                      </div>
                                    ))}
                                </div>
                            </div>
        
                            <div>
                            </div>
                            </div>
                        </div>
                        </Affix>

                        <div>
                          {departments.map(item => (
                            <div className={`${openedDeparts.includes(item.id) || openedTemplates.includes(item.id) ? "sk-opened-box":""}`}>
                            <div 
                              onDoubleClick={()=>{toggleDoubleClickDepart(item.id)}}
                              className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checkdser${item.id}_${item.id}`}>
                              <div className='sk-tas-inwrap'>
                              <div><Checkbox /></div>
                              <div><div>{item.id}</div></div>
                              <div className={'sk-table-aclskud-row-name'}><div className={'sk-flex-space'}>
                                <span style={{ fontWeight: '500', color: '#6189aa'}}>{item.name}</span>
                                </div></div>
                              <div>
                                <div className={'sk-table-aclskud-multicol2'}
                                 style={{
                                    gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                  }}
                                >
                                {aclColumns.map((item)=>(
                                      <div 
                                        className='sk-table-aclskud-cell'
                                        style={{background: `${item.color}26`}}
                                        title={item.text}
                                      >
                                        <div><div></div></div>
                                      
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <div className='sk-flex sk-table-triggers'>
                                <div title='Пользователи отдела'
                                  className={`${openedDeparts.includes(item.id) ? 'sk-trigger-active' : ''}`}
                                  onMouseDown={(ev)=>{toggleDepartsOpen(ev, item.id)}}
                                ><UserSwitchOutlined /> <span className={'sk-count-badge'}>{item.users_count}</span></div>
                                <div title='Шаблон отдела'
                                className={`${openedTemplates.includes(item.id) ? 'sk-trigger-active' : ''}`}
                                  onMouseDown={(ev)=>{toggleTemplatesOpen(ev, item.id)}}
                                ><BuildOutlined /></div>
                                {/* <div title='Очистить строку' ><ClearOutlined /></div> */}
                              </div>
                              </div>
                            </div>


                            { openedTemplates.includes(item.id) && (
                              <div className='sk-act-templaterow'>
                                  {eventTypes.map(type => (
                                    
                                <div 
                                  className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checktempl${item.id}_${type.id}`}>
                                  <div className='sk-tas-inwrap'>
                                  <div><Checkbox /></div>
                                  <div><div>{type.id}</div></div>
                                  <div className={'sk-table-aclskud-row-name'}><div className={'sk-flex-space'}>
                                    <span>{type.title}</span>
                                    </div></div>
                                  <div>
                                    <div className={'sk-table-aclskud-multicol2'}
                                    style={{
                                        gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                      }}
                                    >
                                    {aclColumns.map((item)=>(
                                          <div 
                                            className='sk-table-aclskud-cell'
                                            style={{background: `${item.color}26`}}
                                            title={item.text}
                                          >
                                            <div><div><AclCheckbox

                                             /></div></div>
                                          
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                  <div className='sk-flex sk-table-triggers'>
                                    </div>
                                </div>
                                </div>
                                  ))}
                                <div className={'sk-table-template-control'}>
                                  <div></div>
                                  <div className='sk-flex'>
                                    <div className={'sk-table-template-control-button'}>Установить шаблон всем в отделе</div>
                                    <div className={'sk-table-template-control-button'}>Скопировать шаблон</div>
                                    <div className={'sk-table-template-control-button'}>Вставить шаблон</div>
                                    <div className={'sk-table-template-control-button'}>Установить выделенные всем</div>
                                    <div className={'sk-table-template-control-button'}>Установить снятые всем</div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            )}


                            
                            { openedDeparts.includes(item.id) && (
                              <div>
                              <div>
                                  {userCollection.filter((user)=> user.depart_id === item.id).map(user => (
                                    <div 
                                      onDoubleClick={(ev)=>{toggleUsersOpen(ev, user.id, item.id)}}
                                  className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checkusr${item.id}_${user.id}`}>
                                  <div className={`sk-tas-inwrap sk-tas-userrow ${openedUsers.includes(user.id) ? 'sk-tas-userrow-border' : ''}`}>
                                  <div><Checkbox /></div>
                                  <div><div>{user.id}</div></div>
                                  <div className={'sk-table-aclskud-row-name'}><div className={'sk-flex-space'}>
                                    <span>{user.surname} {user.name} {user.secondname}</span>
                                    </div></div>
                                  <div>
                                    <div className={'sk-table-aclskud-multicol2'}
                                    style={{
                                        gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                      }}
                                    >
                                    {aclColumns.map((item)=>(
                                          <div 
                                            className='sk-table-aclskud-cell'
                                            style={{background: `${item.color}26`}}
                                            title={item.text}
                                          >
                                            <div className='sk-false-check'
                                            onMouseDown={(ev)=>{setColumnChecked(ev, 'user', item.id, user.id)}}
                                            >
                                            <div>
                                              <CheckOutlined />
                                             </div>
                                             </div>
                                          
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                  <div className='sk-flex sk-table-triggers'>
                                    <div title='Пользователи отдела'
                                    className={`${openedUsers.includes(user.id) ? 'sk-trigger-active' : ''}`}
                                    onMouseDown={(ev)=>{toggleUsersOpen(ev, user.id, item.id)}}
                                  >
                                    {openedUsers.includes(user.id) ? (
                                      <DeleteColumnOutlined />
                                    ) : (
                                      <ClusterOutlined />
                                    )}
                                  </div>
                                    <div>
                                      <Dropdown menu={{items: rowMenuItems}}>
                                        <BarsOutlined />
                                      </Dropdown>
                                    </div>
                                </div>
                                </div>
                                 <div className={'sk-aclskud-row-inner'}>
                                    {openedUsers.includes(user.id) && (
                                      <div className='sk-act-depusererow'>
                                        {eventTypes.map(type => (
                                        <div 
                                          className={`sk-table-aclskud-row sk-table-aclskud-data `} key={`checktempl${item.id}_${type.id}`}>
                                          <div className='sk-tas-inwrap'>
                                          <div></div>
                                          <div><div>{type.id}</div></div>
                                          <div className={'sk-table-aclskud-row-name'}
                                            title={type.text}
                                          ><div className={'sk-flex-space'}>
                                            <span>{type.title}</span>
                                            </div></div>
                                          <div>
                                            <div className={'sk-table-aclskud-multicol2'}
                                            style={{
                                                gridTemplateColumns: `repeat(${aclColumns.length}, 1fr)`,
                                              }}
                                            >
                                            {aclColumns.map((item)=>(
                                                  <div 
                                                    className='sk-table-aclskud-cell'
                                                    style={{background: `${item.color}26`}}
                                                    title={item.text}
                                                  >
                                                    <div><div><AclCheckbox

                                                    /></div></div>
                                                  
                                                  </div>
                                                ))}
                                            </div>
                                          </div>
                                          <div className='sk-flex sk-table-triggers'>
                                            <div className='sk-false-check'
                                              onMouseDown={(ev)=>{setRowChecked(ev, 'user', type.id, user.id)}}
                                            >
                                              <div>
                                                <CheckOutlined />
                                              </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                 </div>
                                  ))
                                  }
                              </div>
                              </div>
                              )}
                            </div>
                          ))}
                        </div>
            </div>
        </div>
    </div>
    )

}

export default AclSkudPage2;