import React from 'react';
import { Row, Col, Skeleton, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import FeatureForm from '@/smart/FeatureForm';
import { notify } from '@/utils/notification';
import { masterColumnLayout } from '@/utils/constants';
import { FeatureDocument, useFeatureQuery } from '@/graphql/queries/feature.generated';
import { useUpdateFeatureMutation } from '@/graphql/mutations/updateFeature.generated';

const handleSave = (updateFeature, id) => async ({ name, description, type, tags }) => {
  await updateFeature({
    variables: { input: { name, description, type, id, tags } },
    refetchQueries: [
      {
        query: FeatureDocument,
        variables: { id }
      }
    ]
  });
  notify('success', `Service ${name} has been saved!`);
};

const EditFeaturePage = () => {
  const router = useRouter();
  const id = router && (router.query.id as string);
  const { data, loading } = useFeatureQuery({ variables: { id }, skip: !id });
  const [createFeature, { loading: saving }] = useUpdateFeatureMutation();
  const onSave = handleSave(createFeature, id);

  return (
    <PrivateLayout title="Edit Service">
      <PageHeader onBack={() => router.push('/admin/services')} title="Edit Service" />
      <Row>
        <Col {...masterColumnLayout}>
          {data?.feature && <FeatureForm feature={data.feature} onSave={onSave} loading={saving} />}
          {loading && <Skeleton active />}
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(EditFeaturePage);
