import { Events } from "./events.js";
import { listComponent, modalTodo } from "./constants.js";


class TodoList {
    showTodoList() {
        listComponent.runListComponentMethods()
        modalTodo.runModalMethods()

        const events = new Events()
        events.runTodoMethods()
    }
}

const myTodo = new TodoList()
myTodo.showTodoList()

