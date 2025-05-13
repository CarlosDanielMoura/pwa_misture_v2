import { Route, Routes } from "react-router";
import { DashBoard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "./Pages/Profile";

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
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export { AppRoutes };
