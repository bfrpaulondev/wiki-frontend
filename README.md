
# Wiki Frontend

This is a modern frontend for the Wiki API built with React (Vite) and Material UI. It uses Redux Toolkit for state management, React Query for data fetching, and React Router for navigation.

## Features

- **Responsive UI** using Material UI with a custom dark-themed palette.
- **User Authentication** using JWT (login and registration pages).
- **CRUD Operations** for articles, sections, and more.
- **Notifications, Favorites, and User Settings** for enhanced user experience.
- **Modern state management** with Redux Toolkit and React Query.
- **Routing** with React Router DOM.
- **Form handling** with React Hook Form and Yup for validation.

## Tech Stack

- React, Vite
- Material UI
- Redux Toolkit & React Redux
- React Query
- React Router DOM
- Axios
- React Hook Form & Yup
- Additional libraries: react-toastify, zustand

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd wiki-frontend` 

2.  Install dependencies:
    
    bash
    
    
    
    `npm install` 
    
3.  Create a `.env` file in the project root and add the following variables:
    
    env
    
    
    
    `VITE_API_BASE_URL=http://localhost:3001/api` 
    

### Running the Project

To start the development server, run:

bash



`npm run dev` 

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

pgsql



`wiki-frontend
├── public
│   └── index.html
├── src
│   ├── assets
│   ├── components
│   ├── features
│   │   ├── auth
│   │   ├── articles
│   │   └── notifications
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── theme
│   ├── App.js
│   ├── main.js
│   └── store.js
├── .env
├── package.json
├── README.md
└── vite.config.js` 

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

## License

This project is licensed under the MIT License.

yaml



 ``--- 
### 34. **src/assets**

You may add images or other static assets in this folder (no code needed).

--- 
This is a complete project code structure for your Wiki Frontend. You can adjust and expand each component as needed. Simply copy the code into your files according to the structure, install dependencies, and run the project with `npm run dev`.