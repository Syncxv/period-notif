const fs = require('fs')
const path = require('path')
module.exports = (json) => fs.writeFileSync(path.resolve(__dirname, '..', '..', 'data.json'), JSON.stringify(json), 'utf8');