import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cartItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setisValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setisValidCouponCode(true);
      else setisValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      setisValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => <CartItem key={idx} cartItem={item} />)
        ) : (
          <h1>Cart is Empty</h1>
        )}
      </main>
      <aside>
        <p>Subtotal : Rs {subtotal}</p>
        <p>Shipping Charges : Rs {shippingCharges}</p>
        <p>Tax: Rs {tax}</p>
        <p>
          Discount: <em className="red">- Rs {discount}</em>
        </p>
        <p>
          <b>Total: Rs {total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          placeholder="Coupon Code"
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              Rs {discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
