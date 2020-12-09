const express = require('express')
const app = express()
const port = 8080
const { newsArticleModel } = require('./connector')

const onePageArticleCount = 10
// let limit=10;
// let offset=0;


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const isNullOrZero= val=>val==null || val==0 || Number(val)==NaN;

// app.get("/newFeeds",async(req,res)=>{
//     const data=await newsArticleModel.find();
//     const len=data.length;
//     if(!isNullOrZero(req.query.limit) && len>=req.query.limit){
//         limit=req.query.limit;
//     }else{
//         limit=10;
//     }
//     if(!isNullOrZero(req.query.offset)){
//         offset=req.query.offset;
//     }else{
//         offset=0;
//     }
//     res.send(await newsArticleModel.find().skip(Number(offset)).limit(Number(limit)));
// });

app.get("/newFeeds",(req,res)=>{
    let limit=Number(req.query.limit);
    let offset=Number(req.query.offset);
    limit= limit? limit : 10;
    offset= offset? offset : 0;

    newsArticleModel.find().skip(offset).limit(limit).then((data)=>res.send(data));
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;