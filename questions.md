# Questions - Part 2


### #1 - What is the difference between Component and PureComponent? give an example where it might break my app.

The difference between Component and PureComponent is that Component re-renders itself every time when the props passed to it changes or its parent component re-renders and PureComponent re-renders only when the props passed to it changes. PureComponents does implement shouldComponentUpdate() by default and Component doesn't implement.

Example: If we have an application of list of articles from which your profile component will display the user's most liked pieces.

```
render() {
  const { posts } = this.props
  const topTen = [...posts].sort((a, b) => 
    b.likes - a.likes).slice(0, 9)
  return //...
}

```

_topTen_ will have a brand new reference each time the component re-renders, even if posts hasn’t changed and the derived data is the same. This will then re-render the list needlessly.


### #2 - Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Context is used to communicate with deeply contained components. For example, a root component defines a theme, and any component in the component tree might (or might not) be interested in this information. 

shouldComponentUpdate (SCU) on the other hand short circuits the re-rendering of a part of the component tree (including children), for example if the props or state of a component are not modified in a meaningful way. As far as the component can tell. But this might accidentally block context propagation.

### #3 - Describe 3 ways to pass information from a component to its PARENT.

#1 - In the parent component, create a callback function. This callback function will retrieve the data from the child component.
Pass the callback function to the child as a props from the parent component.The child component calls the parent callback function using props and passes the data to the parent component.


### #4 - Give 2 ways to prevent components from re-rendering.

#1 - Memoization using useMemo() and UseCallback() Hooks: Memoization enables your code to re-render components only if there’s a change in the props. These Hooks reduce re-renderings by caching and returning the same result if the inputs are the same without any computations. When the inputs change, the cache gets invalidated and the new component state gets rendered.

#2 - Replace useState() with useRef(): useState() Hook is widely used in React applications to re-render the components on state changes. However, there are scenarios where we need to track state changes without re-rendering the components.

But, if we use the useRef() Hook, we can track the state changes without causing component re-renderings.


### #5 - What is a fragment and why do we need it? Give an example where it might break my app.

React fragments serve as a cleaner alternative to using unnecessary divs in our code. These fragments don't produce any extra elements in the DOM, which means that a fragment’s child components will render without any wrapping DOM node.

Without using React fragments, as an application becomes larger in size and complex in architecture, you might find yourself rendering a significant amount of unnecessary divs to render large lists in your application. This could bloat your HTML, causing performance issues on older devices.

### #6 - Give 3 examples of the HOC pattern.

1. Enhancing different card views with same border and shadow
2. Components using data from third party subscription
3. App components that need logged in user data

### #7 - What's the difference in handling exceptions in promises, callbacks and async...await.

### #8 - How many arguments does setState take and why is it async

2 arguments. `setState` actions are asynchronous and are batched for performance gains and better UI experience.

### #9 - List the steps needed to migrate a Class to Function Component.

1. Change the class keyword to function and remove the extends React.Component part
2. Place the contents of the render() method in the function body
3. Convert all other methods on the class to stand-alone functions
4. Remove the constructor function
5. Inline any props into the function declaration using object destructuring
6. Get rid of any use of `this.` to reference methods or variables
7. Leave the redux boilerplate like connect() as-is (for now)

### #10 - List a few ways styles can be used with components.

1. Add the Global Styles to “index.html” File
2. Create a Style for Each Individual Component
3. Adding Inline Style to React Component Elements
4. Attach style property to JavaScript Style Object

### #11 - How to render an HTML string coming from the server.

Using `dangerouslySetInnerHTML` 

```
<div dangerouslySetInnerHTML={{__html: '<strong>strong text</strong>'}} />
```

As an alternative to `dangerouslySetInnerHTML` can use html-react-parser library.

```
var parse = require('html-react-parser');
parse('<div>text</div>');
```
