import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { css } from '@emotion/core';
import { getCompanyLinkOptions } from '@/utils/company';
import { Company } from '@/generated/types';
import { COLORS } from '@/styles/variables';

interface Props {
  company: Pick<Company, 'affiliateUrl' | 'premium'>;
  buttonProps?: ButtonProps;
  classes?: string;
}

const buttonStyle = css`
  min-width: 120px;

  &.ant-btn-primary {
    background-color: ${COLORS.ACCENT[5]};
    border-color: ${COLORS.ACCENT[5]};
    &:hover,
    &:focus {
      background-color: ${COLORS.ACCENT[6]};
      border-color: ${COLORS.ACCENT[6]};
    }
  }
`;

function CompanyLink({ company, buttonProps, classes }: Props) {
  return (
    <Link
      {...(company.affiliateUrl
        ? { href: company.affiliateUrl, prefetch: false }
        : getCompanyLinkOptions(company))}
    >
      <a 
        target={company.affiliateUrl ? '_blank' : '_self'} 
        rel={company.affiliateUrl ? 'noopener noreferrer' : ''}
        className={classes ? classes : 'ml-2'}
        >
        <Button
          type={company.premium ? 'primary' : 'link'}
          {...buttonProps}
          css={buttonStyle}
        >
          {company.affiliateUrl ? 'Go to site' : 'View details'}
        </Button>
      </a>
    </Link>
  );
}

export default CompanyLink;
