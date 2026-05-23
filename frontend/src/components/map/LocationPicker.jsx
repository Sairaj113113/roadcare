import { useState } from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import useLocationHook from '../../hooks/useLocation';

/* RECENTER MAP */
const RecenterMap = ({ lat, lng }) => {

  const map = useMap();

  if (lat && lng) {

    map.setView([lat, lng], 19);
  }

  return null;
};

/* MAP CLICK HANDLER */
const MapClickHandler = ({ onSelect }) => {

  const [position, setPosition] = useState(null);

  useMapEvents({

    click(e) {

      const lat = Number(e.latlng.lat.toFixed(6));
      const lng = Number(e.latlng.lng.toFixed(6));

      setPosition([lat, lng]);

      onSelect({
        lat,
        lng,
      });
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
};

const LocationPicker = ({
  latitude,
  longitude,
  onLocation,
  error = '',
  disabled = false,
}) => {

  const {
    location,
    loading,
    error: gpsError,
    getLocation,
  } = useLocationHook();

  const [showMapPicker, setShowMapPicker] = useState(false);

  /* MANUAL LATITUDE */
  const handleManualLat = (e) => {

    const val = parseFloat(e.target.value);

    if (!isNaN(val)) {

      onLocation({
        lat: val,
        lng: longitude ?? 0,
      });
    }
  };

  /* MANUAL LONGITUDE */
  const handleManualLng = (e) => {

    const val = parseFloat(e.target.value);

    if (!isNaN(val)) {

      onLocation({
        lat: latitude ?? 0,
        lng: val,
      });
    }
  };

  const hasLocation =
    latitude != null && longitude != null;

  return (

    <div className="space-y-4">

      {/* PICK LOCATION BUTTON */}
      <button
        type="button"
        onClick={async () => {

          if (!location) {

            await getLocation();
          }

          setTimeout(() => {

            setShowMapPicker((prev) => !prev);

          }, 500);
        }}
        disabled={disabled}
        className="btn-secondary w-full
                   flex items-center justify-center gap-2"
      >
        🗺️ Pick Exact Location on Map
      </button>

      {/* MAP + INFO */}
      {showMapPicker && (

        <div
          className="flex flex-col lg:flex-row
                     gap-4 items-stretch"
        >

          {/* INFO BOX */}
          <div
            className="lg:w-80
                       bg-white border border-gray-200
                       rounded-2xl p-5
                       shadow-sm"
          >

            <h3
              className="text-lg font-bold
                         text-gray-800 mb-4"
            >
              How to Select Location
            </h3>

            <div className="space-y-3 text-sm text-gray-600">

              <p>
                1. Map opens near your area
              </p>

              <p>
                2. Tap exact pothole point
              </p>

              <p>
                3. Coordinates autofill
              </p>

            </div>

            {/* OR */}
            <div className="flex items-center gap-3 my-5">

              <div className="flex-1 h-px bg-gray-200" />

              <span
                className="text-xs text-gray-400
                           font-medium"
              >
                OR
              </span>

              <div className="flex-1 h-px bg-gray-200" />

            </div>

            {/* DETECT BUTTON */}
            <button
              type="button"
              onClick={async () => {

                await getLocation();

                if (location) {

                  onLocation({
                    lat: Number(location.lat.toFixed(6)),
                    lng: Number(location.lng.toFixed(6)),
                  });
                }
              }}
              disabled={loading || disabled}
              className="w-full bg-primary-600
                         hover:bg-primary-700
                         text-white rounded-xl
                         px-4 py-3
                         text-sm font-medium
                         transition"
            >

              {loading
                ? 'Detecting nearby area...'
                : '📍 Detect Nearby Area'}

            </button>

          </div>

          {/* MAP */}
          <div className="flex-1">

            <div
              className="h-[350px]
                         rounded-2xl overflow-hidden
                         border border-gray-200"
            >

              <MapContainer
                center={[
                  location?.lat || 17.3850,
                  location?.lng || 78.4867,
                ]}
                zoom={19}
                scrollWheelZoom={true}
                className="h-full w-full"
              >

                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* CURRENT LOCATION */}
                {location?.lat && location?.lng && (

                  <Marker
                    position={[
                      location.lat,
                      location.lng,
                    ]}
                  />

                )}

                {/* RECENTER */}
                <RecenterMap
                  lat={location?.lat}
                  lng={location?.lng}
                />

                {/* CLICK LOCATION */}
                <MapClickHandler
                  onSelect={({ lat, lng }) => {

                    onLocation({
                      lat,
                      lng,
                    });

                    setShowMapPicker(false);
                  }}
                />

              </MapContainer>

            </div>

          </div>

        </div>
      )}

      {/* GPS ERROR */}
      {gpsError && (
        <p
          className="text-sm text-amber-700
                     bg-amber-50 border border-amber-200
                     rounded-lg px-3 py-2"
        >
          ⚠️ {gpsError}
        </p>
      )}

      {/* SELECTED LOCATION */}
      {hasLocation && (
        <div
          className="bg-primary-50 border border-primary-200
                     rounded-lg px-4 py-3"
        >

          <p
            className="text-xs font-semibold
                       text-primary-700 mb-1"
          >
            📍 Location Selected
          </p>

          <p
            className="text-sm text-primary-800
                       font-mono"
          >
            {Number(latitude).toFixed(6)},
            {' '}
            {Number(longitude).toFixed(6)}
          </p>

        </div>
      )}

      {/* MANUAL COORDINATES */}
      <details className="group">

        <summary
          className="text-xs text-gray-500
                     cursor-pointer hover:text-gray-700
                     select-none list-none
                     flex items-center gap-1"
        >

          <span
            className="group-open:rotate-90
                       transition-transform inline-block"
          >
            ▶
          </span>

          &nbsp;Enter coordinates manually

        </summary>

        <div className="mt-2 grid grid-cols-2 gap-3">

          <div>

            <label className="form-label text-xs">
              Latitude
            </label>

            <input
              type="number"
              step="0.000001"
              min="-90"
              max="90"
              value={
                latitude != null
                  ? Number(latitude).toFixed(6)
                  : ''
              }
              onChange={handleManualLat}
              placeholder="17.385000"
              className="form-input text-sm"
              disabled={disabled}
            />

          </div>

          <div>

            <label className="form-label text-xs">
              Longitude
            </label>

            <input
              type="number"
              step="0.000001"
              min="-180"
              max="180"
              value={
                longitude != null
                  ? Number(longitude).toFixed(6)
                  : ''
              }
              onChange={handleManualLng}
              placeholder="78.486700"
              className="form-input text-sm"
              disabled={disabled}
            />

          </div>

        </div>

      </details>

      {/* ERROR */}
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

    </div>
  );
};

export default LocationPicker;