import React from 'react';
import Page from '~/components/theme/Page';
import ReadMdFile from '~/components/theme/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function ChangelogView() {
  return (
    <Page title="Changelog">
      <ReadMdFile content={content} />
    </Page>
  );
}
