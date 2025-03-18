# Whisper Client
A modern and user-friendly client for the Whisper API, built with SvelteKit, TypeScript, Tailwind CSS, and DaisyUI.


## Technologies
-   **[SvelteKit](https://kit.svelte.dev/):** A framework for building extremely performant web applications.
-   **[TypeScript](https://www.typescriptlang.org/):** A strongly typed programming language that builds on JavaScript.
-   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
-   **[DaisyUI](https://daisyui.com/):** A component library for Tailwind CSS.
-   **[Socket.IO Client](https://socket.io/):** For real-time communication with the Whisper API.
-   **[Whisper API]([Your Whisper API Repo URL]):** (Link to your Whisper API repository) The backend API that this client interacts with. Example: [Whisper API](https://github.com/Dru-blip/whisper-api.git)

## TODO List

### User Interface and Experience
-   [ ] Add settings page for user preferences.
-   [ ] Implement user profile customization.
-   [ ] Improve error handling and user feedback.
-   [ ] Add notifications for new messages and friend requests.

### Social Features
-   [ ] Implement friend request management UI.
-   [ ] Implement direct messaging UI.
-   [ ] Implement channel creation and management UI.
-   [ ] Add search functionality for users, conversations, and channels.
-   [ ] Implement message editing and deletion.

### Real-Time and Backend Integration
-   [ ] Implement robust Socket.IO event handling.
-   [ ] Ensure proper authentication and authorization for Socket.IO events.
-   [ ] Implement efficient handling of Socket.IO connections and disconnections.

### Testing and Optimization
-   [ ] Implement robust testing (unit, integration, and end-to-end).
-   [ ] Optimize performance for real-time updates.



## Prerequisites
-   Node.js
-   NPM
-   Access to a running Whisper API instance.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Dru-blip/whisper-client-web.git
    cd whisper-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env.local` file in the root directory and populate it with the necessary environment variables. Example:
    ```
    API_URL=http://localhost:5000 # Your Whisper API URL
    ```
4.  **Start the development server:**
    ```bash
    npm run dev # or yarn dev
    ```
    The client will be available at `http://localhost:5173` (or your configured port).



## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue.
