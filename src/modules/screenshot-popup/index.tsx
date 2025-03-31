import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EVENT_NAME from "@/constants/event-name";
import { HideWindowScreenshotPopupKey, ITrackingImage } from "@/lib/type/tracking";
import { listen } from "@tauri-apps/api/event";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Window } from "@tauri-apps/api/window";
import { Skeleton } from "@/components/ui/skeleton";
import TrackingEvent from "@/events/tracking";

export default function ScreenshotPopup() {
  const [image, setImage] = useState<ITrackingImage | null>(null);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const listener = listen<ITrackingImage>(
      EVENT_NAME.SHOW_TRACKING_SCREENSHOT,
      (event) => {
        setImage(event.payload);
        console.log(event.payload);

        if (timer) {
          clearInterval(timer);
        }

        timer = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev - 10;
            if (newProgress <= 0) {
              clearInterval(timer);
              handleCloseWindow('accept_image');
              return 0;
            }
            return newProgress;
          });
        }, 500);
      },
    );

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      listener.then((fn) => fn());
    };
  }, []);

  const handleReset = () => {
    setImage(null);
    setProgress(100);
  };

  const handleCloseWindow = async (key: HideWindowScreenshotPopupKey) => {
    const win = Window.getCurrent();
    handleReset();
    TrackingEvent.hideWindowScreenshotPopup(key)
  };

  return (
    <div className="flex flex-col h-screen">
      {image?.path ? (
        <img src={image.path} className="flex-1 p-1 rounded-lg object-cover" />
      ) : (
        <Skeleton className="flex-1 p-1 rounded-lg" />
      )}
      <div className="w-full flex items-center gap-1 pl-1">
        <Progress value={progress} className="flex-1" />
        <Button size="icon" variant="ghost" onClick={() => handleCloseWindow('remove_image')}>
          <Trash />
        </Button>
      </div>
    </div>
  );
}
