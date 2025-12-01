# Personal Webpage

This repository contains my personal webpage, which serves as a sandbox for experimenting with software engineering, backend, frontend and data engineering.

The webpage is hosted with backend in rust, using axum and tokio. Frontend is made with React. Database is hosted with postgres. Airflow is used for orchestration.

### Content
- User registration setup and login with encrypted passwords (hashing with Argon2 + salt).
- Searchable literature database - A personal literature database that allows the user to search among all literature items. A few items are publically available. Remaining items requires login.
- Stockmarket price charts - An interactive stockprice chart for selected stocks. Stocks are scraped from yfinance daily using Airflow. (Due to change of setup from Django to rust+React, this feature has not yet been re-implemented - in progress).
- Foundation Response - An application that allows the user to predict foundation settlements based on subgrade and external loads input. The application is based on various machine learning models. Only predictions with the linear model is available to public. More advanced models requires login (Due to change of setup from Django to rust+React, this feature has not yet been re-implemented - in progress).