defmodule Bookshelf.AuthorBook do
  alias Bookshelf.{Author, Book}
  use Ecto.Schema
  import Ecto.Changeset

  schema "author_books" do
    belongs_to :author, Author, on_replace: :delete
    belongs_to :book, Book, on_replace: :delete
  end

  def changeset(author_book, attrs \\ %{}) do
    author_book
    |> cast(attrs, [:author_id, :book_id])
  end
end
