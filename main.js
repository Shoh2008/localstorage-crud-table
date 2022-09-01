let tbody = document.getElementById('tbody')

let searchInput = document.getElementById('searchInput')

let nameAdd = document.getElementById('nameAdd')
let ageAdd = document.getElementById('ageAdd')
let cityAdd = document.getElementById('cityAdd')

let nameEdit = document.getElementById('nameEdit')
let ageEdit = document.getElementById('ageEdit')
let cityEdit = document.getElementById('cityEdit')

let addModal = document.getElementById('addModal')
let editModal = document.getElementById('editModal')

let keyForModalAdd = false
let keyForModalEdit = false

searchInput.addEventListener('keyup', (e) => {
    const product = document.querySelectorAll(".line");
    const pname = document.querySelectorAll(".name");

    for (var i = 0; i < pname.length; i++) {
        let match = product[i].querySelectorAll(".name")[0];
        if (match) {
            let textvalue = match.textContent || match.innerHTML

            if (textvalue.toLocaleUpperCase().indexOf(searchInput.value.toLocaleUpperCase()) > -1) {
                product[i].style.display = "";
            } else {
                product[i].style.display = "none";
            }
        }
    }
})

function opener() {
    if (keyForModalAdd === true) {
        addModal.style.left = '-50%'
        keyForModalAdd = false
    } else {
        addModal.style.left = '50%'
        keyForModalAdd = true
    }
}
function Add() {
    if (nameAdd && ageAdd && cityAdd) {
        let store = JSON.parse(localStorage.getItem('users'))
        let news = store
        news.push({ name: nameAdd.value, age: ageAdd.value, city: cityAdd.value })
        localStorage.setItem('users', JSON.stringify(news))
    }
    drawUsers()
    opener()
    nameAdd.value = ''
    ageAdd.value = ''
    cityAdd.value = ''
}
function drawUsers() {
    let store = JSON.parse(localStorage.getItem('users'))
    let news = store
    
    localStorage.setItem('users', JSON.stringify([{ name: 'Shohrux', age: '14', city: 'Angren' }]))

    let a = news.map((item, index) => `
        <tr class='userSearch line'>
            <td>${index + 1}</td>
            <td class='name'>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.city}</td>
            <td>
                <button class="btn" onclick="openEditModal(${index})">🖊</button>
                <button class="btn" onclick="deleteUser(${index})">🗑</button>
            </td>
        </tr>
    `).join('')
    tbody.innerHTML = a

    localStorage.setItem('users', JSON.stringify(news))
}
function editOpener() {
    if (keyForModalAdd === true) {
        editModal.style.left = '-50%'
        keyForModalAdd = false
    } else {
        editModal.style.left = '50%'
        keyForModalAdd = true
    }
}
function openEditModal(index) {
    editOpener()
    let store = JSON.parse(localStorage.getItem('users'))
    let news = store

    nameEdit.value = news[index].name
    ageEdit.value = news[index].age
    cityEdit.value = news[index].city

    nameEdit.addEventListener('keyup', (e) => {
        news[index].name = e.target.value
        localStorage.setItem('users', JSON.stringify(news))
        drawUsers()
    })
    ageEdit.addEventListener('keyup', (e) => {
        news[index].age = e.target.value
        localStorage.setItem('users', JSON.stringify(news))
        drawUsers()
    })
    cityEdit.addEventListener('keyup', (e) => {
        news[index].city = e.target.value
        localStorage.setItem('users', JSON.stringify(news))
        drawUsers()
    })
}
function deleteUser(index) {
    let store = JSON.parse(localStorage.getItem('users'))
    let news = store
    news.splice(index, 1)
    localStorage.setItem('users', JSON.stringify(news))
    drawUsers()
}
function cancleAdd() {
    opener()
    nameAdd.value = ''
    ageAdd.value = ''
    cityAdd.value = ''
}
function cancleEdit() {
    editOpener()
    nameEdit.value = ''
    ageEdit.value = ''
    cityEdit.value = ''
}

window.addEventListener('load', () => {
    drawUsers()
})