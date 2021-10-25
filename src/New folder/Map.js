import React from "react";

const Map = () => {
  let mobils = [
    {
      name: "toyota",
      year: 1991,
    },
    {
      name: "nissan",
      year: 1991,
    },
    {
      name: "bliz",
      year: 1991,
    },
  ];

  return (
    <div>
      <h2>adlfkj</h2>

      <ul>
        {mobils.map((mobil) => (
          <li>{mobil.name}</li>
        ))}
      </ul>

      <h2>adlfkj</h2>
    </div>
  );
};

export default Map;
