'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PorscheModel, getModelImage } from '@/lib/porsche-catalog';

interface Props {
  models: PorscheModel[];
  lines: string[];
  categories: string[];
  eras: string[];
}

export function LibraryBrowser({ models, lines, categories, eras }: Props) {
  const [query, setQuery] = useState('');
  const [line, setLine] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [era, setEra] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter((m) => {
      if (line && m.line !== line) return false;
      if (category && m.category !== category) return false;
      if (era && m.cooling !== era) return false;
      if (q) {
        const hay = `${m.name} ${m.line} ${m.generation} ${m.years} ${m.engine} ${m.notable}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [models, query, line, category, era]);

  const grouped = useMemo(() => {
    const map = new Map<string, PorscheModel[]>();
    for (const m of filtered) {
      if (!map.has(m.line)) map.set(m.line, []);
      map.get(m.line)!.push(m);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search models, engines, generations…"
          className="w-full border-b border-[#e3e3e3] py-3 text-lg text-[#0a0a0a] placeholder-[#b8b8b8] focus:outline-none focus:border-[#0a0a0a] transition-colors bg-transparent"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-14">
        <FilterRow label="Line" value={line} options={lines} onChange={setLine} />
        <FilterRow label="Type" value={category} options={categories} onChange={setCategory} />
        <FilterRow label="Era" value={era} options={eras} onChange={setEra} />
      </div>

      <p className="eyebrow text-[#5b5b5b] mb-10">
        {filtered.length} {filtered.length === 1 ? 'Model' : 'Models'}
      </p>

      {/* Results, grouped by line */}
      {grouped.length === 0 ? (
        <div className="border border-dashed border-[#e3e3e3] py-20 text-center">
          <p className="text-[#5b5b5b]">No models match your filters.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {grouped.map(([groupLine, items]) => (
            <section key={groupLine}>
              <h2 className="text-2xl font-light tracking-tight mb-8">{groupLine}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e3e3e3] border border-[#e3e3e3]">
                {items.map((m) => {
                  const image = getModelImage(m);
                  return (
                    <Link
                      key={m.id}
                      href={`/library/${m.id}`}
                      className="group bg-white hover:bg-[#0a0a0a] transition-colors duration-300"
                    >
                      <div className="car-media relative aspect-[16/10] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={image}
                            alt={m.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-thin text-white/10 select-none">
                              {m.line}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-7">
                        <div className="flex items-baseline justify-between mb-4">
                          <span className="eyebrow text-[#d5001c]">{m.generation}</span>
                          <span className="text-sm text-[#5b5b5b] group-hover:text-white/60 transition-colors">
                            {m.years}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium tracking-tight group-hover:text-white transition-colors">
                          {m.name}
                        </h3>
                        <p className="mt-3 text-sm text-[#5b5b5b] group-hover:text-white/70 transition-colors">
                          {m.engine}
                        </p>
                        <p className="mt-1 text-sm text-[#5b5b5b] group-hover:text-white/70 transition-colors">
                          {m.power}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="eyebrow text-[#5b5b5b] w-12 shrink-0">{label}</span>
      <button
        onClick={() => onChange(null)}
        className={`text-sm px-3 py-1 border transition-colors ${
          value === null
            ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white'
            : 'border-[#e3e3e3] text-[#5b5b5b] hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
        }`}
      >
        All
      </button>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`text-sm px-3 py-1 border transition-colors ${
            value === opt
              ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white'
              : 'border-[#e3e3e3] text-[#5b5b5b] hover:border-[#0a0a0a] hover:text-[#0a0a0a]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
