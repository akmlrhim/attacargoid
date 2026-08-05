import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari...",
  emptyMessage = "Tidak ditemukan",
  className = "",
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const listboxId = id ? `${id}-listbox` : undefined;

  const selected = options.find((option) => option.value === value) ?? null;

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return options;
    }
    return options.filter((option) => option.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  };

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query, isOpen]);

  /**
   * Keep the highlighted option inside the scroll box. Arrow keys can walk the
   * highlight past the visible rows, and without this the selection moves
   * invisibly below the fold. `block: "nearest"` scrolls only when the option
   * is actually out of view, so it doesn't jump the list on every keypress.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    listRef.current
      ?.querySelectorAll('[role="option"]')
      [highlightedIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isOpen]);

  const openDropdown = () => {
    setIsOpen(true);
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const selectOption = (option) => {
    onChange(option.value);
    closeDropdown();
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = filteredOptions[highlightedIndex];
      if (option) {
        selectOption(option);
      }
    } else if (event.key === "Escape") {
      closeDropdown();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all text-sm bg-white text-left cursor-pointer"
      >
        <span className={selected ? "text-navy" : "text-gray-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none text-sm"
            />
          </div>
          {/*
            `data-lenis-prevent` is what actually makes this list scrollable:
            AppLayout drives the page with Lenis, which swallows the wheel event
            globally, so without it the gesture scrolls the page behind the
            dropdown instead of the options. `overscroll-contain` then stops the
            scroll from chaining to the page once the list hits either end.
          */}
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            data-lenis-prevent
            className="max-h-56 overflow-y-auto overscroll-contain py-1"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-500">
                {emptyMessage}
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => selectOption(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      index === highlightedIndex
                        ? "bg-orange/5 text-orange-dark"
                        : "text-navy hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
