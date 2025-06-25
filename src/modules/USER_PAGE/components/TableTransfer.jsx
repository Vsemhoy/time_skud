import {Table, Transfer} from "antd";
import React from "react";
import '../style/user_page.module.css'

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    console.log(t)
    return t;
};

const TableTransfer = props => {
    const { leftColumns, rightColumns } = props,
        restProps = __rest(props, ['leftColumns', 'rightColumns']);
    return (
        <Transfer style={{width: '100%', height: '100%', maxHeight: '100%', overflow: 'hidden'}}
                  styles={{
                      list: {
                          style: {
                              overflow: 'hidden !important',
                          },
                      },
                  }}
                  operations={['Добавить', 'Удалить']}
                  locale={{
                      itemUnit: 'элементов',
                      itemsUnit: 'элементов',
                      searchPlaceholder: 'Поиск',
                      notFoundContent: 'Ничего не найдено',
                      titles: ['Все группы', 'Привязанные группы'],
                  }}
                  {...restProps}
        >
            {({
                  direction,
                  filteredItems,
                  onItemSelect,
                  onItemSelectAll,
                  selectedKeys: listSelectedKeys,
                  disabled: listDisabled,
              }) => {
                const columns = direction === 'left' ? leftColumns : rightColumns;
                const rowSelection = {
                    getCheckboxProps: () => ({ disabled: listDisabled }),
                    onChange(selectedRowKeys) {
                        onItemSelectAll(selectedRowKeys, 'replace');
                    },
                    selectedRowKeys: listSelectedKeys,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                };
                return (
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        size="small"
                        pagination={false}
                        style={{
                            pointerEvents: listDisabled ? 'none' : undefined,
                            overflowY: 'auto',
                            maxHeight: 'calc(100vh - 10px - 52px - 52px - 10px - 46px - 20px - 56px - 40px - 24px)'
                        }}
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                if (itemDisabled || listDisabled) {
                                    return;
                                }
                                onItemSelect(key, !listSelectedKeys.includes(key));
                            },
                        })}
                        locale={{
                            filterTitle: 'Фильтр',
                            filterConfirm: 'OK',
                            filterReset: 'Сбросить',
                            filterEmptyText: 'Нет фильтров',
                            filterCheckall: 'Выбрать все',
                            filterSearchPlaceholder: 'Поиск в фильтрах',
                            selectAll: 'Выбрать все',
                            selectInvert: 'Инвертировать выбор',
                            selectNone: 'Очистить все',
                            selectionAll: 'Выбрать все',
                            sortTitle: 'Сортировка',
                            expand: 'Развернуть',
                            collapse: 'Свернуть',
                            triggerDesc: 'Сортировать по убыванию',
                            triggerAsc: 'Сортировать по возрастанию',
                            cancelSort: 'Отменить сортировку',
                        }}
                    />
                );
            }}
        </Transfer>
    );
};

export default TableTransfer;
