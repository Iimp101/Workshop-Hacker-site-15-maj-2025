import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";

const RandomDogPage = () => {
	const [url, setUrl] = useState<string | null>("https://dog.ceo/api/breeds/image/random");
	const { data, error, isError, isLoading, refetch } = useGetRandomDogImage(url);

	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}
				>Random doggo</Button>

				<Button
					className="ms-1"
					onClick={() => setUrl("https://dog.ceo/api/breed/shiba/images/random")}
				>Random Shiba fluffer</Button>

				<Button
					className="ms-1"
					onClick={() => refetch()}
				>MOAR doggos 🐶❤️!!</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => setUrl("https://dog.ceo/api/breed/lolcat/images/random")}
				>Make things go 💣</Button>

				<Button
					className="ms-1"
					variant="danger"
					onClick={() => setUrl("https://oprmtvpnpycdurgmobvmcrd.com")}
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
