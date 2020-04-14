import * as React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { useRouter, NextRouter } from 'next/router';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import FeatureForm from '@/smart/FeatureForm';
import { notify } from '@/utils/notification';
import { deleteCache } from '@/utils/apollo';
import { masterColumnLayout } from '@/utils/constants';
import {
  CreateFeatureMutationFn,
  useCreateFeatureMutation
} from '@/graphql/mutations/createFeature.generated';

const handleSave = (createFeature: CreateFeatureMutationFn, router: NextRouter) => async (
  { name, description, type, tags },
  actions
) => {
  const { data } = await createFeature({
    variables: { input: { name, description, type, tags } },
    update: deleteCache('features')
  });
  actions.resetForm();
  notify('success', `Service ${name} has been created!`);
  await router.push('/admin/services/[id]', `/admin/services/${data.createFeature.id}`);
};

const CreateFeaturePage = () => {
  const router = useRouter();
  const [createFeature, { loading }] = useCreateFeatureMutation();
  const onSave = handleSave(createFeature, router);

  return (
    <PrivateLayout title="New Feature">
      <PageHeader onBack={() => router.push('/admin/services')} title="New Service" />
      <Row>
        <Col {...masterColumnLayout}>
          <FeatureForm loading={loading} onSave={onSave} />
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(CreateFeaturePage);
