"use client";

import { useErrorStore } from "@/store/error.store";
import {
  errorContainer,
  errorText,
  templateContainer,
} from "@/styles/pages/template.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Template({ children }: { children: React.ReactNode }) {
  const error = useErrorStore((state) => state);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {error.message && (
        <div className={errorContainer}>
          <div className={errorText}>{error.message}</div>
        </div>
      )}
    </QueryClientProvider>
  );
}
