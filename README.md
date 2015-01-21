# Web Development Workflow

A simple starter workflow for basic web development projects that uses Gulp, Sass, and BrowserSync

## Features
- Live Reloading (via BrowserSync) of you web page whenever you save a change to an html, sass (css), or js file
- Sass preprocessing (turns sass into css via gulp-sass)
- Organized workflow with the following structure:
    - **src** directory (for source code - the only stuff you should be editing)
    - **builds/dev** (for development code - the stuff you'll veiw in the browser for testing)
    - **builds/dist** (for code ready for distribution - the stuff you'll upload to your own server)

## Required Software
Make sure the following software is installed on your computer. An easy way to check to see if something is installed is to type the name of the software followed by --version in a command prompt or terminal window. For example, type <code>node --version</code> to check to see if node.js has been installed. If you see *'node' is not recognized as an internal or external command ...* it means that node isn't installed on your system.
- Node.js (allows you to install npm packages)
- Gulp.js (type <code>npm install -g gulp</code> to install Gulp.js globally)

## Getting Started
- Clone this repo to your local development environment
    - If you're using Sublime Text, consider using "Fetch" explained below
- Navigate to the root directory in a command prompt or terminal window
- type <code>npm install</code> to install required node modules
    - this will install all of the development dependencies from the package.json file
    - this will also create a node_modules folder in your root directory. Make sure your .gitignore file is ignoring your modules!

## Using Fetch with Sublime Text 3 (Should also work with ST 2)

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
