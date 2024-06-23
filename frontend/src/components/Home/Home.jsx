import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    const [isBackendAvailable, setIsBackendAvailable] = useState(false); 
    const [backendStatusChecked, setBackendStatusChecked] = useState(false); 

    useEffect(() => {
        const checkBackendStatus = async () => {
            try {
                await axios.get('https://dev-scraper-jyqy.onrender.com/api/status');
                setIsBackendAvailable(true);
            } catch (error) {
                console.error('Backend is not available:', error);
                setIsBackendAvailable(false);
            } finally {
                setBackendStatusChecked(true);
            }
        };

        const initialize = async () => {
            const storedArticles = JSON.parse(localStorage.getItem('articles'));
            if (storedArticles) {
                setArticles(storedArticles);
            }

            const storedLastQuery = localStorage.getItem('lastQuery');
            if (storedLastQuery) {
                setLastQuery(storedLastQuery);
            }

            await checkBackendStatus();
        };

        initialize();
    }, []);

    useEffect(() => {
        localStorage.setItem('lastQuery', lastQuery);
    }, [lastQuery]);

    const fetchArticles = async () => {
        try {
            let url = 'https://dev-scraper-jyqy.onrender.com/api/articles';
            if (query) {
                url += `?query=${encodeURIComponent(query)}`;
            }
            setIsFetching(true);
            const response = await axios.get(url);
            const newArticles = response.data;
            setArticles(newArticles);
            localStorage.setItem('articles', JSON.stringify(newArticles));
            setFetchError(null);
            setLastQuery(query); 
            setQuery(''); 
        } catch (error) {
            console.error('Error fetching articles:', error);
            setFetchError('Error fetching articles. Please try again later.');
        } finally {
            setIsFetching(false);
        }
    };

    const handleExecuteAndFetch = async (event) => {
        event.preventDefault();

        if (!query) {
            toast.warn('Please enter a query before executing.', {
                position: 'top-right'
            });
            return;
        }

        toast.info('Scraping started...', {
            position: 'top-right'
        });

        try {
            await fetchArticles();

            toast.success('Scraper executed successfully!', {
                position: 'top-right'
            });

        } catch (error) {
            console.error('Error executing scraper:', error);
            toast.error('Error executing scraper', {
                position: 'top-right'
            });
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const getTitle = () => {
        if (query) {
            return 'Query you are searching for: ' + capitalizeFirstLetter(query);
        } else if (lastQuery) {
            return 'Query you lastly searched for: ' + capitalizeFirstLetter(lastQuery);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="container mx-auto">
            <ToastContainer />
            <div className="text-center mt-4 flex justify-content-left ml-5">
                <form onSubmit={handleExecuteAndFetch}>
                    <input
                        type="text"
                        placeholder="Enter query"
                        value={query}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-1 rounded mb-4 ${!isBackendAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isBackendAvailable}
                    >
                        Execute and Fetch
                    </button>
                </form>
            </div>
            {backendStatusChecked && !isBackendAvailable && (
                <div className="text-center text-red-500 my-4">
                    Backend is not available. Please try again later.
                </div>
            )}
            <h1 className="text-3xl font-bold my-8 ml-5">{getTitle()}</h1>

            {isFetching && (
                <div className="flex flex-col items-center justify-center h-full my-4 mt-60">
                    <svg className="animate-spin h-12 w-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#4b6cb7', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#182848', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <circle cx="12" cy="12" r="10" stroke="url(#grad)" strokeWidth="4" fill="none" strokeLinecap="round">
                            <animateTransform attributeName="transform" attributeType="xml" type="rotate" from="0 12 12" to="360 12 12" dur="0.6s" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                    <p className="text-gray-600 text-center">Scraping data...</p>
                </div>
            )}

            {!isFetching && articles.length > 0 && (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article, index) => (
                        <Card key={index} title={article.Title} link={article.Link} tags={article.Tags} />
                    ))}
                </div>
            )}

            {!isFetching && articles.length === 0 && !fetchError && (
                <div className="text-center my-4">
                    No articles found.
                </div>
            )}

            {!isFetching && fetchError && (
                <div className="text-red-500 text-center my-4">
                    {fetchError}
                </div>
            )}
        </div>
    );
}

export default Home;
