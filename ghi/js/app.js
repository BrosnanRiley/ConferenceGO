function convertDate(longDate) {
    const dateObject = new Date(longDate);
    const month = dateObject.getMonth();
    const day = dateObject.getDate();
    const year = dateObject.getFullYear() % 100;
    return `${month}/${day < 10 ? '0' : ''}${day}/${year < 10 ? '0': ''}${year}`;
}



function createCard(title, description, pictureUrl, startDate, endDate, location) {
    const starts = convertDate(startDate);
    const ends = convertDate(endDate);
    return `
      <div class="col-md-4 mb-3">
        <div class="card shadow">
          <img src="${pictureUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="text-muted">${location} </p>
            <p class="card-text">${description}</p>
            <div class="card-footer bg-grey border-secondary-light">${starts} - ${ends}</div>
          </div>
        </div>
      </div>
    `;
  }


  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        const error = `<div class="alert alert-danger" role="alert">
        Sorry, an error has occured! Please reload the page
      </div>`;
      const row = document.querySelector('#conferences-row');
            row.innerHTML += error;

      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const startDate = details.conference.starts;
            const endDate = details.conference.ends;
            const location = details.conference.location.name;
            const html = createCard(title, description, pictureUrl, startDate, endDate, location);
            const row = document.querySelector('#conferences-row');
            row.innerHTML += html;
            console.log(details)
          }
        }

      }
    } catch (e) {
        const error = `<div class="alert alert-danger" role="alert">
        Sorry, an error has occured! Please reload the page
      </div>`;
      const row = document.querySelector('#conferences-row');
            row.innerHTML += error;
    }

  });
