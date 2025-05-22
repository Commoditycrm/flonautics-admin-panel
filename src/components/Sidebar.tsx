import { Menu, MenuProps } from 'antd';
import React from 'react'

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {

    const items: MenuItem[] = [
        { key: '1', label: 'Organizations' },
        { key: '2', label: 'Templates' },
    ]

    return (
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
        />
    )
}

export default Sidebar