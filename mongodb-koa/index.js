var mongoose = require('mongoose');
var model = require('./model.js');
var Demo = model.Demo;
var ObjectId = require('mongodb').ObjectID

    
const Koa = require('koa');
const app = new Koa();

mongoose.connect('mongodb://localhost/express_demo');

const route = require('koa-route')
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())


const main =async (ctx) =>{
    await Demo.find((err, docs) => {
        ctx.response.type = 'json' 
        ctx.response.body=docs
      })
}

const add = async (ctx) =>{
    var demo = new Demo({
        uid: ctx.request.body.uid,
        title: ctx.request.body.title,
    });
    await demo.save(function(err, doc) {
        console.log(doc);
    });
}

const dele = async (ctx) =>{
    await Demo.findOneAndDelete({"_id":ObjectId(ctx.query.id)}, function(err, docs) {
        console.log(docs);
    });
}

const updata = async (ctx) =>{
    var demo = {
        uid: ctx.request.body.uid,
        title: ctx.request.body.title,
    };
    Demo.findByIdAndUpdate({_id:ctx.request.body.id},{$set:demo},function(err,docs){
        console.log(docs);
    });
}

app.use(route.get('/', main))
app.use(route.post('/',add))
app.use(route.get('/del.html', dele))
app.use(route.post('/index.html',updata))

app.listen(3000)