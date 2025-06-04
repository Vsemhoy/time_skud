import { BarChartOutlined, BarsOutlined, CarryOutOutlined, CheckSquareOutlined, ClockCircleOutlined, DislikeOutlined, InfoCircleOutlined, LikeOutlined } from "@ant-design/icons";
import { Dropdown, Typography } from "antd";
import React, { useEffect, useState } from "react";
import ClaimIcon from "./ClaimIcon";
import dayjs from "dayjs";

// const items = [
//   {
//     key: '1',
//     label: (
//       <a>
//         Отозвать заявку
//       </a>
//     ),
//   },
//   {
//     key: '2',
//     label: (
//       <a>
//         Согласовать
//       </a>
//     ),
//   },
//   {
//     key: '3',
//     label: (
//       <a>
//         Отклонить
//       </a>
//     ),
//   },
// {
//     key: '4',
//     label: (
//       <a>
//         Редактировать
//       </a>
//     ),
//   },
// ];


const ClaimManagerCard = (props) => {
    const [itemId, setItemId] = useState(props.data.id);
    const [MYID, setMYID] = useState(0);
    const [aclBase, setAclBase] = useState({});

    const [userCard, setUserCard] = useState(null);

    const [menuItems, setMenuItems] = useState(null);

    const [jsonData, setJsonData] = useState({});

    const handleDoubleClickOnRow = () => {
        if (props.on_click){
            props.on_click(itemId);
        }
    }

    useEffect(() => {
        setUserCard(props.data);
        setJsonData( JSON.parse(props.data?.info));
        console.log(props.data?.info);
    }, [props.data]);

      useEffect(() => {
        setAclBase(props.acl_base)
      }, [props.acl_base]);
    
    
      useEffect(() => {
        setMYID(props.my_id);
      }, [props.my_id]);

      // Добавить пункты меню в соответствии с правами
      useEffect(() => {
        if (userCard === null ||  !aclBase ||  MYID === 0){ return};
        let menu = [];
        let allowBack = false;
        let allowEdit = false;
        let allowApprove = false;
        let allowDecline = false;

        if  (userCard.evaluated === 0 && userCard.user_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('PERS_CLAIM_CREATE')){
            // Заявку можно отозвать вчера и если она не согласована
            if (!userCard.is_approved === 0){
                allowBack = true;
                // let start = dayjs(userCard.start).startOf('day').unix();
                // let today = dayjs().startOf('day').unix();
                // if (start > today){
                // }
            }

        };


        if (aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('ANY_CLAIM_UPDATE')){
            // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
            allowEdit = true;
        } else if (userCard.boss_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_UPDATE')){
            // Если челик мой подчиненный и у меня есть права добавлять подчиненным
            allowEdit = true;
        } else if (userCard.user_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_UPDATE')){
            allowEdit = true;
        };

        if (userCard.need_approved === 1)
        {
            // Согласовываем только те, что требуют согласования
            if (aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('ANY_CLAIM_APPROVE')){
                // фильтр, если есть привилегия согласовывать кому угодно
                if (userCard.is_approved === 0){
                    allowApprove = true;
                    allowDecline = true;
                } else {
                    let start = dayjs(userCard.start).startOf('day').unix();
                    let today = dayjs().startOf('day').unix();
                    if (start > today){
                        allowDecline = true;
                    }
                }
            } else if (userCard.boss_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_APPROVE')){
                // Если челик мой подчиненный и у меня есть право ему согласовывать
                if (userCard.is_approved === 0){
                    allowApprove = true;
                    allowDecline = true;
                } else {
                    let start = dayjs(userCard.start).startOf('day').unix();
                    let today = dayjs().startOf('day').unix();
                    if (start > today){
                        allowDecline = true;
                    }
                }
            } else if (userCard.user_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('PERS_CLAIM_APPROVE')){
                if (userCard.is_approved === 0){
                    allowApprove = true;
                    allowDecline = true;
                } else {
                    let start = dayjs(userCard.start).startOf('day').unix();
                    let today = dayjs().startOf('day').unix();
                    if (start > today){
                        allowDecline = true;
                    }
                }
            };
        }

        if (allowBack){
                menu.push(
                    {
                        key: '1',
                        value: 'getback',
                        label: (
                        <a onClick={handleGetBackEvent}>
                            Отозвать заявку
                        </a>
                        ),
                    }
                );
            };
        if (allowEdit){
            menu.push(
                {
                    key: '2',
                    value: 'edit',
                    label: (
                    <a onClick={handleEditEvent}>
                        Редактировать заявку
                    </a>
                    ),
                }
            );
        };

        if (allowApprove){
            menu.push(
                {
                    key: '4',
                    value: 'approve',
                    label: (
                        <a onClick={handleApproveEvent}>
                        Согласовать заявку
                    </a>
                    ),
                }
            );
        };
        if (allowDecline){
            menu.push(
                {
                    key: '3',
                    value: 'decline',
                    label: (
                <a onClick={handleDeclineEvent}>
                        Отклонить заявку
                    </a>
                    ),
                }
            );
        };
        setMenuItems(menu);
      }, [userCard, aclBase, MYID]);


    const handleEditEvent = ()=> {
        console.log(itemId);
        if (props.on_edit){
            props.on_edit(itemId, userCard)
        }
    }

    const handleApproveEvent = ()=> {
        if (props.on_approve){
            props.on_approve(itemId, userCard);
        }   
    }

    const handleDeclineEvent = ()=> {
        if (props.on_decline){
            props.on_decline(itemId, userCard);
        }  
    }

    const handleGetBackEvent = ()=> {
        if (props.on_get_back){
            props.on_get_back(itemId, userCard);
        }  
    }

    // const handleMenuClick = (info) => {
    //     console.log(info);
    // }

    const clearTimeString = (str) => {
        let s = str.replace(' 00:00:00', '');
        let st = s.split(' ');
        if (st.length == 2){
            let time = st[1].split(':');
            return <div><span>{st[0]}</span>  <span>{time[0]}:{time[1]}</span></div> ;
        } else {
            return <div><span>{st[0]}</span></div> ;
        }
    }

    return (
      <div
        onDoubleClick={handleDoubleClickOnRow}
       className={'sk-clamen-card-wrapper'} > 
        <div className={'sk-clamen-card'}
        // style={{ boxShadow: props.data?.state_color + 'ff -4px 3px 0px -1px' }}
        >
            <div style={{ background: props.data?.state_color}}>
                <div className={'sk-align-center'} title={props.data?.id} >
                <div className={'sk-claimicon'}>
                    <ClaimIcon title={props.data.state_title} icon={props.data.state_icon}/>
                </div>
                </div>
            </div>
            <div className={'sk-fs-medium'}>
                <div style={{paddingLeft: '9px'}}>
                    {props.data.usr_surname} {props.data.usr_name} {props.data.usr_patronymic}
                </div>
            </div>
            <div>
                <div className={'sk-claiminfo'}>
                    {jsonData.comment && (
                        <Typography.Paragraph style={{whiteSpace: 'pre-line'}}><i>Комментарий:</i> {jsonData.comment}</Typography.Paragraph>
                    )}
                    {jsonData.reason && (
                        <Typography.Paragraph><i>Причина:</i> {jsonData.reason}</Typography.Paragraph>
                    )}
                    {jsonData.target_point && (
                        <Typography.Paragraph><i>Место назначения:</i> {jsonData.target_point}</Typography.Paragraph>
                    )}
                    {jsonData.formTask && (
                        <Typography.Paragraph><i>Задача:</i> {jsonData.formTask}</Typography.Paragraph>
                    )}
                    {jsonData.description && (
                        <Typography.Paragraph><i>Описание:</i> {jsonData.description}</Typography.Paragraph>
                    )}
                </div>
            </div>
            <div >
                <div className={'sk-timestring-claim'}>
                    {clearTimeString(props.data.start)}
                </div>
            </div>
            <div >
                <div className={'sk-timestring-claim'}>
                    {clearTimeString(props.data.end)}
                </div>
            </div>

            <div>
                <div className={'sk-align-center sk-fs-medium'}>
                    {props.data.days_count}
                </div>
            </div>


            <div>
                <div>
                    
                </div>
            </div>

            <div>
                {props.data.state === 0 && (
                    <div className={'sk-icon-base'}
                        title={'Ожидает согласования'}
                    >
                        <ClockCircleOutlined />
                    </div>
                )}
                {props.data.state === 1 && (
                    <div className={'sk-icon-success'}
                        title={'Согласовано'}
                    >
                        <LikeOutlined />
                    </div>
                )}
                {props.data.state === 2 && (
                    <div className={'sk-icon-fail'}
                        title={'Отклонено'}
                    >
                        <DislikeOutlined />
                    </div>
                )}
            </div>

            <div>
                <div>
                    {props.data.evaluated ? (
                        <div className={'sk-icon-success'}
                            title={'Исполнено'}
                        >
                            <CarryOutOutlined />
                        </div>
                    ):(
                        <div className={'sk-icon-base'}
                            title={'Ждет исполнения'}
                        >
                            {/* <ClockCircleOutlined /> */}
                        </div>
                    )}
                </div>
            </div>


            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {menuItems && menuItems.length > 0 && (

                        <Dropdown
                            menu={{ 
                                items: menuItems,
                                // onClick: (info) => handleMenuClick(info)
                            }}
                            placement="bottomRight"
                            className={'sk-clamen-card-trigger'}
                        >
                            <BarsOutlined />
                        </Dropdown>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
};

export default ClaimManagerCard;