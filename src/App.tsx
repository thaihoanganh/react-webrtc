import { MantineProvider } from "@mantine/core";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./pages/Client";
import Owner from "./pages/Owner";
import { AppearanceContext } from "./providers";

const App = () => {
  const { colorScheme } = useContext(AppearanceContext);

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/owner" element={<Owner />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
