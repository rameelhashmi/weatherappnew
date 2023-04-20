export interface CityState {
    cityName: string;
  }
  
  const initialState: CityState = {
    cityName: "",
  };
  
  export const cityReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "SET_CITY_NAME":
        return {
          ...state,
          cityName: action.payload,
        };
      default:
        return state;
    }
  };
  