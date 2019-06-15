const {MongoClient} = require('mongodb')
const faker=require('faker')
const MONGO_URL =  "mongodb+srv://sparks:sparks009@cluster0-luah7.mongodb.net/test?retryWrites=true&w=majority+srv://dbUser:flat591@cluster0-c5u2c.mongodb.net/test?retryWrites=true"


MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) {
    throw err
  }

  const dbuser = client.db("dbuser")
  const users = dbuser.collection("users")
  const transactions=dbuser.collection("transactions")

  users.insertMany([
    {
      name: "Ram",
      Account_balance: 300,
      Email_id: "ram@gmail.com",
      FatherName:"Ram's Dad"
      
    },
    {
        name: "Shubham",
        Account_balance: 300,
        Email_id: "shubham@gmail.com",
      FatherName:"Shubham's Dad"
      },
      {
        name: "Raghav",
        Account_balance: 300,
        Email_id: "raghav@gmail.com",
      FatherName:"Ranghav's Dad"
      },
      {
        name: "Abhishek",
        Account_balance: 300,
        Email_id: "abhishek@gmail.com",
      FatherName:"Abhishek's Dad"
      },
      {
        name: "Agrim",
        Account_balance: 300,
        Email_id: "agrim@gmail.com",
      FatherName:"Agrim's Dad"
      },
      {
        name: "Sameer",
        Account_balance: 300,
        Email_id: "sameer@gmail.com",
      FatherName:"Sameer's Dad"
      },
      {
        name: "Nayan",
        Account_balance: 300,
        Email_id: "nayan@gmail.com",
      FatherName:"Nayan's Dad"
      },
      {
        name: "Dhruv",
        Account_balance: 300,
        Email_id: "druv@gmail.com",
      FatherName:"Dhruv's Dad"
      },
      {
        name: "Harsh",
        Account_balance: 300,
        Email_id: "harsh@gmail.com",
      FatherName:"Harsh's Dad"
      },
      {
        name: "Gaurav",
        Account_balance: 300,
        Email_id: "gaurav@gmail.com",
      FatherName:"Gaurav's Dad"
      },
  ], (err, result) => {
    if (err) {
      throw err;
    }
    console.log("DATA INSERTED")
  })
})