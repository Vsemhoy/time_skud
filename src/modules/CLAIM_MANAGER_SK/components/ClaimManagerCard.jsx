import { BarChartOutlined, BarsOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";

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



    return (
      <div className={'sk-clamen-card-wrapper'} style={{background: props.data?.state_color}}>
        <div className={'sk-clamen-card'}>
            <div >
                <div>
                    {props.data?.id}
                </div>
            </div>
            <div >
                <div>
                    {props.data.usr_surname} {props.data.usr_name} {props.data.usr_patronymic}
                </div>
            </div>
            <div>
                <div>
                    nbg
                </div>
            </div>
            <div >
                <div>
                    13:00
                </div>
            </div>
            <div >
                <div>
                    22:00
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
                <div>
                    
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