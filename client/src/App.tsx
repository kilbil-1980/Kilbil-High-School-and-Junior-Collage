import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnnouncementTicker } from "@/components/AnnouncementTicker";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PresidentMessage from "@/pages/PresidentMessage";
import DirectorMessage from "@/pages/DirectorMessage";
import PrincipalMessage from "@/pages/PrincipalMessage";
import WhyUs from "@/pages/WhyUs";
import FacultyPage from "@/pages/Faculty";
import FacultyDetail from "@/pages/FacultyDetail";
import AcademicLevel from "@/pages/AcademicLevel";
import Timetable from "@/pages/Timetable";
import Admissions from "@/pages/Admissions";
import Facilities from "@/pages/Facilities";
import Gallery from "@/pages/Gallery";
import Career from "@/pages/Career";
import Contact from "@/pages/Contact";
import Announcements from "@/pages/Announcements";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      <Route path="/about/president" component={PresidentMessage} />
      <Route path="/about/director" component={DirectorMessage} />
      <Route path="/about/principal" component={PrincipalMessage} />
      <Route path="/about/why-us" component={WhyUs} />
      <Route path="/about/faculty" component={FacultyPage} />
      <Route path="/faculty/:id" component={FacultyDetail} />
      
      <Route path="/academics/elementary">
        {() => <AcademicLevel level="elementary" />}
      </Route>
      <Route path="/academics/primary">
        {() => <AcademicLevel level="primary" />}
      </Route>
      <Route path="/academics/secondary">
        {() => <AcademicLevel level="secondary" />}
      </Route>
      <Route path="/academics/higher-secondary">
        {() => <AcademicLevel level="higher-secondary" />}
      </Route>
      
      <Route path="/timetable" component={Timetable} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/facilities" component={Facilities} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/career" component={Career} />
      <Route path="/contact" component={Contact} />
      <Route path="/announcements" component={Announcements} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <AnnouncementTicker />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
