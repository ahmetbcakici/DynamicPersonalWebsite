# Dynamic Personal Website

A Personal Website that has experience, skill, portfolio, blog, contact fields. Anybody can have him/her own personal website with this project. Because every content, field is completely dynamic and editable via admin panel.
<div align="center">
<a href="#gif-belongs-to-project">See GIFS belongs to project</a>
</div>

## Get Started

### Must be installed on your computer
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org)
* [MongoDB](https://www.mongodb.com/download-center)

### Database Config
You should import database that i [exported](https://github.com/ahmetbcakici/DynamicPersonalWebsite/tree/master/Database_Exported). If you have no idea about import MongoDB take a look [here](https://stackoverflow.com/questions/11255630/how-to-export-all-collections-in-mongodb)

## Installation
```
git clone https://github.com/ahmetbcakici/DynamicPersonalWebsite.git # Clone repo
cd DynamicPersonalWebsite # Enter project root folder
npm install # Install modules required
npm start # To run project , check http://localhost:3000 on your browser
```

## Usage Admin Panel
Please visit /admin page to access CMS. You will see a login page if you install the project successfully. Username and password are as below at first , later you can change them.\
`test`\
`123`

Then everything is simple. Just click a field that you want to update  , edit and save changes in home page. Other sections are simple too as it seems. I just should say that you must specify education or career as category in experience and must specify design or programming as category in skill pages. The category keyword assign data will be right or left column. Also please check [funcsback.js](https://github.com/ahmetbcakici/DynamicPersonalWebsite/blob/master/assets/js/funcsback.js) file to config your mail settings which is sender to your personal mail address. Your personal mail address is editable from panel already.


## Built With
* [Express](https://github.com/expressjs/express) - Node framework used
* [Mongoose](https://github.com/Automattic/mongoose) - Module for MongoDB
* [SB Admin Panel](https://github.com/BlackrockDigital/startbootstrap-sb-admin) - Layout for Admin Panel

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## GIF belongs to project
![Front-1convertio](https://user-images.githubusercontent.com/36089310/71773622-f7e45380-2f70-11ea-85f1-3a16313ff36d.gif)
![Back-1](https://user-images.githubusercontent.com/36089310/71773627-fd419e00-2f70-11ea-987a-cd3e993f5d4a.gif)

