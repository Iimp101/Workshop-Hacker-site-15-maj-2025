import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const [breed, setBreed] = useState<string | null>("https://dog.ceo/api/breeds/image/random");
	const { data, error, isError, isLoading, refetch } = useGetRandomDogImage(breed ?? undefined);

	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => setBreed(null)}
				>Random doggo</Button>

				<Button
					className="ms-1"
					onClick={() => setBreed("shiba")}
				>Random Shiba fluffer</Button>

				<Button
					className="ms-1"
					onClick={() => refetch()}
				>MOAR doggos 🐶❤️!!</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => setBreed("mountain/bernese")}
				>Make things go 💣</Button>

				<Button
					className="ms-1"
					variant="danger"
					onClick={() => setBreed("lolcat")}
				>Break stuff ⛓️‍💥</Button>
			</div>

			{isError && (
				<Alert variant="warning">
					<Alert.Heading>Error</Alert.Heading>
					{error}
				</Alert>
			)}

			{isLoading && <p>Fetching doggo 🐶...</p>}

			{data && data.status === "success" && (
				<div>
					<Image src={data.message} alt="A random doggo" fluid />
				</div>
			)}
		</>
	)
}

export default RandomDogPage;
