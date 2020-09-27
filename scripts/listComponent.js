import { TodoItem } from './todoItem.js'
import { saveButton,listComponent, ul } from "./constants.js";

let mockTodoList = [
    // {id: '01', message: 'Прочитать инструкцию', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString(), done: false, btnID:'01b'},
    // {id: '02', message: 'Создать тудушку', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString(), done: false, btnID:'02b'},
    // {id: '03', message: 'Добавить функционал', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString(), done: false, btnID:'03b'},
]

export class ListComponent {
    listTodo = mockTodoList
    oldIdBTnID

    render()  {
        this.listTodo.forEach((el) => {
            const todo = new TodoItem(el)
            todo.renderTodo()

            this.removeEventHandlers()
        })
    }

    getOldId(id) {
        this.oldIdBTnID = id
    }

    editTodoHandler(editTodo) {
        const { id, message, start, end, btnID } = editTodo
        const listTodoItem = {id, message, start, end, done: false, btnID}
        this.listTodo = [...this.listTodo, listTodoItem]

        const newList =  this.listTodo.filter((el, ind) => {
            return el.btnID !== this.oldIdBTnID
        })
        this.listTodo = [...newList]

        this.clearList()
        listComponent.render()
    }
    editionTodo() {
        const editBind = this.editTodoHandler.bind(this)
        saveButton.addEventListener('saveEditTodoEvent', function (e) {
            const editTodo = e.detail.editTodo
            editBind(editTodo)
        })
        const getIdBind = this.getOldId.bind(this)
        document.addEventListener('currentTodoEvent', function (e) {
            const btnID = e.detail.btnID
            getIdBind(btnID)
        })
    }

    addTodoMainHandler(todo) {
        const { id, message, start, end, btnID } = todo
        const listTodoItem = {id, message, start, end, done: false, btnID}

        this.clearList()
        this.listTodo = [...this.listTodo, listTodoItem]
        listComponent.render()
    }
    addTodoFromMain() {
        const addTodoBind = this.addTodoMainHandler.bind(this)
        document.addEventListener('addTodoFromMainInp', function (e) {
            const todo = e.detail.newTodo
            addTodoBind(todo)
        })
    }

    clearList() {
        ul.innerHTML = null
    }
    removeEventHandlers() {
        const getIdBind = this.getOldId.bind(this)
        document.removeEventListener('currentTodoEvent', function (e) {
            const btnID = e.detail.btnID
            getIdBind(btnID)
        })

        const editBind = this.editTodoHandler.bind(this)
        saveButton.removeEventListener('saveEditTodoEvent', function (e) {
            const editTodo = e.detail.editTodo
            editBind(editTodo)
        })
    }
}

