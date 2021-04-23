const express = require('express');
const app = express();

var fs = require('fs');
var data = fs.readFileSync('mcc-mnc-beem.json');
var all_data = JSON.parse(data);

const port = 3000;

app.get('/', (req, res) => {
    res.send('Beem!');
});

app.get("/network-data/:mcc/:mnc", (req, res) => {
    let mcc = req.params.mcc;
    let mnc = req.params.mnc;

    let result = all_data.filter(entry => (entry.mcc == mcc && entry.mnc == mnc));

    if (result.length) {
        const picked_result = (({network_name, country_name}) => ({network_name, country_name}))(result[0]);
        res.send(picked_result);
    } else {
        res.send('no record found');
    }
});

app.get("/networks/:query/", (req, res) => {
    let query = req.params.query;
    let result = all_data.filter(entry => (entry.country_name == query || entry.mnc == query));

    res.send(result);
});

app.listen(port, () => console.log(`Beeming on port ${port}!`))
