"use client"
import React, { useEffect, useState } from 'react'
import { Menu, MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState<string>('organizations');

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            const firstSegment = pathname.split('/')[1] || 'organizations';
            setSelectedKey(`${firstSegment}`);
        }
    }, [pathname]);

    const items: MenuItem[] = [
        { key: 'organizations', label: 'Organizations' },
        { key: 'templates', label: 'Templates' },
        { key: 'announcements', label: 'Announcements' },
    ]

    const handleClick: MenuProps['onClick'] = (e) => {
        router.push(`/${e.key}`);
    };

    return (
        <Menu
            defaultSelectedKeys={[selectedKey]}
            mode="inline"
            items={items}
            onClick={handleClick}
            selectedKeys={[selectedKey]}
        />
    )
}

export default Sidebar