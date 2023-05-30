const {getBooks,writeFile} = require('./fileservice');
const fs = require('fs');
const axios = require('axios');
const { appendFile } = require('fs/promises');

// Write Folder Structure
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc0ODI2OWI4ZDZmODkwMmY0YzI0NDAiLCJlbWFpbCI6ImFiZHVsLnJhZmF5QGZpbm9zeXMuY29tIiwicm9sZSI6ImZyZWUiLCJlbWFpbFZlcmlmaWVkIjp0cnVlLCJwbGFuIjoiRnJlZSBVc2VycyIsImlhdCI6MTY4NTQ1MjA2NCwiZXhwIjoxNjg1NDczNjY0fQ.7CvQU6U00si0h6-MAeUTKCnsRnUH0OA6xlLqlrLOMHY'; // Replace with your bearer token

async function createFolderJudment(){
    const books = getBooks();
    let CurrentYear = 1949;
    let CurrentBook = 'CLC';
    let CurrentId = '';


    //Read Current Year 
    let logs = fs.readFileSync('logs.txt', 'utf-8').split("\n");
    if (logs[0]) {
      CurrentYear =logs[0].split('|')[0];
      CurrentBook = logs[0].split('|')[1];
      CurrentId = logs[0].split('|')[2];
    }
   try {
    for (let year = CurrentYear; year <= 2023; year++) {
      for (let book = CurrentBook; book < books.length; book++) {
          const directory = `./data/${year}/${books[book]}`;
          let json  = await makeApiCall(year,books[book],'','',1,2147483647);
          for (let judment = CurrentId; judment < json.data.length; judment++) {
              const element = json.data[judment] //json.data[judment]._id.$oid;
              console.log(`Target Folder ${directory + "/" + element._id.$oid}`);
              //await fs.mkdir(directory + "/" + element._id.$oid, { recursive: true }, (err) => {if (err){console.log(err)} {}});
               let detail = await JudmentAPI(`https://eastlaw.pk/api/case-search/search-by-id/${element._id.$oid}`);
               await writeFile(`${directory + "/" + element._id.$oid +"/Citation.json"}`,JSON.stringify(element));
               await writeFile(`${directory + "/" + element._id.$oid +"/Judgment.json"}`,JSON.stringify(detail));
               await writeFile('logs.txt',`${year + "|"+ book +"|"+ judment + "\n"}`)
          }
      }
  }
   } catch (error) {
    createFolderJudment()
   }
}

// Judment API

async function JudmentAPI(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      timeout: 59000 // Set the timeout value
    });

    // Return the incoming JSON response
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:');
    } else {
      console.error('Error making API call:', error.message);
    }
    throw error;
  }
}

async function makeApiCall(citationYear, citationJournel,citationPageNo,citationCategory,pageNo,pageSize) {
    const url = `https://eastlaw.pk/api/citation-search/case-by-citation?citationYear=${citationYear}&citationJournel=${citationJournel}&citationPageNo=${citationPageNo}&citationCategory=${citationCategory}&pageNo=${pageNo}&pageSize=${pageSize}`; // Replace with your API endpoint URL
  
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
