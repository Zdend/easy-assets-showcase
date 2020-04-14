import React from 'react';
import { Typography, Skeleton, Row, Col, Divider } from 'antd';
import PublicLayout from '@/components/Layout/PublicLayout';
import PostContent from '@/components/PostContent';
import useLocation from '@/hooks/useLocation';
import LatestsPosts from '@/smart/LatestPosts';
import { formatFixedDate } from '@/utils/date';
import HeroImage from '@/components/HeroImage';
import { masterColumnLayout } from '@/utils/constants';
import BackLink from '@/components/BackLink';
import { usePostQuery } from '@/graphql/queries/post.generated';
import CompanyListing from '@/smart/CompanyListing';
import { excerpt, stripSpecial } from '@/utils/string';
import useRedirectOnError from '@/hooks/useRedirectOnError';

const PublicPostPage = () => {
  const { query, origin } = useLocation();
  const { data, error, loading } = usePostQuery({ variables: { id: query.id as string } });
  useRedirectOnError(error);
  const { post } = data || {};

  return (
    <PublicLayout
      meta={{
        title: post?.title || '',
        canonical: `${origin}/blog/${post?.slug || post?.id}`,
        description: excerpt(stripSpecial(post?.content), 150, ''),
        image: post?.mainImage
      }}
    >
      <Row  justify="center" className="mb-4">
        <Col {...masterColumnLayout}>
          <BackLink link="/blog" />
          {post && (
            <>
              <HeroImage title={post.title} src={post.mainImage} className="mb-4" />
              <PostContent content={post.content} size="large" />
              <Divider />
              <div className="text-right">
                <Typography.Text type="secondary">
                  Published {formatFixedDate(post.createdAt)}
                </Typography.Text>
              </div>
              <div className="my-4" />
              {post?.features?.length ? (
                <CompanyListing
                  filter={{ FEATURES: { in: post.features.map(f => f.id) } }}
                  title={<Typography.Title level={3}>Suggested Companies</Typography.Title>}
                  limit={5}
                />
              ) : null}
              <div className="my-4" />
              <LatestsPosts idsExclude={[post.id]} />
            </>
          )}
          {loading && <Skeleton active={loading} />}
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default PublicPostPage;
