const urlPrefix = 'https://jsonplaceholder.typicode.com/'
const requestUrl = urlPrefix + 'posts';
const requestUsersUrl = urlPrefix + 'users';
let posts = [];
let users =[];


fetch(requestUrl)
    .then(response => response.json())
    .then(json => {
        posts = json;
        renderPosts();
    }).catch(err => {
        showLoadError();
    });

    fetch(requestUsersUrl)
    .then(response => response.json())
    .then(json => {
        users = json;
        renderPosts();
    }).catch(err => {
        showLoadError();
    });

function renderPosts() {
    for (const post of posts) {
        // console.log(post.title);
    }
}

function showLoadError() {
    alert('404')
}

async function loadData(callBack) {
    posts = await fetch(requestUrl).then(x=>x.json());
    users = await fetch(requestUsersUrl).then(x=>x.json());


    callBack.apply();
}

const container = document.querySelector('.container');
function render() {

    container.innerHTML = '';

    for(let i = 0; i < 20; i++){
        const currPost = posts[i];
        const writer = users.find(x => x.id === currPost.userId);
        
        container.innerHTML += `
            <div class="post">
                <h3><a data-postId="${currPost.id}" href="/${currPost.id}">${currPost.title}</a></h3>
                <h4>Yazan:<p class="flex">${writer.name}</p></h4>
            </div>
            
    `
    }

    bindPostsClicks();
}

function renderDetailPage(postDetail, postComments) {
    const comments = postComments.map(x => `<div class="comment"><h4>${x.name}</h4><p>${x.body}</p></div>`);
    
    container.innerHTML = `
        <h1>${postDetail.title}</h1>
        <p class="left">${postDetail.body}</p>
        <div class="comments">${comments.join('')}</div>
    `;
}

async function loadDetailPage(postId) {
    const postDetail = await fetch(urlPrefix + 'posts/' + postId).then(x => x.json());
    const postComments = await fetch(urlPrefix + 'posts/' + postId + '/comments').then(x => x.json());
    
    renderDetailPage(postDetail, postComments);
}

function handleHomepageClicks(e) {
    e.preventDefault();
    loadDetailPage(this.dataset.postid);
}

function bindPostsClicks() {
    document.querySelectorAll('.post h3 a').forEach(x => x.addEventListener('click', handleHomepageClicks));
        
}

loadData(function() {
    render();
});


// console.log('merhaba 1');
// setTimeout(() => {
//     console.log('merhaba 2');
// },0);
// console.log('merhaba 3');

// closure

