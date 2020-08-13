defmodule BookshelfWeb.BookView do
  alias BookshelfWeb.AuthorBookView
  alias BookshelfWeb.BookView
  use BookshelfWeb, :view

  def render("index.json", %{books: books}) do
    render_many(books, BookView, "book.json")
  end

  def render("show.json", %{books: books}) do
    render_one(books, BookView, "book.json")
  end

  def render("book.json", %{book: book}) do
    %{
      id: book.id,
      name: book.name,
      genre: book.genre,
      author_books: render_many(book.author_books, AuthorBookView, "show.json")
    }
  end

  def render("author_book_book.json", %{book: book}) do
    %{
      id: book.id,
      name: book.name,
      genre: book.genre
    }
  end
end
