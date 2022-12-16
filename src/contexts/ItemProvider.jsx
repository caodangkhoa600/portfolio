import React, { useMemo, useState } from "react";

import { ItemContext } from "./ItemContext";

function ItemProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  const value = useMemo(
    () => ({
      items,
      setItems,
      selectedItem,
      setSelectedItem,
    }),
    [items, selectedItem]
  );

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

export default ItemProvider;
