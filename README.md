# online_store

# To create a new .Net project
Run
1. dotnet new sln
2. dotnet new webapi -n API -controllers
3. dotnet sln add API

# Add new packages to your .Net project
e.g.
dotnet add package Microsoft.EntityFrameworkCore.Sqlite -Version 8.0.4

# Install dotnet-ef globally in your machine
e.g.
dotnet tool install --global dotnet-ef --version 9.0.2

# Use dotnet-ef create migration and add DB initializer
e.g.
dotnet ef migrations add InitiaCreate -o Data/Migrations
dotnet ef database update

