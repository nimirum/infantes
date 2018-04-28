.PHONY: dev-frontend
.PHONY: prod-frontend

.PHONY: start-frontend-dev
.PHONY: build-frontend
.PHONY: install-frontend

dev-frontend:
	(make compile-data &&  make start-frontend-dev)

prod-frontend:
	(make install-frontend && make build-frontend)

start-frontend-dev:
	(cd ./frontend && ./node_modules/webpack-dev-server/bin/webpack-dev-server.js)

build-frontend:
	(cd ./frontend && ./node_modules/webpack-cli/bin/webpack.js --config ./webpack.config.js)

install-frontend:
	(cd ./frontend && npm install)

compile-data:
	(cd ./wrangling && python pre_vis.py)
