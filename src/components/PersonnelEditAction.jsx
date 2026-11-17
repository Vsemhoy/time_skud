import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function PersonnelEditAction({ to, onClick, label }) {
    const content = <><EditOutlined /> Редактировать</>;
    return to
        ? <NavLink className="sk-personnel-edit" to={to} aria-label={label}>{content}</NavLink>
        : <button className="sk-personnel-edit" type="button" onClick={onClick} aria-label={label}>{content}</button>;
}
