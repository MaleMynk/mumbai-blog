import { db } from "./firebase.mjs";
import {  doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



let blogId = decodeURI(location.pathname.split("/").pop());
let docRef = doc(db,"blogs",blogId);
//db.collection("blogs").doc(blogId);
/*
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


get(docRef).then((doc)=>
//docRef.get().then((doc)=>
{
    if(doc.exists)
        {
            console.log(doc.data());
        }
    else
    {
        location.replace("/");
    }
})
*/
getDoc(docRef)
    .then((doc) => {
        if (doc.exists()) {
            //console.log(doc.data());
            setupBlog(doc.data()); //error 4
        } else {
            location.replace("/");
        }
    })
    .catch((error) => {
        console.error("Error getting document:", error);
    });

const setupBlog =(data) =>{
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    console.log(blogTitle.innerHTML+" answer check"); // this is accessing blog.html ka so called ele
    banner.style.backgroundImage = `url(${data.bannerImage})`;
    titleTag.innerHTML += blogTitle.innerHTML=data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article,data.article); // error 3
}

const addArticle=(ele,data)=>
{
    data = data.split("\n").filter(item=>item.length);
    //console.log(data);

    data.forEach(item=> // error 2
    {

        if (item[0]=='#')
        {
        let hCount =0;
        let i=0;
        while (item[i]=='#')
        {
            hCount++;
            i++;
        }
        let tag = `h${hCount}`;
        ele.innerHTML += `<${tag}>${item.slice(hCount,item.length)}</${tag}>`

        }   
    else if (item[0]=="!" && item[1]=="[")
        {
        let seperator;
        for (let i=0;i<=item.length;i++)
        {
            if(item[i]=="]" && item[i+1]=="(" && item[item.length-1]==")")
            {
                seperator=i;
            }
        }
        let alt = item.slice(2,seperator);
        let src= item.slice(seperator+2,item.length-1);
        ele.innerHTML += `<img src="${src}" alt ="${alt}" class="article-image">`;
        }
    else
        {
        ele.innerHTML += `<p>${item}</p>`; //error 1
        }
    })
}