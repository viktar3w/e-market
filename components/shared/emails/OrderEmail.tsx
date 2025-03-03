import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { OrderState } from "@/lib/types/checkout";
import { formatPrice } from "@/lib/utils";
import { CartState } from "@/lib/types/cart";
import { useTranslation } from "@/hooks/useTranslation";
type OrderEmailProps = {
  order: OrderState;
  cart: CartState;
};
const OrderEmail = ({ order, cart }: OrderEmailProps) => {
  const $t = useTranslation();
  return (
    <Html lang="en">
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f5",
          padding: "20px",
        }}
      >
        <table
          width="100%"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#4CAF50", color: "#ffffff" }}>
              <td
                style={{
                  padding: "15px",
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                {$t("Order Confirmation")}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "20px" }}>
                <p style={{ fontSize: "18px" }}>
                  {$t("Hello, {1}", { ["1"]: cart.shippingAddress!.firstname })}
                </p>
                <p>
                  {$t("Thank you for your purchase! Your order ID is")}{" "}
                  <strong>{order.token}</strong>.
                </p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "20px" }}>
                <table
                  width="100%"
                  style={{
                    border: "1px solid #ddd",
                    borderCollapse: "collapse",
                  }}
                >
                  <tr style={{ backgroundColor: "#f9f9f9" }}>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {$t("Item")}
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {$t("Quantity")}
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {$t("Price")}
                    </th>
                  </tr>
                  {cart.cartItems.map((item) => (
                    <tr key={item.id}>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {item.name}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        {item.qty}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          textAlign: "right",
                        }}
                      >
                        {formatPrice(item.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                style={{
                  padding: "20px",
                  textAlign: "right",
                  fontSize: "18px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <strong>
                  {$t("Tax Amount: {1}", {
                    ["1"]: formatPrice(order.taxAmount),
                  })}
                </strong>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "20px",
                  textAlign: "right",
                  fontSize: "18px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <strong>
                  {$t("Shipping Amount: {1}", {
                    ["1"]: formatPrice(order.shippingAmount),
                  })}
                </strong>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "20px",
                  textAlign: "right",
                  fontSize: "18px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <strong>
                  {$t("Summary Amount: {1}", {
                    ["1"]: formatPrice(order.summaryAmount),
                  })}
                </strong>
              </td>
            </tr>
            <tr style={{ backgroundColor: "#4CAF50", color: "#ffffff" }}>
              <td
                style={{
                  padding: "15px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {$t("Thank you for shopping with us!")}
              </td>
            </tr>
          </tfoot>
        </table>
      </Body>
    </Html>
  );
};

export default OrderEmail;
