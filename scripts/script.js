let todoList = [
    {id: 1, message: 'Прочитать инструкцию!', done: false, start: 'start', end: 'end'},
    {id: 2, message: 'Создать тудушку!', done: false, start: 'start', end: 'end'},
    {id: 3, message: 'Добавить функционал', done: false, start: 'start', end: 'end'},
]

let div = document.getElementById('todoList')

function createTodoList(arr) {
    if (!arr.length) return
    let ul = document.createElement('ul')

    for (let i=0; i < arr.length; i++) {
        let message = arr[i].message
        let ind = arr[i].id

        let li = document.createElement('li')
        li.innerHTML = `<span class="ind">${ind}.</span> ${message}`
        let span = li.querySelector('.ind')
        span.style.fontWeight = 'bold'

        ul.append(li)
    }
    div.append(ul)
}
createTodoList(todoList)
