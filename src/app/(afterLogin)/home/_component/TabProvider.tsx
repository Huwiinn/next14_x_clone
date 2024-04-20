"use client";

import { createContext, ReactNode, useState } from "react";

type Props = { children: ReactNode };

export const TabContext = createContext({
  tab: "rec",
  setTab: (value: "rec" | "fol") => {},
});

const TabProvider = ({ children }: Props) => {
  const [tab, setTab] = useState("rec");

  console.log("TabProvider tab : ", tab);

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
