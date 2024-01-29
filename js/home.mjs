//59 
//1 01 33
import { db } from "./firebase.mjs";
//import { collection, getDocs } from 'firebase/firestore';
import {  collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const blogSection = document.querySelector('.blogs-section');
const blogsCollection = collection(db, 'blogs');

getDocs(blogsCollection).then((blogsSnapshot) => {
    blogsSnapshot.forEach((blog) => {
        if (blog.id !== decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    });
});
/*
db.collection("blogs").get().then((blogs)=>{
    blogs.forEach(blog=>{
        if(blog.id != decodeURI(location.pathname.split("/").pop()))
        {createBlog(blog);}
    })
})
*/

const createBlog = (blog) =>
{
    let data = blog.data();
    blogSection.innerHTML +=
    `
    <div class ="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0,100)+'...'}</h1>
        <p class="blog-overview">${data.article.substring(0,200)+'...'}</p>
        <a href="/${blog.id}" class="btn dark">Read</a>


    </div>
    `; // that is why learning ejs was required.
}