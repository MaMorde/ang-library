defmodule BookshelfWeb.BookController do
  use BookshelfWeb, :controller

  def index(conn, _) do
    books = Bookshelf.Book.list_books()
    render(conn, "index.json", books: books)
  end

  def show(conn, %{"id" => id}) do
    book = Bookshelf.Book.get_book(id)
    render(conn, "show.json", book: book)
  end

  def update(conn, %{"id" => id} = params) do
    book = Bookshelf.Book.get_book(id)
    {:ok, book} = Bookshelf.Book.update_book(book, params)
    render(conn, "show.json", book: book)
  end

  def create(conn, params) do
    {:ok, book} = Bookshelf.Book.create_book(params)
    render(conn, "show.json", book: book)
  end

  def delete(conn, %{"id" => id}) do
    book = Bookshelf.Book.get_book(id)
    Bookshelf.Book.delete_book(book)
    books = Bookshelf.Book.list_books()
    render(conn, "index.json", books: books)
  end
end
