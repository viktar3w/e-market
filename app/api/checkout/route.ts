import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getCart } from "@/actions/cartAction";
import {
  CheckoutDeliveryValidation,
  CheckoutPersonalDataValidation,
} from "@/lib/validations/checkout";
import { ShippingAddress } from "@prisma/client";
import DOMPurify from "isomorphic-dompurify";

const PATCH = async (req: NextRequest) => {
  const cart = await getCart();
  const personalData = CheckoutPersonalDataValidation.parse(await req.json());
  await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      firstname: DOMPurify.sanitize(personalData.firstname),
      lastname: DOMPurify.sanitize(personalData.lastname),
      email: DOMPurify.sanitize(personalData.email),
      phone: DOMPurify.sanitize(personalData.phone),
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
    firstname: DOMPurify.sanitize(shippingAddressData.firstname),
    lastname: DOMPurify.sanitize(shippingAddressData.lastname),
    email: DOMPurify.sanitize(shippingAddressData.email),
    phone: DOMPurify.sanitize(shippingAddressData.phone),
    state: DOMPurify.sanitize(shippingAddressData.state),
    street: DOMPurify.sanitize(shippingAddressData.street),
    country: DOMPurify.sanitize(shippingAddressData.country),
    city: DOMPurify.sanitize(shippingAddressData.city),
    postcode: DOMPurify.sanitize(shippingAddressData.postcode),
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
