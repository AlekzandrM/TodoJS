import { Events } from "./events.js";
import { listComponent, modalTodo } from "./constants.js";


class TodoList {
    showTodoList() {
        const events = new Events()

        events.runTodoMethods()
        listComponent.runListComponentMethods()
        modalTodo.runModalMethods()
    }
}

const myTodo = new TodoList()
myTodo.showTodoList()

