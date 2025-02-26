# InkSpire

![Alt Text](https://i.ibb.co/39rxN06r/inkspire.png)

## Description
A React application that provides user authentication and a book management system. Users can sign up, sign in, and manage their books, including adding, updating, and deleting books and reviews.
[Visit InkSpire](https://inkspire-frontend.vercel.app/)

## Features
- User authentication (sign in and sign up).
- Book management (add, update, delete, and view books).
- Review management (add and delete reviews).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/amyrbakhsh/inkspire_frontend
   ```
2. Navigate to the project directory:
   ```bash
   cd inkspire_frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm run dev
   ```

## Usage
- Navigate to `/` to access the landing page.
- Use the navigation bar to sign in or sign up.
- Manage books through the `/books` route.

## Technologies Used
- React
- Vite
- Bootstrap
- React Router

## Attributions
- **Notable Node.js Packages**:
  - Bootstrap: A popular CSS framework for responsive design.
  - Prop-types: A library for type-checking React props.
  - React: A JavaScript library for building user interfaces.
  - React-DOM: A package for working with the DOM in React applications.
  - React Router: A library for routing in React applications.
  - React Router DOM: A package for DOM bindings for React Router.
  - ESLint: A tool for identifying and reporting on patterns in JavaScript.
  - Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects.
  
- **APIs Used**:
  - [Imgur](https://imgur.com/)
  
- **External Assets**:
  - [Harry Potter Cover](https://ew.com/thmb/5ubdrGT4JNkNrTktCdU3KFYUM9E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hpsorcstone-e2b869c8764c4f6699f9877f99380f32.jpg).
  - There are more covers but can't find there sources at the moment.

- **External Assets**:
  
## Future Enhancements
- Implementing a search feature for books.
- Adding user profile management.
- Enhancing the UI with additional styling and animations.
- Integrating a third-party API for book recommendations.
- Adding unit tests for components and services.
- Placeholder for book cover images or other assets that require attribution.

## Routes
- `/` - Landing page (displays different content based on user authentication).
- `/sign-in` - Sign-in form for user authentication.
- `/sign-up` - Sign-up form for new users.
- `/books` - Displays a list of books.
- `/books/new` - Form to add a new book.
- `/books/:bookId` - Displays details of a specific book.
- `/books/:bookId/edit` - Form to edit an existing book.

## Contributors   
- Mohd thamer
- Zainab Hammad
- Abdulla Bakhsh

## License
This project is licensed under the MIT License.
