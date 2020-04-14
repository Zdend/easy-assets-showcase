import React from 'react';
import Link from 'next/link';
import { Menu, Layout, Button } from 'antd';
import { 
  MenuOutlined,
  DashboardOutlined,
  TeamOutlined,
  ShopOutlined,
  ReadOutlined,
  BuildOutlined,
  PhoneOutlined,
  PoweroffOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import LogoutLink from './LogoutLink';
import ProductTitle from '../components/ProductTitle';
import SvgLogo from '@/components/SvgLogo';
import { BREAKPOINT, COLORS } from '@/styles/variables';

const { Sider } = Layout;

const PRODUCT_TITLE_HEIGHT = '60px';
const SIDER_WIDTH = '200px';

const siderStyles = css(`
  .ant-layout-sider-children {
    width: 100%;
  }

  &.ant-layout-sider-zero-width {
    height: 0;
  }
  .ant-menu-item {
    &:hover,&:focus {
      background-color: ${COLORS.BRAND[3]};
    }
  }

  @media (max-width: ${BREAKPOINT.sm}) {
    position: fixed;
    z-index: 1000;
    
    &:not(.ant-layout-sider-collapsed) {
      width: 100% !important;
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
`);

const navigationStyles = css(`
  display: flex;
  flex-flow: wrap;
  align-content: start;
  width: 100%;
  height: calc(100vh - ${PRODUCT_TITLE_HEIGHT});
  .ant-menu-item {
    flex: 1 0 100%;
  }
`);

const logoutLinkStyles = css(`
  align-self: end;
  bottom: 0.5rem;

  .ant-layout-sider-collapsed & {
    display: none;
  }
`);

const menuItems = [
  { key: '/admin', href: '/admin', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/admin/users', href: '/admin/users', icon: <TeamOutlined />, label: 'Users' },
  { key: '/admin/companies', href: '/admin/companies', icon: <ShopOutlined />, label: 'Companies' },
  { key: '/admin/posts', href: '/admin/posts', icon: <ReadOutlined />, label: 'Posts' },
  { key: '/admin/services', href: '/admin/services', icon: <BuildOutlined />, label: 'Services' },
  { key: '/admin/leads', href: '/admin/leads', icon: <PhoneOutlined />, label: 'Leads' },
  { key: '/home', href: '/', icon: <ArrowLeftOutlined />, label: 'Go to Home Page' }
];

const AdminSider = ({ collapsed, setCollapsed }) => {
  const router = useRouter();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="sm"
      collapsedWidth="0"
      width={250}
      css={siderStyles}
    >
      <ProductTitle height={PRODUCT_TITLE_HEIGHT} className="flex w-full justify-between px-2">
        <Link href="/admin">
          <a className="pl-3">
            <SvgLogo height="30px" />
          </a>
        </Link>

        <Button type="ghost" onClick={() => setCollapsed(!collapsed)} className="d-inline-block sm:hidden white--text">
          <MenuOutlined />
        </Button>
      </ProductTitle>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[router && router.asPath]}
        css={navigationStyles}
      >
        {menuItems.map(({ key, href, icon, label }) => (
          <Menu.Item key={key}>
            <Link href={href}>
              <a>
                {icon} {label}
              </a>
            </Link>
          </Menu.Item>
        ))}

        <Menu.Item key="logout" css={logoutLinkStyles}>
          <LogoutLink>
            <PoweroffOutlined />
          </LogoutLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
