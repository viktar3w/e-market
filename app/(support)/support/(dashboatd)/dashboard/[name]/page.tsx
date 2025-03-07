import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/db";
import DashboardWrapper from "@/components/shared/support/dashbord/DashboardWrapper";
import CategoryPageContent from "@/components/shared/support/dashbord/category/CategoryPageContent";

type PageProps = {
  params: Promise<{
    name?: string | string[];
  }>;
};

const Page = async (props: PageProps) => {
  const params = await props.params;
  if (typeof params?.name !== "string") {
    return notFound();
  }
  const authUser = await currentUser();
  if (!authUser?.id) {
    return notFound();
  }
  const user = await db.user.findUnique({
    where: {
      id: authUser.id!,
    },
    include: {
      support: true,
    },
  });
  if (!user || !user?.support) {
    return notFound();
  }
  const category = await db.eventCategory.findUnique({
    where: {
      supportId_name: {
        supportId: user?.support.id,
        name: params.name,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  });
  if (!category) {
    return notFound();
  }
  const hasEvents = category._count.events > 0;
  return (
    <DashboardWrapper title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardWrapper>
  );
};

export default Page;
