import GoogleMapReact from "google-map-react";
import { getArchiInfo } from "../api/googlemap";
import { useEffect } from "react";
const Map = () => {
  const coords = {
    lat: 0,
    lng: 0,
  };
  useEffect(() => {
    const jewishMuseumBerlin = async () => {
      const res = await getArchiInfo();
      console.log(res);
    };
    jewishMuseumBerlin();
  }, []);
  return (
    <div className="w-screen h-screen">
      <div></div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_API }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={12}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
