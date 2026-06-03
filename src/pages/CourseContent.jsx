import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";

const CourseContent = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [isPurchased, setIsPurchased] =
    useState(false);

  // ========================================
  // Load Data
  // ========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get Course

        const courseResponse =
          await api.get(`/courses/${id}`);

        setCourse(courseResponse.data);

        // Check Purchase

        const token =
          localStorage.getItem("token");

        if (!token) return;

        const purchasesResponse =
          await api.get(
            "/orders/my-courses",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const purchased =
          purchasesResponse.data.some(
            (course) => course._id === id
          );

        setIsPurchased(purchased);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  // No Course
  // ========================================

  if (!course) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-center text-white">
        <div>
          <h1 className="text-4xl font-black">
            Curso no encontrado
          </h1>

          <p className="mt-3 text-zinc-400">
            El curso que buscas no existe.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-5xl font-black">
            {course.titulo}
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-zinc-400">
            {course.descripcion}
          </p>
        </div>

        {/* Locked Warning */}

        {!isPurchased && (
          <div className="mb-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                🔒
              </span>

              <div>
                <h2 className="font-bold text-yellow-300">
                  No has adquirido este curso
                </h2>

                <p className="text-sm text-yellow-200/80">
                  Compra el curso para desbloquear
                  todas las lecciones.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty Content */}

        {course.contenido.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-2xl font-bold">
              Este curso aún no tiene contenido
            </h2>

            <p className="mt-3 text-zinc-400">
              El instructor agregará lecciones
              próximamente.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {course.contenido.map(
              (module, moduleIndex) => (
                <section
                  key={moduleIndex}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
                >
                  {/* Module Header */}

                  <div className="border-b border-zinc-800 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">
                          📘 {module.modulo}
                        </h2>

                        <p className="mt-2 text-sm text-zinc-400">
                          {
                            module.lecciones.length
                          }{" "}
                          lecciones
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}

                  <div className="divide-y divide-zinc-800">
                    {module.lecciones.map(
                      (
                        lesson,
                        lessonIndex
                      ) => (
                        <article
                          key={lesson._id}
                          className="flex flex-col gap-4 p-5 transition hover:bg-zinc-800/50 md:flex-row md:items-center md:justify-between"
                        >
                          <div>
                            <h3 className="text-lg font-semibold">
                              {
                                lesson.tituloLeccion
                              }
                            </h3>

                            <p className="mt-1 text-sm text-zinc-400">
                              Tipo:{" "}
                              {lesson.tipo}
                            </p>
                          </div>

                          {isPurchased ? (
                            <button
                              onClick={() =>
                                navigate(
                                  `/course/${id}/lesson/${lessonIndex}`,
                                  {
                                    state: {
                                      lesson,
                                    },
                                  }
                                )
                              }
                              className="rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:scale-105"
                            >
                              Ver lección
                            </button>
                          ) : (
                            <div className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-400">
                              🔒 Bloqueado
                            </div>
                          )}
                        </article>
                      )
                    )}
                  </div>
                </section>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default CourseContent;