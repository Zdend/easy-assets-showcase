import * as React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import CompanyForm from '@/smart/CompanyForm';
import { notify } from '@/utils/notification';
import { deleteCache } from '@/utils/apollo';
import { masterColumnLayout } from '@/utils/constants';
import {
  CreateCompanyMutationFn,
  useCreateCompanyMutation
} from '@/graphql/mutations/createCompany.generated';

const handleSave = (createCompany: CreateCompanyMutationFn, router) => async (values, actions) => {
  const { data } = await createCompany({
    variables: { input: values },
    update: deleteCache('companies')
  });
  actions.resetForm();
  notify('success', `Company ${values.name} has been created!`);
  await router.push('/admin/companies/[id]', `/admin/companies/${data.createCompany.id}`);
};

const CreateCompanyPage = () => {
  const router = useRouter();
  const [createCompany, { loading }] = useCreateCompanyMutation();
  const onSave = handleSave(createCompany, router);

  return (
    <PrivateLayout title="New Company">
      <PageHeader onBack={() => router.push('/admin/companies')} title="New Company" />
      <Row>
        <Col {...masterColumnLayout}>
          <CompanyForm loading={loading} onSave={onSave} />
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(CreateCompanyPage);
