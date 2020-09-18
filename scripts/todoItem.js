export class TodoItem {
    done = false
    id = this.createId()

    constructor({ message, start, end }) {
        this.message = message
        this.start = start
        this.end = end

    }
    showTodo() {
        const li = document.createElement('li')
        li.innerHTML = `
            <span><input type="checkbox" id="${this.id}"> <span class="ind"><span class="todoNumber"></span>  ${this.message}</span></span>
            <span class="time">начало: ${this.start} конец: ${this.end} <span class="delete">\t&#10060;</span></span>`
        let span = li.querySelector('.ind')
        span.style.fontWeight = 'bold'
        return li
    }
    createId() {
        return (new Date().getTime()).toString()
    }
}
