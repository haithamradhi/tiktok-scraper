const TikAPI = require('tikapi').default;

const api = TikAPI(process.env.API_TOKEN);

api.set({
    $sandbox: false
});

async function GetPostsData(sec_id) { 
    let data = []
    try{
        let response = await api.public.posts({
            secUid: sec_id,
        });

        data.push(...response?.json?.itemList);

        while(response){

            let cursor = response?.json?.cursor;
            console.log("Getting next items ", cursor);
            data.push(...response?.json?.itemList);

            response = await Promise.resolve(
                response?.nextItems()
            );
        }
    }
    catch(err){
        console.log(err?.statusCode, err?.message, err?.json)
    } finally {
        return data
    }
}


const apiGetPostsData = async (req, res) => {
    const result = await GetPostsData(req.query.sec_id)
    res.send(result)
}

module.exports={apiGetPostsData}