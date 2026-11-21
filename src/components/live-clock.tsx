"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

function formatJakartaTime() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "";
  }
}

export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatJakartaTime());
    const id = setInterval(() => setTime(formatJakartaTime()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="live-time" suppressHydrationWarning>
      {time ? `${time} WIB` : "UTC+7"}
    </span>
  );
}
