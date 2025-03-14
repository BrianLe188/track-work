import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex justify-between items-center h-screen">
      <Outlet />
    </div>
  );
}
