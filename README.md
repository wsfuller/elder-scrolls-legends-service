# Elder Scrolls Legends Service

This is a Node + Express + MongoDB companion API for authentication and user data storage for the [Elder Scrolls Legends application](https://elder-scrolls-legends.netlify.app/). The application is built using React and retrieves dynmaic data provided by the [Elder Scrolls Legends API](https://elderscrollslegends.io/).

**How it all works:**

`Service API << (auth & user data storage) >> React Application << (card data) Elder Scrolls Legends API`

**Why does this service exist?**
Good quesiton, the reason for this service is expanding on the functionality of the React Application. The React applicaiton pulls in data and displays is. Users can favorite cards and that data is stored locally in the browser. I wanted to take this favoriting ability to the next level. So this service was built using Node, Express, and Mongo to allow users to sign up, favorite cards, and have that data stored in a persistent location.

**What does the Service do?**

This service provides 2 functions:

1. User authentication using [JSON Web Tokens](https://jwt.io/)
2. User card favorites stored in MongoDB
