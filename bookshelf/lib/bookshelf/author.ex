defmodule Bookshelf.Author do
  import Ecto.Query, warn: false
  alias Bookshelf.{AuthorBook, Book, Repo}
  use Ecto.Schema
  import Ecto.Changeset

  schema "authors" do
    field(:name, :string)
    field(:surname, :string)
    many_to_many(:books, Book, join_through: "author_books", on_replace: :delete)
  end

  @preload_list [:books]

  def changeset(author, attrs) do
    author
    |> cast(attrs, [:name, :surname])
    |> validate_required([:name, :surname])
    |> put_assoc_custom(attrs, :books, Book)
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
    Repo.transaction(fn ->
      Repo.delete_all(from(ab in AuthorBook, where: ab.author_id == ^author.id))
      Repo.delete(author)
    end)
  end

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

  def preload_list, do: @preload_list
end
