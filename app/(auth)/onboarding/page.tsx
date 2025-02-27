import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, permanentRedirect } from "next/navigation";
import { db } from "@/db";
import Onboarding from "@/components/shared/customers/Onboarding";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return notFound();
  }
  const userAuth = await currentUser();
  if (!userAuth) {
    return notFound();
  }
  const user = await db.user.findUnique({
    where: {
      id: userAuth.id,
    },
  });
  if (user) {
    permanentRedirect("/");
  }
  return (
    <Onboarding
      id={userAuth.id}
      firstname={userAuth.firstName}
      lastname={userAuth.lastName}
      image={userAuth.imageUrl}
      email={userAuth.emailAddresses?.[0]?.emailAddress}
    />
  );
};

export default Page;
