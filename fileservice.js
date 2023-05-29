
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
module.exports = {
    getBooks,
    getYears,
    appendFile
}