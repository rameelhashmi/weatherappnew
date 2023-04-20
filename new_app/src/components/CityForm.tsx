import React, { useState, useCallback, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setCityName } from "../reduxContainer/cityNameAction";
import { CityState } from "../reduxContainer/cityNameReducer";

const API_KEY = "c3d0d15a5dd30e3f9e694468f8dfaf03";

interface CityFormProps {
  onSubmit: (data: any) => void;
}

function CityForm(props: CityFormProps) {
  const [city, setCity] = useState<string>("");
  const dispatch = useDispatch();
  const cityName = useSelector((state: { city: CityState }) => state.city.cityName);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    dispatch(setCityName(""));
    const data = await response.json();
    props.onSubmit(data);
  };

  const handleCityNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCityName(event.target.value));
    setCity(event.target.value);
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField type="text" value={cityName} onChange={handleCityNameChange} placeholder="Enter a City"/>
      </form>
    </div>
  );
}

export default CityForm;
