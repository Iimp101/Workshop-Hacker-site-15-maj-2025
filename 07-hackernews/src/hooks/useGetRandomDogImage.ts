import { RandomDogImage } from "../services/DogAPI.types";
import useGetData from "./useGetData";

const useGetRandomDogImage = (url: string | null = null) => {
	return useGetData<RandomDogImage>(url);
}

export default useGetRandomDogImage;
