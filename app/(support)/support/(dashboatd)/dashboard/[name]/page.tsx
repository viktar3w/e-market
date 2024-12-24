import { notFound } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import CategoryPageContent from "@/components/shared/support/dashbord/category/CategoryPageContent";
import EmptyCategoryState from "@/components/shared/support/dashbord/category/EmptyCategoryState";
import DashboardWrapper from "@/components/shared/support/dashbord/DashboardWrapper";
import { db } from "@/db";

type PageProps = {
  params: {
    name?: string | string[];
  };
};

const Page = async ({ params }: PageProps) => {
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
    <DashboardWrapper
      title={`${category.emoji} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)} events`}
    >
      {hasEvents ? (
        <CategoryPageContent category={category} />
      ) : (
        <EmptyCategoryState categoryName={category.name} />
      )}
    </DashboardWrapper>
  );
};

export default Page;
