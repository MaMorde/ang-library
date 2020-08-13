defmodule Bookshelf.Repo.Migrations.CreateAuthorBooksTable do
  use Ecto.Migration

  def change do
    create table(:author_books) do
      add :author_id, references(:authors)
      add :book_id, references(:books)
    end

    create unique_index(:author_books, [:author_id, :book_id])
  end
end
