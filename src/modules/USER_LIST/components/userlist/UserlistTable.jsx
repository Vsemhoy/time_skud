import React from "react";

import { Table } from "antd";

class UserlistTable extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    {this.genHead()}
                </thead>
                <tbody>
                    {this.genRow()}
                </tbody>
            </table>
        );
    }

    genHead() {
        var head = this.props.head;
        return head.map(function(v, i) {
            return (
                <th key={'th' + i}>
                    {v}
                </th>
            );
        });
    }

    genRow() {
        var rows = this.props.rows;
        return rows.map(function(v, i) {
            // Определяем класс строки на основе состояния
            let rowClass = '';
            switch (v.state) {
                case 0:
                    rowClass = 'sk_state_outside';
                    break;
                case 1:
                    rowClass = 'sk_state_onwork';
                    break;
                case 2:
                    rowClass = 'sk_state_walk';
                    break;
                default:
                    rowClass = '';
            }

            var tmp = v.map(function(v2, j) {
                return (
                    <td key={'td' + i + '_' + j}>
                        {v2}
                    </td>
                );
            });

            return (
                <tr key={'tr' + i} className={rowClass}>
                    {tmp}
                </tr>
            );
        });
    }
}

export default UserlistTable;