.PHONY: start deps migrate server

start: deps migrate server

deps:
	mix deps.get

migrate:
	mix ecto.migrate

server:
	iex -S mix phx.server
