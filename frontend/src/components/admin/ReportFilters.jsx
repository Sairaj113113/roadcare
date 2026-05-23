const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
];

/**
 * ReportFilters
 *
 * City filter removed because
 * admins are automatically scoped
 * to their assigned city.
 */
const ReportFilters = ({
  status,
  onStatusChange,
  onReset,
  loading = false,
}) => {

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-4">

      {/* ================= STATUS FILTER ================= */}

      <div className="w-full lg:w-64">

        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Filter by Status
        </label>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          disabled={loading}
          className="w-full rounded-xl border border-gray-300
                     focus:border-primary-500
                     focus:ring-2 focus:ring-primary-200
                     px-4 py-2.5 text-sm outline-none
                     transition-all bg-white"
        >

          {STATUS_OPTIONS.map((option) => (

            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>

          ))}

        </select>

      </div>

      {/* ================= RESET BUTTON ================= */}

      <div className="flex-shrink-0">

        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="w-full lg:w-auto
                     px-5 py-2.5 rounded-xl
                     border border-gray-300
                     bg-white hover:bg-gray-50
                     text-sm font-medium
                     text-gray-700 transition-colors"
        >
          Reset
        </button>

      </div>

    </div>
  );
};

export default ReportFilters;