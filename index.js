const fs = require("fs");
const path = require("path");

async function run(params) {
    const res = await fetch("https://api.alternative.me/fng/?limit=100000");
    const data = await res.json();
    const result = [];
    data.data.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });
    for (let row of data.data) {
        const date = new Date(parseInt(row.timestamp) * 1000);
        const dateString = date.toISOString().slice(0, 11).replace(/-/g, "")
        result.push([
            dateString,
            row.value, //open
            row.value, //high
            row.value, //low
            row.value, //close,
            "0" //volume,
        ]);
    }
    let csv = result.map(x => x.join(",")).join("\n");
    fs.writeFileSync(path.join(__dirname, "data", "CRYPTO_FNG_INDEX.csv"), csv)
}
run();