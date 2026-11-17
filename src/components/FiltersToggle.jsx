import React from 'react';
import { Button } from 'antd';
import { getSavedSkudPageTheme, SKUD_PAGE_THEMES } from '../Utils/skudPageTheme';
import './filters-toggle.css';

export default function FiltersToggle({ className = '', children, ...props }) {
    if (getSavedSkudPageTheme() !== SKUD_PAGE_THEMES.MAIN) {
        return <Button {...props} className={className} title="Фильтры">{children}</Button>;
    }

    return (
        <Button {...props} style={undefined} className={`${className} sk-filters-toggle`}
            aria-label="Фильтры" title="Фильтры">
            <span className="sk-filters-toggle-label">Фильтры</span>
        </Button>
    );
}
