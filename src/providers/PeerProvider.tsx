import React, {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { Peer } from "peerjs";

interface PeerState {
  peerInstance: Peer;
}

export interface PeerContextValue extends PeerState {}

export const PeerContext = createContext<PeerContextValue>(
  {} as PeerContextValue
);

export const PeerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [peerValue, setPeerValue] = useState<PeerState>(() => {
    const peerInstance = new Peer();

    return {
      peerInstance,
    };
  });

  const peerContextValue: PeerContextValue = useMemo(
    () => ({
      ...peerValue,
    }),
    []
  );

  return (
    <PeerContext.Provider value={peerContextValue}>
      {children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;
