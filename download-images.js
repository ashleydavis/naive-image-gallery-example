const axios = require("axios");
const fs = require("fs");

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!UNSPLASH_ACCESS_KEY) {
    throw new Error(`You need an Unsplash API account and key to run this code. Set your API key in the environment variable UNSPLASH_ACCESS_KEY. See the readme for details.`);
}

const BASE_URL = "https://api.unsplash.com";
const NUM_PHOTOS = 100;
const MAX_BATCH = 30;
const RANDOM_PHOTO_URL = `${BASE_URL}/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=${MAX_BATCH}`;

async function main () {

    const numBatches = Math.ceil(NUM_PHOTOS / MAX_BATCH);

    //
    // Download photos in batches.
    //
    
    for (let batch = 0; batch < numBatches; ++batch) {

        const { data } = await axios.get(RANDOM_PHOTO_URL);
        for (const photo of data) {
            await fs.promises.writeFile(`./images/metadata/${photo.id}.json`, JSON.stringify(data, null, 4));
    
            await downloadFile(photo.urls.thumb, `./images/${photo.id}.jpeg`);
        }
    }

}

main()
    .catch(err => {
        console.error("Error!");
        console.error(err);
    });


//
// Downloads a file.
//
// https://stackoverflow.com/a/61269447/25868
//
function downloadFile(fileUrl, outputLocationPath) {
    const outputStream = fs.createWriteStream(outputLocationPath);
    return axios({ method: "get", url: fileUrl, responseType: "stream" })
        .then(response => {
            return new Promise((resolve, reject) => {
                response.data.pipe(outputStream);    

                outputStream.on("error", err => {
                    writer.close();
                    reject(err);
                });
                
                outputStream.on("close", () => {
                    resolve();
                });                   
            });
        });
}