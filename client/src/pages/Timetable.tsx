import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Coffee, BookOpen, Trophy, Church, LogOut } from "lucide-react";
import type { Timetable as TimetableType, Period } from "@shared/schema";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

export default function Timetable() {
  const [activeTab, setActiveTab] = useState("morning");

  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.timetable.title,
      description: pageMetadata.timetable.description,
      url: window.location.href,
    });
  }, []);

  const { data: timetables, isLoading } = useQuery<TimetableType[]>({
    queryKey: ["/api/timetables"],
  });

  const morningBatch = timetables?.find((t) => t.category === "Morning Batch");
  const afternoonBatch = timetables?.find(
    (t) => t.category === "Afternoon Batch",
  );
  const juniorCollege = timetables?.find(
    (t) => t.category === "Junior College",
  );

  const getIconForPeriod = (periodName: string) => {
    const name = periodName.toLowerCase();
    if (name.includes("break")) return Coffee;
    if (name.includes("lunch")) return Coffee;
    if (name.includes("sports")) return Trophy;
    if (name.includes("prayer")) return Church;
    if (name.includes("dispersal")) return LogOut;
    return BookOpen;
  };

  const renderTimetable = (timetable: TimetableType | undefined) => {
    if (!timetable) {
      return (
        <Card className="border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p
              className="text-xl text-muted-foreground"
              data-testid="text-no-timetable"
            >
              Timetable not available at the moment.
            </p>
          </CardContent>
        </Card>
      );
    }

    const periods: Period[] = JSON.parse(timetable.periods);

    return (
      <div className="space-y-0">
        {/* Desktop Timeline View - Hidden on small screens */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline connector line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 transform -translate-x-1/2" />

            {periods.map((period, index) => {
              const Icon = getIconForPeriod(period.name);
              const isBreak = period.isBreak;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center mb-6 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                  data-testid={`period-${index}`}
                  style={{
                    animation: `fadeInScale 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Period Card */}
                  <div
                    className={`w-5/12 ${isLeft ? "pr-6 text-right" : "pl-6 text-left"}`}
                  >
                    <Card
                      className={`
                      border transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                      ${
                        isBreak
                          ? "bg-secondary/10 border-secondary/30 dark:bg-secondary/20 dark:border-secondary/40"
                          : "bg-primary/10 border-primary/30 dark:bg-primary/20 dark:border-primary/40"
                      }
                    `}
                    >
                      <CardContent className="p-4">
                        <div
                          className={`flex items-start gap-3 ${isLeft ? "flex-row-reverse text-right" : "flex-row text-left"}`}
                        >
                          <div
                            className={`
                            p-2 rounded-lg shrink-0
                            ${
                              isBreak
                                ? "bg-secondary/20 dark:bg-secondary/30"
                                : "bg-primary/20 dark:bg-primary/30"
                            }
                          `}
                          >
                            <Icon
                              className={`w-5 h-5 ${isBreak ? "text-secondary dark:text-secondary" : "text-primary dark:text-primary"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-base font-bold mb-1 ${
                                isBreak
                                  ? "text-secondary"
                                  : "text-primary"
                              }`}
                            >
                              {period.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span className="font-medium">{period.time}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`
                      w-6 h-6 rounded-full border-4 border-background shadow-lg
                      ${
                        isBreak
                          ? "bg-secondary"
                          : "bg-primary"
                      }
                    `}
                    >
                      <div className="w-full h-full rounded-full animate-ping opacity-20 bg-current" />
                    </div>
                  </div>

                  {/* Empty space on other side */}
                  <div className="w-5/12" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet/Mobile Grid View */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {periods.map((period, index) => {
              const Icon = getIconForPeriod(period.name);
              const isBreak = period.isBreak;

              return (
                <Card
                  key={index}
                  className={`
                    border transition-all duration-300 hover:shadow-lg
                    ${
                      isBreak
                        ? "bg-secondary/10 border-secondary/30 dark:bg-secondary/20 dark:border-secondary/40"
                        : "bg-primary/10 border-primary/30 dark:bg-primary/20 dark:border-primary/40"
                    }
                  `}
                  data-testid={`period-${index}`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                        p-2 rounded-lg shrink-0
                        ${
                          isBreak
                            ? "bg-secondary/20 dark:bg-secondary/30"
                            : "bg-primary/20 dark:bg-primary/30"
                        }
                      `}
                      >
                        <Icon
                          className={`w-5 h-5 ${isBreak ? "text-secondary dark:text-secondary" : "text-primary dark:text-primary"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm sm:text-base font-bold mb-1 ${
                            isBreak
                              ? "text-secondary"
                              : "text-primary"
                          }`}
                        >
                          {period.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span className="font-medium">{period.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-32 w-full mb-8 rounded-xl" />
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 py-16">
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-primary mb-4 sm:mb-5 md:mb-6 shadow-lg">
            <Clock className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-primary"
            data-testid="text-page-title"
          >
            Daily Timetable
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Navigate through your day with our structured schedule designed for optimal learning
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-auto p-1 bg-background border-2 border-primary/20">
            <TabsTrigger
              value="morning"
              data-testid="tab-morning"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-1.5 sm:py-2 px-1 text-xs sm:text-sm font-medium rounded-md transition-all"
            >
              Morning
            </TabsTrigger>
            <TabsTrigger
              value="afternoon"
              data-testid="tab-afternoon"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-1.5 sm:py-2 px-1 text-xs sm:text-sm font-medium rounded-md transition-all"
            >
              Afternoon
            </TabsTrigger>
            <TabsTrigger
              value="college"
              data-testid="tab-college"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-1.5 sm:py-2 px-1 text-xs sm:text-sm font-medium rounded-md transition-all"
            >
              Junior College
            </TabsTrigger>
          </TabsList>

          <TabsContent value="morning" className="mt-0">
            {renderTimetable(morningBatch)}
          </TabsContent>

          <TabsContent value="afternoon" className="mt-0">
            {renderTimetable(afternoonBatch)}
          </TabsContent>

          <TabsContent value="college" className="mt-0">
            {renderTimetable(juniorCollege)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
