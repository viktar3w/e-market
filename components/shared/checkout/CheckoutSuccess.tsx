"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle, Home } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { OrderState } from "@/lib/types/checkout";

type CheckoutSuccessProps = {
  order: OrderState;
};
const CheckoutSuccess = ({ order }: CheckoutSuccessProps) => {
  const { push } = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold mt-4">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mt-2">
            Your order has been successfully placed.
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-medium">Order Summary</h2>
          <p className="text-gray-600 mb-4">Order ID: {order.token}</p>
          <div className="border-t border-gray-200 mt-4">
            {order.cart.cartItems.map((item) => (
              <div
                key={item.id}
                className="py-4 flex justify-between text-gray-800"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${item.totalAmount.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-medium text-gray-900">
            <span>Tax Amount</span>
            <span>{formatPrice(order.taxAmount)}</span>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-medium text-gray-900">
            <span>Shipping Amount</span>
            <span>{formatPrice(order.shippingAmount)}</span>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-medium text-gray-900">
            <span>Summary Amount</span>
            <span>{formatPrice(order.summaryAmount)}</span>
          </div>
        </div>
        <Button
          onClick={() => push("/")}
          className="w-full text-base text-white py-2 rounded-md mt-4 hover:text-base-700 transition"
        >
          <Home className="w-5 h-5 mr-2" />
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
