import { openButton, modal, message, start, end, inpStart, inpEnd, cancelButton, inpMessage, forbiddenSybols, today, tomorrow, saveButton } from './constants.js'


export class Modal {
    validMessage = false
    validDate = true
    todo = {done: false, id: (new Date().getTime()).toString()}

    addTodoFromModalCb = this.addTodoFromModalHandler.bind(this)
    openModalCb = this.openModalHandler.bind(this)

    runModalMethods() {
        this.openModalEditButton()
        this.openModalAddButton()
        this.assignInputStart()
        this.assignInputMessage()
        this.assignInputEnd()
        this.assignCancelButton()
    }

    openModalHandler() {
        this.resetModalInputs()
        this.addTodoFromModal()
        modal.classList.remove('hide')
    }
    openModalAddButton() {
        openButton.addEventListener('click', this.openModalCb)
    }
    openModalEditHandler(editTodo) {
        this.validMessage = this.validDate = true
        this.showSaveButton()
        this.addTodoFromModal(editTodo)
    }
    openModalEditButton() {
        const editTodoBind = this.openModalEditHandler.bind(this)
        document.addEventListener('currentTodoEvent', function (e) {
            e.stopPropagation()
            const editTodo = e.detail.currentTodo
            editTodoBind(editTodo)
        })
    }
    resetModalInputs() {
        start.value = today
        end.value = tomorrow
        message.value = ''
    }

    inputMessageHandler(text) {
        this.validateMessage(text)
        this.todo.message = text
        this.todo.btnID = `${this.todo.message}${this.todo.start}${this.todo.end}`
        return this.todo
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
        this.todo.btnID = `${this.todo.message}${this.todo.start}${this.todo.end}`
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
        this.todo.btnID = `${this.todo.message}${this.todo.start}${this.todo.end}`
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
        this.resetModalInputs()
        modal.classList.add('hide')
    }
    assignCancelButton() {
        const cancelBind = this.cancelButtonHandler.bind(this)
        cancelButton.addEventListener('click', function (e) {
            cancelBind()
        })
    }

    addTodoFromModalHandler() {
        let start = inpStart.value.split('-').reverse().join('.')
        let end = inpEnd.value.split('-').reverse().join('.')
        this.todo.start = start
        this.todo.end = end
        this.todo.btnID = `${this.todo.message}${start}${end}`

        saveButton.dispatchEvent(new CustomEvent('saveEditTodoEvent', {
            detail: { editTodo: this.todo }
        }))
        this.resetModalInputs()
        modal.classList.add('hide')
    }
    addTodoFromModal(editTodo) {
        if (editTodo)  {
            modal.classList.remove('hide')
            inpMessage.value = editTodo.message
            inpStart.value = new Date(editTodo.start.split('.').reverse().join('-')).toLocaleDateString().split('.').reverse().join('-')
            inpEnd.value = new Date(editTodo.end.split('.').reverse().join('-')).toLocaleDateString().split('.').reverse().join('-')
            this.todo.message = editTodo.message
            this.todo.start = editTodo.start
            this.todo.end = editTodo.end
            this.todo.btnID = editTodo.btnID
        }
        this.showSaveButton()
        saveButton.addEventListener('click', this.addTodoFromModalCb)
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
