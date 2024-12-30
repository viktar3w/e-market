import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs/server';
import { SocialType } from '@prisma/client';

import DashboardWrapper from '@/components/shared/support/dashbord/DashboardWrapper';
import { AccountSettings } from '@/components/shared/support/dashbord/settings/SetttingsPageContent';
import { db } from '@/db';

const Page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/support/dashboard');
  }
  const user = await db.user.findUnique({
    where: { id: auth.id },
    include: {
      support: {
        include: {
          socials: true,
        },
      },
    },
  });
  if (!user?.support) {
    redirect('/support/dashboard');
  }
  const telegramId = (user.support?.socials || []).find((s) => s.type === SocialType.TELEGRAM)?.authKey || '';
  return (
    <DashboardWrapper title="Account Settings">
      <AccountSettings telegramId={telegramId} />
    </DashboardWrapper>
  );
};

export default Page;
