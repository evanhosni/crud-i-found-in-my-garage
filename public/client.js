const nameInput = document.querySelector('#name')
const categoryInput = document.querySelector('#category')
const isDustyInput = document.querySelector('#isDusty')
const submit = document.querySelector('#submit')
const stuffDiv = document.querySelector('#stuff')

init() //displays data from api on page. called on page load and on create/delete data
function init() {
    fetch('/api/stuff', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res=>res.json()).then(data => {
        stuffDiv.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            const item = document.createElement('div')
            item.className = "item"
            const x = document.createElement('button')
            const name = document.createElement('h2')
            const category = document.createElement('p')
            const isDusty = document.createElement('p')
    
            x.textContent = 'x'
            name.textContent = data[i].name
            category.textContent = data[i].category
            data[i].isDusty  ? isDusty.textContent = "dusty" : isDusty.textContent = "not dusty"
    
            item.append(x,name,category,isDusty)
            stuffDiv.append(item)
    
            x.addEventListener('click', () => {
                deleteItem(data[i].id)
            })
        }
    })
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    postItem()
})

function postItem() {//front end route for creating data
    let newItem = {
        id: crypto.randomUUID(),
        name: nameInput.value,
        category: categoryInput.value,
        isDusty: isDustyInput.checked ? true : false
    }

    console.log(JSON.stringify(newItem))

    fetch('/api/stuff', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        init()
    })
}

function deleteItem(id) {//front end route for deleting data
    fetch(`/api/stuff/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        init()
    })
}