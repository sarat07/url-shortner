FROM node:14

# Clone the repository from Git to /workspace directory
RUN git clone https://github.com/sarat07/url-shortner.git /workspace

# Set the working directory to /workspace
WORKDIR /workspace

# Install dependencies for both frontend and backend
RUN cd backend && npm install
RUN cd frontend/url-shortner && npm install

# Expose the port on which the backend will run
EXPOSE 5001
EXPOSE 3000

# Add executable permissions to start.sh
RUN chmod +x /workspace/start.sh

# Start frontend and backend
CMD ["/workspace/start.sh"]
