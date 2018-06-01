# Review Questions

## What is Node.js?
> Node.js is a JavaScript runtime environment built on top of V8 JavaScript engine. What this means is that we can now take JavaScript outside the browser and run it on our local machines. This V8 engine compiles our JavaScript into machine code which will then be optimized for performance before being read by the machine. Using Node, we are also given the ability to spin up web servers and are given the ability to use JavaScript in the Front and Backend of the web.

## What is Express?
> Express is a library built on top of Node. With the help from Express, we can now QUICKLY spin up a webserver and start communicating with databases and API's at a much faster rate than Node alone can.

## Mention two parts of Express that you learned about this week.
- Writing custom middleware
- Reusable custom middleware

## What is Middleware?
> Middleware is basically a function created to let the server know what to do when a specific piece of code is being ran. For example, when the client requests a route, `http://localhost:5000`, we can use middleware to let Express know what we want to happen and what we want to return to the client.

## What is a Resource?
> A stock or supply of money, materials, staff, and other assets that can be drawn on by a person or organization in order to function effectively.

## What can the API return to help clients know if a request wasa successful?
> The API can return an http status code of 200 for successful/OK

## How can we partition our application into sub-applications?
> We are able to split up our apps with the use of export statements, `ES5: module.exports = foo`, `ES6: export default foo`, and bring them in to other parts of our apps with the use of import statements, `ES5: const foo = require('foo')`, `ES6: import foo from 'foo`.

## What is CORS and why do we need it?
> CORS, Cross-Origin Resource Sharing, is how we can allow outside clients, servers, software, etc. to gain access to our data. Without enabling CORS, whether this is for a specific piece of software or enabled for anyone to openly use, we are denying everyone access to our data.
