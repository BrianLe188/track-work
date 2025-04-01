import ROUTE_PATH from "./constants/routes";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import AuthLayout from "./layouts/auth";
import SignInScreen from "./screens/auth/sign-in";
import HomeScreen from "./screens/app/home";
import ChatScreen from "./screens/app/chat";
import ManageProjectScreen from "./screens/app/project/manage";
import CreateProjectScreen from "./screens/app/project/create";
import TrackingScreen from "./screens/app/tracking";
import ScreenshotPopupScreen from "./screens/screenshot-popup";
import ScreenLoader from "./components/screen-loader";

const AppLayout = lazy(() => import("./layouts/app"));
const CommunicationLayout = lazy(() => import("./layouts/communication"));

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTE_PATH.AUTH.SIGN_IN} element={<SignInScreen />} />
      </Route>
      <Route
        path={ROUTE_PATH.ROOT.INDEX}
        element={
          <Suspense fallback={<ScreenLoader />}>
            <AppLayout />
          </Suspense>
        }
      >
        <Route index element={<HomeScreen />} />
        <Route path={ROUTE_PATH.ROOT.PROJECTS.INDEX}>
          <Route index element={<ManageProjectScreen />} />
          <Route
            path={ROUTE_PATH.ROOT.PROJECTS.CREATE_PROJECT}
            element={<CreateProjectScreen />}
          />
        </Route>
        <Route path={ROUTE_PATH.ROOT.TRACKING.INDEX}>
          <Route index element={<TrackingScreen />} />
        </Route>
      </Route>
      <Route
        path={ROUTE_PATH.COMMUNICATION.INDEX}
        element={
          <Suspense fallback={<ScreenLoader />}>
            <CommunicationLayout />
          </Suspense>
        }
      >
        <Route index element={<ChatScreen />} />
      </Route>
      <Route
        path={ROUTE_PATH.SCREENSHOT_POPUP.INDEX}
        element={<ScreenshotPopupScreen />}
      />
    </Routes>
  );
};

export default App;
