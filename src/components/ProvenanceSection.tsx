'use client';

import React from 'react';
import { MapPin, Sparkles, Compass } from 'lucide-react';

export const ProvenanceSection: React.FC = () => {
  const regions = [
    {
      name: 'Luzon Highlands & Plains',
      provinces: 'Baguio • Batangas • Ilocos • Bicol',
      highlight: 'Kapeng Barako, Mountain Ube, Handwoven Inabel, Pili Nuts',
      description: 'Volcanic mountain microclimates yielding dense coffees, rich tubers, and historic weaving traditions.',
      color: '#0038A8',
      bgLight: '#EBF2FF',
    },
    {
      name: 'Visayas Island Heart',
      provinces: 'Cebu • Bohol • Guimaras • Iloilo',
      highlight: 'Carabao Mangoes, Dinosaur Egg Salt (Asin Tibuok), Cane Sugar',
      description: 'Sun-drenched tropical coasts known worldwide for the sweetest mango varieties and rare artisanal salts.',
      color: '#CE1126',
      bgLight: '#FEF2F2',
    },
    {
      name: 'Mindanao & Palawan Seas',
      provinces: 'Davao • Sulu Sea • Coron • Zamboanga',
      highlight: 'South Sea Golden Pearls, Single-Estate Criollo Cacao, Spices',
      description: 'Pristine ocean reefs, nutrient-rich volcanic soils, and lush biodiverse tropical rainforests.',
      color: '#E5B800',
      bgLight: '#FFFBEB',
    },
  ];

  return (
    <section id="heritage" className="py-16 sm:py-24 bg-[#FAFAFC] border-y border-[#F0F0F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E5EA] shadow-2xs text-xs font-semibold text-[#1D1D1F] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#0038A8]" />
            <span>The 7,641 Islands Provenance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F]">
            Every treat carries the soul of its island.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#86868B] leading-relaxed">
            We partner directly with family farms, convent kitchens, and master indigenous artisans across the three grand island regions of the Philippines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {regions.map((reg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0F0F2] hover:border-[#D2D2D7] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: reg.bgLight, color: reg.color }}
                >
                  <MapPin className="w-5 h-5" />
                </div>

                <span
                  className="text-[11px] font-bold tracking-wider uppercase font-mono block mb-1"
                  style={{ color: reg.color }}
                >
                  {reg.provinces}
                </span>

                <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">{reg.name}</h3>

                <p className="text-xs text-[#86868B] leading-relaxed mb-4">
                  {reg.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5F5F7]">
                <span className="text-[10px] text-[#86868B] uppercase font-semibold block mb-1">
                  Signature Curations
                </span>
                <p className="text-xs font-medium text-[#1D1D1F]">{reg.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
