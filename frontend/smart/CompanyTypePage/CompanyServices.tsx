import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import Link from 'next/link';
import { AudienceType } from '@/generated/types';
import { PublicCompanyQuery } from './CompanyQuery.generated';
import { COLORS } from '@/styles/variables';

const Table = styled.table`
  width: 100%;
`;

const TableTh = styled.th`
  text-align: center;
  height: 4rem;
`;

const TableTdValue = styled.td`
  text-align: center;
  padding: 0.5rem;
  font-size: 1.25rem;
  line-height: 1;
  width: 25%;
  color: ${COLORS.BRAND[5]};
`;

const TableTdName = styled.td`
  height: 2.5rem;
  font-weight: 400;
`;

const TableTr = styled.tr`
  transition: all 0.1s ease-in-out;
  td:first-of-type {
    transition: all 0.2s ease-in-out;
  }
  &:hover,
  &:focus {
    border-left: 5px solid ${COLORS.PRIMARY[5]};
    td:first-of-type {
      padding-left: 4px;
    }
  }
`;

interface Props {
  company: PublicCompanyQuery['company'];
}

const CompanyServices = ({ company }: Props) => {
  if (!company.features.length) {
    return null;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <h3>Services</h3>
          </th>
          {company.type !== AudienceType.BUSINESS && <TableTh>Individual</TableTh>}
          {company.type !== AudienceType.INDIVIDUAL && <TableTh>Business</TableTh>}
        </tr>
      </thead>
      <tbody>
        {company.features.map(feature => (
          <TableTr key={feature.id}>
            <TableTdName>
              <Link href="/services/[id]" as={`/services/${feature.slug || feature.id}`}>
                <a>{feature.name}</a>
              </Link>
              {feature.description && (
                <Tooltip title={feature.description}>
                  <InfoCircleOutlined className="ml-2" />
                </Tooltip>
              )}
            </TableTdName>
            {company.type !== AudienceType.BUSINESS && (
              <TableTdValue>
                {[AudienceType.INDIVIDUAL, AudienceType.INDIVIDUAL_BUSINESS].includes(
                  feature.type
                ) && (
                  <Tooltip title={`${company.name} helps individuals with ${feature.name}`}>
                    <CheckOutlined />
                  </Tooltip>
                )}
              </TableTdValue>
            )}
            {company.type !== AudienceType.INDIVIDUAL && (
              <TableTdValue>
                {[AudienceType.BUSINESS, AudienceType.INDIVIDUAL_BUSINESS].includes(
                  feature.type
                ) && (
                  <Tooltip title={`${company.name} helps businesses with ${feature.name}`}>
                    <CheckOutlined />
                  </Tooltip>
                )}
              </TableTdValue>
            )}
          </TableTr>
        ))}
      </tbody>
    </Table>
  );
};

export default CompanyServices;
