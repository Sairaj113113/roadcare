import ReportCard from './ReportCard';

const ReportList = ({
  reports = [],
  showUser = false,
}) => {

  return (

    <div className="flex flex-col gap-4">

      {reports.map((report, index) => (

        <ReportCard
          key={report.id}
          report={report}
          reportNumber={index + 1}
          showUser={showUser}
        />

      ))}

    </div>
  );
};

export default ReportList;