"use client";

import { createContext, ReactNode, useState } from "react";

type Props = { children: ReactNode };

type HomeIndicator = "rec" | "fol";

export const TabContext = createContext({
  tab: "rec",
  setTab: (value: "rec" | "fol") => {},
});

const TabProvider = ({ children }: Props) => {
  const [tab, setTab] = useState<HomeIndicator>("rec");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
