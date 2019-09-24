# SchoolDemo project setup

Before starting out, first make sure that you have `node` installed. You should use `vs 10` and above. You can verify that by opening a command line, and running `node --version` If you see a version number, then you have it installed. If not, then go ahead and install it:

https://nodejs.org/en/

Also, before starting out, please make sure to have .NET Core installed on your machine:

https://www.microsoft.com/net/download/dotnet-core/2.2

Next, go ahead and clone this repository:

`git clone git@github.com:rachelleahr/SchoolDemo.git`

Once that's done, open the project in Visual Studio.

To initialize the database and run the migrations change the default connection to a connection string that points to your db

in the `appsettings.json` file 

Once that is set up you can run the migrations which will create a database as well if it's not created yet using this command:

Open the cmd line, `cd` into the `SchoolDemo` folder, run `dotnet ef database update`.

To run the web api and start the application:

run `npm i` and then `dotnet run`.

Once that's done, you should be able to visit the URL: https://localhost:5001/
