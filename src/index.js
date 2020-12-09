const express = require('express')
const app = express()
const port = 8080
const { newsArticleModel } = require('./connector')

const onePageArticleCount = 10
let limit=10;
let offset=0;


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const isNullOrUndefined= val=>val==null || val==undefined;

app.get("/newsFeed/:limit/:offset",async(req,res)=>{
    if(!isNullOrUndefined(req.params.limit)){
        limit=Number(req.params.limit);
    }
    if(!isNullOrUndefined(req.params.offset)){
        offset=Number(req.params.offset);
    }
    res.send(await newsArticleModel.find().skip(offset).limit(limit));
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;