import {
    ul,
    todoList,
    inp,
    forbiddenSybols,
    todayDay,
    tomorrowDay,
    calendarDates,
    inpMessage,
    inpStart, inpEnd, modal
} from "./constants.js";


export class TodoItem {
    done = false
    id = this.createId()
    newTodo

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
    runTodoMethods() {
        this.checkTodo()
        this.addTodo()
        this.correctTodo()
        this.deleteTodo()
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
            const target = e.target
            if (target.tagName === 'SPAN' && target.classList.contains('delete')) {
                e.stopImmediatePropagation()
                const parentLi = target.closest('li')
                console.log(parentLi)
                parentLi.remove()
            }
        })
    }
    addTodo() {
        inp.addEventListener('keyup', function (e) {
            this.classList.remove('invalid')
            const text = this.value
            if (text.match(new RegExp(forbiddenSybols))) {
                this.classList.toggle('invalid')
                return
            }

            if (e.key === 'Enter' && text) {
                const newTodo = { message: text, start: todayDay, end: tomorrowDay }
                const todoLi = new TodoItem(newTodo)
                todoLi.renderTodo()
                inp.value = ''
            }
        })
    }

    correctTodoHandler(target, e) {
        const newTodo = {done: false}
        const parentLi = target.closest('li')
        let message = parentLi.querySelector('.message').innerHTML
        const dateText = parentLi.querySelector('.time').innerText

        const dates = dateText.match(new  RegExp(calendarDates))
        const start = dates[0]
        const end = dates[1]

        newTodo.start = new Date(start.split('.').reverse().join('-')).toLocaleDateString().split('.').reverse().join('-')
        newTodo.end = new Date(end.split('.').reverse().join('-')).toLocaleDateString().split('.').reverse().join('-')
        newTodo.message = message

        if (target.tagName === 'SPAN' && target.classList.contains('edit')) {
            e.stopImmediatePropagation()
            modal.classList.remove('hide')

            inpMessage.value = newTodo.message
            inpStart.value = newTodo.start
            inpEnd.value = newTodo.end

            modal.dispatchEvent(new CustomEvent("correctTodo", {
                detail: { newTodo, parentLi}
            }))
        }
    }
    correctTodo() {
        const correctTodoHandlerBind = this.correctTodoHandler.bind(this)
        todoList.addEventListener('click', (e) => {
            // e.stopPropagation()
            const target = e.target
            correctTodoHandlerBind(target, e)
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
