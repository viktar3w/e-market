import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ASTNode, stripIgnoredCharacters } from 'graphql';

export const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
  useGETForQueries: true,
  print(ast: ASTNode, originalPrint: (ast: ASTNode) => string) {
    const query = originalPrint(ast);
    return stripIgnoredCharacters(query);
  },
  fetchOptions: {
    credentials: 'include',
  },
  fetch: async (uri, options) => {
    if (!!options && options.method === 'GET') {
      const headers = Object.keys(options?.headers || {}).reduce(
        (result, currentValue) => {
          if (currentValue === 'content-type') {
            return result;
          } else if (currentValue === 'accept') {
            result['accept'] = 'application/json';
          } else {
            // @ts-ignore
            result[currentValue] = options.headers[currentValue];
          }
          return result;
        },
        {} as Record<string, string>,
      );
      const encode = (str: string) => str.replace(/\(/g, '%28').replace(/\)/g, '%29');
      return fetch(encode(uri as string), {
        ...options,
        headers,
      });
    }
    return fetch(uri, options);
  },
});

const apolloClientSingleton = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
};

declare global {
  var apolloGlobal: undefined | ReturnType<typeof apolloClientSingleton>;
}

export const client = globalThis.apolloGlobal ?? apolloClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.apolloGlobal = client;
