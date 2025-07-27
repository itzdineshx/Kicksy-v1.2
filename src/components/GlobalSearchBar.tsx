import { useState } from "react";
import { Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/components/SearchProvider";
import { SearchModal } from "@/components/SearchProvider";

const GlobalSearchBar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { setSearchQuery } = useSearch();

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <div className="relative flex-1 max-w-lg">
        <div 
          className="relative cursor-pointer"
          onClick={openSearchModal}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events, venues, teams..."
            className="pl-10 pr-16 bg-muted/50 border-0 h-10"
            readOnly
            tabIndex={-1}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="w-3 h-3" />
              K
            </kbd>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </>
  );
};

export default GlobalSearchBar;