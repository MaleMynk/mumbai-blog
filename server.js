//const path = require('path');
//const express = require('express');
import express from 'express';
import {dirname} from 'path';
import path from 'path';
import fileupload from 'express-fileupload';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const initial_path = path.join(__dirname + "/public");
const app = express();

app.use(express.static(initial_path));
app.use(fileupload());

/*
Error before exiting
Uncaught TypeError: Failed to resolve module specifier "firebase/app". Relative 
references must start with either "/", "./", or "../".
*/
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});
app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});
const PORT = 3000; 
// You can change this to your desired port

app.post('/upload',(req,res)=>
{
    let file = req.files.image;
    let date = new Date();

    let imagename = date.getDate() + date.getTime()+file.name;
    let path = 'public/uploads/' + imagename;

    file.mv(path,(err,result)=>
    {
        if(err) {throw err;}
        else{
            res.json(`uploads/${imagename}`)
        }
    })
})
app.get("/:blog",(req,res)=>
{
    res.sendFile(path.join(initial_path,"blog.html"));
})

app.use((req,res)=>{
    res.json("404");
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});