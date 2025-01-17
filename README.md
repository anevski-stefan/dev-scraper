# Dev.to Article Scraper

A full-stack web application that scrapes articles from dev.to based on user queries. The application features a React frontend and Flask backend with Playwright for web scraping.

## Features

- Search dev.to articles by query
- Real-time article scraping
- Responsive card-based UI
- Local storage for persisting search results
- Toast notifications for user feedback
- Backend health check monitoring
- Tag-based article filtering

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Toastify

### Backend
- Flask
- Flask-CORS
- Playwright
- Python 3.x

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v16 or higher)
- Python 3.x
- pip (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/anevski-stefan/dev-scraper.git
cd dev-to-scraper
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  
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

1. From the backend directory:
```bash
python app.py
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server

1. From the frontend directory:
```bash
npm run dev
```

The frontend development server will start on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a search query in the input field
3. Click "Execute and Fetch" to search for articles
4. View the results displayed as cards with titles, tags, and links
5. Click "Read More" on any card to visit the original article

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home/
│   │   │   └── Card/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── app.py
    ├── scraper.py
    └── requirements.txt
```

## Features in Detail

- **Real-time Scraping**: Uses Playwright for dynamic web scraping
- **Error Handling**: Comprehensive error handling with user feedback
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Data Persistence**: Stores search results in localStorage
- **Backend Health Monitoring**: Checks backend availability before operations

