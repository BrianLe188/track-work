const EVENT_NAME = {
  AUTH: {
    SIGN_IN: "sign_in",
    LOGOUT: "logout",
    CHECK_AUTH: "check_auth",
  },
  PROJECT: {
    CREATE_PROJECT: "create_project",
  },
  TRACKING: {
    CAPTURE_SCREEN: "capture_screen",
    STOP_CAPTURE_SCREEN: "stop_capture_screen",
    SHOW_TRACKING_SCREENSHOT: "show_tracking_screenshot",
    HIDE_WINDOW_SCREENSHOT_POPUP: "hide_window_screenshot_popup",
  },
  SETUP: {
    SET_COMPLETE: "set_complete",
  },
};

export default EVENT_NAME;
