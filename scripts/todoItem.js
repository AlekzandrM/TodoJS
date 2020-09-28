import { ul } from "./constants.js";


export class TodoItem {
    done = false
    id = this.createId()

    editModalCb = this.sendToModal.bind(this)
    removeCb = this.removeEventHandlers.bind(this)

    constructor({ message, start, end }) {
        this.message = message
        this.start = start
        this.end = end
    }
    renderTodo() {
        const li = document.createElement('li')
        li.innerHTML = `
            <span><input type="checkbox" id="${this.id}"> <span class="ind"><span class="todoNumber"></span> <span class="message">${this.message}</span></span></span>
            <span class="time">начало: ${this.start} конец: ${this.end} <span class="edit" id="${this.message}${this.start}${this.end}">\t&#9998;</span> <span class="delete">\t&#128465;</span></span>`
        let span = li.querySelector('.ind')
        span.style.fontWeight = 'bold'
        ul.append(li)
        this.todoSetupHandlers()
    }
    createId() {
        return `f${(~~(Math.random()*1e8)).toString(16)}`
    }
    sendToModal() {
        const btnID = `${this.message}${this.start}${this.end}`
        const currentTodo = {id: this.id, start: this.start, end: this.end, done: this.done, message: this.message, btnID }
        document.dispatchEvent(new CustomEvent("currentTodoEvent", {
            detail: { currentTodo, btnID }
        }))
    }
    getEditIcon() {
        return document.getElementById(`${this.message}${this.start}${this.end}`)
    }
    todoSetupHandlers() {
        this.getEditIcon().addEventListener('click', this.editModalCb)
        this.getDeleteIcon().addEventListener('click', this.removeCb)
    }

    getDeleteIcon() {
        return document.querySelector('.delete')
    }
    removeEventHandlers() {
        this.getEditIcon().removeEventListener('click', this.editModalCb)
        this.getDeleteIcon().removeEventListener('click', this.removeCb)
    }
}
