import { TodoItem } from './todoItem.js'

let todoList = [
    {id: 1, message: 'Прочитать инструкцию!', done: false, start: 'start', end: 'end'},
    {id: 2, message: 'Создать тудушку!', done: false, start: 'start', end: 'end'},
    {id: 3, message: 'Добавить функционал', done: false, start: 'start', end: 'end'},
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
}

const myTodo = new TodoList(todoList)
myTodo.createTodo()




// function createTodo(arr)  {
//     const div = document.getElementById('todoList')
//     const ul = document.createElement('ul')
//
//     for (let i = 0; i < arr.length; i++) {
//         const todo = new TodoItem(arr[i]).showTodo()
//         ul.append(todo)
//     }
//
//     div.append(ul)
// }
// createTodo(todoList)
