import { } from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../component/Error";
import HomePage from "../pages/home/HomePage";
import Main from "../layout/Main";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import UpdateProfilePage from "../pages/profile/UpdateProfilePage";
import Pricing from "../pages/pricing/Pricing";
import CardPage from "../pages/card/CardPage";
import InvoicePage from "../pages/invoice/InvoicePage";
import PaymentReportPage from "../pages/paymentReport/PaymentReportPage";
import BillSummary from "../pages/billSummary/BillSummary";
import UpgradePlan from "../pages/upgradePlan/UpgradePlan";
import ReduceBills from "../pages/ReduceBills/ReduceBills";
import RegisterPage from "../pages/register/RegisterPage";
import UserManagement from "../pages/users/UsersPage";
import AdminRoutes from "./AdminRoutes";
import UserNotAllowRoutes from "./UserNotAllowRoutes";
import PrivateRoutes from "./PrivateRoutes";
import SupportPage from "../pages/support/SupportPage";
import PricingAdmin from "../pages/pricing/admin/PricingAdmin";
import AddNewPlan from "../pages/pricing/admin/AddNewPlan";
import UpdatePlan from "../pages/pricing/admin/UpdatePlan";
import UserRoutes from "./UserRoutes";
import DashboardLayout from "../layout/DashboardLayout";
import ProfileDetails from "../pages/ProfileDetails/ProfileDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <UserRoutes>
            <HomePage />
          </UserRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <UserNotAllowRoutes>
            <LoginPage />
          </UserNotAllowRoutes>
        ),
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/change-password",
        element: (
          <UserRoutes>
            <ChangePasswordPage />
          </UserRoutes>
        ),
      },
      {
        path: "/support",
        element: <SupportPage />,
      },
      {
        path: "/update-profile",
        element: (
          <UserRoutes>
            <UpdateProfilePage />
          </UserRoutes>
        ),
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/pricing-plans",
        element: (
          <PrivateRoutes>
            <Pricing />
          </PrivateRoutes>
        ),
      },
      {
        path: "/card",
        element: (
          <PrivateRoutes>
            <CardPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/invoice/:id",
        element: (
          <UserRoutes>
            <InvoicePage />
          </UserRoutes>
        ),
      },
      {
        path: "/bill-summary",
        element: (
          <UserRoutes>
            <BillSummary />
          </UserRoutes>
        ),
      },
      {
        path: "/upgrade-plan",
        element: (
          <UserRoutes>
            <UpgradePlan />
          </UserRoutes>
        ),
      },
      {
        path: "/reduce-hospital-bills",
        element: (
          <PrivateRoutes>
            <ReduceBills />
          </PrivateRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <UserNotAllowRoutes>
            <RegisterPage />
          </UserNotAllowRoutes>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <UserRoutes>
            <ProfileDetails />
          </UserRoutes>
        ),
      },
    ],
  },
  // Admin Panel Layout
  {
    path: "/admin",
    errorElement: <Error />,
    children: [
      {
        path: "users",
        element: (
          <AdminRoutes>
            <DashboardLayout>
              <UserManagement />
            </DashboardLayout>
          </AdminRoutes>
        ),
      },
      {
        path: "my-profile",
        element: (
          <AdminRoutes>
            <DashboardLayout>
              <ProfileDetails />
            </DashboardLayout>
          </AdminRoutes>
        ),
      },
      {
        path: "payment-report",
        element: (
          <AdminRoutes>
            <DashboardLayout>
              <PaymentReportPage />
            </DashboardLayout>
          </AdminRoutes>
        ),
      },
      {
        path: "change-password",
        element: (
          <PrivateRoutes>
            <DashboardLayout>
              <ChangePasswordPage />
            </DashboardLayout>
          </PrivateRoutes>
        ),
      },
      {
        path: "pricing",
        element: (
          <AdminRoutes>
            <DashboardLayout>
              <PricingAdmin />
            </DashboardLayout>
          </AdminRoutes>
        ),
      },
      {
        path: "pricing/add-new",
        element: (
          <AdminRoutes>
            <DashboardLayout>
              <AddNewPlan />
            </DashboardLayout>
          </AdminRoutes>
        ),
      },
      {
        path: "pricing/update/:id",
        element: (
          <AdminRoutes>
            <DashboardLayout>
              <UpdatePlan />
            </DashboardLayout>
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
