/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const base_url = "https://api.football-data.org/v2/";
const id_liga = 2021; // PREMIERE LEAGUE
const endpoint_klasemen = `${base_url}competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_jadwal = `${base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=20`;
const endpoint_match = `${base_url}matches/`;
const endpoint_team = `${base_url}teams/`;
const endpoint_player = `${base_url}players/`;

const fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '76c42880bbf94dd79cd1ce5ed22a86e7'
        }
    });
}

const status = response => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

const json = response => {
    return response.json();
}

const error = error => {
    console.log("Error : " + error);
}

const getKlasemen = () => {
    if ('caches' in window) {
        caches.match(endpoint_klasemen).then( response => {
            if (response) {
                response.json().then( data => {
                    hasilKlasemenJSON(data);
                });
            }
        });
    }

    fetchApi(endpoint_klasemen)
        .then(status)
        .then(json)
        .then(data => {
            hasilKlasemenJSON(data)
        })
        .catch(error);
}

const getMatchLeague = () => {
    return new Promise( (resolve, reject) => {

        if ('caches' in window) {
            caches.match(endpoint_jadwal).then( response => {
                if (response) {
                    response.json().then( data => {
                        resultMatchJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_jadwal)
            .then(status)
            .then(json)
            .then( data => {
                resultMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

const getDetailTeamById = () => {
    return new Promise( (resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        let dataSquadHTML = ''
        let tableSquadHTML = ''
        if ("caches" in window) {
            caches.match(endpoint_team + idParam).then( response => {
                if (response) {
                    response.json().then(data => {
                        resultDetailTeamJSON(data)
                        data.squad.forEach( (squad, index) => {
                            dataSquadJSON = squad;
                            dataSquadHTML += `
                            <tr>
                                <td><a href="./detailplayer.html?id=${squad.id}"> ${squad.name}</a></td>
                                <td >${squad.position}</td>
                            </tr>`
                        });
                        tableSquadHTML += `<table><tbody> ${dataSquadHTML}  </tbody></table>`
                        document.getElementById("squad").innerHTML = tableSquadHTML;
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(endpoint_team + idParam)
            .then(status)
            .then(json)
            .then( data => {
                resultDetailTeamJSON(data)
                dataTeamJSON = data;
                data.squad.forEach( (squad, index) => {
                    dataSquadJSON = squad;
                    dataSquadHTML += `
                    <tr>
                        <td>${index+1}. </td>
                        <td><a href="./detail_player.html?id=${squad.id}"> ${squad.name}</a></td>
                        <td>${squad.position}</td>
                    </tr>`
                });
                tableSquadHTML += `
                <table>
                    <thead>
                        <tr>
                            <td class="a-font-bold">No</td>
                            <td class="a-font-bold">Name</td>
                            <td class="a-font-bold">Position</td>
                        </tr>
                    </thead>
                    <tbody> ${dataSquadHTML}  </tbody>
                </table>`

                document.getElementById("squad").innerHTML = tableSquadHTML;
                resolve(data);
            })
            .catch(error);
    });
}

const getDetailPlayerById = () => {
    return new Promise( (resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_player + idParam).then( (response) => {
                if (response) {
                    response.json().then( (data) => {
                        resultDetailPlayerJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(endpoint_player + idParam)
            .then(status)
            .then(json)
            .then( data => {
                resultDetailPlayerJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

const getDetailMatchById = () => {
    return new Promise( (resolve, reject) => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        if ('caches' in window) {
            caches.match(endpoint_match + idParam).then( response => {
                if (response) {
                    response.json().then( (data) => {
                        resultDetailMatchJSON(data);
                        resolve(data)
                    });
                }
            });
        }
        fetchApi(endpoint_match + idParam)
            .then(status)
            .then(json)
            .then( data => {
                resultDetailMatchJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}