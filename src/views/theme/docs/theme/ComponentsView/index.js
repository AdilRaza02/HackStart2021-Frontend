import React from 'react';
import Page from '~/components/theme/Page';
import ReadMdFile from '~/components/theme/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function ComponentsView() {
  return (
    <Page title="Components">
      <ReadMdFile content={content} />
    </Page>
  );
}
