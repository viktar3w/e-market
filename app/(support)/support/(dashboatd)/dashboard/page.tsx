import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";

import DashboardPageContent from "@/components/shared/support/dashbord/DashboardPageContent";
import DashboardWrapper from "@/components/shared/support/dashbord/DashboardWrapper";
import CreateEventCategoryModal from "@/components/shared/support/modal/CreateEventCategoryModal";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

const Page = async () => {
  const auth = await currentUser();
  if (!auth) {
    redirect("/support");
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
    redirect("/support/welcome");
  }
  return (
    <DashboardWrapper
      cta={
        <CreateEventCategoryModal>
          <Button className="w-full sm:w-fit">
            <PlusIcon className="size-4 mr-2" /> Add Category
          </Button>
        </CreateEventCategoryModal>
      }
      title="Dashboard"
    >
      <DashboardPageContent />
    </DashboardWrapper>
  );
};

export default Page;
