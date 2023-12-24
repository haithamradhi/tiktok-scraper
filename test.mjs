import TikAPI from 'tikapi';

const api = TikAPI("kJnF9LFM8OcLH97Pl5ygndPmlZX6hhOZF50pUiSVVoBkEwNb");

api.set({
    $sandbox: false
});
(async function(){
    var data =[]
    try{
        let response = await api.public.posts({
            secUid: "MS4wLjABAAAAMT69RKyzY_x2edyOqp22bRX6WP4hsl6FLvhB22ovKQh1SHJqha56PQeUbTTZWTAU",
        });

        data.push(response?.json?.itemList[0]);

        while(response){

            let cursor = response?.json?.cursor;
            console.log("Getting next items ", cursor);
            data.push(response?.json?.itemList[0]);

            response = await Promise.resolve(
                response?.nextItems()
            );
        }
        console.log(data.length)
    }
    catch(err){
        console.log(err?.statusCode, err?.message, err?.json)
    }	
})();