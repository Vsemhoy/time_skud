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
        <div className={'sk-clamen-card'}>
            <div >
                <div>
                    id
                </div>
            </div>
            <div >
                <div>
                    Name useera
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
    )
};

export default ClaimManagerCard;