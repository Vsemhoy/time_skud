import React, { useEffect, useState } from "react";
import { Collapse, DatePicker, Radio, Space, Tabs } from 'antd';
import { Button, Card, Checkbox, Empty, Tag, Transfer, Typography, TabsProps } from "antd";
import dayjs from "dayjs";



const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
    {
      key: '1',
      label: 'Формы заявок',
      children: (<div className="sk-ap-btn-stack">

      <Button color="blue" variant="filled">
          Заявка на Местную командировку
      </Button>
      <Button color="blue" variant="filled">
          Заявка на Длительную командировку
      </Button>
      <Button color="danger" variant="filled">
          Заявка на длительный отпуск
      </Button>
      <Button color="danger" variant="filled">
          Заявка на кратковременный отпуск
      </Button>
      <Button color="pink" variant="filled">
          Заявка отпуск за свой счёт
      </Button>
      <Button color="cyan" variant="filled">
          Больничный
      </Button>
          <br/>
      <Button color="cyan" variant="filled">
          Сообщить об ошибке
      </Button>

      <Button color="cyan" variant="filled">
          Заявка на смену графика
      </Button>
          <br/>
      </div>),
    },
    {
      key: '2',
      label: 'Бланки и формы заявлений',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'Как действовать',
      children: <p>{text}</p>,
    },
  ];

const AccPageSideBar = (props) => {

    return (
        <div>
            <Collapse  items={items} />
        </div>
    );
};

export default React.memo(AccPageSideBar);