.PHONY: dev-frontend
.PHONY: prod-frontend
.PHONY: start-frontend-dev
.PHONY: start-frontend-prod
.PHONY: build-frontend
.PHONY: install-frontend
.PHONY: build
.PHONY: compile-frontend
.PHONY: install-backend
.PHONY: run-backend

build:
	(make build-data && make compile-frontend)

# Frontend scripts

## General
install-frontend:
	(cd ./frontend && npm install)

## Production

# Produce the bundle and start server
prod-frontend:
	(make compile-frontend && make start-frontend-prod)

compile-frontend:
	(make install-frontend && make build-frontend)

start-frontend-prod:
	(node ./frontend/server/server.js)

build-frontend:
	(cd ./frontend && ./node_modules/webpack-cli/bin/webpack.js --config ./webpack.config.js)

## Development

dev-frontend:
	(make build-data &&  make start-frontend-dev)

start-frontend-dev:
	(cd ./frontend && ./node_modules/webpack-dev-server/bin/webpack-dev-server.js)


# Backend scripts
run-backend:
	(make install-backend && make build-data)

install-backend:
	(pip install -r requirements.txt)

build-data:
	(cd ./wrangling && python pre_vis.py)
