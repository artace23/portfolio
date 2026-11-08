"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// Shows the current time in the Philippines, handy for clients and teams in other time zones.
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

  return (
    <p className="inline-flex items-center gap-2 text-sm text-muted min-h-5">
      <Clock className="w-4 h-4" />
      {time ? <span>{time} in the Philippines (UTC+8)</span> : <span>Philippines (UTC+8)</span>}
    </p>
  );
}
