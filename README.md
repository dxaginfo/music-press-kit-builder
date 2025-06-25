# Digital Press Kit Builder

A modern web application designed for musicians and bands to create professional, shareable electronic press kits (EPKs) with built-in analytics.

## 🎵 Overview

The Digital Press Kit Builder helps artists showcase their music, images, and brand in a cohesive format that can be easily shared with industry professionals, venues, and media outlets.

## ✨ Key Features

- **User Authentication & Management**: Secure account creation and management
- **Press Kit Creation & Customization**: Multiple templates with customization options
- **Content Management**: Upload photos, add biography text, embed music and videos
- **Sharing & Distribution**: Generate unique URLs, share via email, download as PDF
- **Analytics**: Track views, downloads, and referral sources

## 🚀 Tech Stack

### Frontend
- React.js with Next.js
- Redux for state management
- Material UI / Tailwind CSS for responsive design
- Formik with Yup for form validation

### Backend
- Node.js with Express
- RESTful API architecture
- JWT authentication
- PostgreSQL database
- AWS S3 for media storage

## 📋 Development Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL
- AWS account (for S3 storage)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/music-press-kit-builder.git
   cd music-press-kit-builder
   ```

2. Install dependencies for both frontend and backend
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   ```bash
   # Backend (.env file in backend directory)
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=postgresql://username:password@localhost:5432/presskitbuilder
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_BUCKET_NAME=your_s3_bucket_name

   # Frontend (.env.local file in frontend directory)
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Initialize the database
   ```bash
   cd backend
   npm run db:migrate
   npm run db:seed # Optional: adds demo data
   ```

5. Start the development servers
   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm run dev
   ```

6. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📱 Mobile Responsiveness

The Digital Press Kit Builder is designed to be fully responsive, ensuring that press kits look great on all devices, from desktop browsers to mobile phones and tablets.

## 🔒 Security Features

- Secure authentication with JWT and refresh tokens
- Password hashing with bcrypt
- Input validation to prevent injection attacks
- HTTPS encryption for all connections
- Proper file validation for uploads

## 🔌 Integration Capabilities

- Spotify and SoundCloud for music embedding
- YouTube and Vimeo for video embedding
- Social media platform integration
- Email service integration

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request