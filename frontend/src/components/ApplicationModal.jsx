import { useState, useEffect } from "react";
import { X } from "lucide-react";
import CustomSelect from "./CustomSelect.jsx";

const statusOptions = [
  { value: "Applied", label: "Applied", indicator: "bg-[#8A847A]" },
  { value: "Interview", label: "Interview", indicator: "bg-amber-500" },
  { value: "Offer", label: "Offer", indicator: "bg-green-600" },
  { value: "Rejected", label: "Rejected", indicator: "bg-red-500" },
];

export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    jobLink: "",
    salary: "",
    applicationDate: new Date().toISOString().split("T")[0],
    status: "Applied",
    interviewDate: "",
    notes: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || "",
        role: initialData.role || "",
        jobLink: initialData.jobLink || "",
        salary: initialData.salary || "",
        applicationDate: initialData.applicationDate
          ? new Date(initialData.applicationDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: initialData.status || "Applied",
        interviewDate: initialData.interviewDate
          ? new Date(initialData.interviewDate).toISOString().split("T")[0]
          : "",
        notes: initialData.notes || "",
      });
    } else {
      setFormData({
        company: "",
        role: "",
        jobLink: "",
        salary: "",
        applicationDate: new Date().toISOString().split("T")[0],
        status: "Applied",
        interviewDate: "",
        notes: "",
      });
    }
    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) {
      setError("Company name and role are required.");
      return;
    }

    const payload = {
      ...formData,
      interviewDate: formData.interviewDate ? formData.interviewDate : null,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl border border-[#E8E0D2] bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-4">
          <h2 className="text-lg font-bold text-[#111111]">
            {initialData ? "Edit Application" : "Add New Application"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#6A665E] hover:bg-[#F7F5F0] hover:text-[#111111]"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Google, Stripe..."
                className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                Job Role *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="Software Engineer..."
                className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                Status
              </label>
              <CustomSelect
                value={formData.status}
                onChange={(status) => {
                  setFormData((current) => ({ ...current, status }));
                  setError("");
                }}
                options={statusOptions}
                ariaLabel="Application status"
                className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] hover:border-[#CFC6B7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                Salary Expectation
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="₹20,00,000 / yr"
                className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                Application Date
              </label>
              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                Interview Date (Optional)
              </label>
              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
              Job Posting Link
            </label>
            <input
              type="url"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              placeholder="https://company.com/careers/job"
              className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
              Notes & Follow-up
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Round 1 details, referral contact, tech stack highlights..."
              className="mt-1 w-full rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#111111] focus:bg-white"
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E8E0D2] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#E8E0D2] px-4 py-2 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#111111] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#262626]"
            >
              {initialData ? "Save Changes" : "Create Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
