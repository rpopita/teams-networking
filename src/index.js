import "./style.css";

function $(selector) {
  return document.querySelector(selector);
}

function createTeamRequest(team) {
  fetch("http://localhost:8080/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  });
}

function deleteTeamRequest(id) {
  return fetch("http://localhost:8080/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  }).then(r => r.json());
}

function getTeamAsHTML(team) {
  return ` <tr>
    <td>${team.promotion}</td>
    <td>${team.members}</td>
    <td>${team.name}</td>
    <td>${team.url}</td>
    <td>
      <button data-id="${team.id}" class="delete-btn">X</button>
      <button data-id="${team.id}" class="edit-btn">&#9998;</button>
    </td>
   </tr>`;
}

function renderTeams(teams) {
  const htmlTeams = teams.map(getTeamAsHTML);
  // console.warn(htmlTeams);
  document.querySelector("#teamsTable tbody").innerHTML = htmlTeams.join("");
}

function loadTeams() {
  fetch("http://localhost:8080/teams-json")
    .then(r => r.json())
    .then(renderTeams);
}

function onSubmit(e) {
  e.preventDefault();

  const members = $("#members").value;
  const name = $("input[name=name]").value;
  const url = $("input[name=url]").value;
  const team = {
    promotion: $("#promotion").value,
    members: members,
    name,
    url
  };

  createTeamRequest(team).then(status => {
    console.warn("created", status);
    if (status.success) {
      window.location.reload();
    }
  });
}

function initEvents() {
  $("#teamsForm").addEventListener("submit", onSubmit);

  $("#teamsTable tbody").addEventListener("click", e => {
    if (e.target.matches("a.delete-btn")) {
      // const id = e.target.dataset.id;
      console.warn("delete... %o", id);
      deleteTeamRequest(id).then(status => {
        // console.info("delete status %o", status);
        if (status.success) {
          window.location.reload();
        }
      });
    } else if (e.target.matches("a.edit-btn")) {
      const id = e.target.dataset.id;
      startEdit(id);
    }
  });
}

loadTeams();
initEvents();
