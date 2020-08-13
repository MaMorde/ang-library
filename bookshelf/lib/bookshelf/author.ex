defmodule Bookshelf.Author do
  alias Bookshelf.{AuthorBook, Repo}
  use Ecto.Schema
  import Ecto.Changeset

  schema "authors" do
    field :name, :string
    field :surname, :string
    has_many :author_books, AuthorBook, on_replace: :delete, on_delete: :delete_all
  end

  @preload_list [author_books: [:author, :book]]

  def changeset(author, attrs) do
    author
    |> cast(attrs, [:name, :surname])
    |> validate_required([:name, :surname])
    |> cast_assoc(:author_books)
  end

  def list_authors do
    __MODULE__ |> Repo.all() |> Repo.preload(@preload_list)
  end

  def get_author(id) do
    __MODULE__ |> Repo.get(id) |> Repo.preload(@preload_list)
  end

  def update_author(author, params) do
    author = Repo.preload(author, @preload_list)
    changeset = __MODULE__.changeset(author, params)
    Repo.update(changeset)
  end

  def create_author(params) do
    changeset = __MODULE__.changeset(%Bookshelf.Author{}, params)
    changeset |> Repo.insert()
  end

  def delete_author(author) do
    Repo.delete(author)
  end
end
