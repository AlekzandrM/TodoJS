import { openButton, modal, message, start, end, totalLi, inpStart, inpEnd, cancelButton, inpMessage, todos, forbiddenSybols} from './constants.js'
import { today, tomorrow, saveButton} from "./constants.js";
import { TodoItem } from "./todoItem.js";

export class Modal {
    quantityOfTodos = this.countOfquantityOfTodo()

    openModal() {
        this.quantityOfTodos = this.countOfquantityOfTodo()
        openButton.addEventListener('click', e => {
            this.resetModalInputs()
            this.addTodoFromModal()
            modal.classList.remove('hide')
        })
    }
    countOfquantityOfTodo() {
        return totalLi.length
    }
    resetModalInputs() {
        start.value = today
        end.value = tomorrow
        message.value = ''
    }
    addTodoFromModal(newTodo) {
        const myThis = this
        let start = inpStart.value.split('-').reverse().join('.')
        let end = inpEnd.value.split('-').reverse().join('.')
        newTodo = {start, end, done: false}

        cancelButton.addEventListener('click', function (e) {
            let quantityOfTodosAfter = myThis.countOfquantityOfTodo()
            myThis.closeModal(quantityOfTodosAfter, )
        })

        inpMessage.addEventListener('input', function (e) {
            myThis.validateMessage(this.value)
            newTodo.message = this.value
        })

        inpStart.addEventListener('change', function (e) {
            start = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement
            const el = errParentPosition.lastElementChild

            const errDiv = myThis.compareDates(inpStart, inpEnd)
            const prevErr = errParentPosition.lastElementChild.classList.contains('errDiv')

            myThis.validateDate(errDiv, prevErr, el)
            newTodo.start = start
        })

        inpEnd.addEventListener('change', function (e) {
            const myThis = this
            end = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement.previousElementSibling
            const el = errParentPosition.parentElement.firstElementChild.lastElementChild

            let errDiv = myThis.compareDates(inpStart, inpEnd)
            const prevErr = errParentPosition.parentElement.firstElementChild.lastElementChild.classList.contains('errDiv')

            myThis.validateDate(errDiv, prevErr, el)
            myThis.compareDates(inpStart, inpEnd)

            newTodo.end = end
        })
        saveButton.addEventListener('click', function (e) {
            const myThis = this
            e.stopImmediatePropagation()
            const todoLi = new TodoItem(newTodo)
            const renderedTodoLi = todoLi.renderTodo()
            const todoItemCount = document.querySelectorAll('li')

            myThis.insertTodoNumber(renderedTodoLi, todoItemCount.length + 1)

            const ul = document.querySelector('ul')
            ul.append(renderedTodoLi)
            let quantityOfTodosAfter = myThis.countOfquantityOfTodo()
            myThis.closeModal(quantityOfTodosAfter)
            this.validMessage = false
            myThis.showSaveButton()
        })
    }
    closeModal(quantityOfTodosAfter, parentLi) {
        this.resetModalInputs()
        modal.classList.add('hide')

        if (this.quantityOfTodos !== quantityOfTodosAfter && parentLi) {
            parentLi.remove()
            const todosArr = Array.from(todos)
            todosArr.map((todo, ind) => this.insertTodoNumber(todo, ind+1))
        }
    }
    compareDates(inpStart, inpEnd) {
        if (new Date(inpStart.value).getTime() > new Date(inpEnd.value).getTime()) {
            const errDiv = this.showErr()
            errDiv.innerHTML = 'Wrong time intervals'
            errDiv.classList.add('timeErr')
            return errDiv
        }
    }
    validateMessage(text) {
        const invalidInput = new RegExp(forbiddenSybols).test(text)

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
            this.validDate = (new Date(inpStart.value).getTime() < new Date(inpEnd.value).getTime())
            this.showSaveButton()
        }
        if (!errDiv && !prevErr) {
            let errDiv = el.parentElement.lastElementChild
            if (errDiv.classList.contains('errDiv')) errDiv.remove()

            this.validDate = true
            this.showSaveButton()
        }
    }
    showSaveButton() {
        if (this.validMessage && this.validDate) {
            if (saveButton.classList.contains('modalSave')) saveButton.classList.remove('modalSave')
            saveButton.removeAttribute('disabled')
        } else {
            saveButton.classList.add('modalSave')
            saveButton.setAttribute('disabled', 'disabled')
        }
    }
}
