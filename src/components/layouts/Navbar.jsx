import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../../context/CartContext.jsx";

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-white"
        >
          Emprendix
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Inicio
          </Link>

          {role === "admin" ? (
            <Link
              to="/admin"
              className="text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              Administración
            </Link>
          ) : (
            <>
              <Link
                to="/my-courses"
                className="text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                Mis Cursos
              </Link>

              <Link
                to="/cart"
                className="relative text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                🛒

                {cart.length > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-105 hover:bg-zinc-200"
          >
            Cerrar sesión
          </button>
        </nav>

        {/* Mobile Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
          <nav className="flex flex-col gap-4 px-6 py-4">
            <Link
              to="/"
              className="text-zinc-300 transition hover:text-white"
            >
              Inicio
            </Link>

            {role === "admin" ? (
              <Link
                to="/admin"
                className="text-zinc-300 transition hover:text-white"
              >
                Administración
              </Link>
            ) : (
              <>
                <Link
                  to="/my-courses"
                  className="text-zinc-300 transition hover:text-white"
                >
                  Mis Cursos
                </Link>

                <Link
                  to="/cart"
                  className="text-zinc-300 transition hover:text-white"
                >
                  Carrito ({cart.length})
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="rounded-xl bg-white px-4 py-2 font-semibold text-black"
            >
              Cerrar sesión
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;