const TikAPI = require('tikapi').default;

const api = TikAPI(process.env.API_TOKEN);

api.set({
    $sandbox: false
});

const apiGetUserData = async (req, res) => {

    try{
        let response = await api.public.check({
            username: req.query.username
        });
        res.send(response.json);
    }
    catch(err){
        console.log(err?.statusCode, err?.message, err?.json)
    }	
}

module.exports={apiGetUserData}