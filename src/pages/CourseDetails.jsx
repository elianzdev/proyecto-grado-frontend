import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";

const CourseDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ========================================
  // Format Price
  // ========================================

  const formatPrice = (value) => {
    return new Intl.NumberFormat(
      "es-CO",
      {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }
    ).format(value);
  };

  // ========================================
  // Fetch Course
  // ========================================

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const response =
          await api.get(`/courses/${id}`);

        setCourse(response.data);
      } catch (err) {
        console.error(err);

        setError(
          "No se pudo cargar el curso."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ========================================
  // Loading State
  // ========================================

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
      </section>
    );
  }

  // ========================================
  // Error State
  // ========================================

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
        <div className="max-w-md rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center text-white">
          <h1 className="text-3xl font-black">
            Error
          </h1>

          <p className="mt-4 text-red-200">
            {error}
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Volver al inicio
          </button>
        </div>
      </section>
    );
  }

  // ========================================
  // Course Not Found
  // ========================================

  if (!course) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black">
            Curso no encontrado
          </h1>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-black"
          >
            Volver
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_420px]">
        
        {/* Left Side */}

        <section>
          {/* Course Image */}

          <img
            src={
              course.imagenPortada ||
              "https://via.placeholder.com/1200x700?text=Curso"
            }
            alt={course.titulo}
            className="h-[450px] w-full rounded-3xl object-cover"
          />

          {/* Content */}

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                {course.categoria}
              </span>

              <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                {course.nivel}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-black leading-tight">
              {course.titulo}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              {course.descripcion}
            </p>

            {/* Stats */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm text-zinc-400">
                  Duración
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {course.duracion}
                </h3>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm text-zinc-400">
                  Lecciones
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {course.contenido?.reduce(
                    (acc, module) =>
                      acc +
                      module.lecciones.length,
                    0
                  ) || 0}
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side */}

        <aside className="h-fit rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm uppercase tracking-widest text-zinc-400">
            Precio del curso
          </p>

          <h2 className="mt-3 text-5xl font-black">
            {formatPrice(course.precio)}
          </h2>

          <div className="mt-8 space-y-4">
            <button
              onClick={() =>
                navigate(
                  `/course/${id}/content`
                )
              }
              className="w-full rounded-2xl bg-white px-6 py-4 text-lg font-bold text-black transition hover:scale-[1.02]"
            >
              Ver contenido
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full rounded-2xl border border-zinc-700 px-6 py-4 font-semibold transition hover:bg-zinc-800"
            >
              Volver
            </button>
          </div>

          {/* Features */}

          <div className="mt-10 space-y-5 border-t border-zinc-800 pt-8">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">
                Acceso
              </span>

              <span className="font-semibold">
                Ilimitado
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">
                Certificado
              </span>

              <span className="font-semibold">
                Sí
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">
                Nivel
              </span>

              <span className="font-semibold">
                {course.nivel}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CourseDetails;