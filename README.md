# ChatGPT React Chatbot with Jenkins CI/CD Pipeline

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Cloning the Repository](#cloning-the-repository)
  - [Run the Code](#run-the-code)
- [Pipeline Integration](#pipeline-integration)

## Overview

This project showcases the integration of a ChatGPT chatbot into a React application, initiated with Vite. The implementation is orchestrated through a Jenkins pipeline with SonarQube and Slack integration. The code is containerized and pushed to DockerHub for effortless deployment.

## Getting Started
### Cloning the Repository
Clone the repository to your local machine:
```
git clone https://github.com/Emnaghz/Chatbot-Pipeline.git
```
### Run the Code
First, navigate to the project directory and install the project dependencies:
```
npm install
```
start the application
```
npm run dev
```
## Pipeline Integration
To test the pipeline integration, ensure Docker and its utilities are installed on your machine. 
Run the following command:
```
docker compose up
```
Access the Jenkins interface at [https://localhost:8080](https://localhost:8080) and the SonarQube interface at [https://localhost:9000](https://localhost:9000).

For a detailed walkthrough of the CI/CD pipeline implementation, refer to my published article on Medium by clicking [here](#).
