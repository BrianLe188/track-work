import Entries from "./entries";
import Timer from "./timer";

export default function Tracking() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Time Tracker</h1>
        <p className="text-muted-foreground">Track your daily work hours</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Timer />
        <Entries />
      </div>
    </div>
  );
}
