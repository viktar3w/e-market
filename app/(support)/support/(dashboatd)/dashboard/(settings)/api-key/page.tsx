import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import DashboardWrapper from '@/components/shared/support/dashbord/DashboardWrapper';
import { ApiKeySettings } from '@/components/shared/support/dashbord/settings/ApiKeyAettings';
import { db } from '@/db';
const Page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: { id: auth.id },
    include: {
      support: true,
    },
  });

  if (!user?.support) {
    redirect('/support/dushboard');
  }

  return (
    <DashboardWrapper title="API Key">
      <ApiKeySettings apiKey={user.support.apiKey ?? ''} />
    </DashboardWrapper>
  );
};

export default Page;
