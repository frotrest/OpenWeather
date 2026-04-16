# Project Overview
OpenWeather Dashboard is an adaptive single‑page application for fetching and displaying current weather and short‑term forecasts for user‑selected locations. The project is a learning pet project that demonstrates practical React patterns, responsive UI, API integration, and lightweight state management.

## Purpose

Provide a compact, usable interface to search cities and view current weather and multi‑day forecasts.

Demonstrate frontend architecture, API handling, responsive design, and basic data visualization for a portfolio piece.

## Features
Core Functionality

Current Weather: display temperature, feels like, humidity, pressure, wind speed, and textual description.

Forecast: hourly and multi‑day forecast visualization (depending on chosen OpenWeather endpoint).

Search: city search with recent searches and simple suggestions.

Favorites: save often checked locations to local storage.

Error Handling: clear feedback for not found cities, network errors, and API limits.

Key Protection: I protect API keys by storing them in GitHub Secrets to prevent exposure.

## UX Details

Local Storage: optional storage for recent searches, favorites, and unit preference.

Animations on Scroll: subtle entrance animations for content using IntersectionObserver and Framer Motion.

## React for UI.

React for UI and component composition.

axios for HTTP requests to OpenWeather API.

CSS Modules for scoped styling.

clsx for conditional class names.

Framer Motion for animations.

Chart.js (optional) for visualizing temperature and precipitation trends.

MUI (optional) for UI primitives and responsive helpers.
