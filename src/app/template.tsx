"use client";

import { useErrorStore } from "@/store/error.store";
import { background, mainContainer } from "@/styles/pages/layout.css";
import { errorContainer, errorText } from "@/styles/pages/template.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();
export default function Template({ children }: { children: React.ReactNode }) {
  const error = useErrorStore((state) => state);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={background}></div>
      <Suspense fallback={<></>}>
        <div className={mainContainer}>{children}</div>
        {error.message && (
          <div className={errorContainer}>
            <div className={errorText}>{error.message}</div>
          </div>
        )}
      </Suspense>
    </QueryClientProvider>
  );
}
