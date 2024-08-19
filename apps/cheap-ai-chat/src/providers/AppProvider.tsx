'use client';

export interface AppProviderProps {
  baseApiUrl: string;
  children?: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <>{children}</>;
}
