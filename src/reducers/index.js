import { combineReducers } from 'redux';
import BarChartReducer from './reducer_bar_chart'
import CircleChartReducer from './reducer_circle_chart'
import NycDeathChartReducer from './reducer_nyc_death_chart'

const rootReducer = combineReducers({
  // state: (state = {}) => state
  barChartData: BarChartReducer,
  circleChartData: CircleChartReducer,
  // nycDeathChartData: NycDeathChartReducer
});

export default rootReducer;
