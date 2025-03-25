import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import EVENT_NAME from "@/constants/event-name";
import { ITrackingImage } from "@/lib/type/tracking";
import { listen } from "@tauri-apps/api/event";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Window } from "@tauri-apps/api/window";

export default function ScreenshotPopup() {
  const [image, setImage] = useState<ITrackingImage | null>(null);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const listener = listen<ITrackingImage>(
      EVENT_NAME.SHOW_TRACKING_SCREENSHOT,
      (event) => {
        setImage(event.payload);

        const timer = setInterval(() => {
          setProgress((prev) => {
            if (prev <= 0) {
              clearInterval(timer);
              handleCloseWindow();
            }
            return prev - 10;
          });
        }, 100);
      },
    );

    return () => {
      listener.then((fn) => fn());
    };
  }, []);

  const handleCloseWindow = async () => {
    const win = Window.getCurrent();
    await win.close();
  };

  return (
    <div>
      {image?.path && <img src={image.path} className="w-full h-full" />}
      <div className="w-full flex items-center gap-1">
        <Progress value={progress} className="flex-1" />
        <Button size="icon">
          <Trash />
        </Button>
      </div>
    </div>
  );
}
