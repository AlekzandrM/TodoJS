import { Events } from "./events.js";
import { listComponent, modalTodo } from "./constants.js";


class TodoList {
    showTodoList() {
        listComponent.render()
        listComponent.editionTodo()
        listComponent.addTodoFromMain()

        modalTodo.runModalMethods()

        const events = new Events()
        events.runTodoMethods()
    }
}

const myTodo = new TodoList()
myTodo.showTodoList()

