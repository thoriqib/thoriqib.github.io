/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const databasePromise = idb => {
    const dbPromise = idb.open("db_footballpwa", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team_favorit")) {
            const indexFavTeam = upgradeDb.createObjectStore("team_favorit", {
                keyPath: "id"
            });
            indexFavTeam.createIndex("nameTeam", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("player_favorit")) {
            const indexFavPlayer = upgradeDb.createObjectStore("player_favorit", {
                keyPath: "id"
            });
            indexFavPlayer.createIndex("namePlayer", "name", {
                unique: false
            });
        }

        if (!upgradeDb.objectStoreNames.contains("match_favorit")) {
            const indexFavMatch = upgradeDb.createObjectStore("match_favorit", {
                keyPath: "id"
            });
            indexFavMatch.createIndex("homeTeam", "match.homeTeam.name", {
                unique: false
            });
            indexFavMatch.createIndex("awayTeam", "match.awayTeam.name", {
                unique: false
            });
        }
    });

    return dbPromise;
}

const checkData = (storeName, id) => {
    return new Promise( (resolve, reject) => {
        databasePromise(idb)
            .then( db => {
                const tx = db.transaction(storeName, "readonly");
                const store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then( data => {
                if (data != undefined) {
                    resolve("Data favorit")
                } else {
                    reject("Bukan data favorit")
                }
            });
    });
}

const createDataFav = (dataType, data) => {
    let storeName = "";
    let dataToCreate = {}
    if (dataType == "player") {
        storeName = "player_favorit";
        dataToCreate = {
            id: data.id,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            counrtyOfBirth: data.counrtyOfBirth,
            nationality: data.nationality,
            position: data.position
        }
    } else if (dataType == "team") {
        storeName = "team_favorit"
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    } else if (dataType == "match") {
        storeName = "match_favorit"
        dataToCreate = {
            id: data.match.id,
            head2head: {
                numberOfMatches: data.head2head.numberOfMatches,
                totalGoals: data.head2head.totalGoals,
                homeTeam: {
                    wins: data.head2head.homeTeam.wins,
                    draws: data.head2head.homeTeam.draws,
                    losses: data.head2head.homeTeam.losses
                },
                awayTeam: {
                    wins: data.head2head.awayTeam.wins,
                    draws: data.head2head.awayTeam.draws,
                    losses: data.head2head.awayTeam.losses
                }
            },
            match: {
                utcDate: data.match.utcDate,
                venue: data.match.venue,
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    }

    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then( () => {
        document.getElementById("iconFav").classList.add('fas');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = " Favorit";
        M.toast({
            html: 'Berhasil Difavoritkan!'
        });
    }).catch( () => {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

const deleteDatafav = (storeName, data) => {
    databasePromise(idb).then( db => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then( () => {
        document.getElementById("iconFav").classList.remove('fas');
        document.getElementById("iconFav").classList.add('far');
        document.getElementById("iconFav").classList.add('fa-star');
        document.getElementById("iconFav").innerHTML = " Tambah Ke Favorit";
        M.toast({
            html: 'Data berhasil dihapus dari Favorit!'
        });
    }).catch( () => {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

const getSavedDataById = (dataType) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = Number(urlParams.get("id"));

    if (dataType == "team") {
        let dataSquadHTML = ''
        let tableSquadHTML = ''
        getDataById("team_favorit", idParam).then( (team) => {
            resultDetailTeamJSON(team)
            dataTeamJSON = team;
            team.squad.forEach( (squad) => {
                dataSquadJSON = squad;
                dataSquadHTML += `
                <tr>
                    <td>
                    <a href="./detail_player.html?id=${squad.id}"> ${squad.name}</a>
                    </td>
                    <td >${squad.position}</td>
                </tr>
                `
            });
            tableSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`
            document.getElementById("squad").innerHTML = tableSquadHTML;
        })
    } else if (dataType == "player") {
        getDataById("player_favorit", idParam).then( (player) =>  {
            resultDetailPlayerJSON(player);
        });
    } else if (dataType == "match") {
        getDataById("match_favorit", idParam).then( (match) => {
            resultDetailMatchJSON(match);
        });
    }
}

const getDataById = (storeName, id) => {
    return new Promise( (resolve, reject) => {
        databasePromise(idb)
            .then( (db) =>{
                const tx = db.transaction(storeName, "readonly");
                const store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then( (data) => {
                resolve(data);
            });
    });
}

const getAllData = (storeName) => {
    return new Promise( (resolve, reject) => {
        databasePromise(idb)
            .then( (db) => {
                const tx = db.transaction(storeName, "readonly");
                const store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then( (data) => {
                resolve(data);
            });
    });
}

const readDataFavHtml = (dataType) => {
    if (dataType == "team") {
        getAllData("team_favorit").then( data => {
            resultTeamFav(data);
        });
    } else if (dataType == "player") {
        getAllData("player_favorit").then( data => {
            resultPlayerFav(data);
        });
    } else if (dataType == "match") {
        getAllData("match_favorit").then( data => {
            resultMatchFav(data);
        });
    }
}