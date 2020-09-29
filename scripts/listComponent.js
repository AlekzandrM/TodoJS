import { TodoItem } from './todoItem.js'
import {
    saveButton,
    listComponent,
    ul,
    active,
    all,
    completed,
    clearCompleted,
    filters,
    filterIcon,
    startFilter,
    endFilter,
    today, filterInput, firstJanuary
} from "./constants.js";

let mockTodoList = [
    {id: '01', message: 'Прочитать инструкцию', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString(), done: true, btnID:'01b'},
    {id: '02', message: 'Создать тудушку', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString(), done: false, btnID:'02b'},
    {id: '03', message: 'Добавить функционал', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString(), done: true, btnID:'03b'},
]

export class ListComponent {
    listTodo = mockTodoList
    oldIdBTnID

    showActiveCb = this.showActive.bind(this)
    showAllCb = this.showAll.bind(this)
    showCompletedCb = this.showCompleted.bind(this)
    showClearCompletedCb = this.showClearCompleted.bind(this)
    filterTextCb = this.filterTextMethod.bind(this)
    filterStartCb = this.filterStartMethod.bind(this)
    filterEndCb = this.filterEndMethod.bind(this)

    render(arr)  {
        arr.forEach((el) => {
            const todo = new TodoItem(el)
            todo.renderTodo()

            this.removeEventHandlers()
        })
    }
    runListComponentMethods() {
        this.render(this.listTodo)
        this.editionTodo()
        this.addTodoFromMain()
        this.showActiveTodo()
        this.showAllTodo()
        this.showCompletedTodo()
        this.showClearCompletedTodo()
        this.showFilters()
        this.filterByText()
        this.filterByStartDate()
        this.filterByEndDate()
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
        listComponent.render(this.listTodo)
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
        listComponent.render(this.listTodo)
    }
    addTodoFromMain() {
        const addTodoBind = this.addTodoMainHandler.bind(this)
        document.addEventListener('addTodoFromMainInp', function (e) {
            const todo = e.detail.newTodo
            addTodoBind(todo)
        })
    }

    showAll() {
        this.clearList()
        listComponent.render(this.listTodo)
    }
    showAllTodo() {
        all.addEventListener('click', this.showAllCb)
    }
    showActive() {
        const acitveTodos =  this.listTodo.filter((el, ind) => {
            return el.done === true
        })
        this.clearList()
        listComponent.render(acitveTodos)
    }
    showActiveTodo() {
        active.addEventListener('click', this.showActiveCb)
    }
    showCompleted() {
        const completedTodos =  this.listTodo.filter((el, ind) => {
            return el.done !== true
        })
        this.clearList()
        listComponent.render(completedTodos)
    }
    showCompletedTodo() {
        completed.addEventListener('click', this.showCompletedCb)
    }
    showClearCompleted() {
        const completedTodos =  this.listTodo.filter((el, ind) => {
            return el.done !== true
        })
        this.listTodo = [...completedTodos]
        this.clearList()
        listComponent.render(this.listTodo)
    }
    showClearCompletedTodo() {
        clearCompleted.addEventListener('click', this.showClearCompletedCb)
    }

    showFilters() {
        filterIcon.addEventListener('click', () => {
            startFilter.value = firstJanuary
            endFilter.value = today
            filters.classList.toggle('hide')
        })
    }

    filterTextMethod() {
        const text = filterInput.value
        const sortedArr = this.listTodo.filter(el => {
            return el.message.trim().toLowerCase().indexOf(text) !== -1
        })
        this.clearList()
        this.render(sortedArr)
    }
    filterByText() {
        filterInput.addEventListener('input', this.filterTextCb)
    }
    filterStartMethod() {
        const filterStart = new Date(startFilter.value)

        const sortedArr = this.listTodo.filter(el => {
            const todoStart = new Date(el.start.split('.').reverse().join('-'))
            return todoStart >= filterStart
        })
        this.clearList()
        this.render(sortedArr)
    }
    filterByStartDate() {
        startFilter.addEventListener('input', this.filterStartCb)
    }

    filterEndMethod() {
        const filterEnd = new Date(endFilter.value)

        const sortedArr = this.listTodo.filter(el => {
            const todoEnd = new Date(el.end.split('.').reverse().join('-'))
            return todoEnd <= filterEnd
        })
        this.clearList()
        this.render(sortedArr)
    }
    filterByEndDate() {
        endFilter.addEventListener('input', this.filterEndCb)
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

