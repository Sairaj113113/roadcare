import { useState } from 'react';
import StatusBadge from '../report/StatusBadge';

/**
 * StatusUpdateForm — modal form for updating report status.
 */
const StatusUpdateForm = ({
  currentStatus,
  reportId,
  onSubmit,
  onCancel,
  loading = false,
  error = '',
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [remarks, setRemarks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      status,
      remarks: remarks.trim(),
    });
  };

  const OPTIONS = [
    {
      value: 'PENDING',
      label: 'Pending',
      desc: 'Awaiting review',
    },
    {
      value: 'IN_PROGRESS',
      label: 'In Progress',
      desc: 'Repair underway',
    },
    {
      value: 'RESOLVED',
      label: 'Resolved',
      desc: 'Issue fixed',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Update Report Status
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Report #{reportId}
            </p>
          </div>

          <button
            onClick={onCancel}
            disabled={loading}
            className="text-gray-400 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Current status */}
        <div className="mb-5 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
            Current Status
          </p>

          <StatusBadge status={currentStatus} />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700
                          text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Status Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select New Status
            </label>

            <div className="space-y-3">
              {OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all
                    ${status === option.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={status === option.value}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={loading}
                    className="mt-1 accent-primary-600"
                  />

                  <div>
                    <StatusBadge status={option.value} size="sm" />

                    <p className="text-xs text-gray-500 mt-1">
                      {option.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remarks
            </label>

            <textarea
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add repair notes or update details..."
              disabled={loading}
              className="w-full rounded-xl border border-gray-300
                         focus:border-primary-500 focus:ring-2
                         focus:ring-primary-200 px-4 py-3
                         text-sm outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300
                         bg-white hover:bg-gray-50 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary"
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateForm;