import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const RandomDogPage = () => {
    const [url, setUrl] = useState<string | null>("https://dog.ceo/api/breeds/image/random");
	const { data, isLoading } = useGetRandomDogImage(url);

	return (
		<>
			<h1>A random doggo 🐶</h1>

            <div className="mb-3">
                <Button className="mb-3" onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}>
                    Random Doggo
                </Button>
                <Button className="mb-3" onClick={() => setUrl("https://dog.ceo/api/breeds/shiba/images/random")}>
                    Random Shiba doggo
                </Button>
            </div>
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
