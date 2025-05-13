import { useEffect, useState } from "react";
import type { VariantSelectorProps } from "../types/VariantSelectorProps";

const getVariantStorageKey = (label: string) => `selectedVariant_${label}`;

export const VariantSelector = ({ label, options, selected, onSelect }: VariantSelectorProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(selected);

  useEffect(() => {
    const storageKey = getVariantStorageKey(label);
    const savedSelection = localStorage.getItem(storageKey);
    if (savedSelection) {
      setSelectedItem(savedSelection);
    }
  }, [label]);

  const handleSelect = (opt: string) => {
    const storageKey = getVariantStorageKey(label);
    localStorage.setItem(storageKey, opt);
    setSelectedItem(opt);
    onSelect(opt);
  };

  return (
    <div>
      <h2 className="text-md font-semibold">{label}</h2>
      <div className="flex gap-3 mt-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className={`px-5 py-2 text-sm border transition-all duration-200 cursor-pointer ${
              selectedItem === opt ? "bg-black text-white" : "bg-white"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
