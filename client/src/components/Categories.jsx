export default function Categories({
  items = [],
  active = "all",
  onCategoryClick,
}) {
  const renderChipClass = (category) => {
    const isActive = category === active;
    const dynamicClasses = isActive
      ? `bg-[var(--tg-theme-secondary-bg-color)] text-[--tg-theme-button-color]`
      : `bg-[var(--tg-theme-secondary-bg-color)] text-[--tg-theme-text-color]`;

    return `first-letter:uppercase p-2 px-4 rounded-full font-medium text-xs ${dynamicClasses}`;
  };

  return (
    <section className="flex flex-nowrap overflow-x-auto gap-2 items-center z-10 whitespace-nowrap sticky top-0 bg-[var(--tg-theme-bg-color)] pt-2">
      {items.map((category) => (
        <button
          className={renderChipClass(category)}
          key={category}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}
