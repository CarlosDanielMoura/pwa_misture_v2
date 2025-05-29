import { Route, Routes } from "react-router";
import { DashBoard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "./Pages/Profile";
import { Construction } from "./Pages/Construction";
// novo

const AppRoutes = () => {
  return (
    <div className="lg:w-full">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/graph"
          element={
            <PrivateRoute>
              <Construction />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Construction />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export { AppRoutes };
