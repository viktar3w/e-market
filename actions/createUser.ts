"use server";

import { db } from "@/db";
import { User } from "@prisma/client";

export const createUser = async ({ id, email, fullname, image }: User) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    return await db.user.create({
      data: {
        id: id,
        email: email,
        fullname: fullname,
        image: image,
      },
    });
  } catch (err: any) {
    console.log("[ERROR] createUser: ", err);
    return null;
  }
};
