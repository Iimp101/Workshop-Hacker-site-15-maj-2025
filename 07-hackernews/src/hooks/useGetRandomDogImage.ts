import { RandomDogImage } from "../services/DogAPI.types";
import { useMemo } from "react";
import useGetData from "./useGetData";

const useGetRandomDogImage = (breed?: string) => {
	
	const url = useMemo(() => {
		if (!breed) {
			return "https://dog.ceo/api/breeds/image/random"
		}
		return `https://dog.ceo/api/breed/${breed}/images/random`
	}, [breed]);
	return useGetData<RandomDogImage>(url);
}

export default useGetRandomDogImage;
