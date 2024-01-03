"use strict";

// const { application, json } = require("express");

const catUrl = "http://localhost:3000/api/categories";
const postUrl = "http://localhost:3000/api/posts";

function getCategories() {
  return fetch(catUrl)
    .then((resp) => resp.json())
    .then((catsArr) => {
      return catsArr;
    })
    .catch((error) => {
      console.warn(error);
    });
}

// function getPosts() {
//   return fetch(postUrl)
//     .then((resp) => resp.json())
//     .then((postsArr) => postsArr)
//     .catch((error) => console.warn(error));
// }
// (async () => {
//   const gotPostsArr = await getPosts();
//   console.log(gotPostsArr);

//   makePostsList(gotPostsArr);
// })();

// const listEl = document.getElementById("posts-list");

// function makePostsList(arr) {
//   const liArr = arr.map((postObj) => {
//     const liEl = document.createElement("li");
//     liEl.value = postObj.post_id;
//     liEl.textContent =
//       postObj.title + " " + postObj.author + " " + postObj.date;
//     return liEl;
//   });
//   listEl.append(...liArr);
//   console.log(liArr);
// }

const selectEl = document.getElementById("category");
const newPostForm = document.forms[0];

const postList = document.getElementById("posts-list");

function makeSelectOptions(arr) {
  const optionArr = arr.map((catObj) => {
    const optionEl = document.createElement("option");
    optionEl.value = catObj.cat_id;
    optionEl.textContent = catObj.title;
    return optionEl;
  });
  selectEl.append(...optionArr);
}

// async function init(){
//     await getCategories()
// }
// init()

//iskvieciame funkcija is karto
(async () => {
  const gotCategoriesArr = await getCategories();
  console.log(gotCategoriesArr);

  makeSelectOptions(gotCategoriesArr);
  const postArr = await getPosts(postUrl);

  const elArr = postArr.map(makeOneli);
  console.log(elArr[0]);
  postList.append(...elArr);
  console.log(postList);
})();

newPostForm.addEventListener("submit", handleNewPost);

function handleNewPost(e) {
  e.preventDefault();
  console.log("forma pateikta");

  const [title, author, date, content, category] = newPostForm.elements;
  const newPostObj = {
    title: title.value,
    author: author.value,
    date: date.value,
    content: content.value,
    cat_id: +category.value,
  };
  console.log(newPostObj);

  fetch(postUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newPostObj),
  })
    .then((resp) => {
      if (resp.status === 201) {
        console.log("pavyko sukurti");
      }
    })
    .catch((error) => {
      console.warn("ivyko kliada", error);
    });
}

function getPosts(url) {
  return (
    fetch(url)
      .then((resp) => resp.json())
      // .then((data) => data)
      .catch((error) => console.warn(error))
  );
}

function makeOneli({
  post_id,
  title,
  author,
  date,
  content,
  catagoryName,
  commentCount,
}) {
  //sukuriam viena el is objekto
  const liEl = document.createElement("li");
  liEl.className = "post column column-50";
  liEl.dataset.postId = post_id;
  const formatedDate = new Date(date).toLocaleDateString("lt-LT", {
    dateStyle: "short",
  });
  const isCommentOrNot =
    commentCount > 0 ? `<p>Comment count: ${commentCount}</p>` : "";
  liEl.innerHTML = ` 
      <h3>${title}</h3>
      <p><i>${author}</i></p>
      <p>${date}</p>
      <p>${content}</p>
      <p>${catagoryName}</p>
      ${isCommentOrNot}
      `;

  return liEl;
}
