````markdown
# Інтеграція Mongoose для повнофункціонального фулстек проекту

## Опис проекту

Це повнофункціональний fullstack додаток для автосалону з продажу та обслуговування
сучасних електромобілів (**automarket**), створений на основі фінального проекту з React JS. Проект було перероблено для використання **Express.js + Mongoose** замість MockAPI, що забезпечує оптимізовану взаємодію з **MongoDB Atlas** та повноцінну інтеграцію backend з frontend.

## Мета завдання

Переробити існуючий backend проекту для використання **Mongoose**, щоб оптимізувати взаємодію з MongoDB, а також забезпечити інтеграцію з існуючим раніше реалізованим фінальним frontend проектом на React.

---

## Технологічний стек

### **Backend:**
- **Node.js** - серверне середовище
- **Express.js** - веб-фреймворк
- **Mongoose** - ODM для MongoDB
- **MongoDB Atlas** - хмарна база даних
- **TypeScript** - типізація
- **dotenv** - управління змінними оточення
- **CORS** - міжсайтові запити

### **Frontend:**
- **React 19** - UI бібліотека
- **Redux Toolkit** - state management
- **React Router** - маршрутизація
- **Axios** - HTTP клієнт
- **TypeScript** - типізація
- **Vite** - збірник проекту

---

## Структура проекту

```
hw02-final-fullstack/
├── backend/
│   ├── config/
│   │   └── database.ts          # Підключення до MongoDB Atlas
│   ├── controllers/
│   │   └── car.controller.ts    # CRUD операції для автомобілів
│   ├── models/
│   │   └── Car.model.ts         # Mongoose схема з валідацією
│   ├── routes/
│   │   └── car.routes.ts        # API маршрути
│   └── server.ts                # Express сервер
├── src/
│   ├── components/              # React компоненти
│   ├── redux/                   # Redux store та slices
│   ├── config/
│   │   └── api.ts              # Конфігурація API
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript interfaces
│   └── utils/                   # Допоміжні функції
├── .env                         # Змінні оточення
├── .env.example                 # Приклад змінних оточення
├── package.json
├── vite.config.js
└── README.md
```

---

## Реалізовані зміни

### **1. Backend (Express + Mongoose)**

#### ✅ **Mongoose схема з валідацією (`Car.model.ts`)**
- Поля: `name`, `description`, `price`, `image`, `category`
- Валідація: required, minlength, maxlength, min price, URL pattern
- Індексація: для полів `name`, `category`, `price` + compound index
- Трансформація: `_id` → `id` для сумісності з frontend
- Timestamps: автоматичні `createdAt` та `updatedAt`

#### ✅ **CRUD контролери (`car.controller.ts`)**
- `getAllCars` - отримання списку з пагінацією, фільтрацією, сортуванням
- `getCarById` - отримання одного автомобіля
- `createCar` - створення нового автомобіля
- `updateCar` - оновлення існуючого
- `deleteCar` - видалення автомобіля

#### ✅ **REST API маршрути (`car.routes.ts`)**
```
GET    /api/cars          # Список автомобілів
GET    /api/cars/:id      # Один автомобіль
POST   /api/cars          # Створити автомобіль
PUT    /api/cars/:id      # Оновити автомобіль
DELETE /api/cars/:id      # Видалити автомобіль
```

#### ✅ **Express сервер (`server.ts`)**
- Підключення до MongoDB Atlas
- CORS для frontend
- JSON middleware
- Обробка помилок

### **2. Frontend (React)**

#### ✅ **Оновлена конфігурація API**
- Створено `src/config/api.ts` з URL на `http://localhost:3000/api/cars`
- Видалено залежність від MockAPI

#### ✅ **Виправлений Redux Thunk**
- Адаптовано `createFetchThunk` для роботи з новою структурою відповідей
- Правильна обробка `{ data: [...], totalCount: number }`

#### ✅ **Оновлені компоненти**
- `Products.tsx` - імпорт з нового API
- `Product.tsx` - робота з `id` замість `_id`
- `AddProduct.tsx` - створення через новий backend
- `EditProduct.tsx` - оновлення через новий backend

---

## Інструкція з налаштування

### **1. Клонування репозиторію**
```bash
git clone <your-repo-url>
cd hw02-final-fullstack
```

### **2. Встановлення залежностей**
```bash
yarn install
# або
npm install
```

### **3. Налаштування змінних оточення**

Створіть файл `.env` на основі `.env.example`:

```bash
cp .env.example .env
```

Відредагуйте `.env`:

```env
# Секрет для підпису сесій
SESSION_SECRET=your-super-secure-session-secret-here

# Режим роботи
NODE_ENV=development

# Порт сервера
PORT=3000

# MongoDB Atlas підключення
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=YourApp
DB_NAME=automarket
```

**Важливо:** Замініть `your_username` та `your_password` на ваші дані MongoDB Atlas!

---

## Запуск проекту

### **Розробка (два термінали)**

**Термінал 1 - Backend:**
```bash
yarn server
# або
npm run server
```
Backend запуститься на `http://localhost:3000`

**Термінал 2 - Frontend:**
```bash
yarn dev
# або
npm run dev
```
Frontend запуститься на `http://localhost:5173`

### **Production**

**Backend:**
```bash
yarn server:dev
# або
npm run server:dev
```

