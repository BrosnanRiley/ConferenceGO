import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendConferenceForm from "./AttendConferenceForm";
import PresentationForm from "./PresentationForm";
import MainPage from "./MainPage";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />

          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>

          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>

          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="attendees">
            <Route
              path=""
              element={<AttendeesList attendees={props.attendees} />}
            />
          </Route>

          <Route path="presentation">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
