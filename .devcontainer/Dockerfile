FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# Install Node.js (LTS) and common CLIs
ARG NODE_VERSION=22
RUN apt-get update \
    && apt-get install -y curl git build-essential ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && npm install -g @capacitor/cli @ionic/cli

# Create vscode user (image base already includes vscode user)
USER vscode
WORKDIR /workspace

# Ensure npm global bin is on PATH
ENV PATH="/home/vscode/.npm-global/bin:${PATH}"
