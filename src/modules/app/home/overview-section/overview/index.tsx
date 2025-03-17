import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useHomeStore } from "../../store";
import { timeAgo } from "@/lib/utils";

export default function Overview() {
  const { activities, tasks, members } = useHomeStore();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.slice(0, 3).map((activity) => (
              <div key={activity._id} className="flex items-start gap-4">
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
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full">
            View all activity
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.slice(0, 3).map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Message
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full">
            View all team members
          </Button>
        </CardFooter>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status !== "completed")
              .slice(0, 4)
              .map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {task.status === "in-progress" ? (
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-slate-300" />
                    )}
                    <p className="text-sm font-medium">{task.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      Due {task.dueDate}
                    </p>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full">
            View all tasks
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
