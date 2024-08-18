import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { ThemeToggle } from "@/components/ThemeToggle";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Content } from "@/components/Content";

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-background overflow-hidden p-3 font-poppins flex flex-col justify-between">
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <FlickeringGrid />
      </div>
    
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-4">
        <Header/>
        <ThemeToggle />
      </div>
    
      <div className="relative z-10 flex-1">
        <Content />
        <footer className="w-full p-2 text-center">
          <p>&copy; 2024. Created by Mochamad Lutfi Fadlan. All rights reserved.</p>
        </footer>
      </div>   
    </div>
  );
}

export default Home;
