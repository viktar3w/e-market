import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import DashboardWrapper from "@/components/shared/support/dashbord/DashboardWrapper";
import DashboardPageContent from "@/components/shared/support/dashbord/DashboardPageContent";
import CreateEventCategoryModal from "@/components/shared/support/modal/CreateEventCategoryModal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
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
          <Button>
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
