import { useEffect, useState } from "react";
import CourseCard from "../components/courses/CourseCard";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/courses`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error loading courses");
        }

        setCourses(data);
      } catch (error) {
        console.error("Error loading courses:", error);
        setMessage("Could not load courses");
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Emprendix
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Explore our available courses and start learning today
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          </div>
        )}

        {/* Error */}
        {message && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-center text-red-700">
            {message}
          </div>
        )}

        {/* Courses */}
        {!loading && courses.length > 0 ? (
          <>
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Available Courses
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={{
                    ...course,
                    image: course.imagenPortada,
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          !loading && (
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <p className="text-gray-600">
                No courses available at the moment.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;