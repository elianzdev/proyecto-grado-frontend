import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LessonView = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const verifyPurchase = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate(`/course/${id}`);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/my-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const purchased = response.data.some((course) => course._id === id);

        if (!purchased) {
          navigate(`/course/${id}`);
        }
      } catch (error) {
        console.error("Error verifying purchase:", error);
        navigate(`/course/${id}`);
      }
    };

    verifyPurchase();
  }, [id, navigate]);

  if (!state || !state.lesson) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Lesson could not be loaded
          </h2>

          <button
            onClick={() => navigate(`/course/${id}/content`)}
            className="rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          >
            Back to content
          </button>
        </div>
      </div>
    );
  }

  const { lesson } = state;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
          {lesson.tituloLeccion}
        </h1>

        <div className="space-y-6">
          {lesson.tipo === "video" && lesson.videoUrl && (
            <div className="overflow-hidden rounded-2xl">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={
                    lesson.videoUrl.includes("youtube.com/watch")
                      ? lesson.videoUrl.replace("watch?v=", "embed/")
                      : lesson.videoUrl
                  }
                  title={lesson.tituloLeccion}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {lesson.tipo === "imagen" && (
            <img
              src={lesson.imagenUrl}
              alt={lesson.tituloLeccion}
              className="w-full rounded-2xl object-cover"
            />
          )}

          {(lesson.tipo === "pdf" ||
            lesson.tipo === "documento") &&
            lesson.archivoUrl && (
              <iframe
                src={lesson.archivoUrl}
                title="PDF Viewer"
                className="h-[700px] w-full rounded-2xl border"
              />
            )}

          {(lesson.tipo === "texto" || lesson.contenidoTexto) && (
            <div className="rounded-2xl bg-gray-50 p-6">
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700">
                {lesson.contenidoTexto}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate(`/course/${id}/content`)}
            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Back to content
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView;