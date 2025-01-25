# Dev.to Article Scraper

A full-stack web application that scrapes and displays articles from dev.to based on user queries. Built with React + Vite for the frontend and Flask for the backend.

## Features

- Search dev.to articles by keyword
- Display article cards with titles, tags, and links
- Real-time scraping status updates
- Persistent storage of last search query and results
- Responsive design with Tailwind CSS
- Toast notifications for user feedback

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- React Toastify for notifications

### Backend
- Flask
- Playwright for web scraping
- Flask-CORS for cross-origin support
- Gunicorn for production deployment

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- pip

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install Playwright browsers:
```bash
playwright install
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd backend
python app.py
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend development server will start on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a search query in the input field
3. Click "Execute and Fetch" to search for articles
4. View the results displayed as cards with titles, tags, and links
5. Click "Read More" on any card to visit the original article

## Error Handling

- The application checks for backend availability on startup
- Toast notifications inform users of success/failure states
- Error messages are displayed for failed API calls
- Loading states are shown during data fetching
