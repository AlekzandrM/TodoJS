import { TodoItem } from './todoItem.js'
import { mockTodoList } from "./constants.js";


export class ListComponent {
    render()  {
        mockTodoList.forEach((el) => {
            const todo = new TodoItem(el)
            todo.renderTodo()
            todo.runTodoMethods()
        })
    }
}
