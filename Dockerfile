# Use the official Node.js image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /Users/jaishree/url-shortening-service

COPY . /Users/jaishree/url-shortening-service

RUN mv /Users/jaishree/url-shortening-service /Users/jaishree/App

WORKDIR /Users/jaishree/App

# Clone the repository from Git (replace with your Git repository URL)
#RUN git clone https://github.com/your-username/your-repo.git .

# Install dependencies for both frontend and backend
RUN cd backend && npm install
RUN cd frontend && npm install

# Expose the port on which the backend will run
EXPOSE 5001
EXPOSE 3000

RUN chmod +x start.sh

# Start frontend and backend
CMD ["./start.sh"]
