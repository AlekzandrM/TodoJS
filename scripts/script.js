import { ListComponent } from './listComponent.js'
import { calendarDates, inpMessage, inpStart, inpEnd  } from "./constants.js";
import { Modal } from "./modal.js";

class TodoList {
    validMessage = false
    validDate = true
    newTodo = {done: false}
    parentLi
    // quantityOfTodos = this.countOfquantityOfTodo()
    modal


    insertTodoNumber(todo, num) {
        let todoNumber =  todo.querySelector('.todoNumber')
        todoNumber.innerHTML = num
        return todoNumber
    }
    showTodoList() {
        const component = new ListComponent()
        component.render()

        const modal = new Modal()
        modal.runModalMethods()
    }

    // resetModalInputs() {
    //     const message = document.querySelector('#modalTodoInput')
    //     const start = document.querySelector('#start')
    //     const end = document.querySelector('#end')
    //
    //     start.value = today
    //     end.value = tomorrow
    //     message.value = ''
    // }

    // closeModal(quantityOfTodosAfter) {
    //     const modal = document.querySelector('.modal')
    //     this.resetModalInputs()
    //     modal.classList.add('hide')
    //
    //     if (this.quantityOfTodos !== quantityOfTodosAfter && this.parentLi) {
    //         this.parentLi.remove()
    //
    //         const todos = document.getElementsByTagName('li')
    //         const todosArr = Array.from(todos)
    //         todosArr.map((todo, ind) => this.insertTodoNumber(todo, ind+1))
    //     }
    // }
    // openModal() {
    //     const myThis = this
    //     const openButton = document.querySelector('.plus').firstElementChild
    //     const modal = document.querySelector('.modal')
    //
    //     // Подсчитывает количество todo - добавилось новое или редактировалось
    //     this.quantityOfTodos = this.countOfquantityOfTodo()
    //
    //     openButton.addEventListener('click', e => {
    //         myThis.resetModalInputs()
    //         myThis.addTodoFromModal()
    //         modal.classList.remove('hide')
    //     })
    // }
    // openModal() {
    //     this.modal = new Modal()
    //     this.modal.openModal()
    // }
    // closeModal() {
    //     this.modal.closeModal()
    // }
    // showErr() {
    //     let err = document.createElement('div')
    //     err.classList.add('errDiv')
    //     return err
    // }
    // compareDates(inpStart, inpEnd) {
    //     if (new Date(inpStart.value).getTime() > new Date(inpEnd.value).getTime()) {
    //         const errDiv = this.showErr()
    //         errDiv.innerHTML = 'Wrong time intervals'
    //         errDiv.classList.add('timeErr')
    //         return errDiv
    //     }
    // }
    // showSaveButton() {
    //     if (this.validMessage && this.validDate) {
    //         if (saveButton.classList.contains('modalSave')) saveButton.classList.remove('modalSave')
    //         saveButton.removeAttribute('disabled')
    //     } else {
    //         saveButton.classList.add('modalSave')
    //         saveButton.setAttribute('disabled', 'disabled')
    //     }
    // }
    // validateMessage(text) {
    //     const invalidInput = new RegExp(forbiddenSybols).test(text)
    //
    //     if (invalidInput || !text) {
    //         inpMessage.classList.add('invalid')
    //         const errDiv = this.showErr()
    //         errDiv.innerHTML = 'Wrong symbol or empty field'
    //
    //         if (inpMessage.nextElementSibling === null) inpMessage.after(errDiv)
    //         this.validMessage = false
    //         this.showSaveButton()
    //     }
    //     if (!text) {
    //         this.validMessage = false
    //         this.showSaveButton()
    //     }
    //     if (!invalidInput && text) {
    //         let errDiv = inpMessage.nextElementSibling
    //         if (errDiv) errDiv.remove()
    //         inpMessage.classList.remove('invalid')
    //         this.validMessage = true
    //         this.showSaveButton()
    //     }
    // }
    // validateDate(errDiv, prevErr, el) {
    //     const errParentPosition = el.parentElement
    //
    //     if (errDiv || prevErr) {
    //         this.validDate = false
    //         this.showSaveButton()
    //     }
    //     if (errDiv && prevErr) {
    //         return this.showSaveButton()
    //     }
    //     if (errDiv && !prevErr) {
    //         errParentPosition.append(errDiv)
    //     }
    //     if (prevErr) {
    //         errParentPosition.lastChild.remove()
    //         this.validDate = (new Date(inpStart.value).getTime() < new Date(inpEnd.value).getTime())
    //         this.showSaveButton()
    //     }
    //     if (!errDiv && !prevErr) {
    //         let errDiv = el.parentElement.lastElementChild
    //         if (errDiv.classList.contains('errDiv')) errDiv.remove()
    //
    //         this.validDate = true
    //         this.showSaveButton()
    //     }
    // }
    // addTodoFromModal(newTodo) {
    //     const myThis = this
    //     let start = inpStart.value.split('-').reverse().join('.')
    //     let end = inpEnd.value.split('-').reverse().join('.')
    //
    //     newTodo = {start, end, done: false}
    //
    //     cancelButton.addEventListener('click', function (e) {
    //         let quantityOfTodosAfter = myThis.countOfquantityOfTodo()
    //         myThis.closeModal(quantityOfTodosAfter)
    //     })
    //
    //     inpMessage.addEventListener('input', function (e) {
    //         myThis.validateMessage(this.value)
    //         newTodo.message = this.value
    //     })
    //
    //     inpStart.addEventListener('change', function (e) {
    //         start = this.value.split('-').reverse().join('.')
    //         const errParentPosition = this.parentElement
    //         const el = errParentPosition.lastElementChild
    //
    //         const errDiv = myThis.compareDates(inpStart, inpEnd)
    //         const prevErr = errParentPosition.lastElementChild.classList.contains('errDiv')
    //
    //         myThis.validateDate(errDiv, prevErr, el)
    //         newTodo.start = start
    //     })
    //
    //     inpEnd.addEventListener('change', function (e) {
    //         end = this.value.split('-').reverse().join('.')
    //         const errParentPosition = this.parentElement.previousElementSibling
    //         const el = errParentPosition.parentElement.firstElementChild.lastElementChild
    //
    //         let errDiv = myThis.compareDates(inpStart, inpEnd)
    //         const prevErr = errParentPosition.parentElement.firstElementChild.lastElementChild.classList.contains('errDiv')
    //
    //         myThis.validateDate(errDiv, prevErr, el)
    //         myThis.compareDates(inpStart, inpEnd)
    //
    //         newTodo.end = end
    //     })
    //
    //     saveButton.addEventListener('click', function (e) {
    //         e.stopImmediatePropagation()
    //         const todoLi = new TodoItem(newTodo)
    //         const renderedTodoLi = todoLi.renderTodo()
    //         const todoItemCount = document.querySelectorAll('li')
    //
    //         myThis.insertTodoNumber(renderedTodoLi, todoItemCount.length + 1)
    //
    //         const ul = document.querySelector('ul')
    //         ul.append(renderedTodoLi)
    //         let quantityOfTodosAfter = myThis.countOfquantityOfTodo()
    //         myThis.closeModal(quantityOfTodosAfter)
    //         myThis.validMessage = false
    //         myThis.showSaveButton()
    //     })
    // }

    // countOfquantityOfTodo() {
    //     const totalLi = document.querySelectorAll('li').length
    //     return totalLi
    // }
}

const myTodo = new TodoList()
myTodo.showTodoList()

