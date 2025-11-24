import { useQuery } from "@tanstack/react-query";
import { Megaphone } from "lucide-react";
import type { Announcement } from "@shared/schema";

export function AnnouncementTicker() {
  const { data: announcements } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  const latestAnnouncement = announcements?.[0];

  if (!latestAnnouncement) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-3">
        <Megaphone className="w-4 h-4 flex-shrink-0" />
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-medium mr-4" data-testid="text-announcement">
              {latestAnnouncement.title}
            </span>
            <span className="text-primary-foreground/80">
              {latestAnnouncement.content}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
