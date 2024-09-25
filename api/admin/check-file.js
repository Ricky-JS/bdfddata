const fs = require('fs')
const path = require('path');

module.exports = {
    log:false,
    rule: false,
    headers: ['choice'], //only put REQUIRED headers.
    access: 'ADMIN',
    endpoint: async (utils) => {
        let choice = utils.req.headers['choice']
        if(!["resolver", "endpoint"].includes(choice)) return utils.res.send({status: 400, error: "choice must be resolver or endpoint"});

        let ReleaseFiles  = [];
        let BetaFiles  = [];

        async function ThroughDirectory(Directory, type="") {
            fs.readdirSync(Directory+type).forEach(File => {
                const Absolute = path.join(Directory+type, File);
                if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
                else return Absolute.includes('release/') ? ReleaseFiles.push(Absolute) : BetaFiles.push(Absolute);
            });
        }
        
        if(choice === 'endpoint') {
        await ThroughDirectory(__dirname.split('admin')[0], 'release/')
        await ThroughDirectory(__dirname.split('admin')[0], 'beta/')
        }
        if(choice === 'resolver') {
        await ThroughDirectory(__dirname.split('api')[0]+'resolvers/', 'release/')
        await ThroughDirectory(__dirname.split('api')[0]+'resolvers/', 'beta/')
        }
    
        let json = new Object()
        json.matches = new Array()
        json.unreleased = new Array()
        json.clashes = new Array()
    
        for await (let file of BetaFiles) {
    let data1 = fs.readFileSync(file)
    let data2 = fs.existsSync(file.replace('beta','release')) ? fs.readFileSync(file.replace('beta','release')) : undefined

    if(!data2?.toString()) json.unreleased.push(file.split('beta')[1])
    if(data2 && data1?.toString() === data2?.toString()) json.matches.push(file.split('beta')[1])     
    if(data2 && data1?.toString() !== data2?.toString()) json.clashes.push(file.split('beta')[1])     
        }

                utils.res.send({status:200, details: json})

    }
}