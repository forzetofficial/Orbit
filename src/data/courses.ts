import { Course } from '../types/course';

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Основы JavaScript',
    description: 'Изучите основы JavaScript и станьте frontend разработчиком',
    language: 'JavaScript',
    difficulty: 'Начальный',
    duration: '10 часов',
    rating: 4.8,
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    fullDescription: `
      JavaScript - это язык программирования, который позволяет создавать динамический контент на веб-страницах. 
      В этом курсе вы изучите основы JavaScript, включая переменные, типы данных, функции, объекты, массивы и многое другое.
    `,
    modules: [
      {
        title: 'Введение в JavaScript',
        lessons: [
          {
            id: 1,
            title: 'Что такое JavaScript',
            type: 'reading',
            duration: '10:15',
            completed: false,
            content: `
              # Введение в JavaScript

              JavaScript - это мультипарадигменный язык программирования, который поддерживает объектно-ориентированный, императивный и функциональный стили.

              ## История создания

              JavaScript был создан Бренданом Айком всего за 10 дней в мае 1995 года. Изначально он назывался Mocha, затем LiveScript, и наконец, JavaScript.

              ## Где используется JavaScript?

              - Веб-браузеры
              - Серверная разработка (Node.js)
              - Мобильная разработка
              - Десктопные приложения
              - Игры
            `
          },
          {
            id: 2,
            title: 'Первая программа',
            type: 'practice',
            duration: '15:00',
            completed: false,
            content: 'Напишите программу, которая выводит "Hello, World!" в консоль.',
            code: {
              task: 'Создайте функцию greeting(), которая возвращает строку "Hello, World!"',
              initialCode: 'function greeting() {\n  // Ваш код здесь\n}',
              solution: 'function greeting() {\n  return "Hello, World!";\n}',
              tests: [
                {
                  input: [],
                  expected: "Hello, World!",
                  description: "Функция должна вернуть 'Hello, World!'"
                }
              ]
            }
          }
        ]
      },
      {
        title: 'Основы языка',
        lessons: [
          {
            id: 3,
            title: 'Переменные и типы данных',
            type: 'reading',
            duration: '12:45',
            completed: false,
            content: `
              # Переменные и типы данных в JavaScript

              В JavaScript существует несколько основных типов данных:

              ## Примитивные типы
              - Number (число)
              - String (строка)
              - Boolean (логический тип)
              - Undefined (неопределенный)
              - Null (пустой)
              - Symbol (символ)
              - BigInt (большое целое число)

              ## Объявление переменных
              В JavaScript есть три способа объявления переменных:
              - var (устаревший способ)
              - let (для переменных, значение которых может меняться)
              - const (для констант)

              \`\`\`javascript
              let name = "John";
              const age = 25;
              let isStudent = true;
              \`\`\`
            `
          },
          {
            id: 4,
            title: 'Практика: Работа с переменными',
            type: 'practice',
            duration: '20:00',
            completed: false,
            content: 'Создайте переменные разных типов и выполните с ними операции.',
            code: {
              task: 'Создайте функцию sum(a, b), которая возвращает сумму двух чисел',
              initialCode: 'function sum(a, b) {\n  // Ваш код здесь\n}',
              solution: 'function sum(a, b) {\n  return a + b;\n}',
              tests: [
                {
                  input: [1, 2],
                  expected: 3,
                  description: "1 + 2 должно равняться 3"
                },
                {
                  input: [-1, 1],
                  expected: 0,
                  description: "-1 + 1 должно равняться 0"
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'React для начинающих',
    description: 'Создавайте современные веб-приложения с помощью React',
    language: 'JavaScript',
    difficulty: 'Средний',
    duration: '15 часов',
    rating: 4.9,
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    fullDescription: `
      React - это библиотека JavaScript для создания пользовательских интерфейсов. 
      В этом курсе вы изучите основы React, включая компоненты, хуки, состояния и многое другое.
    `,
    modules: [
      {
        title: 'Введение в React',
        lessons: [
          {
            id: 5,
            title: 'Что такое React',
            type: 'reading',
            duration: '15:00',
            completed: false,
            content: `
              # Введение в React

              React - это JavaScript-библиотека для создания пользовательских интерфейсов.

              ## Основные концепции

              - Компоненты
              - Virtual DOM
              - JSX
              - Однонаправленный поток данных

              ## Преимущества React

              1. Декларативный подход
              2. Компонентная архитектура
              3. Большое сообщество
              4. Отличная производительность
            `
          },
          {
            id: 6,
            title: 'Настройка окружения',
            type: 'reading',
            duration: '20:00',
            completed: false,
            content: `
              # Настройка окружения для React

              Для начала работы с React вам понадобится:

              1. Node.js и npm
              2. Редактор кода (VS Code)
              3. Create React App или Vite

              ## Создание проекта

              \`\`\`bash
              # Использование Create React App
              npx create-react-app my-app

              # Или использование Vite
              npm create vite@latest my-app -- --template react
              \`\`\`
            `
          }
        ]
      }
    ]
  },
  
];