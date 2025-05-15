/* eslint-disable no-constant-binary-expression */
import { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { HN_SearchResponse } from "../services/HacknewsAPI.types";
import { searchByDate } from "../services/HackerNewsAPI";
import Pagination from "../components/Pagination";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [pendingPage, setPendingPage] = useState<number | null>(null);
	const queryRef = useRef("");
	const reqRef = useRef(0);

	const searchHackerNews = async (searchQuery: string, page = 0) => {
		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setPendingPage(page);

		// save searchQuery to queryRef
		queryRef.current = searchQuery;

		const requestId = ++reqRef.current;
		
		try {
			const data = await searchByDate(searchQuery, page);

			if (requestId === reqRef.current) {
				// update state with search result
			setSearchResult(data);
			setCurrentPage(page);
			} else {
				console.log("Ignored old answer (race condition stopped!")
			}
		} catch (err) {
			if (requestId === reqRef.current) {
			setError(err instanceof Error ? err.message : "Unknown error");
		}
		}

		// set loading to false
		setIsLoading(false);
		setPendingPage(null);
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
		searchHackerNews(trimmedSearchInput, 0);
	}

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
						required
						autoFocus
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
					<p>Showing {searchResult.nbHits} search results for "{queryRef.current}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} key={hit.objectID}>
								<h2 className="h4">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						currentPage={pendingPage !== null ? pendingPage : currentPage}
						totalPages={Math.min(searchResult.nbPages, 50)}
						onPageChange={(newPage) => {
							if (!isLoading) {
								searchHackerNews(queryRef.current, newPage)
							}
						}}
					/>
				</div>
			)}
		</>
	);
};

export default SearchPage;
