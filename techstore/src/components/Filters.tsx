interface FiltersProps {
  search: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function Filters({
  search,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: FiltersProps) {
  return (
    <section className="filters" aria-label="Filtros del catálogo">
      <label>
        Buscar
        <input
          type="search"
          value={search}
          placeholder="Ejemplo: teclado"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        Categoría
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="Todos">Todos</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}