// Importing Firebase v9 modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { db } from "./firebase.mjs";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Initialize Firebase
//const firebaseConfig = {
  // Your Firebase configuration goes here
//};

//const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Selecting DOM elements
const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
const publishBtn = document.querySelector('.dark-publish-btn');
const uploadInput = document.querySelector('#image-upload');

let bannerPath;

// Event listener for banner image change
bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
});

// Event listener for image upload change
uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
});

// Function to upload an image
const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;

    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

      //  fetch('https://mumbai-blog.onrender.com/upload', {
        fetch ('/uploads',{
            method: 'post',
            body: formdata
        })
        .then(response => response.json())
        .then(data => {
            if (uploadType === "image") {
                addImage(data, file.name);
            } else {
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        });
    } else {
        alert("Upload Image Only!");
    }
};

// Function to add an image to the article
const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

// Event listener for publish button
publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';

        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        let docName = `${blogTitle}-${id}`;
        let date = new Date();
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Using Firestore v9 syntax to set document data
        const blogDoc = doc(db, "blogs", docName);
        if (typeof bannerPath === 'undefined') 
        {bannerPath="null";}
        
        setDoc(blogDoc, {
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        });
    }
});

// Formatting Function
