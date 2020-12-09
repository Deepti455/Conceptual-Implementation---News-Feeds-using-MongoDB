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

const isNullOrZero= val=>val==null || val==0;

app.get("/newFeeds",async(req,res)=>{
    if(!isNullOrZero(req.query.limit)){
        limit=req.query.limit;
    }else{
        limit=10;
    }
    if(!isNullOrZero(req.query.offset)){
        offset=req.query.offset;
    }else{
        offset=10;
    }
    res.send(await newsArticleModel.find().skip(Number(offset)).limit(Number(limit)));
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;