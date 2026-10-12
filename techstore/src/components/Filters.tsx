interface FiltersProps {
  search: string;
  selectedCategory: string;
  categories: string[];
  sortOrder: string;
  onlyAvailable: boolean;
  showOnlyFavorites: boolean;
  favoritesCount: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
  onOnlyAvailableChange: (value: boolean) => void;
  onShowOnlyFavoritesChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export function Filters({
  search,
  selectedCategory,
  categories,
  sortOrder,
  onlyAvailable,
  showOnlyFavorites,
  favoritesCount,
  onSearchChange,
  onCategoryChange,
  onSortOrderChange,
  onOnlyAvailableChange,
  onShowOnlyFavoritesChange,
  onClearFilters,
}: FiltersProps) {
  return (
    <section className="filters" aria-label="Filtros del catálogo" style={{ display: 'block' }}>
      <div className="filters-main-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px', width: '100%' }}>
        <input
          type="search"
          value={search}
          placeholder="Ejemplo: teclado"
          onChange={(event) => onSearchChange(event.target.value)}
        />
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
        <select
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
        >
          <option value="Orden original">Orden original</option>
          <option value="Precio menor">Precio menor</option>
          <option value="Precio mayor">Precio mayor</option>
        </select>
      </div>

      <div className="filters-toggles-row" style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.85rem', color: '#69738a' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', flexDirection: 'row' }}>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onOnlyAvailableChange(e.target.checked)}
            style={{ width: 'auto', padding: '0', margin: '0' }}
          />
          Solo disponibles
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', flexDirection: 'row' }}>
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={(e) => onShowOnlyFavoritesChange(e.target.checked)}
            style={{ width: 'auto', padding: '0', margin: '0' }}
          />
          Solo Favoritos ({favoritesCount})
        </label>
        <button
          type="button"
          onClick={onClearFilters}
          style={{ marginLeft: 'auto', background: 'none', color: '#3164f4', padding: '0', fontSize: '0.85rem', fontWeight: 'bold' }}
        >
          Limpiar filtros
        </button>
      </div>
    </section>
  );
}