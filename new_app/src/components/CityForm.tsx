import React, { useState, FormEvent } from 'react';
import TextField from '@mui/material/TextField';

interface CityFormProps {
    onSubmit: (data: any) => void;
}

function CityForm(props: CityFormProps) {
    const [city, setCity] = useState<string>('');
    const API_KEY = 'c3d0d15a5dd30e3f9e694468f8dfaf03';

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        setCity('');
        const data = await response.json();
        props.onSubmit(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter a City" />
            </form>
        </div>
    );
}

export default CityForm;
