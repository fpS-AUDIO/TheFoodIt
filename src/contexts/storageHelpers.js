const inMemoryStorage = {};

// Returns boolean by checking if local storage is available
function isLocalStorageAvailable() {
  try {
    const testKey = "localStorageTest";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

function setLocalStorageItem(key, value, errorHandler) {
  /*
    In this project:
    - errorHandler should be dispatch function of useReducer which accepts object with 'type' and 'payload'
    - "CLEAR_ERROR_MESSAGE" is the case of reducer to remove error
    - "SET_ERROR_MESSAGE" is the case of reducer to add error 
  */

  try {
    if (errorHandler) errorHandler({ type: "CLEAR_ERROR_MESSAGE" });
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      console.error("Local storage is full.");
      if (errorHandler) {
        errorHandler({
          type: "SET_ERROR_MESSAGE",
          payload: "Local storage is full.",
        });
      }
    } else {
      console.error("Error setting local storage:", e);
      if (errorHandler) {
        errorHandler({
          type: "SET_ERROR_MESSAGE",
          payload: `Error setting local storage: ${e.message}`,
        });
      }
    }
  }
}

function setStorageItem(key, value, errorHandler) {
  if (isLocalStorageAvailable()) {
    setLocalStorageItem(key, value, errorHandler);
  } else {
    inMemoryStorage[key] = value;
  }
}

function getLocalStorageItem(key, errorHandler) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error("Error getting local storage item:", e);
    if (errorHandler) {
      errorHandler({
        type: "SET_ERROR_MESSAGE",
        payload: `Error getting local storage item: ${e.message}`,
      });
    }
    return null;
  }
}

function getStorageItem(key, errorHandler) {
  if (isLocalStorageAvailable()) {
    return getLocalStorageItem(key, errorHandler);
  } else {
    return inMemoryStorage[key] || null;
  }
}

function removeStorageItem(key, errorHandler) {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing local storage item:", e);
      if (errorHandler) {
        errorHandler({
          type: "SET_ERROR_MESSAGE",
          payload: `Error removing local storage item: ${e.message}`,
        });
      }
    }
  } else {
    delete inMemoryStorage[key];
  }
}

export {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  isLocalStorageAvailable,
};
