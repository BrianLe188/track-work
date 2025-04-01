import EVENT_NAME from "@/constants/event-name";
import { HideWindowScreenshotPopupKey } from "@/lib/type/tracking";
import { emit } from "@tauri-apps/api/event";

async function captureScreen() {
  emit(EVENT_NAME.TRACKING.CAPTURE_SCREEN, { monitorIndex: 1 });
}

async function stopCaptureScreen() {
  emit(EVENT_NAME.TRACKING.STOP_CAPTURE_SCREEN);
}

async function hideWindowScreenshotPopup(key: HideWindowScreenshotPopupKey) {
  emit(EVENT_NAME.TRACKING.HIDE_WINDOW_SCREENSHOT_POPUP, { key });
}

const TrackingEvent = {
  captureScreen,
  stopCaptureScreen,
  hideWindowScreenshotPopup,
};

export default TrackingEvent;
