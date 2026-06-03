import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditLesson = () => {
  const { id, modIndex, lecIndex } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================
  // Get lesson
  // ============================================

  useEffect(() => {
    const getLesson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cursos/${id}`
        );

        const courseData = response.data;

        setCourse(courseData);

        const module = courseData.contenido?.[modIndex];

        const selectedLesson =
          module?.lecciones?.[lecIndex];

        if (!selectedLesson) {
          console.error("Lesson not found.");
        }

        setLesson(selectedLesson);
      } catch (error) {
        console.error("Error loading lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    getLesson();
  }, [id, modIndex, lecIndex]);

  // ============================================
  // Save changes
  // ============================================

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedCourse = { ...course };

      updatedCourse.contenido[modIndex].lecciones[lecIndex] =
        lesson;

      await axios.put(
        `http://localhost:5000/api/cursos/${course._id}`,
        updatedCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lesson updated successfully.");

      navigate(`/admin/course-content/${course._id}`);
    } catch (error) {
      console.error("Error saving lesson:", error);

      alert("Error saving changes.");
    }
  };

  // ============================================
  // Add quiz question
  // ============================================

  const addQuestion = () => {
    const newQuestion = {
      pregunta: "",
      opciones: ["", "", "", ""],
      respuestaCorrecta: "",
    };

    setLesson({
      ...lesson,
      preguntas: [
        ...(lesson.preguntas || []),
        newQuestion,
      ],
    });
  };

  // ============================================
  // Delete question
  // ============================================

  const deleteQuestion = (index) => {
    const updatedQuestions = [...lesson.preguntas];

    updatedQuestions.splice(index, 1);

    setLesson({
      ...lesson,
      preguntas: updatedQuestions,
    });
  };

  // ============================================
  // Loading
  // ============================================

  if (loading || !lesson) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h2 className="text-2xl font-bold">
          Loading lesson...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Header */}

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-slate-400 hover:text-cyan-400 transition"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-black mb-8">
          Edit Lesson
        </h1>

        {/* Lesson title */}

        <div className="mb-6">
          <label className="block mb-2 text-sm text-slate-300">
            Lesson title
          </label>

          <input
            type="text"
            value={lesson.tituloLeccion}
            onChange={(e) =>
              setLesson({
                ...lesson,
                tituloLeccion: e.target.value,
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />
        </div>

        {/* Description */}

        <div className="mb-6">
          <label className="block mb-2 text-sm text-slate-300">
            Description
          </label>

          <textarea
            rows={4}
            value={lesson.descripcionLeccion || ""}
            onChange={(e) =>
              setLesson({
                ...lesson,
                descripcionLeccion: e.target.value,
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        {/* Lesson type */}

        <div className="mb-8">
          <label className="block mb-2 text-sm text-slate-300">
            Lesson type
          </label>

          <select
            value={lesson.tipo}
            onChange={(e) =>
              setLesson({
                ...lesson,
                tipo: e.target.value,
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          >
            <option value="video">Video</option>
            <option value="documento">PDF Document</option>
            <option value="imagen">Image</option>
            <option value="texto">Text</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>

        {/* Video */}

        {lesson.tipo === "video" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm text-slate-300">
              Video URL
            </label>

            <input
              type="text"
              value={lesson.videoUrl || ""}
              onChange={(e) =>
                setLesson({
                  ...lesson,
                  videoUrl: e.target.value,
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* PDF */}

        {lesson.tipo === "documento" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm text-slate-300">
              PDF URL
            </label>

            <input
              type="text"
              value={lesson.archivoUrl || ""}
              onChange={(e) =>
                setLesson({
                  ...lesson,
                  archivoUrl: e.target.value,
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* Image */}

        {lesson.tipo === "imagen" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm text-slate-300">
              Image URL
            </label>

            <input
              type="text"
              value={lesson.imagenUrl || ""}
              onChange={(e) =>
                setLesson({
                  ...lesson,
                  imagenUrl: e.target.value,
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* Text */}

        {lesson.tipo === "texto" && (
          <div className="mb-6">
            <label className="block mb-2 text-sm text-slate-300">
              Text content
            </label>

            <textarea
              rows={6}
              value={lesson.contenidoTexto || ""}
              onChange={(e) =>
                setLesson({
                  ...lesson,
                  contenidoTexto: e.target.value,
                })
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 resize-none"
            />
          </div>
        )}

        {/* Quiz */}

        {lesson.tipo === "quiz" && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Quiz Questions
              </h2>

              <button
                onClick={addQuestion}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-xl font-semibold transition"
              >
                Add Question
              </button>
            </div>

            <div className="space-y-6">
              {lesson.preguntas?.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">
                      Question #{qIndex + 1}
                    </h3>

                    <button
                      onClick={() => deleteQuestion(qIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Question"
                    value={question.pregunta}
                    onChange={(e) => {
                      const updatedQuestions = [
                        ...lesson.preguntas,
                      ];

                      updatedQuestions[qIndex].pregunta =
                        e.target.value;

                      setLesson({
                        ...lesson,
                        preguntas: updatedQuestions,
                      });
                    }}
                    className="w-full mb-4 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {question.opciones.map((option, oIndex) => (
                      <input
                        key={oIndex}
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updatedQuestions = [
                            ...lesson.preguntas,
                          ];

                          updatedQuestions[qIndex].opciones[oIndex] =
                            e.target.value;

                          setLesson({
                            ...lesson,
                            preguntas: updatedQuestions,
                          });
                        }}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
                      />
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Correct answer"
                    value={question.respuestaCorrecta}
                    onChange={(e) => {
                      const updatedQuestions = [
                        ...lesson.preguntas,
                      ];

                      updatedQuestions[qIndex].respuestaCorrecta =
                        e.target.value;

                      setLesson({
                        ...lesson,
                        preguntas: updatedQuestions,
                      });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save button */}

        <button
          onClick={saveChanges}
          className="w-full mt-10 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-2xl transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditLesson;