import React from 'react';
import SelectField, { Option } from '../components/Form/SelectField';
import { useUsersQuery } from '@/graphql/queries/users.generated';

function UserSelect({ label, name }) {
  const { data, loading } = useUsersQuery();
  const users = data?.users || [];

  return (
    <SelectField {...{ label, name }} loading={loading}>
      {users.map(user => (
        <Option key={user.id} value={user.id}>
          {user.name}
        </Option>
      ))}
    </SelectField>
  );
}

export default UserSelect;
