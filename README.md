# How to run this project

1. install all the packages

```
npm i
```

2. run this project

```
npm start
```

### Tech Used

- Vite for super fast build/serve time .
- Windi CSS for super-fast CSS build speed . Same as Tailwind CSS but faster.
- React JS
- React Router Dom
- Zustand - Global State management

# Important Files

### instrumentStore.js

- Used as a global state for the app .
- It's a Zustand Store
- Async and events are handled there .
- Most of the logic are declared here .
- This contains state and methods that changes the state values throughout the application .

### Search.jsx

- Contains the search bar with onChange event linked to Zustand Store

### Stocks.jsx

- The main table used for displaying list of stocks

### Option.jsx

- The table that contains info for the selected Symbol (Option) .

### Netlify.toml (not important)

- If it is decided to host this project on netlify then the file fixes the refresh bug .

### Contact Me

Email - rohansinghwow@gmail.com
