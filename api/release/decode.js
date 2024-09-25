module.exports = {
    log:true,
    rules:false,
    headers: [],
    body: ['text'],
    endpoint: async (utils) => {
        let res = utils.req.body['text'];
        let result;


        async function getDecode(text) {
            for await(const [key,value] of Object.entries(utils.coder)) {
                text = text.split(value).join(key)
            }
            return text;
        }



        if(Array.isArray(res)){
            result = [];
                for(const artext of res) {
                    result.push(await getDecode(artext))
            }

        } else {
            result = res;
            for await(const [key,value] of Object.entries(utils.coder)) {
                result = result.split(value).join(key)
            }
    
        }


            utils.res.send({status:200, details: result, api: Object.assign(utils.config.info, {ping: `${(Date.now() - utils.time)}ms`})})
    }
}