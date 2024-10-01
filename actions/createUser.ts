"use server";

import { db } from "@/db";
import { User } from "@prisma/client";
import { sanitize } from "dompurify";

export const createUser = async ({
  id,
  email,
  firstname,
  lastname,
  image,
}: User) => {
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
        email: sanitize(email),
        firstname: sanitize(firstname),
        lastname: sanitize(lastname),
        image: sanitize(image || ""),
      },
    });
  } catch (err: any) {
    console.log("[ERROR] createUser: ", err);
    return null;
  }
};
