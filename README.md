# BBCS_2024-Hackathon

## Inspiration
We aim to bring joy to people who might not otherwise receive a gift this Christmas.

## What it does
Our platform allows users to create a wishlist of items they would love to receive for Christmas. Generous individuals can then browse these wishlists and choose to purchase gifts for others.

## How we built it
We developed the app using basic html, css, js for frontend and express.js and mysql2 for backend, focusing on user-friendly design and seamless gift-sharing functionality.

## Challenges we ran into
One of the main challenges was figuring out how to upload, store and bring out the image file uploaded from the form.

## Accomplishments that we're proud of
We are proud of creating an intuitive platform that brings people together to spread joy and kindness during the holiday season.

## What we learned
We learned the importance of creating an easy-to-navigate interface and the power of community-driven platforms in fostering generosity.

## What's next for Spirit of giving
We plan to expand the platform to include more holiday events throughout the year and add features like personalized gift recommendations to enhance the user experience.

# How to Use

1. **Open two separate VS Code windows:**
   - One for the **client** (frontend).
   - One for the **server** (backend).

2. **On the client:**
   - Open `index.html` and click **Go Live** (ensure you have the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension by Ritwick Dey installed).

3. **On the server:**
   - Create a `.env` file and add the following (make sure there are **no spaces** around the `=` signs):
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name

4. **Initialize the database:**
    - In the server terminal, run the following command:
    ```
    npm run init_tables
    ```
    Once you see `Tables created successfully`, proceed to the next step.

5. **Start the server:**
    - In the server terminal, run the following command:
    ```
    npm run dev
    ```

6. **Now, have fun!**

## Troubleshooting (Form not working)
If the form does not work, go to `app.js` file in the server. (/src/app.js)
Find the following line and change the `127.0.0.1` and the `port number` to match what you see in the browser's `index.html` (for example, `https://localhost:3000`):
```js
// Enable CORS before setting up routes
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));
```