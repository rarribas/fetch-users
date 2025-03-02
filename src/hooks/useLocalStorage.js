export function useLocalStorage(key){
  const setItem = (value) => {
    // Some browser does not support local storage or maybe
    // there is not enough space available
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    }catch (e) {
      console.error(e);
    }
  }

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if(item) return JSON.parse(item);
    }catch (e) {
      console.error(e);
    }
  }

  return {
    setItem,
    getItem,
  }
}