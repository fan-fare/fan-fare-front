"use client";

import { useErrorStore } from "@/store/error.store";
import styles from "./template.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";

const queryClient = new QueryClient();
export default function Template({ children }: { children: React.ReactNode }) {
  const error = useErrorStore((state) => state);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.background}></div>
      <Suspense fallback={<></>}>
        <div className={styles.mainContainer}>{children}</div>
        {error.message && (
          <div className={styles.errorContainer}>
            <div className={styles.errorText}>{error.message}</div>
          </div>
        )}
      </Suspense>
    </QueryClientProvider>
  );
}
