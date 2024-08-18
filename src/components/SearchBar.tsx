import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    // Handle the search logic here (e.g., filtering data, making API calls)
  };

  return (
    <div className="flex items-center w-full max-w-lg mx-auto bg-gray-200 border border-gray-300 rounded-lg">
      <FiSearch className="ml-3 text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SearchBar;
