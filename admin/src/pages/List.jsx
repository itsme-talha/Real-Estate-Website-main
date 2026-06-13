import { useState, useEffect } from "react";
import {
  Trash2, Edit3, Search, Plus, Home, BedDouble, Bath,
  Maximize, MapPin, Grid3X3, List as ListIcon, RefreshCw,
  Building2, Tag,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../services/apiClient";
import { cn, formatPrice } from "../lib/utils";

const PROPERTY_TYPES = ["all", "House", "Apartment", "Office", "Villa"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
];

const parseAmenities = (amenities) => {
  if (!amenities || !Array.isArray(amenities)) return [];
  try {
    return typeof amenities[0] === "string"
      ? JSON.parse(amenities[0].replace(/'/g, '"'))
      : amenities;
  } catch {
    return [];
  }
};

// ─── Property Grid Card ───────────────────────────────────────────────────────
const PropertyGridCard = ({ property, onRemove }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.96 }}
    whileHover={{ y: -3 }}
    transition={{ duration: 0.25 }}
    className="bg-[#12434D] rounded-2xl border border-[#B7A08B]/20 shadow-lg hover:shadow-2xl hover:border-[#B7A08B]/50 overflow-hidden group transition-all duration-300"
  >
    {/* Image */}
    <div className="relative h-48 overflow-hidden bg-[#0F3B43]">
      {property.image?.[0] ? (
        <img src={property.image[0]} alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Building2 className="w-12 h-12 text-[#B7A08B]/30" />
        </div>
      )}
      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="px-2.5 py-1 bg-[#154D57]/90 backdrop-blur-sm border border-[#B7A08B]/30 text-[#B7A08B] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
          {property.type}
        </span>
        <span className={cn(
          "px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm shadow-sm border",
          property.availability === "rent"
            ? "bg-sky-500/80 border-sky-400/50 text-white"
            : "bg-[#B7A08B]/90 border-[#B7A08B] text-[#154D57]"
        )}>
          {property.availability === "rent" ? "For Rent" : "For Sale"}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      <h3 className="font-syne font-bold text-white text-lg mb-1 line-clamp-1">{property.title}</h3>
      <div className="flex items-center gap-1 text-[#B7A08B] text-xs mb-3">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="line-clamp-1 text-white/70">{property.location}</span>
      </div>

      {/* Specs */}
      <div className="flex items-center gap-3 text-xs text-white/80 mb-4 bg-[#0F3B43] px-3 py-2 rounded-lg border border-[#B7A08B]/10">
        <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-[#B7A08B]" />{property.beds} Beds</span>
        <span className="w-px h-3 bg-[#B7A08B]/20" />
        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-[#B7A08B]" />{property.baths} Baths</span>
        <span className="w-px h-3 bg-[#B7A08B]/20" />
        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5 text-[#B7A08B]" />{property.sqft} sqft</span>
      </div>

      {/* Price + Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-[#B7A08B]/20">
        <div>
          <span className="text-lg font-space-mono font-bold text-[#B7A08B]">
            PKR {formatPrice(property.price).replace('₹', '')}
          </span>
          {property.availability === "rent" && <span className="text-xs text-white/50 ml-1">/mo</span>}
        </div>
        <div className="flex items-center gap-1.5">
          <Link to={`/update/${property._id}`}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="p-2 bg-[#0F3B43] border border-[#B7A08B]/30 text-[#B7A08B] rounded-lg hover:border-[#B7A08B] hover:text-white hover:bg-[#B7A08B]/20 transition-all duration-200">
              <Edit3 className="w-4 h-4" />
            </motion.button>
          </Link>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(property._id, property.title)}
            className="p-2 bg-[#0F3B43] border border-red-500/20 text-red-400 rounded-lg hover:border-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200">
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);

// ─── Property List Row ────────────────────────────────────────────────────────
const PropertyListRow = ({ property, onRemove }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-[#12434D] rounded-xl border border-[#B7A08B]/20 hover:border-[#B7A08B]/50 hover:shadow-lg transition-all duration-200 group"
  >
    {/* Thumbnail */}
    <div className="w-full sm:w-20 h-40 sm:h-20 rounded-xl overflow-hidden bg-[#0F3B43] flex-shrink-0 relative border border-[#B7A08B]/10">
      {property.image?.[0] ? (
        <img src={property.image[0]} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Building2 className="w-6 h-6 text-[#B7A08B]/40" />
        </div>
      )}
      <span className={cn(
        "absolute bottom-1 right-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-sm border",
        property.availability === "rent"
          ? "bg-sky-500/90 border-sky-400/50 text-white"
          : "bg-[#B7A08B]/90 border-[#B7A08B] text-[#154D57]"
      )}>
        {property.availability === "rent" ? "Rent" : "Sale"}
      </span>
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-syne font-bold text-white text-base truncate">{property.title}</h3>
        <span className="px-2 py-0.5 bg-[#0F3B43] border border-[#B7A08B]/30 text-[#B7A08B] text-[10px] font-bold uppercase tracking-wider rounded-full flex-shrink-0">
          {property.type}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-white/60 mb-2">
        <MapPin className="w-3 h-3 text-[#B7A08B]" />
        <span className="truncate">{property.location}</span>
      </div>
      
      {/* Specs Mobile */}
      <div className="flex sm:hidden items-center gap-3 text-xs text-white/80 bg-[#0F3B43] px-2 py-1.5 rounded-lg border border-[#B7A08B]/10 w-fit">
        <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-[#B7A08B]" />{property.beds}</span>
        <span className="w-px h-3 bg-[#B7A08B]/20" />
        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-[#B7A08B]" />{property.baths}</span>
      </div>
    </div>

    {/* Specs Desktop */}
    <div className="hidden sm:flex items-center gap-4 text-xs text-white/80 bg-[#0F3B43] px-4 py-2.5 rounded-xl border border-[#B7A08B]/10">
      <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-[#B7A08B]" />{property.beds}</span>
      <span className="w-px h-4 bg-[#B7A08B]/20" />
      <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-[#B7A08B]" />{property.baths}</span>
      <span className="w-px h-4 bg-[#B7A08B]/20" />
      <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-[#B7A08B]" />{property.sqft}</span>
    </div>

    {/* Price & Actions */}
    <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-3 sm:gap-2 flex-shrink-0 sm:w-32 border-t sm:border-t-0 border-[#B7A08B]/20 pt-3 sm:pt-0 mt-3 sm:mt-0">
      <div className="font-space-mono font-bold text-[#B7A08B] text-base">
        PKR {formatPrice(property.price).replace('₹', '')}
      </div>
      <div className="flex items-center gap-1.5">
        <Link to={`/update/${property._id}`}>
          <button className="p-2 bg-[#0F3B43] border border-[#B7A08B]/30 text-[#B7A08B] hover:text-white hover:bg-[#B7A08B]/20 rounded-lg transition-all duration-200">
            <Edit3 className="w-4 h-4" />
          </button>
        </Link>
        <button onClick={() => onRemove(property._id, property.title)}
          className="p-2 bg-[#0F3B43] border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PropertyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [refreshing, setRefreshing] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/products/list');
      if (response.data.success) {
        const parsed = response.data.property.map((p) => ({
          ...p,
          amenities: parseAmenities(p.amenities),
        }));
        setProperties(parsed);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProperties();
    setRefreshing(false);
    toast.success("Properties refreshed!");
  };

  const handleRemoveProperty = async (propertyId, propertyTitle) => {
    if (!window.confirm(`Remove "${propertyTitle}"? This cannot be undone.`)) return;
    try {
      const response = await apiClient.post('/api/products/remove', { id: propertyId });
      if (response.data.success) {
        toast.success("Property removed successfully");
        await fetchProperties();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing property:", error);
      toast.error("Failed to remove property");
    }
  };

  useEffect(() => { fetchProperties(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredProperties = properties
    .filter((p) => {
      const matchesSearch = !searchTerm ||
        [p.title, p.location, p.type].some((f) => f?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === "all" || p.type?.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center bg-[#154D57]">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#B7A08B]/30 border-t-[#B7A08B] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#B7A08B] font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-12 px-4 bg-[#154D57]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-sm">Properties</h1>
            <p className="text-[#B7A08B] text-sm">
              <span className="font-bold text-white">{filteredProperties.length}</span> listings found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button onClick={handleRefresh} disabled={refreshing}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#12434D] border border-[#B7A08B]/40 text-[#B7A08B] rounded-xl text-sm font-bold hover:bg-[#B7A08B] hover:text-[#154D57] transition-all shadow-lg disabled:opacity-60">
              <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
            <Link to="/add">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#B7A08B] hover:bg-white text-[#154D57] rounded-xl text-sm font-bold transition-all shadow-lg">
                <Plus className="w-4 h-4" />
                Add Property
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Filters Bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#12434D] rounded-2xl p-4 border border-[#B7A08B]/20 shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B7A08B]/60" />
              <input type="text" placeholder="Search properties..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#0F3B43] border border-[#B7A08B]/30 rounded-xl text-sm text-white placeholder:text-white/40 outline-none focus:border-[#B7A08B] focus:ring-1 focus:ring-[#B7A08B] transition-all shadow-inner" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Type Filter */}
              <div className="flex items-center gap-1 bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-1 overflow-x-auto w-full sm:w-auto hide-scrollbar">
                {PROPERTY_TYPES.map((type) => (
                  <button key={type} onClick={() => setFilterType(type)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap",
                      filterType === type
                        ? "bg-[#B7A08B] text-[#154D57] shadow-sm"
                        : "text-white/60 hover:text-white hover:bg-[#B7A08B]/10"
                    )}>
                    {type === "all" ? "All Types" : type}
                  </button>
                ))}
              </div>

              {/* Sort + View Toggle */}
              <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 bg-[#0F3B43] border border-[#B7A08B]/30 rounded-xl text-xs font-semibold text-white outline-none focus:border-[#B7A08B] transition-all cursor-pointer shadow-sm appearance-none">
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#12434D]">{opt.label}</option>
                  ))}
                </select>

                <div className="flex items-center bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-1 shadow-sm">
                  <button onClick={() => setViewMode("grid")}
                    className={cn("p-1.5 rounded-lg transition-all", viewMode === "grid" ? "bg-[#B7A08B] text-[#154D57]" : "text-white/50 hover:text-white")}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("list")}
                    className={cn("p-1.5 rounded-lg transition-all", viewMode === "list" ? "bg-[#B7A08B] text-[#154D57]" : "text-white/50 hover:text-white")}>
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Properties */}
        <AnimatePresence mode="wait">
          {filteredProperties.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20 bg-[#12434D] rounded-2xl border border-[#B7A08B]/20 shadow-xl">
              <div className="w-16 h-16 bg-[#0F3B43] border border-[#B7A08B]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-[#B7A08B]/50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No properties found</h3>
              <p className="text-sm text-white/50 mb-6">
                {searchTerm || filterType !== "all" ? "Try adjusting your search or filters" : "Add your first property to get started"}
              </p>
              {!searchTerm && filterType === "all" && (
                <Link to="/add">
                  <button className="px-6 py-3 bg-[#B7A08B] text-[#154D57] rounded-xl font-bold text-sm hover:bg-white transition-colors shadow-lg">
                    Add First Property
                  </button>
                </Link>
              )}
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence>
                {filteredProperties.map((property) => (
                  <PropertyGridCard key={property._id} property={property} onRemove={handleRemoveProperty} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-3">
              <AnimatePresence>
                {filteredProperties.map((property) => (
                  <PropertyListRow key={property._id} property={property} onRemove={handleRemoveProperty} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PropertyListings;