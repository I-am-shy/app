import "@/app/globals.css";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 pl-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}