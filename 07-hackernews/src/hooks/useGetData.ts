import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useGetData = <T>(url: string | null = null) => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// 🦴
	const getData = useCallback(async (resource: string) => {
		// reset state
		setData(null);
		setError(null);
		setIsLoading(true);

		// get data from api
		try {
			const res = await axios.get<T>(resource);
			await new Promise(r => setTimeout(r, 1500));

			// update state with data
			setData(res.data);
		} catch (err) {
			console.error("useGetData threw an error:", err);
			setError(err instanceof Error ? err.message : "Something that was not an Error caused an error");
		}

		setIsLoading(false);
	}, []);

	const refetch = useCallback(() => {
		if (!url) {
			return;
		}

		getData(url);
	}, [getData, url]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		data,
		error,
		isError: error !== null,
		isLoading,
		refetch,
	}
}

export default useGetData;
