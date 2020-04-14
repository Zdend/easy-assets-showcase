import React from 'react';
import { Row, Col, Skeleton, PageHeader, Tooltip } from 'antd';
import { LinkOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';
import Link from 'next/link';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import { notify } from '@/utils/notification';
import CompanyForm from '@/smart/CompanyForm';
import { masterColumnLayout } from '@/utils/constants';
import { getCompanyLinkOptions } from '@/utils/company';
import {
  CompanyDocument,
  useCompanyQuery,
  CompanyQuery
} from '@/graphql/queries/company.generated';
import { useUpdateCompanyMutation } from '@/graphql/mutations/updateCompany.generated';

const handleSave = (updateCompany, id) => async values => {
  await updateCompany({
    variables: { input: { ...values, id } },
    refetchQueries: [
      {
        query: CompanyDocument,
        variables: { id }
      }
    ]
  });
  notify('success', `Company ${values.name} has been saved!`);
};

const getCompanyFormState = (company: CompanyQuery['company']) => {
  return company
    ? {
        id: company.id,
        name: company.name,
        description: company.description,
        logo: company.logo,
        affiliateUrl: company.affiliateUrl,
        websiteUrl: company.websiteUrl,
        premium: company.premium,

        type: company.type,
        status: company.status,
        serviceType: company.serviceType,
        features: (company.features || []).map(f => f.id),
        addresses: (company.addresses || []).map(a => a.id),
        languages: company.languages,
        manager: company.manager?.id,
        pricing: company.pricing,
        tags: company.tags,
      }
    : null;
};

const EditCompanyPage = () => {
  const router = useRouter();
  const id = router && (router.query.id as string);
  const { data, loading } = useCompanyQuery({ variables: { id }, skip: !id });
  const [updateCompany, { loading: saving }] = useUpdateCompanyMutation();
  const onSave = handleSave(updateCompany, id);
  const company = data?.company;

  const updateCompanyInput = getCompanyFormState(company);

  return (
    <PrivateLayout title="Edit Company">
      <PageHeader
        onBack={() => router.push('/admin/companies')}
        title="Edit Company"
        subTitle={
          <Link {...getCompanyLinkOptions(company)}>
            <a target="_blank">
              <Tooltip placement="top" title="Open Live Page">
                <LinkOutlined />
              </Tooltip>
            </a>
          </Link>
        }
      />
      <Row>
        <Col {...masterColumnLayout}>
          {updateCompanyInput && (
            <CompanyForm company={updateCompanyInput} onSave={onSave} loading={saving} />
          )}
          {loading && <Skeleton active />}
        </Col>
      </Row>
    </PrivateLayout>
  );
};

export default withAuth(EditCompanyPage);
