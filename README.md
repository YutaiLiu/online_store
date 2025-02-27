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