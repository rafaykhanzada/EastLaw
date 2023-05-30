
const fs = require('fs');

const getBooks = () => {
    const courtsJson = fs.readFileSync("./helper.json");
    const courtsObj = JSON.parse(courtsJson);
    return courtsObj.books;
};

const getYears = () => {
    const courtsJson = fs.readFileSync("./helper.json");
    const courtsObj = JSON.parse(courtsJson);
    return courtsObj.Years;
};

async function appendFile(fileName, data) {
    try {
      await fs.promises.appendFile(fileName, data);
      console.log('Data appended successfully!');
    } catch (err) {
      console.error('Error appending data:', err);
    }
  }
  async function writeFile(fileName, data) {
    try {
      await fs.promises.writeFile(fileName, data);
      console.log('File written successfully!');
    } catch (err) {
      console.error('Error writing file:', err);
    }
  }

function createFolderStructure() {
  const folders = getBooks();

  for (let year = 1950; year <= 2023; year++) {
    const yearFolderName = './data/' + year.toString();
    fs.mkdirSync(yearFolderName);

    for (const folder of folders) {
      const folderPath = `${yearFolderName}/${folder}`;
      fs.mkdirSync(folderPath);
    }
  }
}


async function createFolderJudment(){
  const books = getBooks();
  for (let year = 1949; year <= 1969; year++) {
      for (let book = 0; book < books.length; book++) {
          const directory = `./data/${year}/${books[book]}`;
          let json  = await makeApiCall(year,books[book],'','',1,2147483647);
          for (let judment = 0; judment < json.data.length; judment++) {
              const element = json.data[judment] //json.data[judment]._id.$oid;
              console.log(`Creating Folder ${directory + "/" + id}`);
              await fs.mkdir(directory + "/" + id, { recursive: true }, (err) => {if (err){console.log(err)} {
                  
              }});
          }
      }
  }
}
module.exports = {
    getBooks,
    getYears,
    appendFile,
    writeFile
}