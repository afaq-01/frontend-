import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Context from "../../Config/Config";
import axios from "axios";
import { assets } from "../data/assets/frontend_assets/assets";

const stripePromise = loadStripe("pk_test_51RdpwIBHTJANI5hf50T1qiyjiKxZeCSH724ljYJqDwlxQQbYW59ZVceYHxG7TuBnYiQgy5xrLvnao59Hta7U7JSu007Rk3QJSb");

const Delivery = () => {
  const { lenght, price, cart_data } = useContext(Context);
  const navigate = useNavigate();

  const fee = 65;
  const sub_total = price + fee;

  const [form, setForm] = useState({
    nam: "",
    lnam: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    num: "",
    payment: "",
  });

  const productsWithDate = cart_data.map((item) => ({
    ...item,
    date: new Date().toDateString(),
  }));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const delivery_info = form;

  const handle_cash = async () => {
    try {
      const res = await axios.post(
        "https://backend-production-929c7.up.railway.app/api/placeOrder/placeOrder_add",
        { productsWithDate, delivery_info }
      );

      alert(res.data.message);
      navigate("/place-order");
    } catch (error) {
      alert(error.message);
    }
  };

 const handle_stripe = async () => {
  try {
    const stripe = await stripePromise;

    if (!stripe) {
      console.log("Stripe failed to load");
      return;
    }

    // 1. Create Stripe Checkout session only
    const response = await axios.post(
      "https://backend-production-929c7.up.railway.app/api/placeOrder/placeOrder_payment",
      { productsWithDate }
    );

    const session = response.data;

    if (!session?.id) {
      console.log("Invalid Stripe session");
      return;
    }

    // 2. Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.log(result.error.message);
    }

  } catch (error) {
    console.log(error.message);
  }
};

  const handlesub = () => {
    const f = form;

    if (!f.nam) return alert("Enter First Name");
    if (!f.lnam) return alert("Enter Last Name");
    if (!f.email) return alert("Enter Email");
    if (!f.city) return alert("Enter City");
    if (!f.state) return alert("Enter State");
    if (!f.zip) return alert("Enter Zip");
    if (!f.country) return alert("Enter Country");
    if (!f.num) return alert("Enter Phone");
    if (!f.payment) return alert("Select Payment Method");

    f.payment === "stripe" ? handle_stripe() : handle_cash();
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 pt-[18%] md:pt-[12%] lg:pt-[8%]">

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT FORM */}
        <div className="w-full lg:w-1/2 space-y-3">
          <h1 className="text-lg font-semibold">
            DELIVERY INFORMATION
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="nam" placeholder="First Name" onChange={handleChange} className="input" />
            <input name="lnam" placeholder="Last Name" onChange={handleChange} className="input" />
          </div>

          <input name="email" placeholder="Email" onChange={handleChange} className="input" />
          <input name="street" placeholder="Street" onChange={handleChange} className="input" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="city" placeholder="City" onChange={handleChange} className="input" />
            <input name="state" placeholder="State" onChange={handleChange} className="input" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="zip" placeholder="Zip Code" onChange={handleChange} className="input" />
            <input name="country" placeholder="Country" onChange={handleChange} className="input" />
          </div>

          <input name="num" placeholder="Phone" onChange={handleChange} className="input" />
        </div>

        {/* RIGHT CART */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full sm:w-[90%] lg:w-[80%] space-y-3">

            <h1 className="text-lg font-semibold text-center">
              CART TOTAL
            </h1>

            <div className="flex justify-between border-b py-2">
              <span>Total</span>
              <span>{price}</span>
            </div>

            <div className="flex justify-between border-b py-2">
              <span>Delivery Fee</span>
              <span>{fee}</span>
            </div>

            <div className="flex justify-between border-b py-2">
              <span>Subtotal</span>
              <span>{sub_total}</span>
            </div>

            <div className="flex justify-between border-b py-2">
              <span>Products</span>
              <span>{lenght}</span>
            </div>

            {/* PAYMENT */}
            <div>
              <h2 className="font-medium">Payment Method</h2>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">

                

                <label className="flex items-center gap-2 border p-2 w-full cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    onChange={handleChange}
                  />
                  <span className="text-blue-700">
                    Cash on Delivery
                  </span>
                </label>

              </div>
            </div>

            <button
              onClick={handlesub}
              className="w-full h-[40px] bg-black text-white rounded-full mt-3"
            >
              PLACE ORDER
            </button>

          </div>
        </div>

      </div>

      {/* reusable input style */}
      <style>{`
        .input {
          width: 100%;
          height: 40px;
          border: 1px solid black;
          padding: 0 10px;
          outline: none;
        }
      `}</style>

    </div>
  );
};

export default Delivery;