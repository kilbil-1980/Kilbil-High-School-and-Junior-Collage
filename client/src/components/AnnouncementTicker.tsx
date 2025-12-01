import { useQuery } from "@tanstack/react-query";
import { Megaphone } from "lucide-react";
import type { Announcement } from "@shared/schema";

export function AnnouncementTicker() {
  const { data: announcements } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  if (!announcements || announcements.length === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-3">
        <Megaphone className="w-4 h-4 flex-shrink-0" />
        <div className="flex-1 overflow-hidden">
          <style>{`
            @keyframes circularScroll {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            .circular-ticker {
              display: flex;
              gap: 3rem;
              animation: circularScroll 30s linear infinite;
              white-space: nowrap;
            }
            .circular-ticker-item {
              display: flex;
              gap: 1rem;
              flex-shrink: 0;
            }
          `}</style>
          <div className="circular-ticker">
            {announcements.map((announcement, index) => (
              <div key={`${announcement.id}-${index}`} className="circular-ticker-item">
                <span className="font-medium" data-testid={`text-announcement-${index}`}>
                  {announcement.title}
                </span>
                <span className="text-primary-foreground/80">
                  {announcement.content}
                </span>
              </div>
            ))}
            {announcements.length > 0 && (
              <>
                {announcements.map((announcement, index) => (
                  <div key={`${announcement.id}-loop-${index}`} className="circular-ticker-item">
                    <span className="font-medium">
                      {announcement.title}
                    </span>
                    <span className="text-primary-foreground/80">
                      {announcement.content}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
