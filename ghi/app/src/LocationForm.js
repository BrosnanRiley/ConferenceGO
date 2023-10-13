import React, { useEffect, useState } from "react";

function LocationForm(props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [states, setLocation] = useState([]);
  const [state, setState] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
  };

  const handleRoomCountChange = (event) => {
    const value = event.target.value;
    setRoomCount(value);
  };

  const handleStateChange = (event) => {
    const value = event.target.value;
    setState(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.room_count = roomCount;
    data.name = name;
    data.city = city;
    data.state = state;
    console.log(data);

    const locationUrl = "http://localhost:8000/api/locations/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      const newLocation = await response.json();
      console.log(newLocation);

      setName("");
      setRoomCount("");
      setCity("");
      setState("");
    }
  };
  const fetchData = async () => {
    const url = "http://localhost:8000/api/states/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocation(data.states);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="shadow p-4 mt-4">
        <h1>Create a new location</h1>
        <form onSubmit={handleSubmit} id="create-location-form">
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
            onChange={handleRoomCountChange}
            placeholder="Room count"
            required
            type="number"
            name="room_count"
            id="room_count"
            className="form-control"
            value={roomCount}
          />

          <input
            onChange={handleCityChange}
            placeholder="City"
            required
            type="text"
            name="city"
            id="city"
            className="form-control"
            value={city}
          />

          <select
            required
            name="state"
            id="state"
            className="form-select"
            onChange={handleStateChange}
            value={state}
          >
            <option value="">Select state</option>
            {states.map((state) => {
              return (
                <option value={state.abbreviation} key={state.abbreviation}>
                  {state.name}
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

export default LocationForm;
