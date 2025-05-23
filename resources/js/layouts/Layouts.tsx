import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-64 p-6 w-full">{children}</main>
    </div>
  );
}
