import {
    forbiddenSybols,
    inp,
    todayDay,
    todoList,
    tomorrowDay
} from "./constants.js";


export class Events {

    deleteCb = this.deleteTodoHandler.bind(this)

    runTodoMethods() {
        this.addTodo()
        this.deleteTodo()
        this.checkTodo()
    }

    checkTodo() {
        todoList.addEventListener('click', function (e) {
            e.stopPropagation()
            const input = e.target
            const parentTodo = input.parentElement.parentElement

            if (input.tagName !== 'INPUT') return
            input.checked ? parentTodo.classList.add('checked') : parentTodo.classList.remove('checked')
        })
    }

    deleteTodoHandler(e) {
        const target = e.target
        const isIncorrectButton = target.tagName !== 'SPAN' || !target.classList.contains('delete')

        if (isIncorrectButton) return
        target.closest('li').remove()
    }

    deleteTodo() {
        todoList.addEventListener('click', (e) => this.deleteCb(e))
    }

    validateText(text) {
        return text.match(new RegExp(forbiddenSybols))
    }

    addTodoHandler(e, text) {
        const isIncorrectData = e.key !== 'Enter' || !text

        if (isIncorrectData) return
        const newTodo = {
            message: text,
            start: todayDay,
            end: tomorrowDay,
            id: (new Date().getTime()).toString(),
            done: false,
            btnID: `${text}${todayDay}${tomorrowDay}`
        }
        document.dispatchEvent(new CustomEvent('addTodoFromMainInp', {
            detail: { newTodo }
        }))
        inp.value = ''
    }

    addTodo() {
        const validTextBind = this.validateText.bind(this)
        const addHandlerBind = this.addTodoHandler.bind(this)

        inp.addEventListener('keyup', function (e) {
            e.stopPropagation()
            this.classList.remove('invalid')
            if (validTextBind(this.value)) {
                inp.classList.toggle('invalid')
                return;
            }
            addHandlerBind(e, this.value)
        })
    }
}
