defmodule Bookshelf.Book do
  import Ecto.Query, warn: false
  use Ecto.Schema
  import Ecto.Changeset
  alias Bookshelf.{Author, Repo}

  @preload_list [:author]

  schema "books" do
    field(:name, :string)
    field(:genre, :string)
    belongs_to(:author, Author)
  end

  def changeset(book, attrs) do
    book
    |> cast(attrs, [:name, :genre, :author_id])
    |> validate_required([:name, :genre])
    |> cast_assoc(:author)
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
    update_book = Repo.update(changeset)

    case update_book do
      {:ok, book} -> {:ok, Repo.preload(book, @preload_list)}
      error -> error
    end
  end

  def create_book(params) do
    changeset = __MODULE__.changeset(%Bookshelf.Book{}, params)

    create_book =
      changeset
      |> Repo.insert()

    case create_book do
      {:ok, book} -> {:ok, Repo.preload(book, @preload_list)}
      error -> error
    end
  end

  def delete_book(book) do
    Repo.delete(book)
  end

  def preload_list, do: @preload_list
end
