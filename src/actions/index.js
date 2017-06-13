export const FETCH_BAR_CHART_DATA = "FETCH_BAR_CHART_DATA"

export function fetchBarChartData() {
  const request = {
    data : [
      {key: "Glazed",   value: 132},
      {key: "Jelly",    value: 71},
      {key: "Holes",    value: 337},
      {key: "Sprinkles",  value: 93},
      {key: "Crumb",    value: 78},
      {key: "Chocolate",  value: 43},
      {key: "Coconut",  value: 20},
      {key: "Cream",    value: 16},
      {key: "Cruller",  value: 30},
      {key: "Éclair",   value: 8},
      {key: "Fritter",  value: 17},
      {key: "Bearclaw",   value: 21}
    ],
    w : 800,
    h : 450,
    margin : {
      top: 40,
      bottom: 40,
      left: 60,
      right: 40
    },
    width : w - margin.left - margin.right,
    height : h - margin.top - margin.bottom,
    translate : `translate(${margin.left},${margin.top})`
  };

  return {
    type: FETCH_BAR_CHART_DATA,
    payload: request
  };
}