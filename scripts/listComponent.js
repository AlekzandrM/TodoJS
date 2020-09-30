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


export class ListComponent {
    listTodo = []
    oldIdBtnID

    showActiveCb = this.showActive.bind(this)
    showAllCb = this.showAll.bind(this)
    showCompletedCb = this.showCompleted.bind(this)
    showClearCompletedCb = this.showClearCompleted.bind(this)
    filterTextCb = this.filterTextMethod.bind(this)
    filterStartCb = this.filterStartMethod.bind(this)
    filterEndCb = this.filterEndMethod.bind(this)
    defineOldIdDuringEditionCb = this.defineOldIdDuringEditionHandler.bind(this)
    editionTodoCb = this.editTodoHandler.bind(this)
    addTodoFromMainCb = this.addTodoMainHandler.bind(this)

    render(arr)  {
        arr.forEach((el) => {
            const todo = new TodoItem(el)
            todo.renderTodo()
        })
    }

    runListComponentMethods() {
        this.render(this.listTodo)
        this.editionTodo()
        this.defineOldIdDuringEdition()
        this.addTodoFromMain()
        this.showActiveTodo()
        this.showAllTodo()
        this.showCompletedTodo()
        this.showClearCompletedTodo()
        this.showFilters()
        this.filterByText()
        this.filterByStartDate()
        this.filterByEndDate()
        this.removeEventHandlers()
    }

    editTodoHandler(e) {
        const { id, message, start, end, btnID } = e.detail.editTodo
        const listTodoItem = {id, message, start, end, done: false, btnID}

        this.listTodo = [...this.listTodo, listTodoItem]

        const newList =  this.listTodo.filter((el) => {
            return el.btnID !== this.oldIdBtnID
        })

        this.listTodo = [...newList]

        this.clearList()
        listComponent.render(this.listTodo)
    }

    editionTodo() {
        saveButton.addEventListener('saveEditTodoEvent', (e) => this.editionTodoCb(e))
    }

    defineOldIdDuringEditionHandler(e) {
        this.oldIdBtnID = e.detail.btnID
    }

    defineOldIdDuringEdition() {
        document.addEventListener('currentTodoEvent', (e) => this.defineOldIdDuringEditionCb(e))
    }

    addTodoMainHandler(e) {
        const { id, message, start, end, btnID } = e.detail.newTodo
        const listTodoItem = {id, message, start, end, done: false, btnID}

        this.clearList()
        this.listTodo = [...this.listTodo, listTodoItem]
        listComponent.render(this.listTodo)
    }

    addTodoFromMain() {
        document.addEventListener('addTodoFromMainInp', (e) => this.addTodoFromMainCb(e))
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
        const sortedArr = this.listTodo.filter(todo => {
            const todoStart = new Date(this.formattingDateForModal(todo.start))
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
        const sortedArr = this.listTodo.filter(todo => {
            const todoEnd = new Date(this.formattingDateForModal(todo.end))
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

    formattingDateForModal(date) {
        return date.split('.').reverse().join('-')
    }

    removeEventHandlers() {
        document.removeEventListener('currentTodoEvent', (e) => this.defineOldIdDuringEditionCb(e))
        saveButton.removeEventListener('saveEditTodoEvent', (e) => this.editionTodoCb(e))
        document.removeEventListener('addTodoFromMainInp', (e) => this.addTodoFromMainCb(e))
    }
}

