const base_url = 'https://api.football-data.org/'
const API_KEY = '1d29dace5bd04b7fa63eaa17de216795'

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

const loading = () => {
    window.addEventListener('load', function () {
        const loader = document.querySelector('.loader')
        loader.className += ' hidden';
    })
}
loading()


const getMatch = () => {
    if ('caches' in window) {
        caches.match(base_url + "v2/competitions/2021/matches?matchday=1").then(response => {
            if (response) {
                response.json().then(data => {
                    showMatch(data)
                })
            }
        })
    }

    fetchAPI(base_url + 'v2/competitions/2021/matches?matchday=1')
        .then(data => {
            showMatch(data)
        })
}

const showMatch = data => {
    let cards = '';
    data.matches.forEach(e => cards += `
    <tr>
        <td>
            <div class="col m6 s7">
                <div class='row'>
                    <div class="col m8 s10">
                        <p>${e.homeTeam.name}</p>
                    </div>
                    <div class="col s1">
                        <p>${e.score.fullTime.homeTeam}</p>
                    </div>
                </div>
                <div class='row'>
                    <div class="col m8 s10">
                        <p>${e.awayTeam.name}</p>
                    </div>
                    <div class="col s1">
                        <p>${e.score.fullTime.awayTeam}</p>
                    </div>
                </div>
            </div>
            <div class="col  m2 s3 center" style="padding-top: 16px;">
                <p>FT</p>
                <p>${e.utcDate.substring(0, 10)}</p>
            </div>
            <div class="col m4 s2 center status" style="padding-top: 30px; font-weight:bold;">
                <p>${e.status}</p>
            </div>
        </td>   
    </tr>
    <tr>
    <td></td>
    </tr>
        `
    )
    document.getElementById('match').innerHTML = cards
}

const getTeam = () => {
    if ('caches' in window) {
        caches.match(base_url + "v2/competitions/2021/teams").then(response => {
            if (response) {
                response.json().then(data => {
                    showTeams(data)
                });
            }
        })
    }

    fetchAPI(base_url + 'v2/competitions/2021/teams')
        .then(data => {
            showTeams(data)
        });
}

const showTeams = data => {
    let cards = '';
    data.teams.forEach(data => {
        cards += (
            `<tr>                 
                <td class="col m2">
                    <img src=${data.crestUrl}>       
                </td>
                <td class="col m8">
                <a href="./infoTeam.html?id=${data.id}">
                    <h5>${data.name}</h5>
                </a> 
                </td>
            </tr>`
        )
    })
    document.getElementById("team").innerHTML = cards;
}

const getTeamId = () => {
    return new Promise(function (resolve, reject) {
        // Mengambil nilai query parameter (?id=)
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(base_url + 'v2/teams/' + idParam).then(response => {
                if (response) {
                    response.json().then(data => {
                        showTeamId(data)
                        resolve(data);
                    });
                }
            })
        }

        fetchAPI(base_url + 'v2/teams/' + idParam)
            .then(data => {
                showTeamId(data)
                resolve(data)
            });
    });
}

const showTeamId = data => {
    let cards = (
        `<div class="row">
            <div class="col s12 m9 l6">
                <div class="card">
                    <div class='row' style='padding:12px 0;'>
                    <div class="card-image col m5 s5">
                        <img src=${data.crestUrl}>
                    </div>
                    <div class="card-content col m7 s6">
                        <h5>${data.name}</h5>
                        <p>Short Name: ${data.shortName}</p>              
                        <p>Founded: ${data.founded}</p>
                        <p>Stadium: ${data.venue}</p>
                        <p>Club Colors: ${data.clubColors}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>`
    )
    document.getElementById("info-team").innerHTML = cards;
}


const getFavoriteTeam = () => {
    getAll().then(teams => {
        let cards = "";
        teams.forEach(data => {
            cards += `
                <tr>                 
                    <td class="col m2 s2">
                        <img src=${data.crestUrl}>       
                    </td>
                    <td class="col m8 s8">
                    <a href="./infoTeam.html?id=${data.id}&favorite=true">
                        <h5>${data.name}</h5>
                    </a> 
                    </td>
                    <td class="col m1 s2" style='padding-top:18px;'>
                        <a id=${data.id} class='btn-flat red-text removeTeam'>delete</a>     
                    </td>
                </tr>
        `;

        })
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("favorite").innerHTML = cards;

        const removeTeam = document.querySelectorAll(".removeTeam");
        removeTeam.forEach(remove => {
            remove.addEventListener("click", function (event) {
                deleteTeam(event.target.id).then(() => {
                    getFavoriteTeam()
                    console.log('item deleted')
                })

            })
        })
    });


}

const getFavoriteTeamId = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getId(idParam).then(data => {
        let cards = `
            <div class="row">
                <div class="col s12 m9 l6">
                    <div class="card">
                        <div class='row' style='padding:12px 0;'>
                        <div class="card-image col m5 s5">
                            <img src=${data.crestUrl}>
                        </div>
                        <div class="card-content col m7 s6 center">
                            <h5>${data.name}</h5>
                            <p>Short Name: ${data.shortName}</p>              
                            <p>Founded: ${data.founded}</p>
                            <p>Stadium: ${data.venue}</p>
                            <p>Club Colors: ${data.clubColors}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("info-team").innerHTML = cards;
    });
}


