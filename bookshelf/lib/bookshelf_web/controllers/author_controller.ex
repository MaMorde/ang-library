defmodule BookshelfWeb.AuthorController do
  use BookshelfWeb, :controller

  def index(conn, _) do
    authors = Bookshelf.Author.list_authors()
    render(conn, "index.json", authors: authors)
  end

  def show(conn, %{"id" => id}) do
    author = Bookshelf.Author.get_author(id)
    render(conn, "show.json", author: author)
  end

  def update(conn, %{"id" => id} = params) do
    author = Bookshelf.Author.get_author(id)
    {:ok, author} = Bookshelf.Author.update_author(author, params)
    render(conn, "show.json", author: author)
  end

  def create(conn, params) do
    {:ok, author} = Bookshelf.Author.create_author(params)
    render(conn, "show.json", author: author)
  end

  def delete(conn, %{"id" => id}) do
    author = Bookshelf.Author.get_author(id)
    Bookshelf.Author.delete_author(author)
    authors = Bookshelf.Author.list_authors()
    render(conn, "index.json", authors: authors)
  end
end
