'use client';

import React from 'react';
import { CATEGORIES } from '../data/mockProducts';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2 px-1">
      <div className="flex items-center gap-2 min-w-max justify-start md:justify-center">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? cat.count;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#0038A8] text-white shadow-xs font-semibold'
                  : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA] border border-transparent'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-[#E5E5EA] text-[#86868B]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
