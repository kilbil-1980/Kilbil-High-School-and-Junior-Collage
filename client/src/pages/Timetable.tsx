import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Calendar } from "lucide-react";
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

  const renderTimetable = (timetable: TimetableType | undefined) => {
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

    return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-slate-200 dark:border-slate-600">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{timetable.category}</h3>
          {timetable.description && (
            <p className="text-slate-600 dark:text-slate-300 mb-3">{timetable.description}</p>
          )}
          {timetable.batchTime && (
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{timetable.batchTime}</span>
            </div>
          )}
        </div>

        {/* Timeline/Flow Layout - Responsive Grid */}
        <div className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {periods.slice(0, 4).map((period, index) => (
              <div key={index} className="flex flex-col items-center" data-testid={`period-${index}`}>
                <div
                  className={`w-full p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                    period.isBreak ?? false
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {index === 0 ? "1st Period" : index === 1 ? "2nd Period" : index === 2 ? "Break" : "3rd Period"}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{period.time}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{period.name}</div>
                </div>

                {/* Arrow Down to Next Row */}
                {index < 3 && (
                  <div className="hidden lg:block h-6 text-slate-400 dark:text-slate-500 text-xl font-bold mt-2">↓</div>
                )}

                {/* Arrow Right for Mobile/Tablet */}
                {index < 3 && (
                  <div className="lg:hidden w-6 text-slate-400 dark:text-slate-500 text-xl font-bold mt-2 transform rotate-90">↓</div>
                )}
              </div>
            ))}
          </div>

          {/* Second Row */}
          {periods.length > 4 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {periods.slice(4, 8).map((period, index) => (
                <div key={index + 4} className="flex flex-col items-center" data-testid={`period-${index + 4}`}>
                  <div
                    className={`w-full p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                      period.isBreak ?? false
                        ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                      {index + 4 === 4 ? "Lunch" : index + 4 === 5 ? "5th Period" : index + 4 === 6 ? "6th Period" : "4th Period"}
                    </div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{period.time}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{period.name}</div>
                  </div>

                  {/* Arrow Down */}
                  {index + 4 < periods.length - 1 && (
                    <div className="hidden lg:block h-6 text-slate-400 dark:text-slate-500 text-xl font-bold mt-2">↓</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Third Row */}
          {periods.length > 8 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {periods.slice(8).map((period, index) => (
                <div key={index + 8} className="flex flex-col items-center" data-testid={`period-${index + 8}`}>
                  <div
                    className={`w-full p-4 rounded-lg border-2 text-center transition-all hover-elevate ${
                      period.isBreak ?? false
                        ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                      {index + 8 === 8 ? "7th Period" : index + 8 === 9 ? "Sports Period" : index + 8 === 10 ? "Prayers" : "Dispersal"}
                    </div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{period.time}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{period.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Periods</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{periods.filter(p => !(p.isBreak ?? false)).length}</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Breaks</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{periods.filter(p => p.isBreak ?? false).length}</p>
          </div>
          {periods.length > 0 && (
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Duration</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{periods[0]?.time.split('-')[0]} - {periods[periods.length-1]?.time.split('-')[1]}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto mb-12" />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white" data-testid="text-page-title">
            School Timetable
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            View the daily schedule for all batches and grades
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="morning" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <TabsTrigger value="morning" data-testid="tab-morning" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Morning Batch</TabsTrigger>
            <TabsTrigger value="afternoon" data-testid="tab-afternoon" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Afternoon Batch</TabsTrigger>
            <TabsTrigger value="college" data-testid="tab-college" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700">Junior College</TabsTrigger>
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

        {/* Info Banner */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            Important Information
          </h3>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>• Timetables are subject to change. Parents will be notified of any updates.</li>
            <li>• Please ensure your child arrives 10 minutes before the first class.</li>
            <li>• For questions about the schedule, contact the school office.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
