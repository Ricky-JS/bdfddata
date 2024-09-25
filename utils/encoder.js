const crypt = require('../config/crypt.json');

module.exports = async (text) => {
    let result = text
    if(Array.isArray(text)) {
        result =[]
            for(const txt of text) {
                result.push(txt.split('').map(t=>crypt[t] ||t).join(''))
            }
    } else {
        result = text.split('').map(t=>crypt[t] || t).join('')
    }
    return result;
}