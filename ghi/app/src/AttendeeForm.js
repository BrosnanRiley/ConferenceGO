import React, { useEffect, useState } from "react";

function AttendeeForm(props) {
  const [name, setName] = useState("");
  const [conferences, setConferences] = useState([]);
  const [conference, setConference] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleConferenceChange = (event) => {
    const value = event.target.value;
    setConference(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.email = email;
    data.conference = conference;
    console.log(data);

    const attendeeUrl = "http://localhost:8001/api/attendees/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(attendeeUrl, fetchConfig);
    if (response.ok) {
      const newAttendee = await response.json();
      console.log(newAttendee);

      setName("");
      setEmail("");
      setConference("");
    }
  };
  const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let spinnerClasses = "d-flex justify-content-center mb-3";
  let dropdownClasses = "form-select d-none";
  if (conferences.length > 0) {
    spinnerClasses = "d-flex justify-content-center mb-3 d-none";
    dropdownClasses = "form-select";
  }

  return (
    <>
      <div className="shadow p-4 mt-4">
        <h1>It's Conference Time</h1>
        <form onSubmit={handleSubmit} id="create-attendee-form">
          <img
            width="300"
            className="bg-white rounded shadow d-block mx-auto mb-4"
            src="/logo.svg"
          />
          <select
            required
            name="conference"
            id="conference"
            className="form-select"
            onChange={handleConferenceChange}
            value={conference}
          >
            <option value="">Choose a conference</option>
            {conferences.map((conference) => {
              return (
                <option value={conference.href} key={conference.href}>
                  {conference.name}
                </option>
              );
            })}
          </select>

          <p className="mb-3">Now, tell us about yourself.</p>

          <input
            onChange={handleNameChange}
            placeholder="Name"
            required
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={name}
          />

            <input
            onChange={handleEmailChange}
            placeholder="email"
            required
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
          />
          <button className="btn btn-primary">I'm going!</button>
        </form>
      </div>
    </>
  );
}
export default AttendeeForm;
