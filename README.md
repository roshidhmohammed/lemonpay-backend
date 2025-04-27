# How to run the backend application on your local machine

  ## Prerequisites:

     - Before you begin, ensure that the following are installed on your machine:
           - Node.js: Install the latest version of Node.js.
           - Git: Ensure Git is installed on your machine to clone the repository.
           - MongoDB Atlas: You need an account on MongoDB Atlas to set up your database.

  ## Set Up Instructions
       - Clone the backend repository to your local machine using Git:
          - git clone https://github.com/roshidhmohammed/lemonpay-backend
          - cd lemonpay-backend

   - After cloning the repository, you need to install the required dependencies. Run the following command to install them:
        - npm install

    - Create a MongoDB Atlas account if you don't have one.
    - Create a new cluster and obtain the connection string (this is your MONGODB_URL).
       - Example MongoDB Atlas connection string:
            -  mongodb+srv://<db_username>:<db_password>@cluster0.aad345.mongodb.net/

   - Create a config folder on the root of the project folder and create .env file in it (next to package.json), and add the following environment variables:
        - example: FRONTEND_URL=
                   PORT=8000
                   MONGODB_URL=mongodb://localhost:27017/lemonpay-app
                   JWT_SECRET_KEY=your_jwt_secret

            - FRONTEND_URL: The URL of your frontend application (e.g., http://localhost:3000).
            - PORT: The port where your backend will run (default is 8000).
            - MONGODB_URL: Your MongoDB connection URL.
            - JWT_SECRET_KEY: A secret key for generating JWT tokens (replace your_jwt_secret with a strong, secret string).

   - To start the backend application, run the following command:
        -  npm run dev 
        
        - This will start the backend server, which will listen on http://localhost:8000 by default.

   - Once the development server is running, you can connect the server to the frontend application:
        - eg: http://localhost:8000 # paste this url in the frontend .env files


 ## Troubleshooting
       - If you encounter issues, here are some common fixes
          - CORS Issues: in the app.js file replace the existing line of code  
      

            app.use(  cors({
            origin:process.env.FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            }))
        

            with below code 
         
         
            app.use(cors())

     
      - Database Connection Issues: If you're using MongoDB Atlas, make sure your cluster allows connections from your IP address.