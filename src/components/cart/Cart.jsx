import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext.jsx";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  // ========================================
  // Total Price
  // ========================================

  const total = cart.reduce(
    (acc, course) => acc + course.precio,
    0
  );

  // ========================================
  // Format Currency
  // ========================================

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // ========================================
  // Empty Cart
  // ========================================

  if (cart.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <div className="mb-6 text-7xl">
            🛒
          </div>

          <h1 className="text-4xl font-black text-white">
            Tu carrito está vacío
          </h1>

          <p className="mt-4 text-zinc-400">
            Explora nuestros cursos y empieza
            a aprender nuevas habilidades.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Explorar cursos
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-black">
            Mi carrito
          </h1>

          <p className="mt-2 text-zinc-400">
            Revisa tus cursos antes de finalizar
            la compra.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          
          {/* Courses */}

          <div className="space-y-5">
            {cart.map((course) => (
              <article
                key={course._id}
                className="flex flex-col gap-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 md:flex-row"
              >
                {/* Image */}

                <img
                  src={
                    course.imagenPortada ||
                    "https://via.placeholder.com/400x250?text=Curso"
                  }
                  alt={course.titulo}
                  className="h-44 w-full rounded-2xl object-cover md:w-72"
                />

                {/* Info */}

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {course.titulo}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-zinc-400">
                      {course.descripcion}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <span className="text-2xl font-black">
                      {formatPrice(course.precio)}
                    </span>

                    <button
                      onClick={() =>
                        removeFromCart(course._id)
                      }
                      className="rounded-xl border border-red-500 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Summary */}

          <aside className="h-fit rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              Resumen
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Cursos</span>

                <span>
                  {cart.length}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800 pt-4 text-xl font-black">
                <span>Total</span>

                <span>
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button className="mt-8 w-full rounded-2xl bg-white px-6 py-4 text-lg font-bold text-black transition hover:scale-[1.02]">
              Finalizar compra
            </button>

            <button
              onClick={clearCart}
              className="mt-4 w-full rounded-2xl border border-zinc-700 px-6 py-4 font-semibold transition hover:bg-zinc-800"
            >
              Vaciar carrito
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;