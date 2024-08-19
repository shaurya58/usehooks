import * as React from "react";

export default function useList(defaultList = []) {
  const [list, setList] = React.useState(defaultList);

  const set = React.useCallback((newList) => setList(newList), []);

  const push = React.useCallback((item) => setList([...list, item]), [list]);

  const removeAt = React.useCallback((index) => {
    setList((currentList) => {
      const updatedList = [...currentList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  }, []);

  const insertAt = React.useCallback((index, item) => {
    setList((currentList) => {
      const updatedList = [...currentList];
      updatedList.splice(index, 0, item);
      return updatedList;
    });
  }, []);

  const updateAt = React.useCallback((index, item) => {
    setList((currentList) => {
      const updatedList = [...currentList];
      updatedList.splice(index, 1, item);
      return updatedList;
    });
  }, []);

  const clear = React.useCallback(() => setList([]), []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}
