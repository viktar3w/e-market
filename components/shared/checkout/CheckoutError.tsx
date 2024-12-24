"use client";
import { useRouter } from "next/navigation";

import { AlertTriangle, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrderState } from "@/lib/types/checkout";

type CheckoutErrorProps = {
  order: OrderState;
};
const CheckoutError = ({ order }: CheckoutErrorProps) => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center pt-10 px-6">
      <div className="text-center">
        <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Unable to complete your order
          </h2>
          <p className="text-gray-600 mb-6">
            Connect with us for getting more details. Your order id:{" "}
            {order.token}
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={() => push("/")}
          className="flex items-center px-4 py-2text-base text-white rounded-lg shadow hover:text-base-700"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default CheckoutError;
