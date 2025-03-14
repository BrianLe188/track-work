import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./overview";
import Tasks from "./tasks";
import Team from "./team";
import Activity from "./activity";

export default function OverviewSection() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
      >
        <Overview />
      </TabsContent>
      <TabsContent value="tasks" className="pt-4">
        <Tasks />
      </TabsContent>
      <TabsContent value="team" className="pt-4">
        <Team />
      </TabsContent>
      <TabsContent value="activity" className="pt-4">
        <Activity />
      </TabsContent>
    </Tabs>
  );
}
