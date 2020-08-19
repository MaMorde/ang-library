defmodule Bookshelf.Book do
  import Ecto.Query, warn: false
  use Ecto.Schema
  import Ecto.Changeset
  alias Bookshelf.{Author, Repo}

  @preload_list [:authors]

  schema "books" do
    field(:name, :string)
    field(:genre, :string)
    many_to_many(:authors, Author, join_through: "author_books", on_replace: :delete)
  end

  def changeset(book, attrs) do
    book
    |> cast(attrs, [:name, :genre])
    |> validate_required([:name, :genre])
    |> put_assoc_custom(attrs, :authors, Author)
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

  defp put_assoc_custom(changeset, attrs, assoc_atom, assoc_module) do
    attrs_assoc = attrs[to_string(assoc_atom)] || attrs[assoc_atom]
    put_assoc_by_attrs(changeset, attrs_assoc, assoc_atom, assoc_module)
  end

  defp put_assoc_by_attrs(changeset, [], assoc_atom, _), do: put_assoc(changeset, assoc_atom, [])
  defp put_assoc_by_attrs(changeset, nil, _, _), do: changeset

  defp put_assoc_by_attrs(changeset, attrs_assoc, assoc_atom, assoc_module) do
    all_assoc = attrs_assoc

    {with_ids, without_ids} =
      Enum.split_with(all_assoc, fn assoc ->
        Map.has_key?(assoc, :id) or Map.has_key?(assoc, "id")
      end)

    existed_ids = Enum.map(with_ids, &(Map.get(&1, :id) || Map.get(&1, "id")))
    existed_assoc_query = from(c in assoc_module, where: c.id in ^existed_ids)

    existed_assoc = existed_assoc_query |> Repo.all() |> Repo.preload(assoc_module.preload_list())

    existed_assoc_changesets =
      Enum.map(existed_assoc, fn assoc ->
        assoc_attrs =
          Enum.find(
            with_ids,
            &(Map.get(&1, :id) == assoc.id or Map.get(&1, "id") == assoc.id)
          )

        assoc_module.changeset(assoc, assoc_attrs)
      end)

    without_ids = Enum.map(without_ids, &assoc_module.changeset(assoc_module.__struct__, &1))

    all_assoc = Enum.concat(existed_assoc_changesets, without_ids)

    put_assoc(changeset, assoc_atom, all_assoc)
  end
end
