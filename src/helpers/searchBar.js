export const filterItems = (searchValue, items) => {
    const filtered = items.filter((item) =>
        item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    return filtered;
}