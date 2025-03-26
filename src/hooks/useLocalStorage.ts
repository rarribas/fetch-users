export interface LocalStorageI {
  setItem: <T>(value: T) => void;
  getItem: <T extends object>() => T | undefined;
}

export function useLocalStorage(key:string){
  // Make type generic for flexibiltiy
  const setItem = <T>(value: T) => {
    // Some browser does not support local storage or maybe
    // there is not enough space available
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    }catch (e) {
      console.error(e);
    }
  }

  const getItem = <T extends object>(): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      if(item) return JSON.parse(item);
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }

  return {
    setItem,
    getItem,
  } as LocalStorageI;
}