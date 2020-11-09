/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const resultMatchJSON = data => {
  let JadwalHTML = ''
  data.matches.forEach( match => {
    JadwalHTML += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div center-align>
              <h5 class="center-align">Matchday : ${match.matchday}</h5>
              <div class="center-align">Kick Off : ${convertDate(new Date(match.utcDate))}</div>
              <hr>
              <div class="row" style="margin:20px">
                <div class="row center-align">
                  <span class="blue-text">  ${match.homeTeam.name}</span>
                </div>
                <div class="row">
                  VS
                </div>
                <div class="row center-align">
                  <span class="blue-text">  ${match.awayTeam.name}</span>
                </div>
              </div>
              <hr>
              <div class="center-align">
                <a class="green waves-effect waves-light btn" href="./detail_match.html?id=${match.id}">Lihat Detail</a>
              </div>
            </div>
          </div>
        </div>
      </div>`
  });
  document.getElementById("jadwal-content").innerHTML = JadwalHTML;
}