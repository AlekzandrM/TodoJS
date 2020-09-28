import {
    forbiddenSybols,
    inp,
    todayDay,
    todoList,
    tomorrowDay
} from "./constants.js";


export class Events {
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
    deleteTodo() {
        todoList.addEventListener('click', function (e) {
            e.stopPropagation()
            const target = e.target
            if (target.tagName === 'SPAN' && target.classList.contains('delete')) {
                e.stopPropagation()
                const parentLi = target.closest('li')
                parentLi.remove()
            }
        })
    }
    addTodo() {
        inp.addEventListener('keyup', function (e) {
            e.stopPropagation()
            this.classList.remove('invalid')
            const text = this.value
            if (text.match(new RegExp(forbiddenSybols))) {
                this.classList.toggle('invalid')
                return
            }
            if (e.key === 'Enter' && text) {
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
        })
    }
}