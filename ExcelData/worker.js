const {
    workerData,
    parentPort
} = require('worker_threads')
const axios = require('axios');
const fs = require('fs');
console.time("Time taken by WORKER: ")
const data = workerData;


console.log("\n\nINSIDE OF WORKER THREAD");
// console.log(data);

(async (link = data[0], dir = data[1], file = data[2]) => {
    try {
        if (!fs.existsSync(dir + "/" + file)) {
            const {
                data
            } = await axios.get(link, {
                responseType: "stream"
            });
            fs.mkdirSync(dir, {
                recursive: true
            }, err => {
                console.log(err);
            });
            data.pipe(fs.createWriteStream(dir + "/" + file));
            console.log("Download Complete");
            console.timeEnd('Time taken by WORKER: ');
            console.log("\n");
            parentPort.postMessage(JSON.stringify(true))

        } else {
            console.log("Skipping Download of:\t" + file + "\n");
        }
        console.timeEnd("Time taken by WORKER: ");
        console.log("\n");
    } catch (err) {
        console.log(err);

    }

})()