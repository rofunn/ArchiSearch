import GoogleMapReact from "google-map-react";
import { getArchiImage, getArchiInfo } from "../api/googlemap";
import { useEffect, useState } from "react";
const Map = () => {
  const [img, setImg] = useState("");

  const coords = {
    lat: 0,
    lng: 0,
  };
  const image = async () => {
    const response = await getArchiImage();
    setImg(response?.data);
  };
  useEffect(() => {
    const jewishMuseumBerlin = async () => {
      const res = await getArchiInfo();
      console.log(res);
    };
    jewishMuseumBerlin();
    image();
  }, []);

  return (
    <div className="w-screen h-screen">
      <div>
        <img src={`data:image/jpeg;base64,${img}`} />
      </div>
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
