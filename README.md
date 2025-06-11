# Personal Webpage

This repository contains my personal webpage, which serves as a sandbox for experimenting with backend, software and data engineering tools.

### 🛠️ Content
- Searchable literature database - A personal literature database that allows the user to search among all literature items. Requires user login.
- Stockmarket price charts - Relative increase in selected stockprices for the current year.
- Foundation Response - An application that allows the user to predict foundation settlements based on subgrade and external loads input. The application is based on various machine learning models. Only predictions with the linear model is available to public. More advanced models requires login.
⚠️ Note this app is currently under deployment.
- Rust FE Calculator - A finite element calculator written in rust. Allows for calculating forces and displacements of structures. The FE engine is running on the webpage backend, and the inputs are given as txt-files. For the Rust-application, see [rust-fe-calculator
](https://github.com/Krusovice/rust-fe-calculator
).
⚠️ Note this app is currently under deployment.
- Live streaming of server utilization - The webpage is hosted on a personal Raspberry Pi. This app is livestreaming the CPU and RAM metrics and storing the data, for metrics surveillance. Requires login.
⚠️ Note this app is currently being deployed from the expired version of my personal webpage.

---

### 🛠️ Tech Stack

I've incorporated a variety of technologies into this project:

- Django + Nginx + Daphne - Webservice backend.
- Airflow - For orchestration and data management.
- Kafka + Redis + Websocket - For livestreaming
- Rust and Python for backend and software development.

---

### Running Webpage

The webpage is containerized with Docker and developed on a windows PC.
The production is run on a Raspberry Pi using Github Actions.

- For development environment, use: 
	- start_airflow_postgres.bat
	- start_django_redis_postgres.bat
- For production environemnt, use
	- start_prod.sh

A secret file has to be configured, containing:
- POSTGRES_USER
- POSTGRES_PASSWORD
- DJANGO_SECRET_KEY