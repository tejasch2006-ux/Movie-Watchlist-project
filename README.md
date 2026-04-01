# 🎬 Movie Watchlist App

This project is a movie search and watchlist web app that allows users to discover movies and keep track of what they want to watch. The goal was to build a simple but practical application that works with real-world APIs and feels similar to modern OTT platforms.

---

## 📌 Project Purpose

The main idea behind this project is to understand how frontend applications interact with external APIs and manage user data. Instead of building a static app, I focused on creating something dynamic where users can search for movies and maintain their own watchlist.

---

## 🔗 APIs Used

* **OMDb API** → For fetching movie data (search results, posters, details)
  https://www.omdbapi.com/

* **TMDB API (optional)** → For extended movie data and better UI content
  https://developer.themoviedb.org/docs/getting-started

* **Watchmode API (optional)** → To explore OTT platform availability
  https://api.watchmode.com/

---

## ✨ Features Implemented

* 🔍 **Live Search**
  Users can search for movies dynamically as they type or on button click

* ⭐ **Watchlist Toggle**
  Add/remove movies from a personal watchlist

* 📭 **Empty States**
  Clear UI when no movies are found or watchlist is empty

* 💾 **Local Storage**
  Watchlist is saved in browser so data persists after refresh

* 🎨 **UI Design**
  Dark theme inspired by platforms like Disney+ / HBO Max

* 📌 **Sticky Sidebar**
  Watchlist is visible while browsing movies

---

## 🎯 Optional Feature

* 🎲 **Random Movie Night**
  Picks a random movie from the saved watchlist

---

## 🛠️ Technologies Used

* React.js
* JavaScript (ES6+)
* CSS / Tailwind CSS
* REST APIs
* LocalStorage

---

## ⚙️ How to Run the Project

1. Clone the repository

```bash id="b1"
git clone https://github.com/your-username/movie-watchlist.git
```

2. Navigate into the project folder

```bash id="b2"
cd movie-watchlist
```

3. Install dependencies

```bash id="b3"
npm install
```

4. Start the development server

```bash id="b4"
npm start
```

---

## 🔑 API Setup

To run this project, you need an API key:

1. Get your API key from OMDb
2. Create a `.env` file in the root folder
3. Add the following:

```env id="b5"
REACT_APP_API_KEY=your_api_key_here
```

---

## 💭 What I Learned

* Working with real-time API data
* Managing state in React
* Handling UI edge cases like empty results
* Building a more realistic, user-focused application

---

## 🚀 Future Improvements

* Add user authentication
* Store watchlist in backend
* Add movie recommendations
* Show OTT platform availability

---

## 👨‍💻 Author

Tejas Hamane

---

This project is a step towards building more real-world applications and improving frontend development skills.
