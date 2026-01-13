# Backend Setup Guide

This guide will help you set up the MongoDB backend for the contact form.

## Prerequisites

1. **MongoDB Account**: Sign up for a free MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Or use a local MongoDB installation

## Setup Steps

### 1. MongoDB Atlas Setup (Recommended)

1. Create a free MongoDB Atlas account
2. Create a new cluster (free tier is fine)
3. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Create a username and password (save these!)
4. Whitelist your IP address:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" for development (or add your specific IP)
5. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)

### 2. Local MongoDB Setup (Alternative)

If you prefer to use local MongoDB:

1. Install MongoDB locally: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/vice-portfolio`

### 3. Environment Variables

1. Create a `.env` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vice-portfolio?retryWrites=true&w=majority

# Server Port (optional, defaults to 5000)
PORT=5000

# Environment
NODE_ENV=development
```

2. Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials

### 4. Frontend Environment Variables (Optional)

For production deployment, create a `.env` file in the root directory with:

```env
VITE_API_URL=https://your-backend-url.com/api
```

For development, the Vite proxy will handle API requests automatically.

## Running the Application

### Development Mode

1. **Start the backend server** (in one terminal):
   ```bash
   npm run server
   ```
   Or with auto-reload:
   ```bash
   npm run dev:server
   ```

2. **Start the frontend** (in another terminal):
   ```bash
   npm run dev
   ```

### Production Mode

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the backend server:
   ```bash
   npm run server
   ```

## API Endpoints

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in working with you!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "MISSION PASSED! Your message has been received successfully.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### GET `/api/contact` (Optional - for admin use)
Get all contact messages.

### GET `/api/health`
Health check endpoint.

## Database Schema

The contact messages are stored with the following schema:

```javascript
{
  name: String (required),
  email: String (required, validated),
  message: String (required),
  read: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Troubleshooting

### Connection Issues

- **"MongoServerError: Authentication failed"**: Check your MongoDB username and password in the connection string
- **"MongoNetworkError"**: Make sure your IP address is whitelisted in MongoDB Atlas
- **"ECONNREFUSED"**: Make sure MongoDB is running (if using local MongoDB)

### CORS Issues

- The server is configured to accept requests from all origins in development
- For production, update the CORS configuration in `server.js`

## Deployment

### Backend Deployment Options

1. **Render.com**: Free tier available, easy MongoDB Atlas integration
2. **Railway**: Simple deployment with MongoDB support
3. **Heroku**: Requires MongoDB Atlas addon
4. **Vercel/Netlify**: For frontend only (backend needs separate hosting)

### Environment Variables in Production

Make sure to set the following environment variables in your hosting platform:
- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: Server port (usually auto-set by hosting platform)
- `NODE_ENV`: Set to `production`

### Frontend Environment Variables

Set `VITE_API_URL` to your deployed backend URL in your frontend hosting platform.

