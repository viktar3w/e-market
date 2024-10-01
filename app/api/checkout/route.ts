import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getCart } from "@/actions/cartAction";
import {
  CheckoutDeliveryValidation,
  CheckoutPersonalDataValidation,
} from "@/lib/validations/checkout";
import { ShippingAddress } from "@prisma/client";
import { sanitize } from "dompurify";

const PATCH = async (req: NextRequest) => {
  const cart = await getCart();
  const personalData = CheckoutPersonalDataValidation.parse(await req.json());
  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      firstname: sanitize(personalData.firstname),
      lastname: sanitize(personalData.lastname),
      email: sanitize(personalData.email),
      phone: sanitize(personalData.phone),
    },
  });
  return NextResponse.json({
    success: true,
  });
};

const PUT = async (req: NextRequest) => {
  const cart = await getCart();
  const shippingAddressData = CheckoutDeliveryValidation.parse(
    await req.json(),
  );
  let shippingAddress: ShippingAddress;
  const preparedData = {
    firstname: sanitize(shippingAddressData.firstname),
    lastname: sanitize(shippingAddressData.lastname),
    email: sanitize(shippingAddressData.email),
    phone: sanitize(shippingAddressData.phone),
    state: sanitize(shippingAddressData.state),
    street: sanitize(shippingAddressData.street),
    country: sanitize(shippingAddressData.country),
    city: sanitize(shippingAddressData.city),
    postcode: sanitize(shippingAddressData.postcode),
  };
  if (!cart?.shippingAddressId) {
    shippingAddress = await db.shippingAddress.create({
      data: {
        ...preparedData,
      },
    });
    await db.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        shippingAddress: {
          connect: {
            id: shippingAddress.id,
          },
        },
      },
    });
  } else {
    await db.shippingAddress.update({
      where: {
        id: cart.shippingAddressId,
      },
      data: {
        ...preparedData,
      },
    });
  }
  return NextResponse.json({
    success: true,
  });
};

export { PATCH, PUT };
