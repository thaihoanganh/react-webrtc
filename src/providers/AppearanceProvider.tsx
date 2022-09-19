import React, {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

interface AppearanceState {
  colorScheme: "light" | "dark";
}

export interface AppearanceContextValue extends AppearanceState {
  setColorScheme: (colorScheme: "light" | "dark") => void;
}

export const AppearanceContext = createContext<AppearanceContextValue>(
  {} as AppearanceContextValue
);

export const AppearanceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [appearanceValue, setAppearanceValue] = useState<AppearanceState>({
    colorScheme: "dark",
  });

  const AppearanceContextValue: AppearanceContextValue = useMemo(
    () => ({
      ...appearanceValue,
      setColorScheme: (colorScheme) => {
        setAppearanceValue((prevState) => ({
          ...prevState,
          colorScheme,
        }));
      },
    }),
    []
  );

  return (
    <AppearanceContext.Provider value={AppearanceContextValue}>
      {children}
    </AppearanceContext.Provider>
  );
};

export default AppearanceProvider;
