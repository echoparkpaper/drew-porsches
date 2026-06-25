import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CATALOG, LINES, CATEGORIES, ERAS } from '@/lib/porsche-catalog';
import { LibraryBrowser } from '@/components/library-browser';

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="wordmark text-base">
            THE LUCURELL<span className="text-[#d5001c]">.</span>COLLECTION
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="eyebrow text-[#5b5b5b] hover:text-[#0a0a0a] transition-colors">
              Collection
            </Link>
            <Link href="/library" className="eyebrow text-[#0a0a0a]">
              Library
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-[#e3e3e3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow text-[#d5001c] mb-4">Reference</p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight max-w-2xl">
            The Porsche Library
          </h1>
          <p className="mt-6 text-[#5b5b5b] max-w-xl leading-relaxed">
            Every model line and generation, from the 1948 356 to the electric
            Taycan — production years, engines and what makes each one matter.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <LibraryBrowser
          models={CATALOG}
          lines={LINES}
          categories={CATEGORIES}
          eras={ERAS}
        />
      </main>
    </div>
  );
}
