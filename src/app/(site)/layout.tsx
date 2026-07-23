import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Background ambient lighting blur effect */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center overflow-hidden">
        <div className="w-[800px] h-[400px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-cyan-500/0 blur-[120px] rounded-full transform -translate-y-1/2" />
      </div>

      <Header />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
