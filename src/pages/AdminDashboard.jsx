import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    titulo: "",
    descripcion: "",
    nivel: "",
    duracion: "",
    precio: "",
    categoria: "General",
    imagenPortada: "",
    contenido: [],
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Obtener cursos
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  // Crear curso
  const createCourse = async () => {
    try {
      await axios.post(
        `${API_URL}/api/courses/create`,
        newCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowCreateModal(false);

      setNewCourse({
        titulo: "",
        descripcion: "",
        nivel: "",
        duracion: "",
        precio: "",
        categoria: "General",
        imagenPortada: "",
        contenido: [],
      });

      fetchCourses();

    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  // Editar curso
  const updateCourse = async () => {
    try {
      await axios.put(
        `${API_URL}/api/courses/${selectedCourse._id}`,
        selectedCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowEditModal(false);
      setSelectedCourse(null);

      fetchCourses();

    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Eliminar curso
  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCourses();

    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Manage platform courses
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Back Home
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
              Create Course
            </button>
          </div>
        </div>

        {/* Tabla */}

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-black text-white">

                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Level</th>
                <th className="p-3 text-left">Duration</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>

              </tr>
            </thead>

            <tbody>

              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">{course.titulo}</td>
                    <td className="p-3">{course.nivel}</td>
                    <td className="p-3">{course.duracion}</td>
                    <td className="p-3">${course.precio}</td>
                    <td className="p-3">{course.categoria}</td>

                    <td className="p-3">

                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowEditModal(true);
                          }}
                          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/admin/course-content/${course._id}`)
                          }
                          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                        >
                          Content
                        </button>

                        <button
                          onClick={() => deleteCourse(course._id)}
                          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    No courses available
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;