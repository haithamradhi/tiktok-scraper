const TikAPI = require('tikapi').default;

const api = TikAPI(process.env.API_TOKEN);

api.set({
    $sandbox: false
});

async function GetPostsData(sec_id) { 
    var obj = {
        data: []
    };
    try{
        let response = await api.public.posts({
            secUid: sec_id,
        });

        obj.data.push(...response?.json?.itemList);

        while(response){

            let cursor = response?.json?.cursor;
            console.log("Getting next items ", cursor);
            obj.data.push(...response?.json?.itemList);

            response = await Promise.resolve(
                response?.nextItems()
            );
        }
    }
    catch(err){
        console.log(err?.statusCode, err?.message, err?.json)
    } finally {
        return obj
    }
}


const apiGetPostsData = async (req, res) => {
    const result = await GetPostsData(req.query.sec_id)
    res.json(result)
}

module.exports={apiGetPostsData}