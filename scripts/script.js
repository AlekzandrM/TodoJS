import { TodoItem } from './todoItem.js'

let todoList = [
    {id: 1, message: 'Прочитать инструкцию!', done: false, start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: 2, message: 'Создать тудушку!', done: false, start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: 3, message: 'Добавить функционал', done: false, start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
]

class TodoList {
    constructor(arr) {
        this.arr = arr
    }

    createTodo()  {
        const div = document.getElementById('todoList')
        const ul = document.createElement('ul')

        for (let i = 0; i < this.arr.length; i++) {
            const todo = new TodoItem(this.arr[i]).showTodo()
            let todoNum = i + 1 + '.'
            todo.firstChild.prepend(todoNum)
            ul.append(todo)
        }

        div.append(ul)
    }
    addTodo() {
        let myThis = this
        const inp = document.getElementById('newTodoInput')

        inp.addEventListener('keyup', function (e) {
            let text = this.value

            if (text.match(/^(?=.*[!@#$%^&(),.+=/\]\[{}?><":;|])/)) return

            if (e.key === 'Enter' ) {
                const start = new Date().toLocaleDateString()
                const end = new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()

                let newTodo = { message: text, start, end }
                const todoLi = new TodoItem(newTodo).showTodo()
                myThis.arr.push(newTodo)

                let todoNum = myThis.arr.length + '.'
                todoLi.firstChild.prepend(todoNum)

                const ul = document.querySelector('ul')
                ul.append(todoLi)
                inp.value = ''
            }
        })
    }

    closeModal() {
        const modal = document.querySelector('.modal')
        const btnCancel = document.querySelector('.modalCancel')
        const btnSave = document.querySelector('.modalSave')

        btnCancel.addEventListener('click', function () {
            modal.classList.toggle('hide')
        })
        btnSave.addEventListener('click', function() {
            modal.classList.toggle('hide')
        })
    }
    openModal() {
        const openButton = document.querySelector('.plus').firstElementChild
        const modal = document.querySelector('.modal')
        openButton.addEventListener('click', e => {
            modal.classList.remove('hide')
        })
    }
    addTodoFromModal() {
        const myThis = this
        const inpMessage = document.getElementById('modalTodoInput')
        const inpStart = document.getElementById('start')
        const inpEnd = document.getElementById('end')
        const saveButton = document.querySelector('.modalSave')
        let start = inpStart.value.split('-').reverse().join('.')
        let end = inpStart.value.split('-').reverse().join('.')
        let message = ''
        const newTodo = {start, end, message}
        const restrictedSymbols = ['!', '@', '#','$','%','^','&','*','(',')',]
        let validMessage = false
        let validDate = true
        saveButton.setAttribute('disabled', 'disabled')

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
            for (let i = 0; i < restrictedSymbols.length; i++) {
                let invalidInput = (this.value.split('').includes(restrictedSymbols[i]) || this.value === '')

                if (invalidInput) {
                    this.classList.add('invalid')
                    const errDiv = showErr()
                    errDiv.innerHTML = 'Wrong symbol or empty field'

                    if (this.nextElementSibling === null) this.after(errDiv)
                    validMessage = false
                    showSaveButton(validMessage, validDate)
                    return this
                }
                if (!invalidInput) {
                    let errDiv = this.nextElementSibling
                    if (errDiv) errDiv.remove()
                    this.classList.remove('invalid')
                    validMessage = true
                    showSaveButton(validMessage, validDate)
                }
            }
            newTodo.message = this.value
            return validMessage
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
            const modal = document.querySelector('.modal')
            const todoLi = new TodoItem(newTodo).showTodo()

            myThis.arr.push(newTodo)
            let todoNum = myThis.arr.length + '.'
            todoLi.firstChild.prepend(todoNum)

            const ul = document.querySelector('ul')
            ul.append(todoLi)
            inpMessage.value = ''

            modal.classList.add('hide')
        })
    }
}

const myTodo = new TodoList(todoList)
myTodo.createTodo()
myTodo.addTodo()

myTodo.closeModal()
myTodo.openModal()
myTodo.addTodoFromModal()




