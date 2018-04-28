.PHONY: dev-frontend
.PHONY: prod-frontend
.PHONY: start-frontend-dev
.PHONY: start-frontend-prod
.PHONY: build-frontend
.PHONY: install-frontend
.PHONY: build

build:
	(make compile-data && make prod-frontend)

dev-frontend:
	(make compile-data &&  make start-frontend-dev)

prod-frontend:
	(make install-frontend && make build-frontend && make start-frontend-prod)

start-frontend-dev:
	(cd ./frontend && ./node_modules/webpack-dev-server/bin/webpack-dev-server.js)

start-frontend-prod:
	(node ./frontend/server/server.js)

build-frontend:
	(cd ./frontend && ./node_modules/webpack-cli/bin/webpack.js --config ./webpack.config.js)

install-frontend:
	(cd ./frontend && npm install)

compile-data:
	(cd ./wrangling && python pre_vis.py)
