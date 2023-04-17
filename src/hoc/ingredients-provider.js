import {createContext, useCallback, useMemo, useState} from "react";

export const IngredientsContext = createContext(null);

export const IngredientsProvider = ({ children }) => {
  const [pickedIngredients, setPickedIngredients] = useState({
    bun: null,
    options: [],
  });
  const [bunCount, setBunCount] = useState({});
  const [sauceCount, setSauceCount] = useState({});
  const [mainCount, setMainCount] = useState({});

  const pickBun = useCallback((bun) => {
    setPickedIngredients(prev => ({...prev, bun: bun}))
  }, []);

  const pickOption = useCallback((item) => {
    setPickedIngredients(prev => ({...prev, options: [...prev.options, item]}))
  }, []);

  const addToOrder = useCallback((id, type, ingredient) => {
    if (type === 'bun') {
      pickBun(ingredient)
      setBunCount(() => {
        const newCnt = {}
        newCnt[id] = 1
        return newCnt
      });
    } else if (type === 'main') {
      pickOption(ingredient)
      setMainCount({...mainCount, [id]: mainCount[id]? mainCount[id] + 1 : 1});
    } else if (type === 'sauce') {
      pickOption(ingredient)
      setSauceCount({...sauceCount, [id]: sauceCount[id]? sauceCount[id] + 1 : 1});
    }
  }, [mainCount, pickBun, pickOption, sauceCount])

  const deleteOption = useCallback((index, id) => {
    setPickedIngredients({...pickedIngredients,
      options: [...pickedIngredients.options.slice(0, index),
        ...pickedIngredients.options.slice(index + 1)]})
    setMainCount((prev) => {
      const newCnt = {...prev}
      newCnt[id] = prev[id]? prev[id] - 1 : 0
      return newCnt
    })
    setSauceCount((prev) => {
      const newCnt = {...prev}
      newCnt[id] = prev[id]? prev[id] - 1 : 0
      return newCnt
    })
  },[pickedIngredients])

  const value = useMemo(() => ({
      pickedIngredients, bunCount, sauceCount, mainCount, addToOrder, deleteOption
    }),
    [pickedIngredients, bunCount, sauceCount, mainCount, addToOrder, deleteOption]
  )


  return <IngredientsContext.Provider value={value}>{children}</IngredientsContext.Provider>
}