# 🌌 VyomRealm-Backend

![Node.js](https://img.shields.io/badge/Tech-Node.js-green)
![Express.js](https://img.shields.io/badge/Tech-Express.js-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

**VyomRealm** is a production-grade, scalable backend architecture for a modern Video Streaming Platform. It is built to handle complex data flows, including video uploads, user authentication, social interactions (likes/comments), and dashboard analytics.

---

## 🚀 Features

- **🔐 Authentication & Authorization**: Secure login/signup using **JWT** (Access & Refresh tokens) and **Bcrypt** for password hashing.
- **📹 Video Management**: Professional video upload pipeline using **Multer** and **Cloudinary**.
- **👍 Social Interactions**: Complete system for Likes, Comments, Tweets, and Subscriptions.
- **📂 Playlists**: Users can create and manage video playlists.
- **📊 Dashboard**: Aggregation pipelines to calculate total views, subscribers, and video stats.
- **⚙️ Standard Practices**: Proper error handling, async wrappers, and API response standardization.

---

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Cloud Storage**: Cloudinary (for Images & Videos)
- **Authentication**: JSON Web Tokens (JWT)
- **File Handling**: Multer
- **Utilities**: Cookie-Parser, CORS, Dotenv

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/premanshtripathi/vyom-realm-backend.git
cd vyom-realm-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env file in the root directory and add the following configuration:

```env
PORT=8000
MONGODB_URI=your MongoDB URI
CORS_ORIGIN=your CORS Origin
ACCESS_TOKEN_SECRET=your Access Token Secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your Refresh Token Secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_NAME=your cloudinary cloud_name
CLOUDINARY_API_KEY=your cloudinary-api-key
CLOUDINARY_API_SECRET=your cloudinary-api-secret
```

### 4. Run the Server

For development (with Nodemon):

```bash
npm run dev
```

For production:

```bash
npm run start
```

---

## 📂 Project Structure

```
vyom-realm-backend/
├── public/
│   └── temp/               # Temporary storage for file uploads
├── src/
│   ├── controllers/        # Complex business logic (Video, User, etc.)
│   ├── db/                 # Database connection logic
│   ├── middlewares/        # Auth checks & Multer configuration
│   ├── models/             # Mongoose Data Schemas
│   ├── routes/             # API Route definitions
│   ├── utils/              # Helpers (ApiError, ApiResponse, Cloudinary)
│   ├── app.js              # Express App configuration & Middlewares
│   ├── constants.js        # Enums & DB Name
│   └── index.js            # App Entry Point (DB Connect & Server Start)
├── .env                    # Environment secrets (gitignored)
├── .gitignore              # Ignored files list
├── package.json            # Dependencies & Scripts
└── README.md               # Documentation
```

---

## 🔗 API Endpoints Overview

| Module            | Route Prefix            | Description                                           |
| :---------------- | :---------------------- | :---------------------------------------------------- |
| **Users**         | `/api/v1/users`         | Register, Login, Logout, Refresh Token, Update Avatar |
| **Videos**        | `/api/v1/videos`        | Publish Video, Get Video by ID, Delete, Update        |
| **Tweets**        | `/api/v1/tweets`        | Create & Manage Tweets                                |
| **Subscriptions** | `/api/v1/subscriptions` | Subscribe/Unsubscribe channels                        |
| **Playlists**     | `/api/v1/playlist`      | Create & Manage Playlists                             |
| **Comments**      | `/api/v1/comments`      | Add & Get Comments on videos                          |
| **Dashboard**     | `/api/v1/dashboard`     | Get Channel Stats & Analytics                         |

---

## 🤝 Contributing

## Contributions are welcome! Please fork the repository and submit a pull request.

## 📝 License

### This project is licensed under the MIT License.
### Made with ❤️ by [Premansh Tripathi](https://github.com/premanshtripathi)

---
## 🙏 Acknowledgements

Big thanks to **[Hitesh Choudhary](https://github.com/hiteshchoudhary)** Sir for his guidance.
This project is inspired by the Backend series on **[Chai aur Code](https://www.youtube.com/@chaiaurcode)**.