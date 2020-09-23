import { openButton, modal, ul, message, start, end, totalLi, inpStart, inpEnd, cancelButton, inpMessage, todos, forbiddenSybols} from './constants.js'
import { today, tomorrow, saveButton} from "./constants.js";
import { TodoItem } from "./todoItem.js";

export class Modal {
    quantityOfTodos = this.countOfquantityOfTodo()
    validMessage = false
    validDate = true
    todo = {done: false, start: today, end: tomorrow}

    runModalMethods() {
        this.openModal()
        this.closeModal()
        this.assignInputStart()
        this.assignInputMessage()
        this.assignInputEnd()
        this.assignCancelButton()
    }

    openModal() {
        const editTodoBind = this.editTodo.bind(this)

        openButton.addEventListener('click', e => {
            this.resetModalInputs()
            this.addTodoFromModal()
            modal.classList.remove('hide')
        })
        modal.addEventListener('correctTodo', function (e) {
            e.stopPropagation()
            const todo = e.detail.newTodo
            const parentLi = e.detail.parentLi
            editTodoBind(todo, parentLi)
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
    countOfquantityOfTodo() {
        return totalLi.length
    }
    resetModalInputs() {
        start.value = today
        end.value = tomorrow
        message.value = ''
    }

    editTodo(todo, parentLi) {
        this.validMessage = this.validDate = true
        this.showSaveButton()
        this.todo = todo
        this.addTodoFromModal(todo, parentLi)
    }

    removeParentLi(li) {
        // Вставить проверку если колич ли меняется, удаляем
    }

    inputMessageHandler(text) {
        this.validateMessage(text)
        this.todo.message = text
    }
    assignInputMessage() {
        const inputBind = this.inputMessageHandler.bind(this)
        inpMessage.addEventListener('input', function (e) {
            inputBind(this.value)
        })
    }

    inputStartHandler(prevErr, el, start) {
        const errDiv = this.compareDates(inpStart, inpEnd)

        this.validateDate(errDiv, prevErr, el)
        this.todo.start = start
    }
    assignInputStart() {
        const assingInpStartBind = this.inputStartHandler.bind(this)
        inpStart.addEventListener('change', function (e) {
            const start = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement
            const el = errParentPosition.lastElementChild
            const prevErr = errParentPosition.lastElementChild.classList.contains('errDiv')

            assingInpStartBind(prevErr, el, start)
        })
    }

    inputEndHandler(prevErr, el, end) {
        let errDiv = this.compareDates(inpStart, inpEnd)

        this.validateDate(errDiv, prevErr, el)
        this.compareDates(inpStart, inpEnd)
        this.todo.end = end
    }
    assignInputEnd() {
        const assignInpEndBind = this.inputEndHandler.bind(this)
        inpEnd.addEventListener('change', function (e) {
            const end = this.value.split('-').reverse().join('.')
            const errParentPosition = this.parentElement.previousElementSibling
            const el = errParentPosition.parentElement.firstElementChild.lastElementChild

            const prevErr = errParentPosition.parentElement.firstElementChild.lastElementChild.classList.contains('errDiv')

            assignInpEndBind(prevErr, el, end)
        })
    }

    cancelButtonHandler() {
        let quantityOfTodosAfter = this.countOfquantityOfTodo()
        this.closeModal(quantityOfTodosAfter)
    }
    assignCancelButton() {
        const cancelBind = this.cancelButtonHandler.bind(this)
        cancelButton.addEventListener('click', function (e) {
            cancelBind()
        })
    }

    saveButtonHandler(newTodo, parentLi) {
        const todoLi = new TodoItem(newTodo)
        todoLi.renderTodo()
        let quantityOfTodosAfter = this.countOfquantityOfTodo()
        this.closeModal(quantityOfTodosAfter, parentLi)
        this.validMessage = false
        this.showSaveButton()
    }
    assignSaveButton(newTodo, parentLi) {
        const saveBind = this.saveButtonHandler.bind(this)
        saveButton.addEventListener('click', function (e) {
            e.stopImmediatePropagation()
            saveBind(newTodo, parentLi)
        })
    }
    addTodoFromModal(newTodo, parentLi) {
        let start = inpStart.value.split('-').reverse().join('.')
        let end = inpEnd.value.split('-').reverse().join('.')
        let message = inpMessage.value

        if (newTodo) this.assignSaveButton(newTodo, parentLi)
        else this.todo = {start, end, done: false, message}

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
    showErr() {
        let err = document.createElement('div')
        err.classList.add('errDiv')
        return err
    }
}
