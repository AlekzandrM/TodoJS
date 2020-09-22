import  { ul, todoList } from "./constants.js";


export class TodoItem {
    done = false
    id = this.createId()

    constructor({ message, start, end }) {
        this.message = message
        this.start = start
        this.end = end
    }
    renderTodo() {
        const li = document.createElement('li')
        li.innerHTML = `
            <span><input type="checkbox" id="${this.id}"> <span class="ind"><span class="todoNumber"></span> <span class="message">${this.message}</span></span></span>
            <span class="time">начало: ${this.start} конец: ${this.end} <span class="edit">\t&#9998;</span> <span class="delete">\t&#128465;</span></span>`
        let span = li.querySelector('.ind')
        span.style.fontWeight = 'bold'
        ul.append(li)
    }
    checkTodo() {
        todoList.addEventListener('click', function (e) {
            e.stopPropagation()
            const input = e.target
            const parentTodo = input.parentElement.parentElement

            if (input.tagName !== 'INPUT') return
            if (input.checked) {
                parentTodo.classList.add('checked')
            } else parentTodo.classList.remove('checked')
        })
    }
    deleteTodo() {
        todoList.addEventListener('click', function (e) {
            e.stopPropagation()
            const target = e.target
            const parentLi = target.closest('li')
            if (target.tagName === 'SPAN' && target.classList.contains('delete')) {
                parentLi.remove()
            }
        })
    }

    insertTodoNumber(todo, num) {
        let todoNumber =  todo.querySelector('.todoNumber')
        todoNumber.innerHTML = num
        return todoNumber
    }
    createId() {
        return (new Date().getTime()).toString()
    }
}
