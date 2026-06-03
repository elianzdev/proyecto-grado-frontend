import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext.jsx";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/40">
      
      {/* Image */}

      <div className="relative h-52 overflow-hidden">
        <img
          src={
            course.imagenPortada ||
            "https://via.placeholder.com/600x400?text=Curso"
          }
          alt={course.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}

      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-xl font-bold text-white">
            {course.titulo}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
            {course.descripcion}
          </p>
        </div>

        {/* Course Info */}

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
            {course.nivel}
          </span>

          <span className="text-lg font-black text-white">
            {formatPrice(course.precio)}
          </span>
        </div>

        {/* Buttons */}

        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate(`/course/${course._id}`)
            }
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Ver curso
          </button>

          <button
            onClick={() => addToCart(course)}
            className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-zinc-200"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;