FROM mcr.microsoft.com/devcontainers/python:3.11

# Install PostgreSQL client
RUN apt-get update \
    && apt-get install -y postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python development tools
RUN pip install --upgrade pip \
    && pip install \
    black \
    pylint \
    flake8

# Set working directory
WORKDIR /workspace