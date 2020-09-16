export class TodoItem {
    constructor({id, message, done, start, end}) {
        this.id = id
        this.message = message
        this.done = done
        this.start = start
        this.end = end
    }
    showTodo() {
        const li = document.createElement('li')
        li.innerHTML = `<span class="ind">${this.id}. ${this.message}</span> <span class="time">начало: ${this.start} конец: ${this.end}</span>`
        let span = li.querySelector('.ind')
        span.style.fontWeight = 'bold'
        return li
    }
}
