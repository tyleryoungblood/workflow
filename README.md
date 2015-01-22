# Web Development Workflow

A simple starter workflow for basic web development projects that uses Gulp, Sass, and BrowserSync. 

Feel free to fork and/or contribute via a pull request. However, I plan to keep this workflow fairly basic to prevent the gulpfile from getting out of control. 

## Features
- **Live Reloading** (via BrowserSync) of you web page whenever you save a change to an html, sass (css), or js file
- **Sass preprocessing** (turns sass into css via gulp-sass)
- **Organized workflow** with the following structure:
    - *src* directory (for source code - the only stuff you should be editing)
    - *builds/dev* (for development code - the stuff you'll veiw in the browser for testing)
    - *builds/dist* (for code ready for distribution - the stuff you'll upload to your own server)

## Required Software
Make sure the following software is installed on your computer. An easy way to check to see if something is installed is to type the name of the software followed by --version in a command prompt or terminal window. For example, type <code>node --version</code> to check to see if node.js has been installed. If you see *'node' is not recognized as an internal or external command ...* it means that node isn't installed on your system.
- Node.js (allows you to install npm packages)
- Gulp.js (type <code>npm install -g gulp</code> to install Gulp.js globally)

## Getting Started
- Somehow you need to get the source code into your project directory. There are multiple ways to do this.
    1. Simple Way: Download a zip of this repo and extract it to your project folder on your local development environment
    2. Git Proficient Way: Clone this repo to your project folder on your local development environment
    3. Super Awesome Way: If you're using Sublime Text, consider using "Fetch" (explained below)
- Navigate to the root directory in a command prompt or terminal window
- type <code>npm install</code> to install required node modules
    - this will install all of the development dependencies from the package.json file
    - this will also create a node_modules folder in your root directory. Make sure your .gitignore file is ignoring your modules!
- Edit the files in the "src" directory ONLY
- If you don't know sass, you can write vanilla css in your sass file(s). 
- You can breakup your sass file into "partials" (the files that begin with an underscore, such as _variables.scss), just be sure to remember to import them into your styles.scss file by using <code>@import</code>

## Using Fetch with Sublime Text 3 (Should also work with ST 2)
Fetch is an awesome Sublime Text plugin that is best explained via this [NetTuts article](http://code.tutsplus.com/articles/introducing-nettuts-fetch--net-23490).

Once you've installed the Fetch plugin via package manager (<code>ctrl + shift + p</code> on win or <code>ctrl + shift + p</code> on mac) you need to edit the "Fetch: Manage" file.
- Open up package manager, type "Fetch", select "Fetch:Manage"
- This will open up the "Fetch.sublime-settings" file for editing
- add the following to the "packages" section
   - "workflow": "https://github.com/tyleryoungblood/workflow/zipball/master"

**Note:** Remember to comma separate multiple packages, but don't put a comma after the last package. Otherwise your file won't parse and you'll get an error. 

Once you've added the package to your Fetch.sublime-settings file you can access it using the following steps:

1.  open package manager (<code>ctrl + shift + p</code> on win or <code>ctrl + shift + p</code> on mac)
2.  type "fetch"
3.  choose "packages"
4.  select "workflow"

This will automatically pull/grab/fetch (ah ... that's why they called it that!) all the code from the github repo into your project. Which ... is just freaking awesome!

## Gulp Tasks

### "gulp"
Typing <code>gulp</code> in your terminal will run the default gulp task from your gulpfile.js file. This will do the following:
- Concatenates all sass files (including partials) into a single css file and saves it to builds/dev/css/styles.css
- Concatenates all js files into a single js file and saves it to builds/dev/js/scripts.js
- Pipes (moves) any html files from src to builds/dev
- Loads BrowserSync to sync page across multiple devices
- Watches for changes to html, js, and sass files and reloads the page whenever any changes are made

### "gulp build"
Typing <code>gulp build</code> in your terminal will run the build task from your gulpfile.js file. This will do the following:

- Minifiy html file(s) and save them to builds/dist
- Automagically (using gulp-usemin) replace old links to css and js files so that they point to the minified/uglified versions.
- Minify and concatenate css files and save them to builds/dist/css/styles.min.css
    - Note: you change the name and save location of the minified file by editing the comment surrounding the link to the stylesheet in the index file located in src/index.html
    - a comment of <!-- build:css css/styles.min.css --> will result in a css file saved to css/styles.min.css
- Uglify (minify) and concatenate js files and save them to builds/dist/js/optimized.js
    - editing the comment surrounding script tags will change the name and location of the optimized.js file   

### "gulp build-root"
Typing <code>gulp build-root</code> in your terminal window will run a build task identical to <code>gulp build</code> above, but instead of saving the build files to builds/dist is saves them to the root directory. Useful if you want to deploy the entire project to a server and have your index.html file exist in root.

**Warning** There may be security issues with deploying your entire root directory to the server. It's a better idea to deploy a "dist" (distribution version of your code that will exist in builds/dist after running "gulp build") version of your code only.

### "gulp deploy"
Eventually this task will handle deploying to a server via FTP
