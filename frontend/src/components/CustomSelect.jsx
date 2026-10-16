import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export default function CustomSelect({
  value,
  options,
  onChange,
  className = "",
  menuClassName = "",
  ariaLabel,
}) {
  const id = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((option) => option.value === value)),
  );
  const [menuPosition, setMenuPosition] = useState(null);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selectedOption = options[selectedIndex];

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (
        !rootRef.current?.contains(event.target) &&
        !listboxRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return undefined;

    const updatePosition = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const width = Math.min(
        Math.max(rect.width, 180),
        window.innerWidth - 16,
      );
      const left = Math.max(
        8,
        Math.min(rect.left, window.innerWidth - width - 8),
      );
      const desiredHeight = Math.min(options.length * 40 + 8, 260);
      const spaceBelow = window.innerHeight - rect.bottom;
      const placeAbove = spaceBelow < desiredHeight && rect.top > spaceBelow;
      const top = placeAbove
        ? Math.max(8, rect.top - desiredHeight - 8)
        : Math.min(rect.bottom + 8, window.innerHeight - desiredHeight - 8);

      setMenuPosition({ left, top, width });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, options.length]);

  useEffect(() => {
    if (!isOpen) return;
    listboxRef.current?.focus();
  }, [isOpen]);

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const chooseOption = (option) => {
    onChange(option.value);
    closeMenu(true);
  };

  const handleTriggerKeyDown = (event) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      setActiveIndex(selectedIndex);
      setIsOpen(true);
    }
  };

  const handleListboxKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) =>
        (current + direction + options.length) % options.length,
      );
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseOption(options[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === "Tab") {
      closeMenu();
    }
  };

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            setActiveIndex(selectedIndex);
            setIsOpen(true);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        className={`inline-flex w-full items-center justify-between gap-2 outline-none transition focus-visible:ring-2 focus-visible:ring-[#111111]/20 ${className}`}
      >
        <span className="truncate">{selectedOption?.label ?? value}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-[#8A847A] transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen &&
        menuPosition &&
        createPortal(
          <div
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
            aria-label={ariaLabel}
            aria-activedescendant={`${id}-option-${activeIndex}`}
            onKeyDown={handleListboxKeyDown}
            className={`z-[100] overflow-y-auto rounded-xl border border-[#E8E0D2] bg-white p-1.5 shadow-[0_12px_32px_rgba(17,17,17,0.14)] outline-none ${menuClassName}`}
            style={{
              position: "fixed",
              left: menuPosition.left,
              top: menuPosition.top,
              width: menuPosition.width,
              maxHeight: "min(260px, calc(100vh - 16px))",
            }}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;
              return (
                <div
                  key={option.value}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => chooseOption(option)}
                  className={`flex min-h-9 cursor-pointer items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-[#F7F5F0] text-[#111111]"
                      : "text-[#4A443B] hover:bg-[#F7F5F0]"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    {option.indicator && (
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${option.indicator}`}
                      />
                    )}
                    <span className="truncate">{option.label}</span>
                  </span>
                  {isSelected && (
                    <Check size={15} className="shrink-0 text-[#111111]" />
                  )}
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