**Frontend:**
```bash
yarn build
yarn preview
```

---

## API Документація

### **Base URL**
```
http://localhost:3000/api/cars
```

### **Endpoints**

#### **GET /api/cars**
Отримати список автомобілів з пагінацією, фільтрацією та сортуванням.

**Query параметри:**
- `page` (number) - номер сторінки (default: 1)
- `limit` (number) - кількість на сторінці (default: 12)
- `name` (string) - фільтр за назвою (regex, case-insensitive)
- `sortBy` (string) - поле для сортування (name, price, category)
- `order` (string) - порядок (asc, desc)

**Приклад:**
```
GET /api/cars?page=1&limit=12&name=Tesla&sortBy=price&order=asc
```

**Відповідь:**
```json
{
  "data": [
    {
      "id": "69062c9ec62891577fec7003",
      "name": "Tesla Model S Plaid",
      "description": "Електричний седан...",
      "price": 129990,
      "image": "https://...",
      "category": "Electric",
      "createdAt": "2025-11-01T15:51:58.575Z",
      "updatedAt": "2025-11-01T15:51:58.575Z"
    }
  ],
  "totalCount": 1
}
```

#### **GET /api/cars/:id**
Отримати один автомобіль за ID.

**Відповідь:** Об'єкт автомобіля або 404

#### **POST /api/cars**
Створити новий автомобіль.

**Body:**
```json
{
  "name": "Tesla Model 3",
  "description": "Компактний електричний седан",
  "price": 45000,
  "image": "https://example.com/image.jpg",
  "category": "Sedan"
}
```

**Відповідь:** Створений автомобіль (201)

#### **PUT /api/cars/:id**
Оновити автомобіль.

**Body:** Поля для оновлення

**Відповідь:** Оновлений автомобіль або 404

#### **DELETE /api/cars/:id**
Видалити автомобіль.

**Відповідь:** 
```json
{
  "message": "Car deleted successfully"
}
```

---

## Функціонал додатку

### **Публічний доступ:**
- ✅ Перегляд списку автомобілів
- ✅ Фільтрація за назвою (з debounce 1 сек)
- ✅ Сортування за назвою/ціною/категорією
- ✅ Пагінація (12 автомобілів на сторінку)
- ✅ Перегляд деталей автомобіля

### **Авторизований доступ (кнопка "Увійти"):**
- ✅ Додавання нових автомобілів
- ✅ Редагування існуючих
- ✅ Видалення автомобілів

---

## Валідація даних

### **Backend (Mongoose)**
- `name`: 2-100 символів, обов'язкове
- `description`: 10-500 символів, обов'язкове
- `price`: >= 0, обов'язкове
- `image`: валідний URL (http/https), обов'язкове
- `category`: один з: Coupe, Electric, Hatchback, Pickup, Sedan, SUV, Van

### **Frontend**
- Валідація форм при створенні/редагуванні
- Обробка помилок від backend
- Loading стани під час запитів

---

## Тестування

### **1. Запустіть backend та frontend**
```bash
# Термінал 1
yarn server

# Термінал 2
yarn dev
```

### **2. Перевірте функціонал:**
- Перегляд автомобілів на `/products`
- Фільтрація за назвою
- Сортування за різними полями
- Пагінація
- Натисніть "Увійти" для режиму редагування
- Додайте новий автомобіль
- Відредагуйте існуючий
- Видаліть автомобіль

### **3. Перевірте DevTools:**
- Network tab - запити до `http://localhost:3000/api/cars`
- Console - відсутність помилок
- Backend logs - запити та відповіді

---

## Відомі проблеми та їх вирішення

### **Проблема: No cars found**
**Рішення:** Переконайтеся, що:
1. Backend запущений на порту 3000
2. MongoDB Atlas доступний
3. Колекція `electrocars` містить дані
4. В `.env` правильні дані підключення

### **Проблема: CORS errors**
**Рішення:** CORS вже налаштований в `server.ts`. Переконайтеся, що frontend на `localhost:5173`

### **Проблема: MongoDB connection error**
**Рішення:** 
1. Перевірте `MONGODB_URI` в `.env`
2. Додайте IP адресу в Atlas Network Access (або дозвольте 0.0.0.0/0)
3. Перевірте username/password

---

## Scripts

```json
{
  "dev": "vite",                    // Запуск frontend
  "build": "vite build",            // Збірка frontend
  "preview": "vite preview",        // Preview production build
  "server": "nodemon --exec tsx backend/server.ts",  // Backend з hot-reload
  "server:dev": "tsx backend/server.ts",             // Backend без hot-reload
  "lint": "eslint ."                // Перевірка коду
}
```

---

## Автор

**Oleksandr Komnatskyi**

Проект виконано в рамках завдання з курсу Full Stack JavaScript - інтеграція Mongoose для повнофункціонального fullstack проекту.

---

## Ліцензія

Всі права захищено © 2025

---

## Деплой

- Backend можна задеплоїти на: Railway, Render, Fly.io, Heroku
- Frontend можна задеплоїти на: Vercel, Netlify, GitHub Pages
- База даних: MongoDB Atlas (вже в хмарі)

**Важливо:** При деплої оновіть `API_URL` в `src/config/api.ts` на URL вашого backend сервера!
````
