export interface HN_SearchHit {
	author: string;
	created_at: string;
    created_at_i: number;
    objectID: string;
    points: number;
    title: string;
    story_text?: string;
    url: string;
}

export interface HN_SearchResponse {
    hits: HN_SearchHit[];
    hitsPerPage: number;
    nbHits: number;
    nbPages: number;
    page: number;
}