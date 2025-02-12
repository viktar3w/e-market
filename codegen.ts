import { config as loadEnv } from 'dotenv';

import type { CodegenConfig } from '@graphql-codegen/cli';
loadEnv();

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
  documents: 'documents/graphql/**/*.graphql',
  generates: {
    'documents/generates/hooks/apollo.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
