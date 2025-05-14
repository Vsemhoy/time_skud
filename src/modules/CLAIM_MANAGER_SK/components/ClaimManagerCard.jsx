import { BarChartOutlined, BarsOutlined, CarryOutOutlined, CheckSquareOutlined, ClockCircleOutlined, DislikeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React, { useState } from "react";
import ClaimIcon from "./ClaimIcon";

const items = [
  {
    key: '1',
    label: (
      <a>
        Отозвать заявку
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a>
        Согласовать
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a>
        Отклонить
      </a>
    ),
  },
{
    key: '4',
    label: (
      <a>
        Редактировать
      </a>
    ),
  },
];


const ClaimManagerCard = (props) => {
    const [itemId, setItemId] = useState(props.data.id);

    const handleDoubleClickOnRow = () => {
        if (props.on_click){
            props.on_click(itemId);
        }
    }

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
                <Dropdown
                    menu={{
                    items,
                    }}
                    placement="bottomRight"
                    className={'sk-clamen-card-trigger'}
                >
                    <BarsOutlined />
                </Dropdown>
            </div>
        </div>
        </div>
    )
};

export default ClaimManagerCard;