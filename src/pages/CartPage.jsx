import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

function CartPage() {
  const { cart, removeFromCart, clearCart } =
    useContext(CartContext);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [sessionMessage, setSessionMessage] = useState("");

  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, course) => acc + course.precio,
    0
  );

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const processPurchase = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setSessionMessage(
        "Your session has expired. Please log in again."
      );

      clearCart();

      return navigate("/login");
    }

    const courses = cart.map((course) => course._id);

    try {
      const response = await fetch(
        `${API_URL}/api/orders/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courses,
            total,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error processing purchase");
      }

      setSuccess(true);

      clearCart();

      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      console.error("Error processing purchase:", err);

      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Shopping Cart
        </h1>

        {/* Alerts */}
        {sessionMessage && (
          <div className="mb-4 rounded-lg bg-yellow-100 p-4 text-center text-yellow-700">
            {sessionMessage}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-4 text-center text-green-700">
            Purchase completed successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-center text-red-700">
            Error processing purchase.
          </div>
        )}

        {/* Empty Cart */}
        {cart.length === 0 && !success ? (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <p className="mb-4 text-gray-600">
              Your cart is empty.
            </p>

            <button
              onClick={() => navigate("/")}
              className="rounded-lg bg-black px-5 py-2 text-white transition hover:opacity-90"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cart.map((course) => (
                <div
                  key={course._id}
                  className="overflow-hidden rounded-xl bg-white shadow"
                >
                  <img
                    src={
                      course.imagenPortada ||
                      "https://via.placeholder.com/600x400"
                    }
                    alt={course.titulo}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {course.titulo}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      {course.descripcion}
                    </p>

                    <p className="mt-4 text-lg font-bold text-gray-900">
                      {formatPrice(course.precio)}
                    </p>

                    <button
                      onClick={() =>
                        removeFromCart(course._id)
                      }
                      className="mt-4 w-full rounded-lg border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {!success && (
              <div className="mt-10 rounded-xl bg-white p-6 text-center shadow">
                <h2 className="text-2xl font-bold text-gray-800">
                  Total: {formatPrice(total)}
                </h2>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <button
                    onClick={clearCart}
                    className="rounded-lg border border-gray-400 px-6 py-2 text-gray-700 transition hover:bg-gray-200"
                  >
                    Clear Cart
                  </button>

                  <button
                    onClick={processPurchase}
                    className="rounded-lg bg-black px-6 py-2 text-white transition hover:opacity-90"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;