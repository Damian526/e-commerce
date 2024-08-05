import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="bg-slate-600 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
