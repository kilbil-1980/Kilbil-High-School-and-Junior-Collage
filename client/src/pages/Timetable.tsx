import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Calendar, BookOpen, Users } from "lucide-react";
import type { Timetable as TimetableType, Period } from "@shared/schema";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

export default function Timetable() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.timetable.title,
      description: pageMetadata.timetable.description,
      url: window.location.href
    });
  }, []);

  const { data: timetables, isLoading } = useQuery<TimetableType[]>({
    queryKey: ["/api/timetables"],
  });

  const morningBatch = timetables?.find(t => t.category === "Morning Batch");
  const afternoonBatch = timetables?.find(t => t.category === "Afternoon Batch");
  const juniorCollege = timetables?.find(t => t.category === "Junior College");

  const batchInfo = {
    morning: {
      title: "Morning Batch",
      icon: <Users className="w-5 h-5" />,
      description: "Elementary & Primary Classes",
      color: "from-blue-500 to-cyan-500",
      timeColor: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100",
      periodColor: (isBreak: boolean) => isBreak ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 font-semibold" : "bg-white dark:bg-slate-800",
    },
    afternoon: {
      title: "Afternoon Batch",
      icon: <Calendar className="w-5 h-5" />,
      description: "Secondary Classes",
      color: "from-orange-500 to-rose-500",
      timeColor: "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100",
      periodColor: (isBreak: boolean) => isBreak ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 font-semibold" : "bg-white dark:bg-slate-800",
    },
    college: {
      title: "Junior College",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Higher Secondary (11th & 12th)",
      color: "from-purple-500 to-pink-500",
      timeColor: "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100",
      periodColor: (isBreak: boolean) => isBreak ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 font-semibold" : "bg-white dark:bg-slate-800",
    },
  };

  const renderTimetable = (timetable: TimetableType | undefined, batchKey: keyof typeof batchInfo) => {
    if (!timetable) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg" data-testid="text-no-timetable">
            Timetable not available at the moment.
          </p>
        </div>
      );
    }

    const periods: Period[] = JSON.parse(timetable.periods);
    const info = batchInfo[batchKey];

    return (
      <div className="space-y-6">
        {/* Batch Header Card */}
        <div className={`bg-gradient-to-r ${info.color} rounded-lg p-6 text-white shadow-lg`}>
          <div className="flex items-center gap-3 mb-2">
            {info.icon}
            <h3 className="text-2xl font-bold">{info.title}</h3>
          </div>
          <p className="text-white/90">{info.description}</p>
        </div>

        {/* Timetable Grid */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="space-y-2 p-6">
              {periods.map((period, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all hover-elevate ${info.periodColor(period.isBreak ?? false)} border-l-4 ${
                    period.isBreak
                      ? "border-yellow-400 dark:border-yellow-600"
                      : "border-primary"
                  }`}
                  data-testid={`period-${index}`}
                >
                  {/* Time Slot */}
                  <div className={`flex items-center gap-2 min-w-[130px] px-4 py-2 rounded-md ${info.timeColor}`}>
                    <Clock className="w-5 h-5" />
                    <span className="font-bold text-sm">{period.time}</span>
                  </div>

                  {/* Subject/Period Name */}
                  <div className="flex-1">
                    <span className={`text-lg font-semibold ${
                      period.isBreak
                        ? "text-yellow-900 dark:text-yellow-100"
                        : "text-foreground"
                    }`}>
                      {period.name}
                    </span>
                  </div>

                  {/* Break Badge */}
                  {period.isBreak && (
                    <div className="px-3 py-1 bg-yellow-300 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 rounded-full text-xs font-bold">
                      BREAK
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Total Periods</p>
            <p className="text-2xl font-bold text-primary">{periods.filter(p => !p.isBreak).length}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Breaks</p>
            <p className="text-2xl font-bold text-secondary">{periods.filter(p => p.isBreak).length}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg col-span-2 md:col-span-1">
            <p className="text-xs text-muted-foreground mb-1">Duration</p>
            <p className="text-sm font-semibold">{periods[0]?.time.split('-')[0]} - {periods[periods.length-1]?.time.split('-')[1]}</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto mb-12" />
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent" data-testid="text-page-title">
            School Timetable
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about your child's daily schedule. View timetables for Morning Batch, Afternoon Batch, and Junior College programs.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg h-fit">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Elementary & Primary</h3>
                  <p className="text-sm text-muted-foreground">Morning Batch schedule</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg h-fit">
                  <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secondary Classes</h3>
                  <p className="text-sm text-muted-foreground">Afternoon Batch schedule</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg h-fit">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Junior College</h3>
                  <p className="text-sm text-muted-foreground">11th & 12th grade schedule</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border">
          <Tabs defaultValue="morning" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-t-lg border-b border-border">
              <TabsTrigger value="morning" data-testid="tab-morning" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Morning Batch</span>
                <span className="sm:hidden text-xs">Morning</span>
              </TabsTrigger>
              <TabsTrigger value="afternoon" data-testid="tab-afternoon" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Afternoon Batch</span>
                <span className="sm:hidden text-xs">Afternoon</span>
              </TabsTrigger>
              <TabsTrigger value="college" data-testid="tab-college" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Junior College</span>
                <span className="sm:hidden text-xs">College</span>
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="morning">
                {renderTimetable(morningBatch, "morning")}
              </TabsContent>

              <TabsContent value="afternoon">
                {renderTimetable(afternoonBatch, "afternoon")}
              </TabsContent>

              <TabsContent value="college">
                {renderTimetable(juniorCollege, "college")}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg border border-primary/10 dark:border-primary/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            Important Information
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Timetables are subject to change. Parents will be notified of any changes.</li>
            <li>• Please ensure your child arrives 10 minutes before the first class.</li>
            <li>• For any questions about the schedule, please contact the school office.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
