import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BlobBackground } from "./BlobBackground";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-ds-bg text-ds-text font-sans relative">
      <BlobBackground />
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-ds-lg py-ds-xl box-border relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
