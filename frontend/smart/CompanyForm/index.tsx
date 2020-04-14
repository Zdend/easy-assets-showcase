import React from 'react';
import { Form, Typography, Collapse } from 'antd';
import { FormikBag, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { css } from '@emotion/core';
import {
  UpdateCompanyInput,
  UploadFolder,
  AudienceType,
  CompanyServiceType,
  Language,
  CompanyStatus,
  CompanyTag,
} from '@/generated/types';
import { notify } from '@/utils/notification';
import { handleGraphQLErrors } from '@/utils/error';
import {
  InputField,
  TextAreaField,
  ImageField,
  SelectField,
  CheckboxField
} from '@/components/Form';
import FormActions from '@/components/FormActions';
import UserSelect from '@/smart/UserSelect';
import FeatureSelect from '@/smart/FeatureSelect';
import AddressSelect from '@/smart/AddressSelect';
import { requiredConstraint } from '@/utils/form';
import createOptionsFromEnum from '@/utils/enum-options';
import RadioGroupField from '@/components/Form/RadioGroupField';

const { Panel } = Collapse;

const initialState = {
  name: '',
  description: '',
  affiliateUrl: '',
  websiteUrl: '',
  logo: null,
  type: '',
  status: CompanyStatus.ACTIVE,
  features: [],
  addresses: [],
  languages: [],
  premium: false,
  manager: '',
  pricing: '',
};
type Values = typeof initialState;

interface Props {
  company?: UpdateCompanyInput | null;
  loading: boolean;

  onSave: (formState: Values, actions: FormikBag<Props, Values>) => Promise<any>;
}

const collapseStyles = css`
  background-color: transparent;
`;

const CompanySchema = Yup.object().shape({
  name: requiredConstraint().min(3),
  description: Yup.string(),
  type: requiredConstraint(),
  status: requiredConstraint(),
  affiliateUrl: Yup.string()
    .url()
    .nullable(),
  websiteUrl: Yup.string()
    .url()
    .nullable()
});

function CompanyInnerForm({ handleSubmit, initialValues }: Props & FormikProps<Values>) {
  return (
    <Form onSubmitCapture={handleSubmit} layout="vertical" initialValues={initialValues}>
      <InputField label="Company Name" name="name" required />

      <RadioGroupField label="Audience Type" name="type" required>
        {createOptionsFromEnum(AudienceType, 'RadioButton')}
      </RadioGroupField>

      <TextAreaField label="Description" placeholder="Description" name="description" rows={5} />
      <ImageField label="Logo" name="logo" square folder={UploadFolder.COMPANY} />

      <Collapse bordered={false} defaultActiveKey={[]} css={collapseStyles}>
        <Panel header={<h4 className="my-4">Offering</h4>} key="1">
          <RadioGroupField label="Service Type" name="serviceType">
            {createOptionsFromEnum(CompanyServiceType, 'RadioButton')}
          </RadioGroupField>

          <SelectField label="Languages Spoken" name="languages" mode="multiple">
            {createOptionsFromEnum(Language)}
          </SelectField>

          <FeatureSelect label="Services" name="features" />
          <TextAreaField label="Pricing" name="pricing" rows={3} />

          <SelectField label="Tags" name="tags" mode="multiple">
            {createOptionsFromEnum(CompanyTag)}
          </SelectField>
        </Panel>
        <Panel header={<h4 className="my-4">Affiliate</h4>} key="2">
          <InputField label="Affiliate Link" name="affiliateUrl" />
          <CheckboxField label="Premium Listing" name="premium" />
        </Panel>
        <Panel header={<h4 className="my-4">Contact</h4>} key="3">
          <InputField label="Website URL" name="websiteUrl" />
          <AddressSelect label="Addresses" name="addresses" />
          <UserSelect label="Manager" name="manager" />
        </Panel>
      </Collapse>

      <SelectField label="Status" name="status">
        {createOptionsFromEnum(CompanyStatus)}
      </SelectField>

      <FormActions />
    </Form>
  );
}

const CompanyForm = withFormik<Props, Values>({
  mapPropsToValues: props => ({
    ...initialState,
    ...props.company
  }),
  validationSchema: CompanySchema,
  handleSubmit: async (values, actions) => {
    try {
      await actions.props.onSave(values, actions);
    } catch (error) {
      notify('error', handleGraphQLErrors(error));
    }
  }
})(CompanyInnerForm);

export default CompanyForm;
