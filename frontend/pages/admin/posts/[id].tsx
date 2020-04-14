import React, { useEffect } from 'react';
import { Skeleton, PageHeader, Tooltip } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import PostForm from '@/smart/PostForm';
import { notify } from '@/utils/notification';
import { PostDocument, PostQuery, usePostQuery } from '@/graphql/queries/post.generated';
import { useUpdatePostMutation } from '@/graphql/mutations/updatePost.generated';
import { getPostLinkOptions } from '@/utils/post';

const handleSave = (createPost, id) => async (values) => {
  await createPost({
    variables: { input: { ...values, id } },
    refetchQueries: [
      {
        query: PostDocument,
        variables: { id }
      }
    ],
  });
  notify('success', `Post ${values.title} has been saved!`);
};

const getPostFormState = (post: PostQuery['post']) => {
  return post
    ? {
        id: post.id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        mainImage: post.mainImage,

        published: post.published,
        publishedAt: post.publishedAt,
        features: (post.features || []).map(f => f.id)
      }
    : null;
};

const EditPostPage = () => {
  const router = useRouter();
  const id = router && (router.query.id as string);
  const { data, loading } = usePostQuery({ variables: { id }, skip: !id });
  const [createPost, { loading: saving }] = useUpdatePostMutation();
  const onSave = handleSave(createPost, id);
  const post = data?.post;

  return (
    <PrivateLayout title="Edit Post">
      <PageHeader
        onBack={() => router.push('/admin/posts')}
        title="Edit Post"
        subTitle={
          <Link {...getPostLinkOptions(post)}>
            <a target="_blank">
              <Tooltip placement="top" title="Open Live Page">
                <LinkOutlined />
              </Tooltip>
            </a>
          </Link>
        }
      />

      {data && data.post && (
        <PostForm post={getPostFormState(data.post)} onSave={onSave} loading={saving} />
      )}
      {loading && <Skeleton active />}
    </PrivateLayout>
  );
};

export default withAuth(EditPostPage);
