import { useEffect, useState } from "react";

import Loader from "../components/common/Loader";
import NearbyPotholes from "../components/map/NearbyPotholes";
import LeafletMap from "../components/map/LeafletMap";
import mapService from "../services/mapService";

const MapPage = () => {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [userLocation, setUserLocation] =
    useState({
      lat: null,
      lng: null,
    });

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },

      () => {}
    );

  }, []);

  useEffect(() => {

    const fetchReports = async () => {

      try {

        const data =
          await mapService.getAllPotholes();

        setReports(data || []);

      } catch {

        setError(
          "Failed to load pothole map data."
        );

      } finally {

        setLoading(false);
      }
    };

    fetchReports();

  }, []);

  const handleRefresh = async () => {

    setRefreshing(true);

    try {

      const data =
        await mapService.getAllPotholes();

      setReports(data || []);

    } catch {

      setError("Failed to refresh pothole map.");

    } finally {

      setRefreshing(false);
    }
  };

  if (loading) {
    return <Loader message="Loading map..." />;
  }

  const pendingCount = reports.filter(
    (r) => r.status === "PENDING"
  ).length;

  const resolvedCount = reports.filter(
    (r) => r.status === "RESOLVED"
  ).length;

  const progressCount = reports.filter(
    (r) => r.status === "IN_PROGRESS"
  ).length;

  return (

    <div className="space-y-8 pb-10">

      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden
                   rounded-3xl
                   bg-gradient-to-r
                   from-blue-700
                   to-blue-500
                   px-8 py-7
                   text-white
                   shadow-lg"
      >

        <div className="relative z-10">

          <div
            className="flex flex-col
                       lg:flex-row
                       lg:items-center
                       lg:justify-between
                       gap-6"
          >

            {/* LEFT */}
            <div className="max-w-2xl">

              <h1
                className="text-3xl
                           lg:text-4xl
                           font-extrabold
                           mb-3"
              >
                🗺️ Live Pothole Map
              </h1>

              <p
                className="text-blue-100
                           text-base
                           leading-relaxed"
              >
                Explore real-time pothole reports
                submitted by the community and
                improve road safety across the city.
              </p>

            </div>

            {/* STATS */}
            <div
              className="grid grid-cols-3
                         gap-3"
            >

              <div
                className="bg-white/10
                           backdrop-blur-md
                           rounded-2xl
                           px-5 py-4
                           text-center
                           min-w-[110px]"
              >

                <p className="text-xs text-blue-100">
                  Pending
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {pendingCount}
                </h3>

              </div>

              <div
                className="bg-white/10
                           backdrop-blur-md
                           rounded-2xl
                           px-5 py-4
                           text-center
                           min-w-[110px]"
              >

                <p className="text-xs text-blue-100">
                  Progress
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {progressCount}
                </h3>

              </div>

              <div
                className="bg-white/10
                           backdrop-blur-md
                           rounded-2xl
                           px-5 py-4
                           text-center
                           min-w-[110px]"
              >

                <p className="text-xs text-blue-100">
                  Resolved
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {resolvedCount}
                </h3>

              </div>

            </div>
          </div>
        </div>

        {/* Glow */}
        <div
          className="absolute
                     -top-20
                     -right-20
                     w-72 h-72
                     bg-cyan-300/20
                     rounded-full
                     blur-3xl"
        />

      </section>

      {/* ERROR */}
      {error && (
        <div
          className="bg-red-50
                     border border-red-200
                     text-red-700
                     px-4 py-3
                     rounded-2xl"
        >
          {error}
        </div>
      )}

      {/* MAP SECTION */}
      <section
        className="bg-white
                   rounded-3xl
                   shadow-sm
                   border border-gray-100
                   overflow-hidden
                   max-w-7xl
                   mx-auto"
      >

        {/* HEADER */}
        <div
          className="flex flex-col
                     sm:flex-row
                     sm:items-center
                     sm:justify-between
                     gap-4
                     px-6 py-5
                     border-b border-gray-100"
        >

          <div>

            <h2
              className="text-xl
                         font-bold
                         text-gray-800"
            >
              Live Map Tracking
            </h2>

            <p
              className="text-sm
                         text-gray-500
                         mt-1"
            >
              Monitor nearby potholes in real time
            </p>

          </div>

          {/* REFRESH */}
          <button
            onClick={handleRefresh}
            className="px-5 py-3
                       rounded-2xl
                       bg-blue-600
                       hover:bg-blue-700
                       active:scale-95
                       text-white
                       text-sm
                       font-semibold
                       shadow-md
                       transition-all
                       duration-200"
          >
            {refreshing
              ? "Refreshing..."
              : "🔄 Refresh Map"}
          </button>

        </div>

        {/* MAP */}
        <div className="p-4">

          <div
            className="overflow-hidden
                       rounded-3xl
                       border border-gray-200
                       h-[500px]
                       lg:h-[620px]"
          >

            <LeafletMap
              reports={reports}
              userLocation={userLocation}
              selectedReport={selectedReport}
            />

          </div>

        </div>

      </section>

      {/* NEARBY */}
      <section
        className="bg-white
                   rounded-3xl
                   shadow-sm
                   border border-gray-100
                   p-6
                   max-w-7xl
                   mx-auto"
      >

        <NearbyPotholes
          reports={reports}
          userLat={userLocation.lat}
          userLng={userLocation.lng}
          loading={false}
          error=""
          onSelect={setSelectedReport}
        />

      </section>

    </div>
  );
};

export default MapPage;