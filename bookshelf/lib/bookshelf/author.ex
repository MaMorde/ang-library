defmodule Bookshelf.Author do
  import Ecto.Query, warn: false
  alias Bookshelf.{Book, Repo}
  use Ecto.Schema
  import Ecto.Changeset

  schema "authors" do
    field(:name, :string)
    field(:surname, :string)
    has_many(:books, Book, on_replace: :delete, on_delete: :nilify_all)
  end

  @preload_list [:books]

  def changeset(author, attrs) do
    author
    |> cast(attrs, [:name, :surname])
    |> validate_required([:name, :surname])
    |> cast_assoc(:books)
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
    update_author = Repo.update(changeset)

    case update_author do
      {:ok, author} ->
        {:ok, Repo.preload(author, @preload_list)}

      error ->
        error
    end
  end

  def create_author(params) do
    changeset = __MODULE__.changeset(%Bookshelf.Author{}, params)
    create_author = changeset |> Repo.insert()

    case create_author do
      {:ok, author} ->
        {:ok, Repo.preload(author, @preload_list)}

      error ->
        error
    end
  end

  def delete_author(author) do
    Repo.delete(author)
  end

  def preload_list, do: @preload_list
end
