import { ListComponent } from "./listComponent.js";
import { Modal } from "./modal.js";

export const forbiddenSybols = '^(?=.*[!@#$%^&(),.+=/\\]\\[{}?><":;|])'
export const calendarDates = /\b\d\d.\d\d.\d\d\d\d/g

export const today = formatDay(new Date())
export const tomorrow = formatDay(new Date(new Date().setDate(new Date().getDate() + 1)))
export const firstJanuary = formatDay(new Date(2020, 0, 1))

export const saveButton = document.querySelector('.modalSave')
export const cancelButton = document.querySelector('.modalCancel')
export const inpMessage = document.getElementById('modalTodoInput')
export const inpStart = document.getElementById('start')
export const inpEnd = document.getElementById('end')


export const ul = document.querySelector('ul')
export const inp = document.getElementById('newTodoInput')

export const todayDay = new Date().toLocaleDateString()
export const tomorrowDay = new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()

export const todoList = document.getElementById('todoList')

export const modal = document.querySelector('.modal')
export const openButton = document.querySelector('.plus').firstElementChild
export const message = document.querySelector('#modalTodoInput')
export const start = document.querySelector('#start')
export const end = document.querySelector('#end')

export const active = document.getElementById('active')
export const all = document.getElementById('all')
export const completed = document.getElementById('completed')
export const clearCompleted = document.getElementById('clearCompleted')
export const filterIcon = document.getElementById('filterIcon')
export const filters = document.querySelector('.filterInputs')
export const startFilter = document.getElementById('startFilter')
export const endFilter = document.getElementById('endFilter')
export const filterInput = document.getElementById('filterInput')


export const listComponent = new ListComponent()
export const modalTodo = new Modal()

function formatDay(date) {
    return date.toLocaleDateString().split('.').reverse().join('-')
}
