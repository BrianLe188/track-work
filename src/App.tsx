import ROUTE_PATH from "./constants/routes";
import { Route } from "react-router";
import { Routes } from "react-router";
import AuthLayout from "./layouts/auth";
import SignInScreen from "./screens/auth/sign-in";
import HomeScreen from "./screens/app/home";
import AppLayout from "./layouts/app";
import CommunicationLayout from "./layouts/communication";
import ChatScreen from "./screens/app/chat";
import ManageProjectScreen from "./screens/app/project/manage";
import CreateProjectScreen from "./screens/app/project/create";
import TrackingScreen from "./screens/app/tracking";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTE_PATH.AUTH.SIGN_IN} element={<SignInScreen />} />
      </Route>
      <Route path={ROUTE_PATH.ROOT.INDEX} element={<AppLayout />}>
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
        element={<CommunicationLayout />}
      >
        <Route index element={<ChatScreen />} />
      </Route>
    </Routes>
  );
};

export default App;
