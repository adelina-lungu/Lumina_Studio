import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import PhotographerProfile from "../pages/PhotographerProfile";
import AdminSupport from "../pages/AdminSupport";
import NotFoundPage from "../errors/NotFoundPage";
import ServerErrorPage from "../errors/ServerErrorPage";
import ForbiddenPage from "../errors/ForbiddenPage";
import { ROUTES } from "../constants";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path="/photographer/:id" element={<PhotographerProfile />} />
      </Route>

      <Route path={ROUTES.adminSupport} element={<AdminSupport />} />
      <Route path={ROUTES.forbidden} element={<ForbiddenPage />} />
      <Route path={ROUTES.serverError} element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
