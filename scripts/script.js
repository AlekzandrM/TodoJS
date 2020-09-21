import { TodoItem } from './todoItem.js'

let todoList = [
    {id: '', message: 'Прочитать инструкцию', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: '', message: 'Создать тудушку', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: '', message: 'Добавить функционал', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
]

class TodoList {
    saveButton = document.querySelector('.modalSave')
    cancelButton = document.querySelector('.modalCancel')
    inpMessage = document.getElementById('modalTodoInput')
    inpStart = document.getElementById('start')
    inpEnd = document.getElementById('end')
    validMessage = false
    validDate = true
    newTodo = {done: false}
    parentLi
    quantityOfTodos = this.countOfquantityOfTodo()

    constructor(arr) {
        this.arr = arr
    }

    insertTodoNumber(todo, num) {
        let todoNumber =  todo.querySelector('.todoNumber')
        todoNumber.innerHTML = num
        return todoNumber
    }

    createTodo()  {
        const div = document.getElementById('todoList')
        const ul = document.createElement('ul')

        for (let i = 0; i < this.arr.length; i++) {
            const todo = new TodoItem(this.arr[i]).showTodo()
            this.insertTodoNumber(todo, i+1)
            ul.append(todo)
        }
        div.append(ul)
        this.correctTodo()
    }
    addTodo() {
        const myThis = this
        const inp = document.getElementById('newTodoInput')

        inp.addEventListener('keyup', function (e) {
            this.classList.remove('invalid')
            const text = this.value
            if (text.match(/^(?=.*[!@#$%^&(),.+=/\]\[{}?><":;|])/)) {
                this.classList.toggle('invalid')
                return
            }

            if (e.key === 'Enter' && text) {
                const start = new Date().toLocaleDateString()
                const end = new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()
                const todoItemCount = document.querySelectorAll('li')

                let newTodo = { message: text, start, end }
                const todoLi = new TodoItem(newTodo).showTodo()
                myThis.arr.push(newTodo)

                myThis.insertTodoNumber(todoLi, todoItemCount.length + 1)

                const ul = document.querySelector('ul')
                ul.append(todoLi)
                inp.value = ''
            }
        })
    }

    resetModalInputs() {
        const message = document.querySelector('#modalTodoInput')
        const start = document.querySelector('#start')
        const end = document.querySelector('#end')
        const today = new Date().toLocaleDateString().split('.').reverse().join('-')
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString().split('.').reverse().join('-')

        start.value = today
        end.value = tomorrow
        message.value = ''
    }

    closeModal(quantityOfTodosAfter) {
        const modal = document.querySelector('.modal')
        this.resetModalInputs()
        modal.classList.add('hide')

        if (this.quantityOfTodos !== quantityOfTodosAfter && this.parentLi) {
            this.parentLi.remove()

            const todos = document.getElementsByTagName('li')
            const todosArr = Array.from(todos)
            todosArr.map((todo, ind) => this.insertTodoNumber(todo, ind+1))
        }
    }
    openModal() {
        const myThis = this
        const openButton = document.querySelector('.plus').firstElementChild
        const modal = document.querySelector('.modal')

        // Подсчитывает количество todo - добавилось новое или редактировалось
        this.quantityOfTodos = this.countOfquantityOfTodo()

        openButton.addEventListener('click', e => {
            myThis.resetModalInputs()
            myThis.addTodoFromModal()
            modal.classList.remove('hide')
        })
    }
    showErr() {
        let err = document.createElement('div')
        err.classList.add('errDiv')
        return err
    }
    compareDates(inpStart, inpEnd) {
        if (new Date(inpStart.value).getTime() > new Date(inpEnd.value).getTime()) {
            const errDiv = this.showErr()
            errDiv.innerHTML = 'Wrong time intervals'
            errDiv.classList.add('timeErr')
            return errDiv
        }
    }
    showSaveButton() {
        if (this.validMessage && this.validDate) {
            if (this.saveButton.classList.contains('modalSave')) this.saveButton.classList.remove('modalSave')
            this.saveButton.removeAttribute('disabled')
        } else {
            this.saveButton.classList.add('modalSave')
            this.saveButton.setAttribute('disabled', 'disabled')
        }
    }
    validateMessage(text) {
        const inpMessage = document.getElementById('modalTodoInput')
        const invalidInput = (/^(?=.*[!@#$%^&(),.+=/\]\[{}?><":;|])/).test(text)

        if (invalidInput || !text) {
            inpMessage.classList.add('invalid')
            const errDiv = this.showErr()
            errDiv.innerHTML = 'Wrong symbol or empty field'

            if (inpMessage.nextElementSibling === null) inpMessage.after(errDiv)
            this.validMessage = false
            this.showSaveButton()
        }
        if (!text) {
            this.validMessage = false
            this.showSaveButton()
        }
        if (!invalidInput && text) {
            let errDiv = inpMessage.nextElementSibling
            if (errDiv) errDiv.remove()
            inpMessage.classList.remove('invalid')
            this.validMessage = true
            this.showSaveButton()
        }
    }
    validateDate(errDiv, prevErr, el) {
        const errParentPosition = el.parentElement

        if (errDiv || prevErr) {
            this.validDate = false
            this.showSaveButton()
        }
        if (errDiv && prevErr) {
            return this.showSaveButton()
        }
        if (errDiv && !prevErr) {
            errParentPosition.append(errDiv)
        }
        if (prevErr) {
            errParentPosition.lastChild.remove()
            this.validDate = (new Date(this.inpStart.value).getTime() < new Date(this.inpEnd.value).getTime())
            this.showSaveButton()
        }
        if (!errDiv && !prevErr) {
            let errDiv = el.parentElement.lastElementChild
            if (errDiv.classList.contains('errDiv')) errDiv.remove()

            this.validDate = true
            this.showSaveButton()
        }
    }
    addTodoFromModal(newTodo) {
        const myThis = this
        let start = this.inpStart.value.split('-').reverse().join('.')
        let end = this.inpEnd.value.split('-').reverse().join('.')

        newTodo = {start, end, done: false}

        this.cancelButton.addEventListener('click', function (e) {
            let quantityOfTodosAfter = myThis.countOfquantityOfTodo()
            myThis.closeModal(quantityOfTodosAfter)
        })

        this.inpMessage.addEventListener('input', function (e) {
            myThis.validateMessage(this.value)
            newTodo.message = this.value
        })

        this.inpStart.addEventListener('change', function (e) {
            start = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement
            const el = errParentPosition.lastElementChild

            const errDiv = myThis.compareDates(myThis.inpStart, myThis.inpEnd)
            const prevErr = errParentPosition.lastElementChild.classList.contains('errDiv')

            myThis.validateDate(errDiv, prevErr, el)
            newTodo.start = start
        })

        this.inpEnd.addEventListener('change', function (e) {
            end = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement.previousElementSibling
            const el = errParentPosition.parentElement.firstElementChild.lastElementChild

            let errDiv = myThis.compareDates(myThis.inpStart, myThis.inpEnd)
            const prevErr = errParentPosition.parentElement.firstElementChild.lastElementChild.classList.contains('errDiv')

            myThis.validateDate(errDiv, prevErr, el)
            myThis.compareDates(myThis.inpStart, myThis.inpEnd)

            newTodo.end = end
        })

        this.saveButton.addEventListener('click', function (e) {
            e.stopImmediatePropagation()
            const todoLi = new TodoItem(newTodo).showTodo()
            const todoItemCount = document.querySelectorAll('li')

            myThis.insertTodoNumber(todoLi, todoItemCount.length + 1)

            const ul = document.querySelector('ul')
            ul.append(todoLi)
            let quantityOfTodosAfter = myThis.countOfquantityOfTodo()
            myThis.closeModal(quantityOfTodosAfter)
            myThis.validMessage = false
            myThis.showSaveButton()
        })
    }

    countOfquantityOfTodo() {
        const totalLi = document.querySelectorAll('li').length
        return totalLi
    }

    checkTodo() {
        const todoList = document.getElementById('todoList')
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
        const myThis = this
        const todoListField = document.getElementById('todoList')
        todoListField.addEventListener('click', function (e) {
            e.stopPropagation()
            const target = e.target
            const parentLi = target.closest('li')

            if (target.tagName === 'SPAN' && target.classList.contains('delete')) {
                parentLi.remove()
                const siblingLi = todoListField.querySelectorAll('li')
                const siblingLiArr = Array.from(siblingLi)
                siblingLiArr.map((todo, ind) => myThis.insertTodoNumber(todo, ind+1))
            }
        })
    }
    correctTodo() {
        const myThis = this
        const todoListField = document.getElementById('todoList')

        todoListField.addEventListener('click', function (e) {
            e.stopPropagation()
            const target = e.target
            myThis.parentLi = target.closest('li')
            let message = myThis.parentLi.querySelector('.message').innerHTML
            const dateText = myThis.parentLi.querySelector('.time').innerText

            const start = dateText.match(/\b\d\d.\d\d.\d\d\d\d/g)[0]
            const end = dateText.match(/\b\d\d.\d\d.\d\d\d\d/g)[1]

            myThis.newTodo.start = new Date(start.split('.').reverse().join('-')).toLocaleDateString().split('.').reverse().join('-')
            myThis.newTodo.end = new Date(end.split('.').reverse().join('-')).toLocaleDateString().split('.').reverse().join('-')
            myThis.newTodo.message = message

            if (target.tagName === 'SPAN' && target.classList.contains('edit')) {
                myThis.validMessage = myThis.validDate = true
                myThis.showSaveButton()
                document.querySelector('.modal').classList.remove('hide')

                myThis.inpMessage.value = myThis.newTodo.message
                myThis.inpStart.value = myThis.newTodo.start
                myThis.inpEnd.value = myThis.newTodo.end

                myThis.addTodoFromModal(myThis.newTodo)
            }
        })
    }
}

const myTodo = new TodoList(todoList)
myTodo.createTodo()
myTodo.addTodo()
myTodo.openModal()
myTodo.checkTodo()
myTodo.deleteTodo()



