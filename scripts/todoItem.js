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
        li.innerHTML = `<span class="ind">${this.id}.</span> ${this.message}`
        let span = li.querySelector('.ind')
        span.style.fontWeight = 'bold'
        return li
    }
}
