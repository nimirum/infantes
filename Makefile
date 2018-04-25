.PHONY: start-frontend
.PHONY: dev-frontend
.PHONY: build-frontend
.PHONY: install-frontend

dev-frontend:
	(make compile-data && make start-frontend)

start-frontend:
	(cd ./frontend && ./node_modules/webpack-dev-server/bin/webpack-dev-server.js)

build-frontend:
	(cd ./frontend && ./node_modules/webpack-cli/bin/webpack-cli.js --config ./frontend/webpack.config.js)

install-frontend:
	(cd ./frontend && npm install)

compile-data:
	(cd ./wrangling && python pre_vis.py)
