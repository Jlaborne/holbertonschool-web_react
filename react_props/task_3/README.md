0. Basic components
   mandatory
   Start with your files from the last task of the React intro project

Instead of creating new elements, we’re going to create components to split the project. The App.jsx is going to become the main entry point, the shell, for every component in the app.

Create a Header component
Create a new folder Header:

Create a functional component Header inside the Header.jsx where you move the code of the header from the App.jsx.
Move the CSS code, related to the header, from the App.css to a new file named Header.css.
Create an empty test file Header.spec.js.
Create a Footer component
Create a new folder Footer:

Create a functional component Footer inside the Footer.jsx where you move the code of the footer from the App.jsx.
Move the CSS code, related to the footer, from the App.css to a new file named Footer.css
Create an empty test file Footer.spec.js.
Create a Login component
Create a new folder Login:

Create a functional component Login inside the Login.jsx where you move the code of the login form from the App.jsx.
Move the CSS code, related to the login, from the App.css to a new file named Login.css
Create an empty test file Login.spec.js.
Modify the shell
In the App.jsx:

Along with the Notifications component, import the Header, the Login, and the Footer components
Pass the components in the above order respectively
Wrap the above elements inside a react <Fragment>
Tests:

In the App.spec.js:

As an entry point, in the App.spec.js file, check that all components are rendered correctly
In the Header.spec.js:

Copy all Header related unit tests within the Header.spec.js file
In the Login.spec.js:

Copy all Login related unit tests within the Login.spec.js file
In the Footer.spec.js:

Copy all Footer related unit tests within the Footer.spec.js file
Requirements:

At this point, reloading the App should display the exact same page as the last task
The console in your browser should not show any errors or warnings
