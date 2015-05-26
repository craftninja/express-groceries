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
1. User can see list of groceries on index page - add mongoose, model for groceries, insert one grocery into database using console
  * Express created a users route we will not use. In `app.js`, change:
    * `var users = require('./routes/users');` to `var groceryRoutes = require('./routes/groceries');`
    * `app.use('/users', users);` to `app.use('/groceries', groceryRoutes);`
  * rename `routes/users.js` to `routes/groceries.js`
  * add mongoose, model for grocery
    * to `package.json` add to dependencies `"mongoose": "~4.0.3",`
    * $ npm install
    * in `app.js` add above `view engine setup`:

      ```
      var mongoConnection = function () {
        var options = {server: {socketOptions: {keepAlive: 1}}};
        mongoose.connect('mongodb://localhost/groceries', options);
      };
      mongoConnection();

      mongoose.connection.on('error', console.log);
      mongoose.connection.on('disconnected', mongoConnection);
      ```

    * in same file under the top requires, add `var mongoose = require('mongoose');`
    * in the same file, above routes add `var grocery = require('./app/models/grocery');`
    * add file `/app/models/grocery.js` with the content:

      ```
      var mongoose = require('mongoose');

      var Schema = mongoose.Schema;

      var GrocerySchema = new Schema({
        item: {type: String, default: ''},
        quantity: {type: Number, default: 0},
        inBasket: {type: Boolean, default: false}
      });

      mongoose.model('Grocery', GrocerySchema);
      ```
  * Access this model in the index and pass objects to the view
    * in `routes/groceries.js`:
      * add `var mongoose = require('mongoose');` under other require
      * add access to the model under router declaration: `var Grocery = mongoose.model('Grocery');`
    * find all groceries in the database and pass them into the view

      ```
      router.get('/', function(req, res, next) {
        Grocery.find({}, function(err, groceries) {
          if (err) return console.log(err);
          res.render('groceries/index', {groceries: groceries})
        });
      });
      ```
  * Use the groceries variable passed into the view to list all groceries on the index
    * add `view/groceries/index.jade` with the following content:

      ```
      extend ../layout

      block content

        h1  My Groceries

        ul
          each grocery in groceries
            if grocery.inBasket
              li #{grocery.item} (need #{grocery.quantity}) - got it
            else
              li #{grocery.item} (need #{grocery.quantity}) - pick it up
      ```

    * add some bootstrap:

    ```
    extend ../layout

    block content

      h1(class="page-header")  My Groceries

      ul(class="list-group")
        each grocery in groceries
          if grocery.inBasket
            li(class="list-group-item") #{grocery.item} (need #{grocery.quantity}) - got it
          else
            li(class="list-group-item") #{grocery.item} (need #{grocery.quantity}) - pick it up
    ```

  * Add a link from root page to grocery index
    * `a(href='/groceries') Check out these groceries!`
  * create the mongo database and add one grocery:

    ```
    $ mongo
    MongoDB shell version: 3.0.3
    connecting to: test
    > use grocery
    switched to db grocery
    > db.groceries
    grocery.groceries
    > db.groceries.insert({item: "eggs", quantity: 1, inBasket: false})
    WriteResult({ "nInserted" : 1 })
    ```
