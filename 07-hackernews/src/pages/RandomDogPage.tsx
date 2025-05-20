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

                <Button className="ms-1" onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}>
                    Random Doggo
                </Button>

                <Button className="ms-1" onClick={() => setUrl("https://dog.ceo/api/breeds/shiba/images/random")}>
                    Random Shiba fluffer
                </Button>

                <Button
					className="ms-1"
					onClick={() => {}}>
                        MOAR doggos 🐶❤️!!
                </Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => {}}>
                        Make things go 💣
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
