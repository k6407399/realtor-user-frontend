export const filterProperties = (properties, filters) => {
  const { propertyType, location, priceRange } = filters;

  return properties.filter((property) => {
    const matchesType =
      !propertyType || property.type.toLowerCase() === propertyType.toLowerCase();

    const matchesLocation =
      !location ||
      property.location.toLowerCase().includes(location.toLowerCase());

    const matchesPrice =
      !priceRange ||
      (priceRange === "<500000" && property.totalPrice < 500000) ||
      (priceRange === "500001-1000000" &&
        property.totalPrice >= 500001 &&
        property.totalPrice <= 1000000) ||
      (priceRange === "1000001-5000000" &&
        property.totalPrice >= 1000001 &&
        property.totalPrice <= 5000000) ||
      (priceRange === ">5000000" && property.totalPrice > 5000000);

    return matchesType && matchesLocation && matchesPrice;
  });
};
