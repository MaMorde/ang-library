defmodule Bookshelf.Book do
  use Ecto.Schema
  import Ecto.Changeset
  alias Bookshelf.{AuthorBook, Repo}

  @preload_list [author_books: [:author, :book]]

  schema "books" do
    field :name, :string
    field :genre, :string
    has_many :author_books, AuthorBook, on_replace: :delete, on_delete: :delete_all
  end

  def changeset(book, attrs) do
    book
    |> cast(attrs, [:name, :genre])
    |> validate_required([:name, :genre])
    |> cast_assoc(:author_books)
  end

  def list_books do
    __MODULE__
    |> Repo.all()
    |> Repo.preload(@preload_list)
  end

  def get_book(id) do
    __MODULE__
    |> Repo.get(id)
    |> Repo.preload(@preload_list)
  end

  def update_book(book, params) do
    book = Repo.preload(book, @preload_list)
    changeset = __MODULE__.changeset(book, params)
    Repo.update(changeset)
  end

  def create_book(params) do
    changeset = __MODULE__.changeset(%Bookshelf.Book{}, params)

    changeset
    |> Repo.insert()
  end

  def delete_book(book) do
    Repo.delete(book)
  end
end
