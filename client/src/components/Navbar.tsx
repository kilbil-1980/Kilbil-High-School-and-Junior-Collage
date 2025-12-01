import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, Bell } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { Announcement } from "@shared/schema";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const { data: authStatus } = useQuery({
    queryKey: ["/api/admin/check"],
    queryFn: async () => {
      const res = await fetch("/api/admin/check");
      return res.json();
    },
    refetchInterval: 5000,
  });

  const { data: announcements } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
    refetchInterval: 10000,
  });

  const announcementCount = announcements?.length || 0;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3 hover-elevate active-elevate-2 px-1.5 sm:px-3 py-2 rounded-md min-w-0" data-testid="link-home">
            <div className="w-7 sm:w-10 h-7 sm:h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-xs sm:text-lg">K</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="font-bold text-foreground text-xs leading-tight truncate">Kilbil High School</div>
              <div className="text-xs text-muted-foreground leading-tight truncate">& Junior Collage</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Button 
              variant={isActive("/") ? "secondary" : "ghost"} 
              size="sm"
              asChild
              className="text-sm"
              data-testid="button-nav-home"
            >
              <Link href="/">Home</Link>
            </Button>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 text-sm" data-testid="button-nav-about">About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      <li>
                        <Link href="/about/president" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-president">
                          President's Message
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/director" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-director">
                          Director's Message
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/principal" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-principal">
                          Principal's Message
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/why-us" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-why-us">
                          Why Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/faculty" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-faculty">
                          Faculty
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 text-sm" data-testid="button-nav-academics">Academics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      <li>
                        <Link href="/academics/elementary" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-elementary">
                          Elementary
                        </Link>
                      </li>
                      <li>
                        <Link href="/academics/primary" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-primary">
                          Primary
                        </Link>
                      </li>
                      <li>
                        <Link href="/academics/secondary" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-secondary">
                          Secondary
                        </Link>
                      </li>
                      <li>
                        <Link href="/academics/higher-secondary" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-higher-secondary">
                          Higher Secondary
                        </Link>
                      </li>
                      <li>
                        <Link href="/timetable" className="block select-none rounded-md p-3 hover-elevate" data-testid="link-timetable">
                          Timetable
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              size="sm"
              asChild
              className="text-sm"
              data-testid="button-nav-admissions"
            >
            </Button>

            <Button 
              variant={isActive("/facilities") ? "secondary" : "ghost"} 
              size="sm"
              asChild
              className="text-sm"
              data-testid="button-nav-facilities"
            >
              <Link href="/facilities">Facilities</Link>
            </Button>

            <Button 
              variant={isActive("/gallery") ? "secondary" : "ghost"} 
              size="sm"
              asChild
              className="text-sm"
              data-testid="button-nav-gallery"
            >
              <Link href="/gallery">Gallery</Link>
            </Button>

            <Button 
              variant={isActive("/career") ? "secondary" : "ghost"} 
              size="sm"
              asChild
              className="text-sm"
              data-testid="button-nav-career"
            >
              <Link href="/career">Career</Link>
            </Button>

            <Button 
              variant={isActive("/contact") ? "secondary" : "ghost"} 
              size="sm"
              asChild
              className="text-sm"
              data-testid="button-nav-contact"
            >
              <Link href="/contact">Contact</Link>
            </Button>

            <div className="relative inline-flex items-center">
              <Button 
                variant={isActive("/announcements") ? "secondary" : "ghost"} 
                size="sm"
                className="relative"
                asChild
                title={`View ${announcementCount} ${announcementCount === 1 ? 'announcement' : 'announcements'}`}
                data-testid="button-nav-announcements"
              >
                <Link href="/announcements" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  {announcementCount > 0 && (
                    <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full min-w-5 text-center">
                      {announcementCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>

            {authStatus?.authenticated ? (
              <>
                <Button 
                  variant={isActive("/admin") ? "secondary" : "ghost"} 
                  size="sm"
                  asChild
                  data-testid="button-nav-admin"
                >
                  <Link href="/admin">Admin</Link>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                data-testid="button-nav-admin-login"
              >
                <Link href="/admin">Admin</Link>
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-home">
              <Link href="/">Home</Link>
            </Button>

            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-between text-sm font-medium px-3 py-2 h-auto"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                data-testid="button-mobile-about-toggle"
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
              </Button>
              {mobileAboutOpen && (
                <>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-president">
                    <Link href="/about/president">President's Message</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-director">
                    <Link href="/about/director">Director's Message</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-principal">
                    <Link href="/about/principal">Principal's Message</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-why-us">
                    <Link href="/about/why-us">Why Us</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-faculty">
                    <Link href="/about/faculty">Faculty</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-between text-sm font-medium px-3 py-2 h-auto"
                onClick={() => setMobileAcademicsOpen(!mobileAcademicsOpen)}
                data-testid="button-mobile-academics-toggle"
              >
                <span>Academics</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAcademicsOpen ? 'rotate-180' : ''}`} />
              </Button>
              {mobileAcademicsOpen && (
                <>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-elementary">
                    <Link href="/academics/elementary">Elementary</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-primary">
                    <Link href="/academics/primary">Primary</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-secondary">
                    <Link href="/academics/secondary">Secondary</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-higher">
                    <Link href="/academics/higher-secondary">Higher Secondary</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start pl-8 text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-timetable">
                    <Link href="/timetable">Timetable</Link>
                  </Button>
                </>
              )}
            </div>

            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-admissions">
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-facilities">
              <Link href="/facilities">Facilities</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-gallery">
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-career">
              <Link href="/career">Career</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-contact">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-announcements">
              <Link href="/announcements" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Announcements
                {announcementCount > 0 && (
                  <Badge variant="secondary" className="ml-auto text-xs font-semibold" data-testid="badge-mobile-announcement-count">
                    {announcementCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {authStatus?.authenticated ? (
              <>
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-admin">
                  <Link href="/admin">Admin</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => { setMobileMenuOpen(false); handleLogout(); }} data-testid="button-mobile-logout">
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setMobileMenuOpen(false)} asChild data-testid="button-mobile-admin-login">
                <Link href="/admin">Admin</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
