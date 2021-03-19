import React from 'react';
import Page from '~/components/theme/Page';
import ReadMdFile from '~/components/theme/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function FormHelperView() {
  return (
    <Page title="Form Helper">
      <ReadMdFile content={content} />
    </Page>
  );
}
