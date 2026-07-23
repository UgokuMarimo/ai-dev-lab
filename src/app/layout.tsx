import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author.name }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className="antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
          {/* Background ambient lighting blur effect */}
          <div className="pointer-events-none fixed inset-0 z-0 flex justify-center overflow-hidden">
            <div className="w-[800px] h-[400px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-cyan-500/0 blur-[120px] rounded-full transform -translate-y-1/2" />
          </div>

          <Header />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
