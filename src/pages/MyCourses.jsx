import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPurchasedCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/api/orders/my-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error loading courses");
        }

        setCourses(data);
      } catch (error) {
        console.error("Error loading purchased courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPurchasedCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          My Courses
        </h1>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-700">
              You have not purchased any courses yet
            </h2>

            <p className="mt-2 text-gray-500">
              Explore available courses and start learning today.
            </p>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && courses.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
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

                  <button
                    onClick={() =>
                      navigate(`/courses/${course._id}/content`)
                    }
                    className="mt-5 w-full rounded-lg bg-black px-4 py-2 font-medium text-white transition hover:opacity-90"
                  >
                    Go to Course →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;