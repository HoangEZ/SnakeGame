const express = require('express');
const app = express();
app.use('/js',express.static('js'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', (req,res) => {
    res.render('index', {title:'Hello'});
})

app.get(/\/js\/.*/, (req, res) => {
    const fs = require('fs');
    const filePath = '.'+req.url.replace('\\','/')+'.js';
    res.setHeader('content-type', 'application/javascript');
    fs.readFile(filePath, (err, data) => {
        if(!err) {
            res.write(data);
            res.end();
        }else{
            res.end();
        }
    }); 
})

app.listen(8080, () => {
    console.log(`server started at port ${8080}`);
})