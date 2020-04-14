import React from 'react';
import { Typography, Skeleton, Divider } from 'antd';
import PostContent from '@/components/PostContent';
import useLocation from '@/hooks/useLocation';
import LatestsPosts from '@/smart/LatestPosts';
import { useFeatureQuery } from '@/graphql/queries/feature.generated';
import CompanyListing from '@/smart/CompanyListing';
import { excerpt, stripSpecial } from '@/utils/string';
import PublicSimpleContentLayout from '@/components/Layout/PublicSimpleContentLayout';

const PublicServicePage = () => {
  const { query } = useLocation();
  const { data, loading } = useFeatureQuery({ variables: { id: query.id as string } });
  const { feature } = data || {};

  return (
    <PublicSimpleContentLayout
      meta={{
        title: `Find the right financial expert to manage your ${feature?.name || ''}`,
        description: excerpt(stripSpecial(feature?.description), 150, '')
      }}
      title={feature?.name}
    >
      {feature && (
        <>
          {feature.description && <PostContent content={feature.description} />}

          <Divider className="mb-16" />

          <CompanyListing
            filter={{ FEATURES: { in: [feature.id] } }}
            title={<Typography.Title level={3}>More Experts on {feature.name}</Typography.Title>}
            limit={5}
          />

          <div className="my-16" />
          <LatestsPosts
            featuresInclude={[feature.id]}
            title={
              <Typography.Title level={3}>Articles related to {feature.name}</Typography.Title>
            }
          />
        </>
      )}
      {loading && <Skeleton active={loading} />}
    </PublicSimpleContentLayout>
  );
};

export default PublicServicePage;
