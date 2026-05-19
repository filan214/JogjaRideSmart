'use client';

import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import { faqs } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-y border-stone-200 bg-sand-50 py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl text-balance">
              Hal yang sering ditanyakan.
            </h2>
            <p className="mt-5 text-lg text-stone-600">
              Tidak menemukan jawabannya? Tim kami siap membantu.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Chat via WhatsApp
            </a>
          </div>

          <ul className="space-y-3 lg:col-span-7">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={i}
                  className={cn(
                    'overflow-hidden rounded-2xl border bg-white transition-colors',
                    isOpen ? 'border-brand-200 shadow-md' : 'border-stone-200'
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-stone-50/50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-stone-900">{faq.q}</span>
                    <span
                      className={cn(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300',
                        isOpen
                          ? 'rotate-180 bg-brand-800 text-white'
                          : 'bg-stone-100 text-stone-700'
                      )}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 leading-relaxed text-stone-600">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
