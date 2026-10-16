import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, application }) {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-[#E8E0D2] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={20} />
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#6A665E] hover:bg-[#F7F5F0] hover:text-[#111111]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-[#111111]">Delete Application</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6A665E]">
            Are you sure you want to delete the job application for{' '}
            <strong className="text-[#111111]">{application.company}</strong> ({application.role})?
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E8E0D2] pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#E8E0D2] px-4 py-2 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0]"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(application._id)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
}
