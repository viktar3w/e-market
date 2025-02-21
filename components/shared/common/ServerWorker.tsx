"use client";

import { useEffect } from "react";

const ServerWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then(() => console.log("Service Worker зарегистрирован"))
          .catch((error) => console.error("Ошибка регистрации SW:", error));
      }
    }
  }, []);
  return <></>;
};

export default ServerWorker;
