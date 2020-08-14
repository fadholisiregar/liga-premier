// Membuat Database (CREATE)
const dbPromised = idb.open("favorite-teams", 1, upgradeDb => {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

// Menyimpan tim favorit (INSERT)
const saveFavorite = team => {
    dbPromised.then(db => {
        let tx = db.transaction('teams', 'readwrite')
        let store = tx.objectStore('teams');
        console.log(team);
        store.add(team);
        return tx.complete;
    })
        .then(() => {
            SaveNotification()
            console.log('Item berhasil disimpan')
        })
        .catch(() => {
            console.log('Item gagal disimpan')
        })
}

// Mengambil atau Membaca data tim favorit (READ)
const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(team => {
                resolve(team);
            });
    });
}

// Mengambil atau Membaca id tim favorit (READ)
const getId = id => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(parseInt(id));
            })
            .then(team => {
                resolve(team);
            });
    });
}


// Mengahpus team favorit (DELETE)
const deleteTeam = teamId => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", 'readwrite');
                tx.objectStore("teams").delete(parseInt(teamId));
                return tx;
            }).then(tx => {
                if (tx.complete) {
                    resolve(true)
                } else {
                    reject(new Error(tx.onerror))
                }
            })
    })
};
