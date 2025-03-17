import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useHomeStore } from "../../store";
import CustomPagination from "@/components/custom-pagination";
import { timeAgo } from "@/lib/utils";

export default function Activity() {
  const { activities } = useHomeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="flex items-start gap-4 border-b pb-4"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {timeAgo("en-US", activity.updatedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <CustomPagination className="mt-5" />
      </CardContent>
    </Card>
  );
}
