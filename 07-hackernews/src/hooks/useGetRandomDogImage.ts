import { useEffect, useState } from 'react'
import { RandomDogImage } from '../services/DogAPI.types';
import axios from 'axios';

const useGetRandomDogImage = () => {
    const [data, setData] = useState<RandomDogImage | null>(null);
    const [isLoading, setIsLoading] = useState(false);
	// 🦴
	const getData = async () => {
        setData(null);
        setIsLoading(true);
		// get data from api
		const res = await axios.get<RandomDogImage>("https://dog.ceo/api/breeds/image/random");
		await new Promise(r => setTimeout(r, 1500));

		// update state with data
		setData(res.data);
        setIsLoading(false);
	}

	useEffect(() => {
		getData();
	}, []);

    return {
        data,
        isLoading,
    }
}

export default useGetRandomDogImage
