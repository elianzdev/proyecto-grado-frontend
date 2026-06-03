import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

const CourseContentAdmin = () => {
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [newModule, setNewModule] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [newLesson, setNewLesson] = useState({
    moduleIndex: null,
    title: "",
    type: "text",
    url: "",
    contentText: "",
  });

  const navigate = useNavigate();

  const { courseId } = useParams();

  const token = localStorage.getItem("token");

  // Cargar Cursos

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await api.get("/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(response.data);

        if (courseId) {
          const foundCourse = response.data.find(
            (course) => course._id === courseId
          );

          if (foundCourse) {
            setSelectedCourse(foundCourse);
          }
        }
      } catch (error) {
        console.error(error);

        if (error.response?.status === 403) {
          localStorage.removeItem("token");

          navigate("/login");
        }
      }
    };

    loadCourses();
  }, [courseId, navigate, token]);

  // Guardar cambios del curso

  const saveCourse = async (courseData) => {
    try {
      const response = await api.put(
        `/courses/${courseData._id}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedCourse(response.data.course);

      setCourses((prev) =>
        prev.map((course) =>
          course._id === response.data.course._id
            ? response.data.course
            : course
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Agregar Módulo

  const handleAddModule = async () => {
    if (!newModule.trim()) return;

    const updatedCourse = {
      ...selectedCourse,
      contenido: [
        ...selectedCourse.contenido,
        {
          modulo: newModule,
          lecciones: [],
        },
      ],
    };

    await saveCourse(updatedCourse);

    setNewModule("");
  };

  // Eliminar Módulo

  const handleDeleteModule = async (moduleIndex) => {
    const updatedCourse = { ...selectedCourse };

    updatedCourse.contenido.splice(moduleIndex, 1);

    await saveCourse(updatedCourse);
  };
  
  // Agregar Lección

  const handleAddLesson = async () => {
    const moduleIndex = newLesson.moduleIndex;

    if (moduleIndex === null) return;

    const updatedCourse = { ...selectedCourse };

    updatedCourse.contenido[moduleIndex].lecciones.push({
      titulo: newLesson.title,
      tipo: newLesson.type,
      url: newLesson.url,
      contenidoTexto: newLesson.contentText,
    });

    await saveCourse(updatedCourse);

    setShowModal(false);

    setNewLesson({
      moduleIndex: null,
      title: "",
      type: "text",
      url: "",
      contentText: "",
    });
  };

  // Eliminar lección

  const handleDeleteLesson = async (
    moduleIndex,
    lessonIndex
  ) => {
    const updatedCourse = { ...selectedCourse };

    updatedCourse.contenido[moduleIndex].lecciones.splice(
      lessonIndex,
      1
    );

    await saveCourse(updatedCourse);
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        
        {/* Encabezado */}

        <div className="mb-10">
          <h1 className="text-4xl font-black">
            Administrador de contenido
          </h1>

          <p className="mt-2 text-zinc-400">
            Gestiona módulos y lecciones de tus cursos.
          </p>
        </div>

        {/* Seleccionar Curso */}

        <div className="mb-8">
          <select
            value={selectedCourse?._id || ""}
            onChange={(e) => {
              const course = courses.find(
                (c) => c._id === e.target.value
              );

              setSelectedCourse(course);
            }}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white outline-none transition focus:border-white"
          >
            <option value="">
              Selecciona un curso
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Agregar Módulo */}

        {selectedCourse && (
          <>
            <section className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-4 text-2xl font-bold">
                Agregar módulo
              </h2>

              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="Nombre del módulo"
                  value={newModule}
                  onChange={(e) =>
                    setNewModule(e.target.value)
                  }
                  className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                />

                <button
                  onClick={handleAddModule}
                  className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
                >
                  Agregar
                </button>
              </div>
            </section>

            {/* Módulos */}

            <div className="space-y-6">
              {selectedCourse.contenido.map(
                (module, moduleIndex) => (
                  <section
                    key={moduleIndex}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900"
                  >
                    {/* Header */}

                    <div className="flex flex-col gap-4 border-b border-zinc-800 p-6 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">
                          📘 {module.modulo}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">
                          {
                            module.lecciones.length
                          }{" "}
                          lecciones
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setNewLesson({
                              ...newLesson,
                              moduleIndex,
                            });

                            setShowModal(true);
                          }}
                          className="rounded-xl bg-white px-4 py-2 font-semibold text-black transition hover:scale-105"
                        >
                          + Lección
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteModule(
                              moduleIndex
                            )
                          }
                          className="rounded-xl border border-red-500 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {/* Lecciones */}

                    <div className="space-y-3 p-6">
                      {module.lecciones.map(
                        (lesson, lessonIndex) => (
                          <article
                            key={lessonIndex}
                            className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 md:flex-row md:items-center md:justify-between"
                          >
                            <div>
                              <h4 className="font-semibold">
                                {lesson.titulo}
                              </h4>

                              <p className="text-sm text-zinc-400">
                                {lesson.tipo}
                              </p>
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/course/${selectedCourse._id}/module/${moduleIndex}/lesson/${lessonIndex}`
                                  )
                                }
                                className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-800"
                              >
                                Editar
                              </button>

                              <button
                                onClick={() =>
                                  handleDeleteLesson(
                                    moduleIndex,
                                    lessonIndex
                                  )
                                }
                                className="rounded-xl border border-red-500 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                              >
                                Eliminar
                              </button>
                            </div>
                          </article>
                        )
                      )}
                    </div>
                  </section>
                )
              )}
            </div>
          </>
        )}

        {/* Modal */}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="mb-6 text-2xl font-bold">
                Nueva lección
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Título"
                  value={newLesson.title}
                  onChange={(e) =>
                    setNewLesson({
                      ...newLesson,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                />

                <select
                  value={newLesson.type}
                  onChange={(e) =>
                    setNewLesson({
                      ...newLesson,
                      type: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                >
                  <option value="text">
                    Texto
                  </option>

                  <option value="video">
                    Video
                  </option>

                  <option value="pdf">
                    PDF
                  </option>
                </select>

                {(newLesson.type === "video" ||
                  newLesson.type === "pdf") && (
                  <input
                    type="text"
                    placeholder="URL"
                    value={newLesson.url}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        url: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                  />
                )}

                {newLesson.type === "text" && (
                  <textarea
                    rows="5"
                    placeholder="Contenido"
                    value={newLesson.contentText}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        contentText:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-white"
                  />
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-xl border border-zinc-700 px-4 py-2"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleAddLesson}
                  className="rounded-xl bg-white px-4 py-2 font-semibold text-black"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CourseContentAdmin;