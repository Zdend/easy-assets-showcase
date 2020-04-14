import React, { useState } from 'react';
import { Layout, Drawer, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BREAKPOINT, COLORS } from '@/styles/variables';
import SvgLogo from '@/components/SvgLogo';
import createNavItem, { PublicHeaderNavItemProps } from './createNavItem';

const { Header } = Layout;

const HEADER_HEIGHT = 64;

const headerStyle = css`
  display: flex;
  padding: 0 1.5rem;
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  background-color: transparent;
  border-bottom: 1px solid ${COLORS.GREY[1]};

  @media (max-width: ${BREAKPOINT.lg}) {
    padding: 0 0.5rem;
  }
`;

const menuToggleStyle = css`
  @media (min-width: ${BREAKPOINT.lg}) {
    display: none;
  }
`;

const NavigationBar = styled.nav`
  flex-grow: 1;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
`;

const headerLogoStyle = css`
  display: inline-flex;
  align-items: center;
  color: ${COLORS.BRAND[5]};

  :hover,
  :focus {
    color: ${COLORS.PRIMARY[5]};
  }
`;

const desktopMenuStyle = css`
  border-bottom-color: transparent;
  align-self: flex-end;
  height: ${HEADER_HEIGHT - 2}px;
  line-height: ${HEADER_HEIGHT - 4}px;

  .ant-menu-item, .ant-menu-submenu {
    top: 2px;
    font-weight: 700 !important;
  }

  @media (max-width: ${BREAKPOINT.lg}) {
    display: none;
  }
`;

const mobileDrawerStyle = css`
  z-index: 1090;
  .ant-drawer-close {
    top: 0.5rem;
    right: 0.75rem; 
  }
`

const navigationItems: PublicHeaderNavItemProps[] = [
  { label: 'Find Accountant', href: '/' },
  { label: 'Tax Return', href: '/tax-return' },
  { label: 'Blog', href: '/blog' },
  { 
    label: 'Money Tools', 
    items: [
      { label: 'Compount Interest Calculator', href: '/tools/compound-interest-calculator' },
      { label: 'Salary Sacrifice Calculator', href: '/tools/salary-sacrifice-calculator' },
      { label: 'Net Salary Calculator', href: '/tools/net-salary-calculator' },
      { label: 'Loan Repayment Calculator', href: '/tools/loan-repayment-calculator' },
      { label: 'Money Allocation', href: '/tools/money-allocation-chart' },
      { label: 'Rent or Buy Property', href: '/tools/rent-or-buy-property-calculator' },
    ] 
  },
  {
    label: 'List my firm',
    href:
      'https://docs.google.com/forms/d/e/1FAIpQLSduZmR7-ehD0agKH39h30m4VT_WjWNyPTkuWP2Aioo0YYHKrg/viewform?usp=sf_link',
    linkProps: {
      prefetch: false,
      passHref: true
    },
    aProps: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
];



function PublicHeader() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <Header css={headerStyle}>
      <Link href="/">
        <a css={headerLogoStyle}>
          <SvgLogo height={HEADER_HEIGHT / 2} />
        </a>
      </Link>

      <NavigationBar>
        <Menu mode="horizontal" css={desktopMenuStyle} selectedKeys={router && [router.asPath]}>
          {navigationItems.map(item => createNavItem(item, false))}
        </Menu>

        <Button
          type="default"
          css={menuToggleStyle}
          onClick={() => setDrawerVisible(!drawerVisible)}
        >
          <MenuOutlined />
        </Button>
      </NavigationBar>

      <Drawer
        title={
          <Link href="/">
            <a css={headerLogoStyle}>
              <SvgLogo height={HEADER_HEIGHT / 2} />
            </a>
          </Link>
        }
        headerStyle={{
          display: 'flex',
          alignItems: 'center',
          height: `${HEADER_HEIGHT}px`
        }}

        height="100%"
        placement="top"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        css={mobileDrawerStyle}
      >
        <Menu>
          {navigationItems.map(item => createNavItem(item, true))}
        </Menu>
      </Drawer>
    </Header>
  );
}

export default PublicHeader;
