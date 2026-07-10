import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const [userId, setUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.id || null;
  });

  const getKey = (id) => `wishlist_${id || "guest"}`;

  // Reload wishlist whenever the active user changes (login/logout/signup)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(getKey(userId)) || "[]");
    setWishlist(stored);
  }, [userId]);

  // Call this after login/signup succeeds, and after logout (pass null)
  const setActiveUser = (id) => {
    setUserId(id || null);
  };

  const save = (items) => {
    localStorage.setItem(getKey(userId), JSON.stringify(items));
    setWishlist(items);
  };

  const addToWishlist = (product) => {
    const exists = wishlist.some((i) => i.id === product.id);
    if (exists) return;
    save([...wishlist, product]);
  };

  const removeFromWishlist = (id) => {
    save(wishlist.filter((i) => i.id !== id));
  };

  const clearWishlist = () => {
    save([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        setActiveUser,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);