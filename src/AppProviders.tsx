import React, { FC, PropsWithChildren } from "react";
import { AppearanceProvider, PeerProvider } from "./providers";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PeerProvider>
      <AppearanceProvider>{children}</AppearanceProvider>
    </PeerProvider>
  );
};

export default AppProviders;
