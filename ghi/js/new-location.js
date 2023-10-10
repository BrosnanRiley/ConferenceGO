window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const selectTag = document.getElementById("state");
      console.log(selectTag);
      for (let state of data.states) {
          const option = document.createElement('option');
          option.value = state.abbreviation;
          option.innerHTML = state.name;
          selectTag.appendChild(option);
      }
    } else {
    }
  });
