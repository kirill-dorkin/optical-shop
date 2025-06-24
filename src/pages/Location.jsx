import React from "react";

const Location = () => {
  return (
    <div className="w-full h-[70vh] flex justify-center items-center py-4">
      <iframe
        title="map"
        src="https://yandex.ru/map-widget/v1/?ll=74.5698%2C42.8746&z=16"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Location;
