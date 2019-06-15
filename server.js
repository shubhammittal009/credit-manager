const express= require('express')
const app=express()
const {MongoClient} = require('mongodb')

const MONGO_URL =  "mongodb+srv://sparks:sparks009@cluster0-luah7.mongodb.net/test?retryWrites=true&w=majority+srv://dbUser:flat591@cluster0-c5u2c.mongodb.net/test?retryWrites=true"


var user="";

app.set('view engine',"hbs")
app.get('/',(req,res)=>{
    res.render('homepage')
})
app.get('/ViewerList',(req,res)=>{
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            msg: "Could Not Connect To Mongo Database"
          })
        }
    
        const dbuser = client.db("dbuser")
        const users = dbuser.collection("users")
        
        users.find({}).toArray().then((results)=>{
            //console.log(results)
            res.render('viewerlist',{results})
        })
        
        client.close()
    
      })
    })
app.get('/User/:user',(req,res)=>{
    console.log(req.params.user)
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            msg: "Could Not Connect To Mongo Database"
          })
        }
    
        const dbuser = client.db("dbuser")
        const users = dbuser.collection("users")
        
        users.findOne({name:req.params.user}).then((results)=>{
            console.log(results)
            res.render('User',{results})
        })
        user=req.params.user;
        client.close()
    
      })
})

app.get('/User/:user/MoneyTransfer',(req,res)=>{
    console.log(req.params.user)
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            msg: "Could Not Connect To Mongo Database"
          })
        }
    
        const dbuser = client.db("dbuser")
        const users = dbuser.collection("users")
        
        users.find({}).toArray().then((results)=>{
            //console.log(results)
            res.render('MoneyTransferUser',{results})
        })
        
        client.close()
    
      })
})
//console.log(user)
app.get('/User/SendTo/:receiver',(req,res)=>{
    console.log(req.params.user)
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            msg: "Could Not Connect To Mongo Database"
          })
        }
    
        const dbuser = client.db("dbuser")
        const users = dbuser.collection("users")
        const transactions=dbuser.collection("transactions")
        users.update(
            { name: user},
            { $inc: { Account_balance: -1 } }
        )

        users.update(
            { name: req.params.receiver},
            { $inc: { Account_balance: 1 } }
        )
        users.find({}).toArray().then((results)=>{
            //console.log(results)
            res.redirect('/ViewerList');
        })
        
        var today = new Date()
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var dateTime = date+' '+time




        transactions.insert({From:user,To:req.params.receiver,Time:dateTime})



        client.close()
    user=""
      })


      
})


app.get('/transactions',(req,res)=>{
  MongoClient.connect(MONGO_URL, (err, client) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        msg: "Could Not Connect To Mongo Database"
      })
    }

    const dbuser = client.db("dbuser")
    const transactions = dbuser.collection("transactions")
    
    transactions.find({}).toArray().then((results)=>{
        //console.log(results)
        res.send(results)
    })
    client.close()

  })
})





const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log("server running")
})
