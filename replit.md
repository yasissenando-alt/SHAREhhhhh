# STARTCOPE NEWS

## Overview
A news website that displays the latest news from Manila using the NewsData.io API.

## Project Structure
- `index.js` - Express server that serves the frontend and proxies API requests
- `public/index.html` - Frontend HTML/CSS/JS for displaying news
- `package.json` - Node.js dependencies

## Tech Stack
- Node.js with Express
- Axios for API requests
- NewsData.io API for news content

## Running the Project
The project runs on port 5000 with `npm start`.

## API Endpoint
- `/api/news` - Fetches latest Manila news from NewsData.io
