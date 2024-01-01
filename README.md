# Code-Corner

## Table of Contents

- [Title](#title)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Screenshots](#screenshots)

## Description

This repository contains the source code for my CMS-style blog site, Code-Corner. This application is currently deployed on Heroku and uses a database to store Users, Posts, and Comments. It uses Sequelize as the ORM, the bcrypt package to hash and salt passwords, cookies to store session data, and Handlebars as the MVC engine. It also has an API that can be used to retrieve all of the users, posts, and comments in a simple JSON response.

## Installation

If you are wanting to visit the application live on Heroku, visit the link in 'Usage' below! Otherwise if you'd like to own a copy of it for your local machine, you'll need to have mySQL downloaded to create the database, and Node.js for the runtime environment. VS Code's integrated terminal wors as a good CLI to start and perform the following steps:
    
    1. Clone the project
    
    2. You need rename the file '.env.EXAMPLE' to simply '.env'. Open it and ensure that your mySQL password is filled in with your own (if you've setup your mySQL to not have one, just leave it blank). The 'DB_USER' can remain 'root' 
    
    3. Right-click the folder titled 'db' and select 'Open in Integrated Terminal'
    
    4. You'll need to create the database initially, so start the mySQL shell by entering 'mysql -u root -p' If you're not worried about a password because you didn't make one, 'mysql -u root' will work too.
    
    5. Enter 'SOURCE schema.sql;' Then enter 'quit' to exit
    
    6. Enter 'cd ..' in the terminal to return to the root directory of the application
    
    7. Download the project's dependencies by entering 'npm i'
    
    8. We'll need to seed the databases tables with initial data, so run the script to do so by entering 'npm run seed' 
    
    9. Finally we are ready to begin, so enter 'npm run start'

## Usage

Link to Live Application: https://code-corner-d43268fe7948.herokuapp.com/

Link to GitHub repository: https://github.com/JBassard97/Code-Corner/

When you load the application on the live site, you'll be greeted with everyone's posts and comments that have already made accounts. When you load the application on your local machine after following the steps in 'Installation', it will load seeded with 3 posts, posted by 1 of 3 random dummy users. In order to make a post, comment, or contribute at all to the homepage, you will need to login and will be prompted to do so. If you visit the Dashboard tab, it will also prompt you to login to manage your user credentials and previous activity on the site. To make an account, simply fill out the Register User form. Your password must be at least 8 characters long, and your 'confirm password' must match your password input. If successful, you'll immediately be shown your personal dashboard page. This displays your 'user_id', the date your account was created, and the email you used to sign up. There is also a form to change your password if you'd like, but you must enter your previous password to really verify that you want to. Below that you'll be displayed all of your previous Posts, and Comments, and be given buttons to either edit their contents or delete them entirely. From here, you should be good to navigate to 'Home' and begin contributing! Tucked at the bottom of the Dashboard there is a 'Delete Account' button, which will promt a window.confirm, and will end your session and destroy your User data if you chose yes.

## License

MIT

## Screenshots
