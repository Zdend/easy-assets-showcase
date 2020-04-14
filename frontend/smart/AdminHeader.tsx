import React, { useContext } from 'react';
import { Button, Layout, Avatar, Tooltip } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/core';
import { AuthContext } from '../hoc/withAuth';
import { COLORS } from '@/styles/variables';
import { User } from '@/generated/types';

const { Header } = Layout;

const headerStyles = css(`
  background: #fff;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
`);

const getInitials = (user: User) => {
  if (!user || !user.firstName || !user.lastName) {
    return ':-(';
  }
  return user.firstName[0] + user.lastName[0];
};

const AdminHeader = ({ collapsed, setCollapsed }) => {
  const { user } = useContext(AuthContext);
  const initials = getInitials(user);
  return (
    <Header css={headerStyles} className="shadow">
      <Button type="ghost" onClick={() => setCollapsed(!collapsed)}>
        <MenuOutlined />
      </Button>

      <Tooltip
        placement="bottomRight"
        title={
          <div className="d-inline-block">
            Logged as <b>{user.name}</b>
          </div>
        }
      >
        <Avatar size="large" style={{ backgroundColor: COLORS.PRIMARY[5] }} className="font-bold">
          {initials}
        </Avatar>
      </Tooltip>
    </Header>
  );
};

export default AdminHeader;
