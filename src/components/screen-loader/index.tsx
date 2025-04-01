import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const LOADING_ASSETS = ["bean-bag.gif", "time.gif", "bench.gif"];

const FOLDER_ASSETS = "loading";

export default function ScreenLoader() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Carousel
        className="w-full max-w-xs p-20"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {LOADING_ASSETS.map((item, index) => (
            <CarouselItem key={index}>
              <img src={`/${FOLDER_ASSETS}/${item}`} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
