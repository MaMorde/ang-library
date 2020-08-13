defmodule BookshelfWeb.AuthorView do
  alias Bookshelf.AuthorView
  alias BookshelfWeb.AuthorBookView
  use BookshelfWeb, :view

  def render("index.json", %{author: author}) do
    render_many(author, AuthorView, "author.json")
  end

  def render("show.json", %{author: author}) do
    render_one(author, AuthorView, "author.json")
  end

  def render("author.json", %{author: author}) do
    %{
      id: author.id,
      name: author.name,
      surname: author.surname,
      author_books: render_many(author.author_books, AuthorBookView, "show.json")
    }
  end

  def render("author_book_author.json", %{author: author}) do
    %{id: author.id, name: author.name, surname: author.surname}
  end
end
