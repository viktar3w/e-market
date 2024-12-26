import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';

import DashboardWrapper from '@/components/shared/support/dashbord/DashboardWrapper';
import UpgradePageContent from '@/components/shared/support/upgrade/UpgradePageContent';
import { db } from '@/db';

const Page = async () => {
  const auth = await currentUser();
  if (!auth) {
    redirect('/support');
  }
  const user = await db.user.findUnique({
    where: {
      id: auth?.id,
    },
    include: {
      support: true,
    },
  });
  if (!user || !user?.support) {
    redirect('/support/welcome');
  }

  return (
    <DashboardWrapper title="Pro Membership">
      <UpgradePageContent plan={user.support.plan} />
    </DashboardWrapper>
  );
};

export default Page;
