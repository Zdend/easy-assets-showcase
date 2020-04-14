import React from 'react';
import PublicLayout from '@/components/Layout/PublicLayout';
import ColourSection from '@/components/StyleGuide/ColourSection';

function StyleGuideIndexPage() {
  return (
    <PublicLayout meta={{ title: 'Style Guide' }}>
      <ColourSection />
    </PublicLayout>
  );
}

export default StyleGuideIndexPage;
