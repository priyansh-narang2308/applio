import { Search, Plus, SlidersHorizontal } from "lucide-react";
import CustomSelect from "./CustomSelect.jsx";

const statusOptions = [
  { value: "All", label: "All Statuses" },
  { value: "Applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "company", label: "Company (A-Z)" },
];

export default function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  onAddNew,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-3 text-[#6A665E]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search company or role..."
            className="w-full rounded-lg border border-[#E8E0D2] bg-white py-2 pl-9 pr-3 text-sm text-[#111111] outline-none focus:border-[#111111]"
          />
        </div>

        <CustomSelect
          value={statusFilter}
          onChange={onStatusFilterChange}
          options={statusOptions}
          ariaLabel="Filter by application status"
          className="min-w-[138px] rounded-lg border border-[#E8E0D2] bg-white px-3 py-2 text-sm font-medium text-[#111111] hover:border-[#CFC6B7]"
        />

        <div className="flex items-center gap-1.5 rounded-lg border border-[#E8E0D2] bg-white px-3 py-2 text-sm text-[#111111]">
          <SlidersHorizontal size={14} className="text-[#6A665E]" />
          <CustomSelect
            value={sortBy}
            onChange={onSortChange}
            options={sortOptions}
            ariaLabel="Sort applications"
            className="min-w-[124px] bg-transparent text-sm font-medium text-[#111111]"
          />
        </div>
      </div>

      <button
        onClick={onAddNew}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111111] px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-[#262626]"
      >
        <Plus size={16} />
        Add Application
      </button>
    </div>
  );
}
