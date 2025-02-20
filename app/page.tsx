"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/AsteroidImpactSimulator"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}
