const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')
const bodyParser = require('body-parser')
const assert = require('assert')

const app = express()

app.use(bodyParser.json())

const mongodb_url = 'mongodb://localhost:27017'
const dataBase = "ContacList"

MongoClient.connect(mongodb_url, { useNewUrlParser: true }, (err, client) => {
    assert.equal(err, null, 'data base connexion failed')

    const db = client.db(dataBase)

    app.post("/add-user", (req, res) => {
        let newUser = req.body
        db.collection("users").insertOne(newUser, (err, data) => {
          if(err) res.send("cant not add new user")
          else res.send("new user added")  
        });
    });

    app.get("/users", (req, res) => {
        db.collection('users').find().toArray((err, data) => {
            if (err) res.send('cant not get users list')
            else res.send(data)
        });
    });

    app.delete('/delete-user/:id', (req, res) => {
        let UserToRemoveId = ObjectID(req.params.id)
        db.collection('users').findOneAndDelete({_id : UserToRemoveId}, (err, data) => {
            if(err) res.send('cant delete the user')
            else res.send('user was deleted')
        })
    })

    app.put('/modify_user/:id', (req, res) => {
        let id = ObjectID(req.params.id)
        let modifiedUser = req.body
        db.collection('users').findOneAndUpdate({_id : id}, {$set:{...modifiedUser}}, (err, data) => {
            if(err) res.send('cant modify user')
            else res.send('user was modified')   
        });
    });

});

app.listen(4000, (err) => {
    if (err) console.log("server is not running")
    else console.log("server is running on port 4000")
})