const crypt = require('../config/crypt.json');

async function getDecode(texter) {
    for await(const [key,value] of Object.entries(crypt)) {
        texter = texter.split(value).join(key)
    }
    return texter;
}
module.exports = async (text) => {
    let result;

if(Array.isArray(text)){
    result = [];
        for(const artext of text) {
            result.push(await getDecode(artext))
    }

} else {
    result = text;
    for await(const [key,value] of Object.entries(crypt)) {
        result = result.split(value).join(key)
    }

}
return result
}