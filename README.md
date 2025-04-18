# online_store

# Install Node.js
Do we installed Node.js?
What is Node.js?

# To create a new .Net solution and project with .Net CLI
Run
1. ```dotnet new sln```
2. ```dotnet new webapi -n API -controllers```
3. ```dotnet sln add API```

# Add new packages to your .Net project
e.g.
```dotnet add package Microsoft.EntityFrameworkCore.Sqlite -Version 8.0.4```

# Install dotnet-ef globally in your machine
e.g.
```dotnet tool install --global dotnet-ef --version 9.0.2```

# Use dotnet-ef create migration and add DB initializer
e.g.
```dotnet ef migrations add InitiaCreate -o Data/Migrations```
```dotnet ef database update```

# Build client project with React and Redux
Pros of React:
What is Virtual DOM?
Morden concept, compare with actual DOM, document object model, browser use DOM to track changes in web page, React will create a virtual DOM in memory and when there is any change in the web page, React will apply the change to virtual DOM and then compare it with actual DOM, React will only update the necessary node in the DOM, instead of manipulate the whole DOM all the time.
What is SPA?
Single page application, modern concept of web application, using reusable component instead of route between multiple web page, has higher performance.
JSX or TSX
Basically, JavaScript + HTML = JSX, TypeScript + HTML = TSX.
TypeScript is a superset of JavaScript and also a strong type language, which can detect mistake, like typo, that JavaScript couldn't catch early.

# Create React project with Vite
Run ```npm create vite@latest```

# Use useEffect React hook to retrieve data from local DB
Prerequisit: Set up CORS policy properly in API project

# Use material UI library to build UI
run
```npm install @mui/material @emotion/react @emotion/styled```
```npm install @fontsource/roboto```
```npm install @mui/icons-material```

# Add React Router to our SPA UI
SPA also need routing, because instead of using file to replace file in multi-page web app, we use React component to replace React component in SPA.

# Add Redux Store, Redux ToolKit and Redux Toolkit Query (RTK Query)
Redux Store is a JS library and will be used for gloabl state management of web application, and it's not limited with React framework.
One application will only has one Redux Store, but you can define multiple "slice" to manage states for major features.
Redux Flow:
1. Component try to update app state
2. Through dispatch function, an action will be created
3. Reducer will execute the action, update app states by creating new app states and replacing the previous states in Redux Store, not by modify old state directly.
4. React-Redux Provider will be notified, then the app and the component will also be notified
5. Components that depend on the new state will be re-rendered to reflect the changes
Redux Toolkit will simplify the Redux flow in development by simplify boilerplate codes and help developer introduce less bug to their project with Redux. It became the only recommended way to write Redux login since 2023.
RTK Query will provide a new way of data fetching, it handle data fetching, caching, loading, error handling very well.

# React hooks in React Redux, useSellector and useDispatcher
BTW, React Redux is the official React bindings for Redux, but Redux can work with other framework for the same purpose as well
useSelector, read calue of state from store
useDispatch, dispatch changes to store

# Apply RTK Query for data connection in frontend instead of using Thunk and Axios etc.
Thunk is a function that is returned by another function and can be executed later. In Redux, a thunk allows action creators to return a function instead of a plain object.
One advantage of RTK Query is, the hook method it creates will monitor the change of its parameter, it will trigger a refetch when the query's auguments are changed. So, if you use state as its argument, when the state changes data will be refetched and component will be re-rendered.

# Add exception middleware in our backend
Create fake http error response controller in backend to mimic real error.
Take the fake error response and build error handling experience in frontend.
Add debugger to backend.

# Add shopping cart feature
Where to store the shopping cart?
1. Store in user LocalStorage
Pros: Simple. Persistent(won't disappear). Easy to access. Offline.
Cons: Unware of user's item. Limited storage. Security risk.
2. Store in Cookies
Pros: Ware of user's choices. Controlled persistence.
Cons: 4KB size. Performance impact (cause Cookies will be sent with every http request).
3. Store in DB
Pros: Persistent. Secure. Scalable. Analytics.
Cons: Complex. Server load. Online only.

# Add new table to store shopping cart data in our data base

# Add, extension methods and DTOs (Data Transfer Object) to shopping cart data model
Purpose of DTO: Ensure only the necessary data is sent to clients, imporve security and performance. And it also make the code resuable and cleaner.

# Including credentials in the request allows the API to set cookies in the browser, and add cache invalidation logic

# Add authentication and authorization with ASP.NET Identity
When user set up their password, before hashing it our app will "salted" it first, aka add a random string to the password, so that different user can have same password but diffrent hashing results.
Cons: Not suited for distributed apps and hard to customization. Designed for single server application.
And we are going to implement authentication with Cookie, Cookie is only available in browsers so if you are developing a mobile app, probably you need using a token authentication.
And Cookie is Http only, means it can only be modified on server-side, like login/logout endpoint etc. So it's more secure than token, because token need to be store somewhere, like local storage, and it's accessible by JavaScript.

Note: POST api/login endpoint will take "username" as "email" in the body of request when it valid a user

# Introduce React Hook Form and Zod to help us handle user input and frontend data validation

# Add payment provider Stripe to our application
In order to meet PCI Compliance, aka Payment Card Industry Data Security Standard

# Add configuration to out client web app
.env will store config data, like Stripe publishable key, .env will be downloaded to user browser, so no secrects we can store in it. It's excluded from git but it doesn't means we can leave any secret in it.

# Add order feature to our web app
Create order aggregate entity to store the order