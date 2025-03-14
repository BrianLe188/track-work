import { Route } from "react-router";
import { Routes } from "react-router";
import AuthLayout from "./layouts/auth";
import SignInScreen from "./screens/auth/sign-in";
import HomeScreen from "./screens/app/home";
import AppLayout from "./layouts/app";
import CommunicationLayout from "./layouts/communication";
import ChatScreen from "./screens/app/chat";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<SignInScreen />} />
      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomeScreen />} />
      </Route>
      <Route path="/communication" element={<CommunicationLayout />}>
        <Route index element={<ChatScreen />} />
      </Route>
    </Routes>
  );
};

export default App;
