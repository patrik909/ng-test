# Event count down

https://arsenikrecords.se/ng-test/

```sh
npm i
ng serve
```

### Tools

The application was built using the provided boilerplate code. I've only added `fitty` as additional
tool, which is a lightweight helper package for fitting text into a container. There was a angular
specific package called `angular-fittext`, unfortunately it has not been updated for 6-7 years. The
functionality was applied to a certain text element using directive, so I decided to build one using
`fitty`.

I've now also noticed there is a newer package available for angular called `ng2-fittext`.

https://www.npmjs.com/package/fitty

https://github.com/sollenne/angular-fittext

https://www.npmjs.com/package/ng2-fittext

### Reusable components

I created one for the input only to show case the importance of making recurring code reusable.
There was not other elements possible to apply this to. The input fields has no validation, with
more time this would have been in the scope.

### Structure

I could have placed more code within src/event-countdown. For larger application I prefer to use the
Package by feature rather than Package by layer approach, for this assignment is was definately not
necessary - but did something in between.

### Testing

Testing is an crucial part of coding, however I decided to not install jasmine or mocha within this
project.

### Other sources used during development

https://www.w3schools.com/howto/howto_js_countdown.asp

https://stackoverflow.com/questions/39547858/ng-container-vs-template

https://v17.angular.io/guide/architecture-services

https://v17.angular.io/guide/observables

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
