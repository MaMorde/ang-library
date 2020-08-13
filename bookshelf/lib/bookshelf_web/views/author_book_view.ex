defmodule BookshelfWeb.AuthorBookView do
  use BookshelfWeb, :view
  alias BookshelfWeb.{AuthorView, BookView}

  def render("show.json", %{author_book: author_book}) do
    %{
      id: author_book.id,
      author: render_one(author_book.author, AuthorView, "author_book_author.json"),
      book: render_one(author_book.book, BookView, "author_book_book.json")
    }
  end
end
