let express = require('express');
let app = express();
let router = require('./router/main')(app);
let port = process.env.PORT || 3000;
let bodyParser = require('body-parser')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

let server = app.listen(port, function(){
    console.log("Express server has started on port "+ port)
});

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'kimsol9317!',
    database: 'mydb'
});

connection.connect();

app.post('/',(req,res)=>{
    let addr = req.body.strArray[0];
    let name = req.body.strArray[1];
    let birth = req.body.strArray[2];
    let notBefore = req.body.notBefore;
    let notAfter = req.body.notAfter;
    let certid = req.body.strArray[5];
    let sql = 'insert into user_cert_info(user_id, cert_addr, cert_effective_date, cert_expiration_date, cert_id) values (?,?,?,?,?,?)';
    var params = [addr,name,birth,notBefore,notAfter,certid]

    connection.query(sql,params,(err,res)=>{
        if (err){
            console.log(err);
        }
        else{
            console.log(res); 
        }
    })
})


connection.end();