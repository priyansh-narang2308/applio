import { ExternalLink, Edit2, Trash2, Calendar, FileText } from "lucide-react";
import CustomSelect from "./CustomSelect.jsx";

const statusOptions = [
  { value: "Applied", label: "Applied", indicator: "bg-[#8A847A]" },
  { value: "Interview", label: "Interview", indicator: "bg-amber-500" },
  { value: "Offer", label: "Offer", indicator: "bg-green-600" },
  { value: "Rejected", label: "Rejected", indicator: "bg-red-500" },
];

export default function ApplicationTable({
  applications,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Applied":
        return "bg-[#EAE5D9] text-[#4A443B] border-[#DED7C8]";
      case "Interview":
        return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
      case "Offer":
        return "bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]";
      case "Rejected":
        return "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]";
      default:
        return "bg-[#EAE5D9] text-[#4A443B] border-[#DED7C8]";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!applications || applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-[#E8E0D2] bg-white py-16 text-center shadow-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5F0] text-[#6A665E]">
          <FileText size={22} />
        </div>
        <h3 className="mt-4 text-base font-bold text-[#111111]">
          No applications found
        </h3>
        <p className="mt-1 text-sm text-[#6A665E]">
          Try clearing your search filters or add a new job application.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E8E0D2] bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#111111]">
          <thead className="border-b border-[#E8E0D2] bg-[#FAF8F5] text-xs font-bold uppercase tracking-wider text-[#6A665E]">
            <tr>
              <th className="px-5 py-3.5">Company & Role</th>
              <th className="px-5 py-3.5">Salary</th>
              <th className="px-5 py-3.5">Applied Date</th>
              <th className="px-5 py-3.5">Interview Date</th>
              <th className="px-5 py-3.5">Status Workflow</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E0D2]">
            {applications.map((app) => (
              <tr key={app._id} className="transition hover:bg-[#FAF8F5]/80">
                <td className="px-5 py-4">
                  <div className="font-bold text-[#111111]">{app.company}</div>
                  <div className="text-xs text-[#6A665E]">{app.role}</div>
                  {app.notes && (
                    <div className="mt-1 line-clamp-1 max-w-xs text-xs text-[#8A847A]">
                      {app.notes}
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 font-medium text-[#111111]">
                  {app.salary || "-"}
                </td>
                <td className="px-5 py-4 text-[#6A665E]">
                  {formatDate(app.applicationDate)}
                </td>
                <td className="px-5 py-4 text-[#6A665E]">
                  {app.interviewDate ? (
                    <span className="inline-flex items-center gap-1.5 font-medium text-[#92400E]">
                      <Calendar size={13} />
                      {formatDate(app.interviewDate)}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-5 py-4">
                  <CustomSelect
                    value={app.status}
                    onChange={(status) => onStatusChange(app._id, status)}
                    options={statusOptions}
                    ariaLabel={`Change ${app.company} application status`}
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadge(
                      app.status,
                    )}`}
                  />
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    {app.jobLink && (
                      <a
                        href={app.jobLink}
                        target="_blank"
                        rel="noreferrer"
                        title="View Job Posting"
                        className="rounded-md border border-[#E8E0D2] p-1.5 text-[#6A665E] transition hover:border-[#111111] hover:text-[#111111]"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => onEdit(app)}
                      title="Edit Application"
                      className="rounded-md border border-[#E8E0D2] p-1.5 text-[#6A665E] transition hover:border-[#111111] hover:text-[#111111]"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(app)}
                      title="Delete Application"
                      className="rounded-md border border-[#E8E0D2] p-1.5 text-[#6A665E] transition hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
