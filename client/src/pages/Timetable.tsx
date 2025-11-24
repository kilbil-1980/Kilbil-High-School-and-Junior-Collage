import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import type { Timetable as TimetableType, Period } from "@shared/schema";

export default function Timetable() {
  const { data: timetables, isLoading } = useQuery<TimetableType[]>({
    queryKey: ["/api/timetables"],
  });

  const morningBatch = timetables?.find(t => t.category === "Morning Batch");
  const afternoonBatch = timetables?.find(t => t.category === "Afternoon Batch");
  const juniorCollege = timetables?.find(t => t.category === "Junior College");

  const renderTimetable = (timetable: TimetableType | undefined) => {
    if (!timetable) {
      return (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground" data-testid="text-no-timetable">
              Timetable not available at the moment.
            </p>
          </CardContent>
        </Card>
      );
    }

    const periods: Period[] = JSON.parse(timetable.periods);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            {periods.map((period, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-md ${
                  period.isBreak
                    ? 'bg-accent'
                    : 'bg-card hover-elevate'
                }`}
                data-testid={`period-${index}`}
              >
                <div className="flex items-center gap-2 min-w-[120px]">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{period.time}</span>
                </div>
                <div className="flex-1">
                  <span className={`${period.isBreak ? 'font-semibold text-accent-foreground' : 'text-foreground'}`}>
                    {period.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Timetable</h1>
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Timetable</h1>
          <p className="text-lg text-muted-foreground">
            View the daily schedule for different batches
          </p>
        </div>

        <Tabs defaultValue="morning" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="morning" data-testid="tab-morning">Morning Batch</TabsTrigger>
            <TabsTrigger value="afternoon" data-testid="tab-afternoon">Afternoon Batch</TabsTrigger>
            <TabsTrigger value="college" data-testid="tab-college">Junior College</TabsTrigger>
          </TabsList>

          <TabsContent value="morning">
            {renderTimetable(morningBatch)}
          </TabsContent>

          <TabsContent value="afternoon">
            {renderTimetable(afternoonBatch)}
          </TabsContent>

          <TabsContent value="college">
            {renderTimetable(juniorCollege)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
