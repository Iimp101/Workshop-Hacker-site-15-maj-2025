import { useEffect, useState } from 'react'
import { RandomDogImage } from '../services/DogAPI.types';
import axios from 'axios';

const useGetRandomDogImage = (url: string | null = null) => {
    const [data, setData] = useState<RandomDogImage | null>(null);
    const [isLoading, setIsLoading] = useState(false);
	// 🦴
	const getData = async (resource: string) => {
        setData(null);
        setIsLoading(true);
		// get data from api
		const res = await axios.get<RandomDogImage>(resource);
		await new Promise(r => setTimeout(r, 1500));

		// update state with data
		setData(res.data);
        setIsLoading(false);
	}

	useEffect(() => {
        if (!url) return;
		getData(url);
	}, [url]);

    return {
        data,
        isLoading,
    }
}

export default useGetRandomDogImage
