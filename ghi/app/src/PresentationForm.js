import React, { useEffect, useState } from "react";

function PresentationForm() {
  const [presenterName, setPresenterName] = useState("");
  const [presenterEmail, setPresenterEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [conference, setConference] = useState("");
  const [conferences, setConferences] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.presenter_name = presenterName;
    data.presenter_email = presenterEmail;
    data.company_name = companyName;
    data.title = title;
    data.conference = conference;
    data.synopsis = synopsis;
    console.log(data)

    const conferenceId = data.conference;
    const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
    const fetchOptions = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const reponse = await fetch(presentationUrl, fetchOptions);
    if (reponse.ok) {
      setConference("");
      setPresenterName("");
      setPresenterEmail("");
      setCompanyName("");
      setTitle("");
      setSynopsis("");
    }
  };

  const handleChangePresenterName = (event) => {
    const value = event.target.value;
    setPresenterName(value);
  };

  const handleChangePresenterEmail = (event) => {
    const value = event.target.value;
    setPresenterEmail(value);
  };

  const handleChangeCompanyName = (event) => {
    const value = event.target.value;
    setCompanyName(value);
  };

  const handleChangeTitle = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleChangeSynopsis = (event) => {
    const value = event.target.value;
    setSynopsis(value);
  };

  const handleChangeConference = (event) => {
    const value = event.target.value;
    setConference(value);
  };

  return (<div className="row">
  <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
      <h1>Create a new presentation</h1>
      <form onSubmit={handleSubmit} id="create-location-form">
        <div className="form-floating mb-3">
          <input value={presenterName} onChange={handleChangePresenterName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
          <label htmlFor="name">Presenter name</label>
        </div>
        <div className="form-floating mb-3">
          <input value={presenterEmail} onChange={handleChangePresenterEmail} placeholder="Presenter email" required type="email" name="presenterEmail" id="presenterEmail" className="form-control" />
          <label htmlFor="presenterEmail">Presenter email</label>
        </div>
        <div className="form-floating mb-3">
          <input value={companyName} onChange={handleChangeCompanyName} placeholder="Company name" required type="companyName" name="companyName" id="companyName" className="form-control" />
          <label htmlFor="companyName">Company name</label>
        </div>
        <div className="form-floating mb-3">
          <input value={title} onChange={handleChangeTitle} placeholder="Title" required type="title" name="title" id="title" className="form-control" />
          <label htmlFor="title">Title</label>
        </div>
        <div className="mb-3">
              <label htmlFor="description">Synopsis</label>
              <textarea onChange={handleChangeSynopsis} className="form-control" id="synopsis" rows="3" name="synopsis" ></textarea>
            </div>
        <div className="mb-3">
          <select value={conference} onChange={handleChangeConference} required name="conference" id="conference" className="form-select">
            <option value="">Choose a conference</option>
            {conferences.map(conference => {
              return (
                <option key={conference.id} value={conference.id}>
                  {conference.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  </div>
</div>)
}

export default PresentationForm;
