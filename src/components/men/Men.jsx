import { useState, useEffect } from "react";
import { Contents } from "../common/Contents"
import { Filter } from "../common/Filter"
import { Footer } from "../common/Footer"
import { HeaderMen } from "./HeaderMen"
import { NavigationBar } from "../common/NavigationBar"

export const Men = () => {

    const [sortOrder, setSortOrder] = useState("");
    const [filters, setFilters] = useState({});

    const resetFilters = () => {
      setFilters({});
    };

    useEffect(() => {
        const handleGlobalSearch = (e) => {
            const query = e.detail.query?.toLowerCase();
            setFilters(prev => ({ ...prev, searchQuery: query }));
        };
        window.addEventListener("global-search", handleGlobalSearch);
        return () => window.removeEventListener("global-search", handleGlobalSearch);
    }, []);

    return(
        <>
        <div id="main" className="flex flex-row">
            <div id="navigation" className="fixed z-[60]"><NavigationBar /></div>
            <div id="body" className="flex flex-col ml-26 mr-1">
                <div id="header" className="mt-1"><HeaderMen /></div>
          <div id="filter" className="mt-20 sticky top-0 z-[50] bg-white">
            <Filter
              onSortChange={setSortOrder}
              onFilterChange={setFilters}
              onReset={resetFilters}
            />
          </div>
                <div id="contents" className="mt-20">
                    <Contents filterCategory="men" sortOrder={sortOrder} filters={filters}/>
                </div>
                <div id="footer" className="mt-20"><Footer /></div>
            </div>
        </div>
        </>
    )
}