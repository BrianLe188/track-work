import EVENT_NAME from "@/constants/event-name";
import { emit } from "@tauri-apps/api/event";

async function captureScreen() {
  emit(EVENT_NAME.CAPTURE_SCREEN, { monitorIndex: 1 });
}

async function stopCaptureScreen() {
  emit(EVENT_NAME.STOP_CAPTURE_SCREEN);
}

const TrackingEvent = {
  captureScreen,
  stopCaptureScreen,
};

export default TrackingEvent;
