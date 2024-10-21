import { AppSidebar } from "@/app/_components/AppSideBar";
import Navbar from "@/app/_components/NavBar/NavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <div className="fixed z-10 bg-white w-full md:pr-[14rem] h-[65px]">
          <Navbar />
        </div>
        <div className="pt-[69px]">
          {children}</div>
      </main>
    </SidebarProvider>
  );
}
