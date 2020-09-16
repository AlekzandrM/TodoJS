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

            if (e.key == 'Enter' ) {
                const start = new Date().toLocaleDateString()
                const end = new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()
                let newTodo = {id: todoList.length+1, message: text, start, end}

                myThis.arr.push(newTodo)

                const todoLi = new TodoItem(newTodo).showTodo()

                const ul = document.querySelector('ul')
                ul.append(todoLi)
                inp.value = ''
            }

        })
    }
}

const myTodo = new TodoList(todoList)
myTodo.createTodo()
myTodo.addTodo()



