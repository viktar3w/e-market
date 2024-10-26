"use client";
import { Order } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type CheckoutSuccessProps = {
  order: Order;
};
const CheckoutSuccess = ({ order }: CheckoutSuccessProps) => {
  const { push } = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-base-semibold mb-3">
            Order Successful!
          </h1>
          <p className="text-center text-gray-500 mb-4">
            Thank you for your purchase! Your order has been placed
            successfully.
          </p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Order Summary:</h2>
            <ul className="list-disc list-inside my-2 text-gray-700">
              <li>
                Order Number: <span className="font-medium">{order.token}</span>
              </li>
              <li>
                Total Amount: <span className="font-medium">$99.99</span>
              </li>
              <li>
                Shipping Address:{" "}
                <span className="font-medium">
                  123 Example St, City, Country
                </span>
              </li>
            </ul>
          </div>
          <Button
            onClick={() => push("/")}
            className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
