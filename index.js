const {getBooks,appendFile} = require('./fileservice');
const fs = require('fs');
const axios = require('axios');

// Write Folder Structure



async function createFolderJudment(){
    const books = getBooks();
    for (let year = 1968; year <= 2023; year++) {
        for (let book = 0; book < books.length; book++) {
            const directory = `./data/${year}/${books[book]}`;
            let json  = await makeApiCall(year,books[book],'','',1,2147483647);
            for (let judment = 0; judment < json.data.length; judment++) {
                const id = json.data[judment]._id.$oid;
                console.log(`Creating Folder ${directory + "/" + id}`);
                await fs.mkdir(directory + "/" + id, { recursive: true }, (err) => {if (err){console.log(err)} {
                    
                }});
            }
        }

        // const yearFolderName = './data/' + year.toString();
        // fs.mkdirSync(yearFolderName);
        // for (const folder of folders) {
        //     const folderPath = `${yearFolderName}/${folder}`;
        //     fs.mkdirSync(folderPath);
        //     for(const year of years){
        //         const yearPath = `${folderPath}/${year}`;
        //         fs.mkdirSync(yearPath);
        //     }
        // }
    }
}



async function makeApiCall(citationYear, citationJournel,citationPageNo,citationCategory,pageNo,pageSize) {
    const url = `https://eastlaw.pk/api/citation-search/case-by-citation?citationYear=${citationYear}&citationJournel=${citationJournel}&citationPageNo=${citationPageNo}&citationCategory=${citationCategory}&pageNo=${pageNo}&pageSize=${pageSize}`; // Replace with your API endpoint URL
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc0ODI2OWI4ZDZmODkwMmY0YzI0NDAiLCJlbWFpbCI6ImFiZHVsLnJhZmF5QGZpbm9zeXMuY29tIiwicm9sZSI6ImZyZWUiLCJlbWFpbFZlcmlmaWVkIjp0cnVlLCJwbGFuIjoiRnJlZSBVc2VycyIsImlhdCI6MTY4NTM3OTAwNSwiZXhwIjoxNjg1NDAwNjA1fQ.xtS7CCXc5tQTeAHHC8BDxmftkT1Ve2YLgYfHVSogyN4'; // Replace with your bearer token
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Return the incoming JSON response
      return response.data;
    } catch (error) {
      console.error('Error making API call:', error);
      throw error;
    }
  }
  

  createFolderJudment();
//Later Use
// const axios = require('axios');
// const fs = require('fs');

// async function makeAPICallAndSaveJSON() {
//   const token = 'YOUR_BEARER_TOKEN';
//   const apiUrl = 'YOUR_API_URL';
//   const outputFileName = 'output.json';

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     const jsonData = response.data;
//     const jsonStr = JSON.stringify(jsonData, null, 2);

//     fs.writeFileSync(outputFileName, jsonStr);
//     console.log(`JSON data saved to ${outputFileName}`);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

// // Call the function to make the API call and save the JSON response
// makeAPICallAndSaveJSON();
