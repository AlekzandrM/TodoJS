import { TodoItem } from './todoItem.js'

let todoList = [
    {id: '', message: 'Прочитать инструкцию!', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: '', message: 'Создать тудушку!', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: '', message: 'Добавить функционал', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
]

class TodoList {
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

    closeModal() {
        const modal = document.querySelector('.modal')

        this.resetModalInputs()
        modal.classList.add('hide')
    }
    openModal() {
        const myThis = this
        const openButton = document.querySelector('.plus').firstElementChild
        const modal = document.querySelector('.modal')

        openButton.addEventListener('click', e => {
            myThis.resetModalInputs()
            myThis.addTodoFromModal()
            modal.classList.remove('hide')
        })
    }
    addTodoFromModal() {
        const myThis = this
        const inpMessage = document.getElementById('modalTodoInput')
        const inpStart = document.getElementById('start')
        const inpEnd = document.getElementById('end')
        const saveButton = document.querySelector('.modalSave')
        const cancelButton = document.querySelector('.modalCancel')
        let start = inpStart.value.split('-').reverse().join('.')
        let end = inpStart.value.split('-').reverse().join('.')
        let message = ''
        const newTodo = {start, end, message, done: false}
        let validMessage = false
        let validDate = true
        saveButton.setAttribute('disabled', 'disabled')

        cancelButton.addEventListener('click', function (e) {
            myThis.closeModal()
        })

        function showErr() {
            let err = document.createElement('div')
            err.classList.add('errDiv')
            return err
        }

        function compareDates() {
            if (new Date(inpStart.value).getTime() > new Date(inpEnd.value).getTime()) {
                const errDiv = showErr()
                errDiv.innerHTML = 'Wrong time intervals'
                errDiv.classList.add('timeErr')
                return errDiv
            }
        }

        function showSaveButton(validMessage, validDate) {
            if (validMessage && validDate) {
                saveButton.classList.remove('modalSave')
                saveButton.removeAttribute('disabled')
            } else {
                saveButton.classList.add('modalSave')
                saveButton.setAttribute('disabled', 'disabled')
            }
        }
        showSaveButton(validMessage, validDate)

        inpMessage.addEventListener('input', function (e) {
            let invalidInput = (/^(?=.*[!@#$%^&(),.+=/\]\[{}?><":;|])/).test(this.value)

            if (invalidInput || !this.value) {
                this.classList.add('invalid')
                const errDiv = showErr()
                errDiv.innerHTML = 'Wrong symbol or empty field'

                if (this.nextElementSibling === null) this.after(errDiv)
                validMessage = false
                showSaveButton(validMessage, validDate)
                return this
            }
            if (!this.value) return
            if (!invalidInput && this.value) {
                let errDiv = this.nextElementSibling
                if (errDiv) errDiv.remove()
                this.classList.remove('invalid')
                validMessage = true
                showSaveButton(validMessage, validDate)
                newTodo.message = this.value
            }
        })

        inpStart.addEventListener('change', function (e) {
            start = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement

            const errDiv = compareDates()
            const prevErr = errParentPosition.lastElementChild.classList.contains('errDiv')

            if (errDiv || prevErr) {
                validDate = false
                showSaveButton(validMessage, validDate)
            }
            if (errDiv && prevErr) return this
            if (prevErr) {
                errParentPosition.lastChild.remove()
                validDate = (new Date(inpStart.value).getTime() < new Date(inpEnd.value).getTime())
                showSaveButton(validMessage, validDate)
                return this
            }
            if (errDiv && !prevErr) {
                errParentPosition.append(errDiv)
                return this
            }
            if (!errDiv && !prevErr) {
                let errDiv = this.parentElement.lastElementChild
                if (errDiv.classList.contains('errDiv')) errDiv.remove()

                validDate = true
                showSaveButton(validMessage, validDate)
                newTodo.start = start
            }
            return validDate
        })

        inpEnd.addEventListener('change', function (e) {
            end = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement.previousElementSibling

            let errDiv = compareDates()
            const prevErr = this.parentElement.previousElementSibling.lastElementChild.classList.contains('errDiv')

            if (errDiv || prevErr) {
                validDate = false
                showSaveButton(validMessage, validDate)
            }
            if (!errDiv && !prevErr) {
                let errDiv = this.parentElement.previousElementSibling.lastElementChild
                if (errDiv.classList.contains('errDiv')) errDiv.remove()
                newTodo.end = end
                validDate = true
                showSaveButton(validMessage, validDate)
                return this
            }
            if (errDiv && prevErr)  return this
            if (prevErr) {
                errParentPosition.lastChild.remove()

                validDate = (new Date(inpStart.value).getTime() < new Date(inpEnd.value).getTime())
                newTodo.start = inpStart.value.split('-').reverse().join('.')
                newTodo.end = end
                showSaveButton(validMessage, validDate)
                return this
            }
            if (errDiv && !prevErr) {
                errParentPosition.append(errDiv)
                return this
            }
        })

        saveButton.addEventListener('click', function (e) {
            e.stopImmediatePropagation()
            const todoLi = new TodoItem(newTodo).showTodo()
            const todoItemCount = document.querySelectorAll('li')

            myThis.arr.push(newTodo)

            myThis.insertTodoNumber(todoLi, todoItemCount.length + 1)

            const ul = document.querySelector('ul')
            ul.append(todoLi)
            myThis.closeModal()
            validMessage = false
            showSaveButton(validMessage, validDate)
        })
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
                siblingLiArr.map((todo, ind) => myThis.insertTodoNumber(todo, ind+1))}
        })
    }
}

const myTodo = new TodoList(todoList)
myTodo.createTodo()
myTodo.addTodo()
myTodo.openModal()
myTodo.checkTodo()
myTodo.deleteTodo()



