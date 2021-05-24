# React Native Code Test (Expo)

## Test 1

- Fork and clone this project locally
- All code should be written in Typescript
- No ejecting out of Expo
- Showcase good UI/UX skills by developing visually appealing interfaces by using UI libraries such as [UI Kitten](https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten#what-is-ui-kitten) or icon libraries like [react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)
- Install and integrate [React Navigation](https://reactnavigation.org/docs/getting-started)
- Install and integrate [Lottie](https://docs.expo.io/versions/latest/sdk/lottie/)
- Install and integrate [Moti](https://github.com/nandorojo/moti)
- Using [UI Kitten](https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten#what-is-ui-kitten) set up the theme to have a dark and light mode option. Provide a switch on the home page that allows users to change between modes.
- Using React Navigation, set up the pages as listed below
    - ***Login page*** - A page with email and password for login. Use [React Hook Form](https://react-hook-form.com/) and [Yup](https://github.com/jquense/yup) for form management and validation of the login page. Input's need to be keyboard aware. Use (Firebase Authentication)[https://firebase.google.com/docs/auth] to provide the authentication service using email and password.
    - ***Home page*** - The home page should render a performant flat list that will load all 1000 blogs as cards with only their image and title. Clicking on the blog should bring the user to the blog page which allows them to view the full article. However, reading an article requires the user to be logged in. The blog data can be found in `src/data/blogData.json`.
    - ***Blog Page*** - This page shows the full blog article when clicked in from the home page. This is a protected route and requires the user to be logged in before being able to view it. The user should be able to see the image of the blog, title and the full article. If the user reads less than 70% of the article, create a local notification that will remind the user every 3hrs to read the article. If the user clicks on the notification or revisits the article and reads more than 70%, remove the notification loop. Notifications should not pop up while the user is in the app.
- Using the library of your choice there should be a smooth transition from the image and title on the blog card to the image and title on the blog page
- Using Lottie display a 3 - 5 second loading animation before displaying the list of blog cards on the home page.
- Using [React Context Api](https://reactjs.org/docs/context.html) and [React Hooks Api](https://reactjs.org/docs/hooks-reference.html), provide a hook that allows any component to get the login state of the current user.
- Provide an interceptor service for error handling and logging.


## Extra Points
- Using typescript configure the project to allow absolute imports for the components folder. Change all component imports to absolute imports.
- Provide a performant way for image caching.

## Good Job!

After completing the coding test, push your code to the cloned repo and please provide the details listed below:

- Public GitHub link for all test completed
- Any other information required to run and access the project such as environment keys (`.env`) and login credentials.

## Learn More

To learn more about some of the technologies used, take a look at the following resources:

- [Expo Documentation](https://docs.expo.io/)
- [React Native](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Lottie](https://docs.expo.io/versions/latest/sdk/lottie/)
- [Moti](https://github.com/nandorojo/moti)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [react-native-shared-element](https://github.com/IjzerenHein/react-native-shared-element)
- [Dayjs](https://day.js.org/)