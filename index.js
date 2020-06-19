const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded())
app.use(express.static('assets'));
//middleware 1
// app.use(function(req,res,next){
//     console.log("middleware 1 called");
//     next();
// });

// app.use(function (req,res,next) {
//     console.log("middleware 2 called");
//     next();
//   });
var contacts = [
    {
        name:"Dhanush",
        number:"8667639788"
    },
    {
        name:"ladoo",
        number:"478326757"
    }
]
app.get('/',function (req,res) {
        
        Contact.find({},function(err,contacts){
            if(err){
                console.log("Error i fetching from DB"+err);
                return;
            }
            return res.render('home',{
                title:"My Contacts",
                contacts : contacts,
            });
        })
  });

app.post('/addContact',function(req,res){
    // contacts.push({
    //     name:req.body.name,
    //     number:req.body.number,
    // })
    // contacts.push(req.body);

    //pushing to DB
    Contact.create({
        name:req.body.name,
        phone:req.body.number
    },function(err,newContact){
        if(err) {
            console.log("Error in Creating contact"); 
            return;
        }
        console.log(newContact);
        return res.redirect('back') ;
    })
    
});
app.get('/delete-contact/:id',function(req,res){
    // console.log(req.params);
    // let index = 0;
    // for(let i of contacts){
    //     if(i.name==req.params.name && i.number==req.params.number){
    //         contacts.splice(index,1);
    //         break;
    //     }
    //     index++;
    // }
    let id = req.params.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log("Deleted successfully");
        return res.redirect('/');
    });     
})

//using query
// app.get('/delete-contact',function(req,res){
//     console.log(req.query);
//     let contactIndex = contacts.findIndex(contact => contact.number==req.query.number);
//     console.log(contactIndex);
//     if(contactIndex!=-1){
//         contacts.splice(contactIndex,1);
//     }
//     return res.redirect('/');
// });
app.listen(port,function(err){
    if(err){
        console.log("Error in Running the server"+err);
        return;
    }
    console.log("Express running on port"+port);
})