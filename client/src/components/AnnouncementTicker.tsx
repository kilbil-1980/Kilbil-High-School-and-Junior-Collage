import { useQuery } from "@tanstack/react-query";
import { Megaphone } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import type { Announcement } from "@shared/schema";

export function AnnouncementTicker() {
  const { data: announcements } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  const tickerRef = useRef<HTMLDivElement>(null);
  const [duplicateCount, setDuplicateCount] = useState(2);
  const [animationDuration, setAnimationDuration] = useState(30);

  useEffect(() => {
    const calculateDuplicates = () => {
      if (!tickerRef.current) return;
      
      const containerWidth = tickerRef.current.offsetWidth;
      const itemsCount = announcements?.length || 1;
      
      // Calculate how many duplicates we need based on screen width
      const estimatedItemWidth = 600; // Approximate width of one announcement item
      const neededDuplicates = Math.max(2, Math.ceil((containerWidth * 2) / (estimatedItemWidth * itemsCount)) + 1);
      
      setDuplicateCount(neededDuplicates);
      
      // Adjust animation duration based on number of items
      const baseDuration = 25;
      const extraTime = (neededDuplicates - 1) * 5;
      setAnimationDuration(baseDuration + extraTime);
    };

    calculateDuplicates();
    
    const resizeObserver = new ResizeObserver(() => {
      calculateDuplicates();
    });
    
    if (tickerRef.current) {
      resizeObserver.observe(tickerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [announcements]);

  if (!announcements || announcements.length === 0) return null;

  // Generate duplicated announcements for circular effect
  const displayAnnouncements = Array.from({ length: duplicateCount }).flatMap(() => announcements);

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-3">
        <Megaphone className="w-4 h-4 flex-shrink-0" />
        <div className="flex-1 overflow-hidden" ref={tickerRef}>
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
              animation: circularScroll ${animationDuration}s linear infinite;
              white-space: nowrap;
            }
            .circular-ticker-item {
              display: flex;
              gap: 1rem;
              flex-shrink: 0;
            }
          `}</style>
          <div className="circular-ticker">
            {displayAnnouncements.map((announcement, index) => (
              <div key={`${announcement.id}-${index}`} className="circular-ticker-item">
                <span className="font-medium" data-testid={`text-announcement-${index % announcements.length}`}>
                  {announcement.title}
                </span>
                <span className="text-primary-foreground/80">
                  {announcement.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
