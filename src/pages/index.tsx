import { Header } from "@/components/Header";
import { ThemeToggle } from "@/components/ThemeToggle";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Content } from "@/components/Content";
import SearchBar from "@/components/SearchBar";
import { FiSearch } from "react-icons/fi";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="w-full min-h-screen bg-background overflow-hidden p-3 font-poppins flex flex-col justify-between">
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <FlickeringGrid />
      </div>
    
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-4">
        <Header/>
        <div className="flex items-center w-full max-w-lg mx-auto bg-gray-200 border border-gray-300 rounded-lg">
          <FiSearch className="ml-3 mr-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-transparent"
          />
        </div>
        <ThemeToggle />
      </div>
    
      <div className="relative z-10 flex-1">
        <Content searchQuery={searchQuery} />
        <footer className="w-full p-2 text-center">
          <p>&copy; 2024. Created by Mochamad Lutfi Fadlan. All rights reserved.</p>
        </footer>
      </div>   
    </div>
  );
}

export default Home;
