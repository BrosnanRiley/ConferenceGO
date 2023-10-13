import React, { useEffect, useState } from "react";

function ConferenceForm(props) {
  const [name, setName] = useState("");
  const [locations, setLocation] = useState([]);
  const [location, setConferenceLocation] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [description, setDescription] = useState("");
  const [maxPresentations, setMaxPresentations] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleConferenceLocationChange = (event) => {
    const value = event.target.value;
    setConferenceLocation(value);
  };

  const handleStartsChange = (event) => {
    const value = event.target.value;
    setStarts(value);
  };

  const handleEndsChange = (event) => {
    const value = event.target.value;
    setEnds(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleMaxPresentationsChange = (event) => {
    const value = event.target.value;
    setMaxPresentations(value);
  };

  const handleMaxAttendeesChange = (event) => {
    const value = event.target.value;
    setMaxAttendees(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.starts = starts;
    data.ends = ends;
    data.description = description;
    data.max_presentations = maxPresentations;
    data.max_attendees = maxAttendees;
    data.location = location;
    console.log(data);

    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);

      setName("");
      setConferenceLocation("");
      setStarts("");
      setEnds("");
      setDescription("");
      setMaxPresentations("");
      setMaxAttendees("");
    }
  };
  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocation(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="shadow p-4 mt-4">
        <h1>Create a new conference</h1>
        <form onSubmit={handleSubmit} id="create-conference-form">
          <input
            onChange={handleNameChange}
            placeholder="Name"
            required
            type="name"
            name="name"
            id="name"
            className="form-control"
            value={name}
          />

          <input
            onChange={handleStartsChange}
            placeholder="starts"
            required
            type="date"
            name="starts"
            id="starts"
            className="form-control"
            value={starts}
          />

          <input
            onChange={handleEndsChange}
            placeholder="ends"
            required
            type="date"
            name="ends"
            id="ends"
            className="form-control"
            value={ends}
          />

          <input
            onChange={handleDescriptionChange}
            placeholder="description"
            required
            type="textarea"
            name="description"
            id="description"
            className="form-control"
            value={description}
          />

          <input
            onChange={handleMaxPresentationsChange}
            placeholder="max_presentations"
            required
            type="number"
            name="max_presentations"
            id="max_presentations"
            className="form-control"
            value={maxPresentations}
          />
          <input
            onChange={handleMaxAttendeesChange}
            placeholder="max_attendees"
            required
            type="number"
            name="max_attendees"
            id="Max_attendees"
            className="form-control"
            value={maxAttendees}
          />

          <select
            required
            name="location"
            id="location"
            className="form-select"
            onChange={handleConferenceLocationChange}
            value={location}
          >
            <option value="">Select location</option>
            {locations.map((location) => {
              return (
                <option value={location.id} key={location.id}>
                  {location.name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </>
  );
}
export default ConferenceForm;
