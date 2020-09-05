# Thermostat controller
This project was created with Create react app + redux + sagas + jest + material ui

# Why this tech stack?
- Sagas: easy to work with parallel actions and apis. good testing techniques also. And of course separation of concern- logic in one place only. easy to go to react-server-side and test components in isolation
- Redux: one state to rule them all, gives nice split to the applications layers / logic so it is easier to maintain and test.
- React: Because it is fast(!) have many libraries that supports it and also really minimal logic in jsx.
- React-create-scripts: Because that is the official and correct way to start react application, the libraries versions are all set in to go. But- need to remove unneeded dependencies and components.

  
# What's inside?
Inside the app there is an example of Sagas parallel work:
- The user fetch updates from the thermo and keep them in state.
- The client try to fetch the temperature from server. if there's a problem he will try again, or will race with 2 second delay and will try another fetch.
- If there were few fetches updates, we will store only the latest update, depends on the timestamp.
- Save status of each request if it's in process (Fetch)/ Completed/failed. But always save the most recent request. (By timestamp)
- Max temperature to set point is 30.
- Min temperature to set point is 15.
- No connection to server? show error.
- The room temperature is higher than 23? show fire icon.

### Extras
- responsive design
- material ui
- flex layouts

### Cool things to add
- Action creator for requests to make them a bit more generic with typescript.
So we can create an action with XYZ prefix and a suffix of the request type "SUCCESS/FAIL/FETCH"
- Trying to patch new temperature, but if the last patch didn't finish. hold the saga, let the server process the request and then finish. ( I didn't do because I will have to change the store and save also actions ids, I wanted to scope the story)


# How to run

1. run install `yarn` or `npm i`
2. run the dev script (although also build is fine) `npm start`
3. Go to http://localhost:1234


Enjoy

You can also run test and build

# Notes

- It is possible to make all the actions and sagas more generic, for example:
an action and sagas that dealing with all requests and responses. but I did it like that to save time and not to over-engineer.
- I put all the state in one reducer to save some time, in real apps we should split by logic 
