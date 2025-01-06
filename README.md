# Howudoin - Messaging Application

Howudoin is a messaging application similar to WhatsApp, built with Spring Boot and MongoDB for the backend and React Native with TypeScript for the frontend. It features individual and group messaging capabilities, as well as user and friend management functionalities.

---

## Features

### Backend
- **User Management**:
  - Register a new user.
  - Log in existing users.
- **Friend Management**:
  - Add a friend.
  - Accept a friend request.
  - View a list of friends.
- **Messaging**:
  - Send individual messages.
  - Retrieve chat history with specific users.
- **Group Management**:
  - Create a new group.
  - Add members to a group.
  - Send group messages.
  - Retrieve group chat history.
  - List group members.

### Frontend
- **Authentication**:
  - Register and log in through a user-friendly interface.
- **Real-time Messaging** :
  - Instant updates for messages and notifications.
- **User Experience**:
  - Intuitive navigation.
  - Responsive design for mobile devices.

---

## Backend

### Technologies Used
- **Spring Boot**: For RESTful API development.
- **MongoDB**: As the database for storing user, message, and group data.
- **Gradle**: For build automation.

### Project Structure
- **Main File**: `HowudoinBackendApplication.java`
- **Utility Package**: Contains `JwtAuthenticationFilter` for handling authentication.

### API Endpoints
#### User Management
- `POST /user/add`: Register a new user.
- `POST /user/login`: Log in an existing user.

#### Friend Management
- `POST /friends/add`: Send a friend request.
- `POST /friends/accept`: Accept a friend request.
- `GET /friends`: Retrieve the friend list.

#### Messaging
- `POST /messages/send`: Send a direct message.
- `GET /messages/getmessages`: Retrieve chat history.

#### Group Management
- `POST /groups/create`: Create a new group.
- `POST /groups/{groupId}/add-member`: Add a member to a group.
- `POST /groups/{groupId}/send`: Send a message to a group.
- `GET /groups/messages`: Retrieve group chat history.
- `GET /groups/members`: List group members.

---

## Frontend

### Technologies Used
- **React Native**: For building the mobile app.
- **TypeScript (.tsx)**: Ensures type safety and improved developer experience.

### Features Implemented
- **Login Page**: Connects to the backend `/user/login` endpoint.
- **Register Page**: Connects to the backend `/user/add` endpoint.



