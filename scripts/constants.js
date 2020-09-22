
export const forbiddenSybols = '^(?=.*[!@#$%^&(),.+=/\\]\\[{}?><":;|])'
export const calendarDates = /\b\d\d.\d\d.\d\d\d\d/g

export const today = new Date().toLocaleDateString().split('.').reverse().join('-')
export const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString().split('.').reverse().join('-')

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
export const totalLi = document.querySelectorAll('li')
export const todos = document.getElementsByTagName('li')

export const mockTodoList = [
    {id: '', message: 'Прочитать инструкцию', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: '', message: 'Создать тудушку', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
    {id: '', message: 'Добавить функционал', start: new Date().toLocaleDateString(), end: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString()},
]
