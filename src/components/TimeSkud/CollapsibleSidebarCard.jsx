import React, {Children, cloneElement, useEffect, useId, useState} from 'react';
import {Button} from 'antd';
import {DownOutlined, UpOutlined} from '@ant-design/icons';

// The first child is the existing card header; the remaining children are its body.
export default function CollapsibleSidebarCard({storageId, label, children, ...props}) {
    const storageKey = `time_skud:sidebar_card:${storageId}:collapsed`;
    const bodyId = useId();
    const [collapsed, setCollapsed] = useState(() => {
        try {
            return window.localStorage.getItem(storageKey) === 'true';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(storageKey, String(collapsed));
        } catch {
            // Collapsing remains available when browser storage is disabled or full.
        }
    }, [storageKey, collapsed]);

    const [header, ...body] = Children.toArray(children);
    const actionLabel = `${collapsed ? 'Развернуть' : 'Свернуть'}: ${label}`;

    return (
        <section {...props}>
            <div style={{position: 'relative'}}>
                {cloneElement(header, {style: {...header.props.style, paddingRight: 44}})}
                <Button
                    type="text"
                    size="small"
                    style={{position: 'absolute', right: 8, top: 8}}
                    icon={collapsed ? <DownOutlined /> : <UpOutlined />}
                    title={actionLabel}
                    aria-label={actionLabel}
                    aria-expanded={!collapsed}
                    aria-controls={bodyId}
                    onClick={() => setCollapsed(value => !value)}
                />
            </div>
            <div id={bodyId} hidden={collapsed} style={{display: collapsed ? 'none' : 'contents'}}>
                {body}
            </div>
        </section>
    );
}
