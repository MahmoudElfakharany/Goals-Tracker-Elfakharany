# GoalTrackerFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

----------------------------------------------------

Database Choice
I chose PostgreSQL for its powerful relational features, JSON support, and stability in production environments. Nested goal relationships (parent/child) are represented via self-referencing foreign keys.

------------------------------------------------------------
Tech stack

Frontend	Angular 17 (Standalone APIs), Angular Material, Bootstrap
Backend	NestJS, TypeORM, PostgreSQL
Auth	JWT-based Authentication
Styling	SCSS, Material Icons, Responsive Layout

----------------------------------------

Key Decisions & Trade-offs
Standalone Angular Components
Used Angular 17's standalone API for simpler, module-free architecture. Reduces boilerplate but may limit reusability in older ecosystems.

Bootstrap + Angular Material
Combined both for rapid design (Bootstrap grid) and rich components (Material). May introduce some styling conflicts but speeds up delivery.
Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

-----------------------------------------

Known Limitations / Pending Features
 No password reset or email verification flow

 No pagination/infinite scroll for public goals

 No drag-and-drop support yet for goal reordering

 No collaboration features (e.g., shared goals)

 Mobile UI could use better optimization

 ---------------------

 Future Enhancements
Add drag-to-reorder for goals (with visual nesting)

Build profile and dashboard analytics

Enable sharing public goals via a link

Add goal progress tracking and completion

Integrate reminders via email or notifications



## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
