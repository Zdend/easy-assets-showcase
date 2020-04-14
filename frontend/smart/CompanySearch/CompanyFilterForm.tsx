import React from 'react';
import { FormikHandlers } from 'formik';
import { Form, Button } from 'antd';
import { UserOutlined, ShopOutlined, CloudOutlined, TeamOutlined } from '@ant-design/icons'
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { CompanyServiceType, AudienceType, AuCity } from '@/generated/types';
import RadioGroupField, { Button as RadioButton } from '@/components/Form/RadioGroupField';
import createOptionsFromEnum from '@/utils/enum-options';
import useWindowSize from '@/hooks/useWindowSize';
import { BREAKPOINT } from '@/styles/variables';
import { SelectField } from '@/components/Form';
import { FilterFormValues } from './types';

const FILTER_FORM_BREAKPOINT = 670;

const FormFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;

const formItemStyle = css`
  display: inline-flex;
  justify-items: center;
  justify-content: center;

  .ant-form-item-label {
    width: 92px;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
  }

  .ant-radio-button-wrapper input[type='radio'] {
    position: absolute;
  }

  @media (max-width: ${FILTER_FORM_BREAKPOINT}px) {
    flex-wrap: wrap;
    text-align: center;
    .ant-form-item-label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ant-radio-group {
      width: 100%;
    }
    .ant-form-item-control-wrapper {
      width: 100%;
    }
  }
`;

const filterButtonStyle = css`
  width: 150px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;

  @media (max-width: ${BREAKPOINT.xs}) {
    width: 50%;
  }
`;

const SearchButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const searchButtonStyle = css`
  min-width: 200px;

  @media (max-width: ${BREAKPOINT.xs}) {
    display: block;
    width: 100%;
  }
`;

const { SYDNEY, MELBOURNE, BRISBANE, ADELAIDE, PERTH, CANBERRA } = AuCity;
const cities = { SYDNEY, MELBOURNE, BRISBANE, ADELAIDE, PERTH, CANBERRA };

interface FilterFormProps {
  loading: boolean;
  values: FilterFormValues;
  handleSubmit: FormikHandlers['handleSubmit'];
}

function CompanyFilterForm({ handleSubmit, loading, values }: FilterFormProps) {
  const { width } = useWindowSize();
  const isMobile = width ? width < FILTER_FORM_BREAKPOINT : true;
  const CityField = isMobile ? SelectField : RadioGroupField;

  return (
    <Form onSubmitCapture={handleSubmit}>
      <FormFieldSet>
        <RadioGroupField label="I am" name="type" colon={false} formItemCss={formItemStyle} size="large">
          <RadioButton value={AudienceType.INDIVIDUAL} css={filterButtonStyle}>
            <UserOutlined className="mr-2" />
            Individual
          </RadioButton>
          <RadioButton value={AudienceType.BUSINESS} css={filterButtonStyle}>
            <ShopOutlined className="mr-2" />
            Business
          </RadioButton>
        </RadioGroupField>

        <RadioGroupField
          label="and I prefer"
          name="serviceType"
          colon={false}
          formItemCss={formItemStyle}
          size="large"
        >
          <RadioButton value={CompanyServiceType.ONLINE} css={filterButtonStyle}>
            <CloudOutlined className="mr-2" />
            Online
          </RadioButton>
          <RadioButton value={CompanyServiceType.FACE_TO_FACE} css={filterButtonStyle}>
            <TeamOutlined className="mr-2" />
            Face To Face
          </RadioButton>
        </RadioGroupField>
        {values.serviceType === CompanyServiceType.FACE_TO_FACE ? (
          <CityField
            label="I live in"
            name="city"
            colon={false}
            size="large"
            placeholder="Choose your city..."
            formItemCss={formItemStyle}
          >
            {createOptionsFromEnum(cities, isMobile ? 'Option' : 'RadioButton')}
          </CityField>
        ) : null}
      </FormFieldSet>

      <SearchButtonWrapper>
        <Button
          htmlType="submit"
          loading={loading}
          type="primary"
          size="large"
          css={searchButtonStyle}
        >
          Search
        </Button>
      </SearchButtonWrapper>
    </Form>
  );
}

export default CompanyFilterForm;
