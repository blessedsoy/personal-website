export default function(state = [], action){
  // switch (action.type) {
  //   case FETCH_BAR_CHART_DATA:
  //     return [ action.payload, ...state];
  // }
  // return state;

  return [{
    w : 800,
    h : 450,
    margin : {
      top: 60,
      bottom: 80,
      left: 100,
      right: 80 
    },
    data : [
      {glazed: 3.14, jelly: 4.43, powdered: 2.43, sprinkles: 3.86, age: 18, responses: 7},
      {glazed: 3.00, jelly: 3.67, powdered: 2.67, sprinkles: 4.00, age: 19, responses: 3},
      {glazed: 2.00, jelly: 4.00, powdered: 2.33, sprinkles: 4.33, age: 20, responses: 3},
      {glazed: 3.50, jelly: 4.50, powdered: 1.00, sprinkles: 3.50, age: 21, responses: 2},
      {glazed: 2.83, jelly: 3.50, powdered: 1.83, sprinkles: 4.50, age: 22, responses: 6},
      {glazed: 3.25, jelly: 4.75, powdered: 2.25, sprinkles: 3.50, age: 23, responses: 4},
      {glazed: 1.50, jelly: 4.00, powdered: 2.50, sprinkles: 4.00, age: 25, responses: 2},
      {glazed: 1.67, jelly: 3.00, powdered: 1.33, sprinkles: 4.00, age: 26, responses: 3},
      {glazed: 2.50, jelly: 4.00, powdered: 1.00, sprinkles: 4.50, age: 27, responses: 2},
      {glazed: 3.00, jelly: 4.33, powdered: 1.33, sprinkles: 4.33, age: 28, responses: 3},
      {glazed: 5.00, jelly: 4.00, powdered: 1.00, sprinkles: 4.00, age: 29, responses: 1},
      {glazed: 5.00, jelly: 5.00, powdered: 2.00, sprinkles: 5.00, age: 30, responses: 1},
      {glazed: 1.50, jelly: 4.50, powdered: 3.00, sprinkles: 4.75, age: 31, responses: 4},
      {glazed: 3.67, jelly: 3.33, powdered: 1.67, sprinkles: 4.67, age: 32, responses: 3},
      {glazed: 2.00, jelly: 4.50, powdered: 1.00, sprinkles: 5.00, age: 33, responses: 2},
      {glazed: 2.75, jelly: 3.75, powdered: 2.50, sprinkles: 4.50, age: 34, responses: 4},
      {glazed: 4.00, jelly: 3.00, powdered: 2.75, sprinkles: 4.25, age: 35, responses: 4},
      {glazed: 1.50, jelly: 3.00, powdered: 4.00, sprinkles: 4.00, age: 36, responses: 2},
      {glazed: 3.00, jelly: 3.00, powdered: 3.50, sprinkles: 4.00, age: 37, responses: 2},
      {glazed: 4.00, jelly: 2.00, powdered: 3.33, sprinkles: 4.67, age: 39, responses: 3},
      {glazed: 3.50, jelly: 3.00, powdered: 4.00, sprinkles: 4.50, age: 40, responses: 2},
      {glazed: 2.75, jelly: 2.75, powdered: 4.00, sprinkles: 4.25, age: 41, responses: 4},
      {glazed: 2.25, jelly: 2.50, powdered: 1.75, sprinkles: 4.25, age: 42, responses: 4},
      {glazed: 1.00, jelly: 2.00, powdered: 1.00, sprinkles: 5.00, age: 43, responses: 1},
      {glazed: 2.00, jelly: 3.00, powdered: 3.67, sprinkles: 3.33, age: 44, responses: 3},
      {glazed: 3.33, jelly: 2.33, powdered: 3.33, sprinkles: 3.33, age: 46, responses: 3},
      {glazed: 2.25, jelly: 4.00, powdered: 2.75, sprinkles: 3.00, age: 47, responses: 4},
      {glazed: 3.75, jelly: 2.00, powdered: 3.00, sprinkles: 2.75, age: 48, responses: 4},
      {glazed: 2.75, jelly: 2.00, powdered: 3.75, sprinkles: 3.25, age: 49, responses: 4},
      {glazed: 2.67, jelly: 2.67, powdered: 1.67, sprinkles: 3.67, age: 51, responses: 3},
      {glazed: 2.50, jelly: 2.50, powdered: 4.00, sprinkles: 3.00, age: 52, responses: 2},
      {glazed: 3.00, jelly: 3.67, powdered: 4.67, sprinkles: 2.67, age: 53, responses: 3},
      {glazed: 5.00, jelly: 5.00, powdered: 5.00, sprinkles: 3.50, age: 54, responses: 2},
      {glazed: 2.33, jelly: 1.67, powdered: 2.33, sprinkles: 3.33, age: 55, responses: 3},
      {glazed: 3.00, jelly: 2.00, powdered: 3.00, sprinkles: 3.00, age: 56, responses: 1},
      {glazed: 2.00, jelly: 2.00, powdered: 2.00, sprinkles: 4.00, age: 57, responses: 1},
      {glazed: 1.25, jelly: 2.00, powdered: 3.00, sprinkles: 1.75, age: 59, responses: 4},
      {glazed: 2.50, jelly: 2.50, powdered: 4.00, sprinkles: 2.50, age: 60, responses: 2},
      {glazed: 2.33, jelly: 2.33, powdered: 2.67, sprinkles: 3.00, age: 61, responses: 3},
      {glazed: 2.25, jelly: 2.50, powdered: 3.75, sprinkles: 3.00, age: 62, responses: 4},
      {glazed: 1.50, jelly: 3.00, powdered: 3.00, sprinkles: 2.00, age: 63, responses: 2},
      {glazed: 2.00, jelly: 3.00, powdered: 3.40, sprinkles: 2.40, age: 64, responses: 5},
      {glazed: 2.00, jelly: 1.00, powdered: 4.50, sprinkles: 2.00, age: 65, responses: 2},
      {glazed: 2.00, jelly: 1.67, powdered: 4.00, sprinkles: 1.67, age: 66, responses: 3},
      {glazed: 1.50, jelly: 1.75, powdered: 3.75, sprinkles: 2.25, age: 67, responses: 4},
      {glazed: 2.00, jelly: 2.50, powdered: 4.25, sprinkles: 2.00, age: 68, responses: 4},
      {glazed: 3.00, jelly: 2.00, powdered: 3.00, sprinkles: 3.00, age: 70, responses: 1},
      {glazed: 2.33, jelly: 2.67, powdered: 4.33, sprinkles: 2.33, age: 71, responses: 3},
      {glazed: 3.00, jelly: 2.50, powdered: 3.75, sprinkles: 2.00, age: 72, responses: 4},
      {glazed: 2.00, jelly: 2.50, powdered: 4.50, sprinkles: 2.50, age: 73, responses: 2},
      {glazed: 3.00, jelly: 2.00, powdered: 4.00, sprinkles: 1.50, age: 74, responses: 2}
    ]
  }];
}



