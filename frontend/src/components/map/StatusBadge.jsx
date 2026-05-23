const StatusBadge = ({ status, size = 'sm' }) => {

  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    resolved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    inprogress: 'bg-blue-100 text-blue-700',
  };

  const normalizedStatus =
    status?.toLowerCase().replace(/\s/g, '') || 'pending';

  return (
    <span
      className={`
        inline-flex items-center rounded-full
        px-2 py-1 text-xs font-medium
        ${styles[normalizedStatus] || 'bg-gray-100 text-gray-700'}
      `}
    >
      {status || 'Pending'}
    </span>
  );
};

export default StatusBadge;