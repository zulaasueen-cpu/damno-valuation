"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Алдаа гарлаа</h1>
      <p className="text-muted max-w-md mb-8">
        Уучлаарай, хуудас ачааллах үед алдаа гарлаа. Дахин оролдоно уу.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-primary text-white px-8 py-3.5 font-semibold hover:scale-[1.02] transition-transform"
      >
        Дахин ачааллах
      </button>
    </div>
  );
}
