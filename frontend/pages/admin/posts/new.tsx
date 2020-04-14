import * as React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { useRouter } from 'next/router';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import withAuth from '@/hoc/withAuth';
import PostForm from '@/smart/PostForm';
import { notify } from '@/utils/notification';
import { deleteCache } from '@/utils/apollo';
import {
  CreatePostMutationFn,
  useCreatePostMutation
} from '@/graphql/mutations/createPost.generated';

const handleSave = (createPost: CreatePostMutationFn, router) => async (values, actions) => {
  const { data } = await createPost({
    variables: { input: values },
    update: deleteCache('posts')
  });
  actions.resetForm();
  notify('success', `Post ${values.title} has been created!`);
  await router.push('/admin/posts/[id]', `/admin/posts/${data.createPost.id}`);
};

const CreatePostPage = () => {
  const router = useRouter();
  const [createPost, { loading }] = useCreatePostMutation();
  const onSave = handleSave(createPost, router);

  return (
    <PrivateLayout title="New Post">
      <PageHeader onBack={() => router.push('/admin/posts')} title="New Post" />
      <PostForm loading={loading} onSave={onSave} />
    </PrivateLayout>
  );
};

export default withAuth(CreatePostPage);
