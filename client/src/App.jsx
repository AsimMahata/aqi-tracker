import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoadingBackend } from "./components/LoadingBackend";
import MapView from "./pages/MapView";
import { AboutAQI } from "./pages/AboutAQI";
import { Contact } from "./pages/Contact";
import { Rankings } from "./pages/Rankings";
import { NotFound } from "./pages/NotFound";
import { MoreInfo } from "./pages/MoreInfo";
import { History } from "./pages/History";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCity, setCurrentCity] = useState(null);

  const [backendReady, setBackendReady] = useState(false);

  if (!backendReady) {
    return <LoadingBackend onReady={() => setBackendReady(true)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar setSearchQuery={setSearchQuery} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <MapView
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setCurrentCity={setCurrentCity}
                />
              }
            />
            <Route path="/AboutAQI" element={<AboutAQI />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route
              path="/history"
              element={<History currentCity={currentCity} />}
            />
            <Route
              path="/MoreInfo"
              element={<MoreInfo currentCity={currentCity} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
