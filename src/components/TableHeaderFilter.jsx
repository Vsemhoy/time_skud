import React, { useState } from 'react';
import { DatePicker, Input, InputNumber, Select } from 'antd';
import { CaretDownFilled, CaretUpFilled, DownOutlined } from '@ant-design/icons';
import './table-header-filter.css';

/** Shared compact filter control for table column headings. */
export default function TableHeaderFilter({
    label,
    type = 'text',
    value,
    customControl,
    onChange,
    options = [],
    placeholder,
    min,
    format = 'DD.MM.YYYY',
    allowClear = true,
    sortDirection,
    onSort,
    ariaLabel,
    className = '',
}) {
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const hasValue = Array.isArray(value)
        ? value.some(item => item !== null && item !== undefined && item !== '')
        : value !== null && value !== undefined && value !== '';
    const raised = focused || open || hasValue;
    const sortOrder = sortDirection === 'asc' || sortDirection === 2
        ? 2
        : sortDirection === 'desc' || sortDirection === 1 ? 1 : 0;
    const sharedProps = {
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        'aria-label': ariaLabel || label,
    };

    let control;
    switch (type) {
        case 'number':
            control = <InputNumber {...sharedProps} min={min} value={value ?? null} onChange={onChange} placeholder={placeholder} />;
            break;
        case 'select':
            control = <Select {...sharedProps} value={value} options={options} allowClear={allowClear}
                placeholder={placeholder} suffixIcon={<DownOutlined />} open={open}
                onDropdownVisibleChange={setOpen} onChange={onChange} />;
            break;
        case 'date':
            control = <DatePicker {...sharedProps} value={value ?? null} onChange={onChange} format={format}
                placeholder={placeholder} allowClear={allowClear} />;
            break;
        case 'custom':
            control = customControl;
            break;
        default:
            control = <Input {...sharedProps} value={value ?? ''} onChange={onChange} allowClear={allowClear} placeholder={placeholder} />;
    }

    return (
        <div className={`table-header-filter-cell ${raised ? 'is-raised' : ''} ${onSort ? 'has-sort' : ''} ${className}`}>
            <div className="table-header-filter-main">
                <span className="table-header-filter-label">{label}</span>
                <div className="table-header-filter-control" onFocus={() => setFocused(true)} onBlur={event => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
                }}>
                    {control}
                </div>
            </div>
            {onSort && <button type="button" className="table-header-filter-sort" aria-label={`Сортировать: ${label}`}
                onClick={() => onSort(sortOrder === 0 ? 1 : sortOrder === 1 ? 2 : 0)}>
                <CaretUpFilled className={sortOrder === 2 ? 'is-selected' : ''} aria-hidden="true" />
                <CaretDownFilled className={sortOrder === 1 ? 'is-selected' : ''} aria-hidden="true" />
            </button>}
        </div>
    );
}
