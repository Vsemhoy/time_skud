import { BarChartOutlined, BarsOutlined, CarryOutOutlined, CheckSquareOutlined, ClockCircleOutlined, DislikeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import ClaimIcon from "./ClaimIcon";

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

    const handleDoubleClickOnRow = () => {
        if (props.on_click){
            props.on_click(itemId);
        }
    }

    useEffect(() => {
        setUserCard(props.data);
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

        if  (userCard.evaluated === 0 && userCard.id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('PERS_CLAIM_CREATE')){
            allowBack = true;
        };

        if (aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('ANY_CLAIM_EDIT')){
            // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
            allowEdit = true;
        } else if (userCard.boss_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_EDIT')){
            // Если челик мой подчиненный и у меня есть права добавлять подчиненным
            allowEdit = true;
        } else if (userCard.id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('PERS_CLAIM_EDIT')){
            allowEdit = true;
        };

        if (aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('ANY_CLAIM_APPROVE')){
            // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
            allowApprove = true;
        } else if (userCard.boss_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('TEAM_CLAIM_APPROVE')){
            // Если челик мой подчиненный и у меня есть права добавлять подчиненным
            allowApprove = true;
        } else if (userCard.id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][userCard.skud_current_state_id] && aclBase[userCard.id_company][userCard.skud_current_state_id]?.includes('PERS_CLAIM_APPROVE')){
            allowApprove = true;
        };

        if (allowBack){
                menu.push(
                    {
                        key: '1',
                        label: (
                        <a>
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
                    label: (
                    <a>
                        Редактировать заявку
                    </a>
                    ),
                }
            );
        };
        if (allowApprove){
            menu.push(
                {
                    key: '3',
                    label: (
                    <a>
                        Отклонить заявку
                    </a>
                    ),
                }
            );
            menu.push(
                {
                    key: '3',
                    label: (
                    <a>
                        Согласовать заявку
                    </a>
                    ),
                }
            );
        }
        setMenuItems(menu);
      }, [userCard, aclBase, MYID]);

    return (
      <div
        onDoubleClick={handleDoubleClickOnRow}
       className={'sk-clamen-card-wrapper'} style={{background: props.data?.state_color}}>
        <div className={'sk-clamen-card'}>
            <div >
                <div className={'sk-align-center'}>
                    {props.data?.id}
                </div>
            </div>
            <div >
                <div>
                    {props.data.usr_surname} {props.data.usr_name} {props.data.usr_patronymic}
                </div>
            </div>
            <div>
                <div className={'sk-claimicon'}>
                    <ClaimIcon title={props.data.state_title} icon={props.data.state_icon}/>
                </div>
            </div>
            <div >
                <div>
                    {props.data.start}
                </div>
            </div>
            <div >
                <div>
                    {props.data.end}
                </div>
            </div>

            <div>
                <div className={'sk-align-center'}>
                    {props.data.days_count}
                </div>
            </div>

            <div>
                <div>
                    
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
                        <InfoCircleOutlined />
                    </div>
                )}
                {props.data.state === 1 && (
                    <div className={'sk-icon-success'}
                        title={'Согласовано'}
                    >
                        <CheckSquareOutlined />
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
                            <ClockCircleOutlined />
                        </div>
                    )}
                </div>
            </div>


            <div>
                {menuItems && (

                    <Dropdown
                        menu={
                        {menuItems}
                        }
                        placement="bottomRight"
                        className={'sk-clamen-card-trigger'}
                    >
                        <BarsOutlined />
                    </Dropdown>
                )}
            </div>
        </div>
        </div>
    )
};

export default ClaimManagerCard;