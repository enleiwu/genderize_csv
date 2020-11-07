require('dotenv').config(); //for private keys
const request = require('got'); //API fetching
const ObjectsToCsv = require('objects-to-csv');
const csv = require('csvtojson');

const { argv } = process; //accepts params from command line

csv()
    .fromFile(argv[2]) //grabs target csv file
    .then(async data => {

        //grabbing all the existing names without duplication for minimal api calls and caches data
        const cache = {};
        let batch = '';
        let batchCount = 0
        for(let i = 0; i < data.length; i++){
            const row = data[i];
            const currName = row.first_name || row.name;
            if(!cache[currName]){
                batch = batch ? `${batch}&name[]=${currName}` : `name[]=${currName}`;
                batchCount++;
                if(batchCount === 10 || i + 1 === data.length){
                    const { body } = await request(`https://api.genderize.io/?${batch}&apikey=${process.env.GENDERIZE_API_KEY}`, {
                        responseType: 'json'
                    });
                    body.forEach(nameData => {
                        const { name, gender, probability, count } = nameData;
                        cache[name] = {
                            gender,
                            probability,
                            count
                        }
                    });
                    batch = '';
                    batchCount = 0;
                }
            }
        }

        //create new data and convert to csv
        const result = data.map(row => {
            const currName = row.first_name || row.name;
            if(argv[3] === '-OVR' || argv[3] === '--override'){
                const newData = {
                    ...row,
                    firstname: currName,
                    male: cache[currName].gender === 'male' ? 1 : 0,
                    female: cache[currName].gender === 'female' ? 1 : 0,
                };
                delete newData.name;
                delete newData.first_name;
                return newData
            } else {
                return {...row, ...cache[currName]};
            }
        })
        const convert = new ObjectsToCsv(result);
        convert.toDisk('./test/results.csv');
    })