import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "eMarket. This is Your best Market",
    short_name: "eMarket",
    description: "eMarket. This is Your best Market",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.svg",
        sizes: "40x28",
        type: "image/svg",
      },
    ],
  };
}
