import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import Navbar from "../components/layouts/Navbar";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CourseDetails from "../pages/CourseDetails";
import CourseContent from "../pages/CourseContent";
import LessonView from "../pages/LessonView";
import CartPage from "../pages/CartPage";
import MyCourses from "../pages/MyCourses";

// Admin
import AdminDashboard from "../pages/AdminDashboard";
import CourseContentManager from "../pages/CourseContentAdmin";
import EditLesson from "../pages/EditLesson";

const AppRoutes = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  // Ocultar navbar en login y register
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar role={user?.role} />}

      <Routes>
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Courses */}
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course/:id/content" element={<CourseContent />} />
        <Route
          path="/course/:id/lesson/:lessonId"
          element={<LessonView />}
        />

        {/* Student */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-courses" element={<MyCourses />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/admin/course-content/:courseId"
          element={<CourseContentManager />}
        />

        <Route
          path="/admin/course/:id/module/:modIndex/lesson/:lecIndex"
          element={<EditLesson />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
              <h1 className="text-3xl font-bold">
                404 | Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;