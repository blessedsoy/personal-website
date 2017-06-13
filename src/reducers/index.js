import { combineReducers } from 'redux';
import BarChartReducer from './reducer_bar_chart'
import CircleChartReducer from './reducer_circle_chart'
const rootReducer = combineReducers({
  // state: (state = {}) => state
  barChartData: BarChartReducer,
  circleChartData: CircleChartReducer
});

export default rootReducer;
