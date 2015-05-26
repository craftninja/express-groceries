# README

### How I made this:

1. basic app setup - create new app using express generator, and make initial commit
  * $ express grocery
  * $ cd grocery
  * $ git init
  * $ git add -A
  * $ git commit
1. npm install - install but do not commit to git
  * $ npm install
  * $ vim .gitignore
    * content: `node_modules/**`
  * open project in text editor
  * add README.md and outline all steps, and continue updating
  * $ git add -N .gitignore README.md
  * $ git add -p
  * $ git commit
1. App is bootstrapped
  * start server (and stop and restart with each code change and browser check)
    * `DEBUG=grocery:* npm start`
    * no need to restart if you just change `.jade` files?
  * add bootstrap files
    * download bootstrap zip
    * unzip files
    * rename bootstrap top directory simply `bootstrap`
    * move entire bootstrap directory into public directory
  * require bootstrap in `views/layout.jade`
    * entire contents of `<head>` should now be:

      ```
      title= title
      link(rel='stylesheet', href='/bootstrap/css/bootstrap.min.css')
      link(rel='stylesheet', href='/bootstrap/css/bootstrap-responsive.min.css')
      link(rel='stylesheet', href='/stylesheets/style.css')
      script(src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js')
      script(src='/bootstrap/js/bootstrap.min.js')
      ```

  * Change general project title to "Groceries!"
    * in `routes/index.js` change `{title: 'Express'}` to `{title: 'Groceries!'}`
    * be sure to stop and start your server to verify change in browser
  * Commit only the bootstrap directory
  * Commit the rest of the files in a separate commit
