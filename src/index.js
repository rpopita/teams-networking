import "./style.css";

console.warn("start app");

function getTeamAsHTML(team) {
  return ` <tr>
    <td>${team.promotion}</td>
    <td>${team.members}</td>
    <td>${teams.name}</td>
    <td>${team.url}</td>
    <td>x</td>
   </tr>`;
}

function renderTeams(teams) {
  const htmlTeams = teams.map(getTeamsAsHTML);
  console.warn(htmlTeams);
  document.querySelectorAll("#teamsTable tbody").innerHTML = htmlTeams.join("");
}

function loadTeams() {
  fetch("teams.json")
    .then(r => r.json())
    .then(renderTeams);
}

loadTeams();
