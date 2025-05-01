
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Cadastro", path: "/cadastro" },
    { name: "Perfil", path: "/perfil" },
    { name: "Validação", path: "/validacao" },
  ];

  const NavLink = ({ item }: { item: { name: string; path: string } }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link
        to={item.path}
        className={cn(
          "px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium",
          isActive
            ? "bg-accent/20 text-accent text-glow"
            : "text-gray-400 hover:text-white hover:bg-accent/10"
        )}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-display font-bold text-accent text-glow">
                ESports.HUB
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-card/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.path
                    ? "bg-accent/20 text-accent text-glow"
                    : "text-gray-400 hover:text-white hover:bg-accent/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
