# rehype-mdx-auto-import
A rehype plugin to implicitly import variables in MDX file

## Installation
```bash
# If you are using yarn
yarn add @sup39/rehype-mdx-auto-import

# If you are using npm
npm install @sup39/rehype-mdx-auto-import
```

## Example
In next.config.mjs:
```javascript
import mdx from '@next/mdx';
import AutoImport from '@sup39/rehype-mdx-auto-import';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      [AutoImport,
        // import {T, S, C as Code} from '@sup39/mdx-components';
        {
          import: ['T', 'S', {import: 'C', as: 'Code'}],
          from: '@sup39/mdx-components',
        },
        // import * as React from 'react';
        {
          namespace: 'React',
          from: 'react',
        },
        // import React2 from 'react';
        {
          default: 'React2',
          from: 'react',
        },
        // import React3, {useState} from 'react';
        {
          default: 'React3',
          import: ['useState'],
          from: 'react',
        },
      ],
    ],
  },
});
export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});
```
