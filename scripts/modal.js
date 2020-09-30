import { openButton, modal, message, start, end, inpStart, inpEnd, cancelButton, inpMessage, forbiddenSybols, today, tomorrow, saveButton } from './constants.js'


export class Modal {

    validMessage = false
    validDate = true
    todo = {done: false, id: (new Date().getTime()).toString()}

    addTodoFromModalCb = this.addTodoFromModalHandler.bind(this)
    openModalCb = this.openModalHandler.bind(this)
    openModalEditButtonCb = this.openModalEditHandler.bind(this)
    assignInputMessageCb = this.inputMessageHandler.bind(this)
    assignInputStartCb = this.inputStartHandler.bind(this)
    assignInputEndCb = this.inputEndHandler.bind(this)
    assignCancelButtonCb = this.cancelButtonHandler.bind(this)

    runModalMethods() {
        this.openModalEditButton()
        this.openModalAddButton()
        this.assignInputStart()
        this.assignInputMessage()
        this.assignInputEnd()
        this.assignCancelButton()
        this.removeEventHandlers()
    }

    openModalHandler() {
        this.resetModalInputs()
        this.addTodoFromModal()
        modal.classList.remove('hide')
    }

    openModalAddButton() {
        openButton.addEventListener('click', this.openModalCb)
    }

    openModalEditHandler(e) {
        e.stopPropagation()
        this.validMessage = this.validDate = true
        this.showSaveButton()
        this.addTodoFromModal(e.detail.currentTodo)
    }

    openModalEditButton() {
        document.addEventListener('currentTodoEvent', e => this.openModalEditButtonCb(e))
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
        inpMessage.addEventListener('input', () => this.assignInputMessageCb(inpMessage.value))
    }

    inputStartHandler() {
        const start = this.formattingDate(inpStart.value)
        const errParentPosition = inpStart.parentElement
        const el = errParentPosition.lastElementChild
        const prevErr = errParentPosition.lastElementChild.classList.contains('errDiv')
        const errDiv = this.compareDates(inpStart, inpEnd)

        this.validateDate(errDiv, prevErr, el)
        this.todo.start = start
        this.todo.btnID = `${this.todo.message}${this.todo.start}${this.todo.end}`
    }

    assignInputStart() {
        inpStart.addEventListener('change', this.assignInputStartCb)
    }

    inputEndHandler() {
        const end = this.formattingDate(inpEnd.value)
        const errParentPosition = inpEnd.parentElement.previousElementSibling
        const el = errParentPosition.parentElement.firstElementChild.lastElementChild
        const prevErr = errParentPosition.parentElement.firstElementChild.lastElementChild.classList.contains('errDiv')
        const errDiv = this.compareDates(inpStart, inpEnd)

        this.validateDate(errDiv, prevErr, el)
        this.compareDates(inpStart, inpEnd)
        this.todo.end = end
        this.todo.btnID = `${this.todo.message}${this.todo.start}${this.todo.end}`
    }

    assignInputEnd() {
        inpEnd.addEventListener('change', this.assignInputEndCb)
    }

    cancelButtonHandler() {
        this.resetModalInputs()
        modal.classList.add('hide')
    }

    assignCancelButton() {
        cancelButton.addEventListener('click', this.assignCancelButtonCb)
    }

    addTodoFromModalHandler() {
        const start = this.formattingDate(inpStart.value)
        const end = this.formattingDate(inpEnd.value)

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
        if (editTodo) this.exposeTodoInModal(editTodo)
        this.showSaveButton()
        saveButton.addEventListener('click', this.addTodoFromModalCb)
    }

    exposeTodoInModal(todo = {}) {
        const { message, start, end, btnID } = todo

        modal.classList.remove('hide')
        inpMessage.value = message
        inpStart.value = this.formattingDateForModal(new Date(this.formattingDateForModal(start)).toLocaleDateString())
        inpEnd.value = this.formattingDateForModal(new Date(this.formattingDateForModal(end)).toLocaleDateString())
        this.todo.message = message
        this.todo.start = start
        this.todo.end = end
        this.todo.btnID = btnID
    }

    compareDates(inpStart, inpEnd) {
        const dataError = new Date(inpStart.value).getTime() > new Date(inpEnd.value).getTime()

        if (dataError) {
            const errDiv = this.showErr()
            errDiv.innerHTML = 'Wrong time intervals'
            errDiv.classList.add('timeErr')
            return errDiv
        }
    }

    validateMessage(text) {
        const invalidInput = new RegExp(forbiddenSybols).test(text)
        const errorInput = invalidInput || !text
        const correctInput = !invalidInput && text

        if (errorInput) {
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
        if (correctInput) {
            let errDiv = inpMessage.nextElementSibling
            if (errDiv) errDiv.remove()
            inpMessage.classList.remove('invalid')
            this.validMessage = true
            this.showSaveButton()
        }
    }

    validateDate(errDiv, prevErr, el) {
        const errParentPosition = el.parentElement
        const newErrorOrOldError = errDiv || prevErr
        const newErrorAndOldError = errDiv && prevErr
        const newErrorAndNoPreviousError = errDiv && !prevErr
        const validDate = !errDiv && !prevErr

        if (newErrorOrOldError) {
            this.validDate = false
            this.showSaveButton()
        }
        if (newErrorAndOldError) this.showSaveButton()
        if (newErrorAndNoPreviousError) errParentPosition.append(errDiv)
        if (prevErr) {
            errParentPosition.lastChild.remove()
            this.validDate = (new Date(inpStart.value).getTime() < new Date(inpEnd.value).getTime())
            this.showSaveButton()
        }
        if (validDate) {
            let errDiv = el.parentElement.lastElementChild

            if (errDiv.classList.contains('errDiv')) errDiv.remove()
            this.validDate = true
            this.showSaveButton()
        }
    }

    showSaveButton() {
        const isVisibleButton = this.validMessage && this.validDate

        if (isVisibleButton) {
            if (saveButton.classList.contains('modalSave')) saveButton.classList.remove('modalSave')
            saveButton.removeAttribute('disabled')
        } else {
            saveButton.classList.add('modalSave')
            saveButton.setAttribute('disabled', 'disabled')
        }
    }

    showErr() {
        const err = document.createElement('div')

        err.classList.add('errDiv')
        return err
    }

    formattingDate(date) {
        return date.split('-').reverse().join('.')
    }

    formattingDateForModal(date) {
        return date.split('.').reverse().join('-')
    }

    removeEventHandlers() {
        document.removeEventListener('currentTodoEvent', e => this.openModalEditButtonCb(e))
        inpMessage.removeEventListener('input', () => this.assignInputMessageCb(inpMessage.value))
        inpStart.removeEventListener('change', this.assignInputStartCb)
        inpEnd.removeEventListener('change', this.assignInputEndCb)
        cancelButton.removeEventListener('click', this.assignCancelButtonCb)
    }
}
