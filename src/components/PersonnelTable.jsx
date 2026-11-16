import React from 'react';
import {Empty} from 'antd';

export default function PersonnelTable({label, headings, empty, children}) {
    return (
        <table className="sk-personnel-table" aria-label={label}>
            <thead><tr>{headings.map(heading => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
            <tbody>{empty
                ? <tr><td colSpan={headings.length}><Empty description="Ничего не найдено" /></td></tr>
                : children}</tbody>
        </table>
    );
}
