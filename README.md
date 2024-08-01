# Backend coding challenge

### TASK SOLUTION BRIEF

- I was tasked with refactoring two API implementations which are considered legacy JS codebase.
- To refactor it, I considered code speration, cleanliness and implemented type definitions to leverage TypeScript’s type safety.
- To begin work, I had to run and test the legacy codebase, which had some bugs.
- The bugs were located in the MembershipPeriod creation code, where it was not persisted, and membershipId was used instead of membership as seen in the JSON and interface in the task description.
- I was able to resolve them and got it working as expected. After understanding the codebase, I began to replicate the solution and refactoring the approach.
- I implemented model classes for all data transactions. this included DTOs, ENUMs, Entities etc.
- I leveraged on class validation to enforce some security and compliance in the POST API. 
- I ensured to stick to excellent coding standards and OOP.

### ASSUMPTIONS

- I assumed that this codebase was a LIVE code and did not choose to use NEST, which might require me to overhaul the project. This might likely break things and hinder services to the customers.
- Instead I decided to implement the modernisation on the same code, maintained the overall structure and ensured that both legacy and modern APIs can still be utilized interchangeably. Hence, facilitates easy transition from the legacy APIs to the modern ones.
- I assumed the JSON file was the database as seen in the legacy code, therefore ensuring that there were no breaking refactorings, I used it similarly in the refactoring. Ensuring both APIs can still be used in LIVE environment.
- As mention in the task, I considered that our team would be building new features in the future, hence structured the modern codebase to be easily modified/updated, scaled, maintained and reuseable.

### Installation

```sh
npm install
```

### Usage

```sh
npm run start
```