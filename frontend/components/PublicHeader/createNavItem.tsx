import React from 'react';
import { Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { css } from '@emotion/core';

const { SubMenu } = Menu

const submenuIconStyle = css`
  margin-right: 0 !important;
  margin-left: 0.5rem;
`

interface NavItemProps {
  href?: string;
  label: string;
  linkProps?: Record<string, any> | undefined; 
  aProps?: Record<string, any> | undefined;
}

export interface PublicHeaderNavItemProps extends NavItemProps {
  items?: NavItemProps[] | undefined;
}

const createNavItem = ({ href, label, linkProps, aProps, items }: PublicHeaderNavItemProps, mobile: boolean = false) => {
  
  if (items && !mobile) {
    return (
      <SubMenu
        popupOffset={[0, 3]}
        key={href || label}
        title={<>
          {label}
          <DownOutlined css={submenuIconStyle} />
        </>}
        >
        {items.map(item => (
          <Menu.Item key={item.href || item.label}>
            <Link href={item.href} {...item.linkProps}>
              <a {...item.aProps}>{item.label}</a>
            </Link>
          </Menu.Item>
        ))}
        
      </SubMenu>
    )
  }

  if (items && mobile) {
    return (
      <Menu.ItemGroup key={href || label} title={label}>        
        {items.map(item => (
          <Menu.Item key={item.href}>
            <Link href={item.href} {...item.linkProps}>
              <a {...item.aProps}>{item.label}</a>
            </Link>
          </Menu.Item>
        ))}
        
      </Menu.ItemGroup>
    )
  }
  
  
  return (
    <Menu.Item key={href || label}>
      <Link href={href} {...linkProps}>
        <a {...aProps}>{label}</a>
      </Link>
    </Menu.Item>)
}

export default createNavItem;
