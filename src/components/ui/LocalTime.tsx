"use client";

import { useEffect, useState } from "react";

// The current time in Davao, so teams in other time zones can see when I'm around.
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "2-digit",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ? `${time} in Davao (UTC+8)` : "Davao (UTC+8)"}</span>;
}
