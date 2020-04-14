import React, { useState, useRef } from 'react';
import throttle from 'lodash.throttle';
import { useField } from 'formik';
import SelectField, { Option } from '../components/Form/SelectField';
import { useAddressesQuery } from '@/graphql/queries/addresses.generated';

function AddressSelect({ label, name }) {
  const [search, setSearch] = useState('');
  const [field] = useField(name);

  const { data, loading } = useAddressesQuery({
    variables: {
      limit: 15,
      filter: {
        SEARCH: search && search.length > 1 ? search : null,
        ID: field.value ? { in: field.value } : null
      }
    }
  });
  const addresses = data?.addresses?.items || [];

  const handleSearchRef = useRef(throttle(setSearch, 1000));

  return (
    <SelectField
      mode="multiple"
      {...{ label, name }}
      placeholder="Start typing..."
      loading={loading}
      filterOption={false}
      onSearch={handleSearchRef.current}
    >
      {addresses.map(address => (
        <Option key={address.id} value={address.id}>
          {address.suburb} - {address.postcode}, {address.city} ({address.state})
        </Option>
      ))}
    </SelectField>
  );
}

export default AddressSelect;
