import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { ThemeToggle } from "@/components/ThemeToggle";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Content } from "@/components/Content";

const Home: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden p-3 ml-1 font-poppins justify-between">
      <div className="absolute inset-0 ml-1" style={{ pointerEvents: 'none' }}>
        <FlickeringGrid />
      </div>
    
      <div className="relative z-10 flex justify-between items-center mr-3 mb-4">
        <Header/>
        <ThemeToggle/>
      </div>
    
      <div className="relative z-10">
        <Content />
      </div>

      <footer className="absolute bottom-0 w-full p-6 text-center">
        <p>&copy; 2024. Created by Mochamad Lutfi Fadlan. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;