import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const { data, isLoading } = useGetRandomDogImage();

	return (
		<>
			<h1>A random doggo 🐶</h1>

			{isLoading && <p>Fetching doggos 🐶...</p>}

			{data && data.status === "success" && (
				<div>
					<Image src={data.message} alt="A random doggo" fluid />
				</div>
			)}
		</>
	)
}

export default RandomDogPage;
