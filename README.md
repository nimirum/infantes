# Infantes

A munincipality-level birth rate visualization for Interactive Data Visualization course, University of Helsinki, Spring term 2018.


## Project folder structure

* `data_raw` contains raw data
* `data_processed` contains wrangled data (the one frontend will use)
* `wrangling` contains the python scripts that transform raw data to processed data
* `frontend` contains the visualization display logic

## Data
The statistics on births contain all the children whose mother was permanently resident in Finland at the time of their birth.
http://www.tilastokeskus.fi/til/synt/


## Frontend development

The frontend is a JS app. To get up and running:

1. `make install-frontend` installs all frontend dependencies
2. `make dev-frontend` runs webpack-dev-server (point your browser to http://localhost:8080 to view frontend)


#### Deployment
`make build-frontend`
