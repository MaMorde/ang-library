defmodule Bookshelf.Repo.Migrations.CreateBooksTable do
  use Ecto.Migration

  def change do
    create table(:books) do
      add :name, :string
      add :genre, :string
    end
  end
end
