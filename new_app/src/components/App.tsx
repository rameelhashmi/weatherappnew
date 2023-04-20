import React from 'react';
import CityWeatherCard from './CityWeatherCard';
import DefaultCityCard from './DefaultCityCard';
import store from '../reduxContainer/store';
import { Provider } from 'react-redux';

interface AppProps {
    initialData: { appName: string };
}

function App({ initialData }: AppProps) {
    return (
        <Provider store={store}>
        <div>
            <h1>{initialData.appName}</h1>
            <div>
                <CityWeatherCard />

            </div>
            <div>
                <DefaultCityCard cityName="Munich" />
            </div>
        </div>
        </Provider>

    );
}

export default App;
