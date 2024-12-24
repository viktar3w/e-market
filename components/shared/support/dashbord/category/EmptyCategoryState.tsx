'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Card from '@/components/shared/common/Card';
import { usePollCategoryQuery } from '@/lib/redux/api/support.api';
import { cn } from '@/lib/utils';

type EmptyCategoryStateProps = {
  categoryName: string;
  className?: string;
};

const EmptyCategoryState = ({ categoryName, className }: EmptyCategoryStateProps) => {
  const { refresh } = useRouter();
  const { data } = usePollCategoryQuery(
    { name: categoryName },
    {
      pollingInterval: 3000,
    },
  );
  useEffect(() => {
    !!data?.success && refresh();
  }, [data?.success, refresh]);
  const codeSnippet = `await fetch('${process.env.NEXT_PUBLIC_SERVER_URL}/api/support/v1/[messenger_type]/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: "user_id: 1234"
      field2: 'value2' // for example: "email: 'email@test.com'"
    }
  })
})`;
  return (
    <Card
      contentClassName="max-w-2xl w-full flex flex-col items-center p-6"
      className={cn('flex-1 flex items-center justify-center', className)}
    >
      <h2 className="text-xl/8 font-medium text-center tracking-tight text-gray-950">
        {' '}
        Create your first {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} event
      </h2>
      <p className="text-sm/6 text-gray-600 mb-8 max-w-md text-center text-pretty">
        Get started by sending a request to our tracking API:
      </p>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-2 ">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-400 text-sm ">your-first-event.js</span>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={atomDark}
          customStyle={{
            borderRadius: '0',
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>
      <div className="mt-8 flex flex-col items-center space-x-2">
        <div className="flex gap-2 items-center">
          <div className="size-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Listening to incoming events...</span>
        </div>

        <p className="text-sm/6 text-gray-600 mt-2">
          Need help? Check out our{' '}
          <a href="#" className="text-blue-600 hover:underline">
            documentation
          </a>{' '}
          or{' '}
          <a href="#" className="text-blue-600 hover:underline">
            contact us
          </a>
        </p>
      </div>
    </Card>
  );
};

export default EmptyCategoryState;
