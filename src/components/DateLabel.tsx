"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";

export function DateLabel() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setDate(getBanglaDate()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <small className="text-xs text-gray-500">{date}</small>;
}
