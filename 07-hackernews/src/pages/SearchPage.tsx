import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
import { HN_SearchResponse } from "../services/HacknewsAPI.types";
import { searchByDate } from "../services/HackerNewsAPI";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [page, setPage] = useState(0);
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const inputSearchEl = useRef<HTMLInputElement>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	// get "query=" from URL
	const searchParamsQuery = searchParams.get("query");  // search?query=tesla

	console.log("searchParamsQuery", searchParamsQuery);

	const searchHackerNews = async (searchQuery: string, searchPage: number) => {
		console.log(`Searching for "${searchQuery}" and page ${searchPage}`);

		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setSearchResult(null);

		try {
			const data = await searchByDate(searchQuery, searchPage);

			// update state with search result
			setSearchResult(data);

		} catch (err) {
			// handle any errors
			console.error(`Error thrown when searching for "${searchQuery}":`, err);
			setError(err instanceof Error
				? err.message
				: "Aouch, stop throwing things that are not Errors at me"
			);
		}

		// set loading to false
		setIsLoading(false);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// 🧹
		const trimmedSearchInput = inputSearch.trim();

		// prevent smol searches
		if (trimmedSearchInput.length < 2) {
			alert("Too short search query!");
			return;
		}

		// search for haxx0rs 🕵🏻‍♂️
		setPage(0);

		// save searchQuery to URLSearchParams
		setSearchParams({ query: trimmedSearchInput });
	}

	useEffect(() => {
		if (!searchParamsQuery) {
			setSearchResult(null);
			return;
		}

		setInputSearch(searchParamsQuery);
		searchHackerNews(searchParamsQuery, page);
	}, [searchParamsQuery, page]);

	useEffect(() => {
		if (!inputSearchEl.current) {
			return;
		}

		// 👀
		inputSearchEl.current.focus();
	}, []);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						type="text"
						value={inputSearch}
						ref={inputSearchEl}
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						disabled={inputSearch.trim().length < 2}
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>
			</Form>

			{error && <Alert variant="warning">{error}</Alert>}

			{isLoading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for "{searchParamsQuery}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} key={hit.objectID}>
								<h2 className="h4">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						hasPreviousPage={searchResult.page > 0}
						hasNextPage={searchResult.page + 1 < searchResult.nbPages}
						onPreviousPage={() => setPage(prevValue => prevValue - 1)}
						onNextPage={() => setPage(prevValue => prevValue + 1)}
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
					/>
				</div>
			)}
		</>
	);
};

export default SearchPage;
