import { TodoItem } from './todoItem.js'
import { mockTodoList, forbiddenSybols, inp, todayDay, tomorrowDay, ul} from "./constants.js";


export class ListComponent {
    todoMethods = {}

    render()  {
        mockTodoList.forEach((el) => {
            const todo = new TodoItem(el)
            todo.renderTodo()

            this.todoMethods.checkTodo = todo.checkTodo
            this.todoMethods.deleteTodo = todo.deleteTodo
        })
    }
    addTodo() {
        inp.addEventListener('keyup', function (e) {
            this.classList.remove('invalid')
            const text = this.value
            if (text.match(new RegExp(forbiddenSybols))) {
                this.classList.toggle('invalid')
                return
            }

            if (e.key === 'Enter' && text) {
                const newTodo = { message: text, start: todayDay, end: tomorrowDay }
                const todoLi = new TodoItem(newTodo)
                todoLi.renderTodo()
                inp.value = ''
            }
        })
    }

}
