import React from "react";

export function useHistory(sideEffect) {
  const [history, setHistory] = React.useState([]);

  function addToHistory({ role, parts }) {
    setHistory((history) => [...history, { role, parts }]);
  }

  function resetHistory() {
    setHistory([]);
  }

  React.useEffect(() => {
    sideEffect();
  }, [history]);

  return { history, addToHistory, resetHistory };
}
