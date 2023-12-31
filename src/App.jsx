import { useState } from "react";
import { MantineProvider, AppShell, Header } from "@mantine/core";
import { SimpleNavBar } from "./Components/SimpleNavBar";
import HomePage from "./Pages/HomePage";
import ShippersPage from "./Pages/ShippersPage";
import ShipperBusinessReviewPage from "./Pages/ShipperBusinessReviewPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  // init shipperdata to prop into shipper biz review page and shipper
  const [shipperData, setShipperData] = useState([
    {
      id: "recjLPXLxSKFtMHGc",
      shipperName: "Coca Cola",
      contactName: "Angela Cruz",
      contactEmail: "angela@cocacola.com",
    },
    {
      id: "recRIiu9EgDBYcjFl",
      shipperName: "Pepsi",
      contactName: "Alex Garcia",
      contactEmail: "alex@pepsi.com",
    },
    {
      id: "reckbrAUovM3FdAYg",
      shipperName: "Tiger Brewery",
      contactName: "Melanie Lee",
      contactEmail: "melanie@tigerbeer.com",
    },
  ]);

  return (
    <MantineProvider
      theme={{
        globalStyles: (theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },

          body: {
            ...theme.fn.fontStyles(),
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },

          ".your-class": {
            backgroundColor: "red",
          },

          "#your-id > [data-active]": {
            backgroundColor: "pink",
          },
        }),
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Router>
        <AppShell
          padding="md"
          navbar={<SimpleNavBar />}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/dashboard/home" />}
            ></Route>
            <Route path="/dashboard/home" element={<HomePage />} />
            <Route
              path="/dashboard/shippers"
              element={
                <ShippersPage
                  shipperData={shipperData}
                  setShipperData={setShipperData}
                />
              }
            />
            <Route
              path="/dashboard/shippers/businessreview/:id"
              element={<ShipperBusinessReviewPage shipperData={shipperData} />}
            />
          </Routes>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;
