defmodule BookshelfWeb.AuthorView do
  alias BookshelfWeb.AuthorView
  alias BookshelfWeb.BookView
  use BookshelfWeb, :view

  def render("index.json", %{authors: authors}) do
    render_many(authors, AuthorView, "author.json")
  end

  def render("show.json", %{author: author}) do
    render_one(author, AuthorView, "author.json")
  end

  def render("author.json", %{author: author}) do
    %{
      id: author.id,
      name: author.name,
      surname: author.surname,
      books: render_many(author.books, BookView, "author_book.json")
    }
  end

  def render("book_author.json", %{author: author}) do
    %{id: author.id, name: author.name, surname: author.surname}
  end
end
