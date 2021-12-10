import { useState } from "react";
import Wizard, { WizardContext } from "../components/wizard";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [data, setData] = useState({
    // font defaults
    "--font-primary": "sans-serif",
    "--font-secondary": "sans-serif",
  });

  return (
    <WizardContext.Provider value={{ data, setData }}>
      <Wizard page={<Component {...pageProps} globalData={data} />} />
    </WizardContext.Provider>
  );
}

export default MyApp;
