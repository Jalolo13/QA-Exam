const blocks = document.querySelector(".blocks");

async function getResponse() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();
}

async function getData() {
    let data = await getResponse();
    if (data) {
        data.forEach((item) => {
            createEdit(item);
        });
    }
    return data;
}

async function deleteData(id) {
    let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
            method: "DELETE",
        }
    );
    let deleted = response.json();
    console.log(deleted);
    return deleted;
}

const createEdit = ({ id, title, body }) => {
    let div = document.createElement("div");
    div.dataset.id = id;
    div.classList.add("block");
    div.innerHTML = `
        
        <h2 class="title">
            ${title}
        </h2>
        <h4 class="body-text">
            ${body}
        </h4>
        <button class="delete-btn">Удалить пост</button>
    
    `;
    blocks.append(div);
};

const deleteItem = () => {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            let id = e.target.closest(".block").dataset.id;
            e.target.closest(".block").remove();
            deleteData(id);
        }
    });
};

getData();
deleteItem();
