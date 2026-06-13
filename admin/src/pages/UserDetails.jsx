import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Users, Home, Calendar, Activity, Mail, Phone,
  MapPin, Clock, Shield, Ban, UserCheck, Trash2, Eye,
  AlertCircle, RefreshCw, ExternalLink, CheckCircle2, X
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "../services/apiClient";
import { cn, formatDate } from "../lib/utils";

// Components
import UserStatusBadge from "../components/UserStatusBadge";
import SuspendUserModal from "../components/SuspendUserModal";
import BanUserModal from "../components/BanUserModal";

// ── Reject Modal ──────────────────────────────────────────────────────────────
const RejectModal = ({ listing, onClose, onConfirm, loading }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }
    onConfirm(reason.trim());
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-[#0F3B43]/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-[#154D57] rounded-2xl border border-[#B7A08B]/30 shadow-2xl w-full max-w-md p-6 z-10"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4 border-b border-[#B7A08B]/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base leading-tight">Reject Listing</h3>
                <p className="text-xs text-white/50 mt-0.5 leading-snug max-w-[240px] truncate">
                  {listing.title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#B7A08B]/60 hover:text-[#B7A08B] transition-colors p-1 rounded-lg hover:bg-[#B7A08B]/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                Rejection Reason <span className="text-red-400">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="e.g. Missing price details, unclear photographs, prohibited content..."
                className="w-full bg-[#12434D] border border-[#B7A08B]/30 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#B7A08B] focus:border-[#B7A08B] resize-none shadow-inner"
                autoFocus
              />
              <p className="text-xs text-white/40 mt-1">
                This reason will be emailed to the listing owner.
              </p>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-[#B7A08B] border border-[#B7A08B]/30 rounded-lg hover:bg-[#B7A08B]/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !reason.trim()}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500/20 border border-red-500/40 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <motion.span
                    className="w-3.5 h-3.5 border-2 border-white/50 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.75, ease: "linear" }}
                  />
                )}
                Reject Listing
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Modals
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get(`/api/admin/users/${id}`);

      if (response.data.success) {
        setUser(response.data.user);
        setProperties(response.data.properties || []);
        setAppointments(response.data.appointments || []);
      } else {
        setError(response.data.message || "User not found");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Unable to load user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  // User Actions
  const handleSuspendUser = async (suspendData) => {
    try {
      setActionLoading(true);
      const response = await apiClient.put(
        `/api/admin/users/${user._id}/suspend`,
        suspendData
      );

      if (response.data.success) {
        toast.success(`User suspended for ${suspendData.days} days`);
        setShowSuspendModal(false);
        fetchUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to suspend user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBanUser = async (banData) => {
    try {
      setActionLoading(true);
      const response = await apiClient.put(
        `/api/admin/users/${user._id}/ban`,
        banData
      );

      if (response.data.success) {
        toast.success("User banned successfully");
        setShowBanModal(false);
        fetchUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to ban user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnbanUser = async () => {
    try {
      setActionLoading(true);
      const response = await apiClient.put(
        `/api/admin/users/${user._id}/unban`,
        {}
      );

      if (response.data.success) {
        toast.success("User account reactivated");
        fetchUserDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to reactivate user");
    } finally {
      setActionLoading(false);
    }
  };

  // Tabs
  const tabs = [
    { key: 'overview', label: 'Overview', icon: Users },
    { key: 'properties', label: `Properties (${properties.length})`, icon: Home },
    { key: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
  ];

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen pt-8 pb-12 px-4 bg-[#154D57]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-48 bg-[#B7A08B]/30 rounded-xl animate-pulse mb-4" />
            <div className="bg-[#12434D] rounded-2xl p-8 border border-[#B7A08B]/20 animate-pulse shadow-xl">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[#B7A08B]/20 rounded-full" />
                <div className="flex-1">
                  <div className="h-6 w-48 bg-[#B7A08B]/30 rounded mb-2" />
                  <div className="h-4 w-64 bg-[#B7A08B]/20 rounded mb-2" />
                  <div className="h-4 w-32 bg-[#B7A08B]/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center bg-[#154D57]">
        <div className="text-center max-w-md bg-[#12434D] p-8 rounded-2xl border border-[#B7A08B]/30 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">User not found</h3>
          <p className="text-white/60 mb-6 text-sm">{error}</p>
          <button
            onClick={() => navigate('/admin/users')}
            className="px-6 py-3 bg-[#B7A08B] text-[#154D57] rounded-xl font-bold text-sm hover:bg-white transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-12 px-4 bg-[#154D57]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate('/admin/users')}
            className="p-2 hover:bg-[#B7A08B]/10 rounded-lg border border-[#B7A08B]/30 text-[#B7A08B] hover:text-white transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-sm">User Details</h1>
            <p className="text-[#B7A08B] text-sm">Complete user information and management</p>
          </div>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#12434D] rounded-2xl border border-[#B7A08B]/20 shadow-xl p-8 mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#B7A08B]/20 border border-[#B7A08B]/40 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-10 h-10 text-[#B7A08B]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                <div className="flex items-center gap-2 mb-2 text-white/70">
                  <Mail className="w-4 h-4 text-[#B7A08B]" />
                  <span>{user.email}</span>
                </div>
                <UserStatusBadge status={user.status} />
              </div>
            </div>

            {/* Actions */}
            <div className="lg:ml-auto flex flex-wrap gap-3 mt-4 lg:mt-0">
              {user.status === 'active' && (
                <>
                  <button
                    onClick={() => setShowSuspendModal(true)}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl font-bold text-sm hover:bg-amber-500/20 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    <Clock className="w-4 h-4" />
                    Suspend
                  </button>
                  <button
                    onClick={() => setShowBanModal(true)}
                    disabled={actionLoading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    <Ban className="w-4 h-4" />
                    Ban
                  </button>
                </>
              )}
              {(user.status === 'suspended' || user.status === 'banned') && (
                <button
                  onClick={handleUnbanUser}
                  disabled={actionLoading}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold text-sm hover:bg-emerald-500/20 transition-colors disabled:opacity-50 shadow-sm"
                >
                  <UserCheck className="w-4 h-4" />
                  Reactivate
                </button>
              )}
              <button
                onClick={fetchUserDetails}
                disabled={actionLoading}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#0F3B43] border border-[#B7A08B]/30 text-[#B7A08B] rounded-xl font-bold text-sm hover:text-white hover:border-[#B7A08B] transition-colors disabled:opacity-50 shadow-sm"
              >
                <RefreshCw className={cn("w-4 h-4", actionLoading && "animate-spin")} />
                Refresh
              </button>
            </div>
          </div>

          {/* User Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#B7A08B]/20">
            <div className="bg-[#0F3B43] p-4 rounded-xl border border-[#B7A08B]/10">
              <p className="text-sm text-[#B7A08B] mb-1">Member Since</p>
              <p className="font-bold text-white">{formatDate(user.createdAt)}</p>
            </div>
            <div className="bg-[#0F3B43] p-4 rounded-xl border border-[#B7A08B]/10">
              <p className="text-sm text-[#B7A08B] mb-1">Properties Listed</p>
              <p className="font-bold text-white">{user.propertyCount || 0}</p>
            </div>
            <div className="bg-[#0F3B43] p-4 rounded-xl border border-[#B7A08B]/10">
              <p className="text-sm text-[#B7A08B] mb-1">Total Appointments</p>
              <p className="font-bold text-white">{user.appointmentCount || 0}</p>
            </div>
          </div>

          {/* Status-specific Info */}
          {user.status === 'suspended' && user.suspendedUntil && (
            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-400">Suspension Details</span>
              </div>
              <p className="text-sm text-white/80 mb-1">
                <strong className="text-amber-300">Reason:</strong> {user.suspendReason || 'Not specified'}
              </p>
              <p className="text-sm text-white/80">
                <strong className="text-amber-300">Expires:</strong> {new Date(user.suspendedUntil).toLocaleString()}
              </p>
            </div>
          )}

          {user.status === 'banned' && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Ban className="w-4 h-4 text-red-400" />
                <span className="font-bold text-red-400">Ban Details</span>
              </div>
              <p className="text-sm text-white/80 mb-1">
                <strong className="text-red-300">Reason:</strong> {user.banReason || 'Not specified'}
              </p>
              <p className="text-sm text-white/80">
                <strong className="text-red-300">Banned on:</strong> {formatDate(user.bannedAt)}
              </p>
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="bg-[#12434D] rounded-2xl border border-[#B7A08B]/20 shadow-xl overflow-hidden">
          <div className="border-b border-[#B7A08B]/20 px-6 py-4 bg-[#0F3B43]">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                      activeTab === tab.key
                        ? "bg-[#B7A08B] text-[#154D57] shadow-md"
                        : "bg-[#12434D] border border-[#B7A08B]/20 text-[#B7A08B] hover:bg-[#B7A08B]/10 hover:text-white"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#B7A08B]" /> Account Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-[#0F3B43] p-5 rounded-xl border border-[#B7A08B]/10">
                    <div>
                      <p className="text-sm text-[#B7A08B] mb-1 font-medium">Email Address</p>
                      <p className="text-white font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#B7A08B] mb-2 font-medium">Account Status</p>
                      <UserStatusBadge status={user.status} />
                    </div>
                  </div>
                  <div className="space-y-4 bg-[#0F3B43] p-5 rounded-xl border border-[#B7A08B]/10">
                    <div>
                      <p className="text-sm text-[#B7A08B] mb-1 font-medium">Registration Date</p>
                      <p className="text-white font-medium">{new Date(user.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#B7A08B] mb-1 font-medium">Last Updated</p>
                      <p className="text-white font-medium">{new Date(user.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-[#B7A08B]" /> User's Properties
                </h3>
                {properties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {properties.map((property) => (
                      <div
                        key={property._id}
                        className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-4 hover:border-[#B7A08B]/50 hover:shadow-lg transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-white line-clamp-2 pr-2 group-hover:text-[#B7A08B] transition-colors">{property.title}</h4>
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                            property.status === 'active' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
                            property.status === 'pending' && "bg-amber-500/10 text-amber-400 border border-amber-500/30",
                            property.status === 'rejected' && "bg-red-500/10 text-red-400 border border-red-500/30",
                            property.status === 'expired' && "bg-white/10 text-white/50 border border-white/20"
                          )}>
                            {property.status}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-white/70">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#B7A08B]" />
                            {property.location}
                          </div>
                          <div className="font-space-mono font-bold text-[#B7A08B]">PKR {property.price?.toLocaleString()}</div>
                          <div className="text-xs text-white/40">{formatDate(property.createdAt)}</div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-3 border-t border-[#B7A08B]/10">
                          <button
                            onClick={() => window.open(`/property/${property._id}`, '_blank')}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-[#B7A08B]/30 text-[#B7A08B] rounded-lg hover:bg-[#B7A08B] hover:text-[#154D57] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Listing
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-[#0F3B43] rounded-xl border border-[#B7A08B]/10">
                    <Home className="w-12 h-12 text-[#B7A08B]/30 mx-auto mb-4" />
                    <p className="text-white/50">No properties listed yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'appointments' && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#B7A08B]" /> User's Appointments
                </h3>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment._id}
                        className="bg-[#0F3B43] border border-[#B7A08B]/20 rounded-xl p-5 hover:border-[#B7A08B]/40 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
                          <div>
                            <h4 className="font-bold text-white mb-1">
                              {appointment.propertyId?.title || 'Property Unavailable'}
                            </h4>
                            <p className="text-sm text-[#B7A08B] flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {appointment.propertyId?.location}
                            </p>
                          </div>
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider self-start shadow-sm border",
                            appointment.status === 'confirmed' && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                            appointment.status === 'pending' && "bg-amber-500/10 text-amber-400 border-amber-500/30",
                            appointment.status === 'cancelled' && "bg-red-500/10 text-red-400 border-red-500/30",
                            appointment.status === 'completed' && "bg-sky-500/10 text-sky-400 border-sky-500/30"
                          )}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/70 bg-[#12434D] w-fit px-3 py-2 rounded-lg border border-[#B7A08B]/10">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#B7A08B]" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="w-px h-3 bg-[#B7A08B]/20" />
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#B7A08B]" />
                            {appointment.time}
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-3 bg-[#12434D] p-3 rounded-lg border border-[#B7A08B]/10">
                            <span className="text-[10px] font-bold text-[#B7A08B] uppercase tracking-wider mb-1 block">Notes</span>
                            <p className="text-sm text-white/80">
                              {appointment.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-[#0F3B43] rounded-xl border border-[#B7A08B]/10">
                    <Calendar className="w-12 h-12 text-[#B7A08B]/30 mx-auto mb-4" />
                    <p className="text-white/50">No appointments booked yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SuspendUserModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleSuspendUser}
        user={user}
        isLoading={actionLoading}
      />

      <BanUserModal
        isOpen={showBanModal}
        onClose={() => setShowBanModal(false)}
        onConfirm={handleBanUser}
        user={user}
        isLoading={actionLoading}
      />
    </div>
  );
};

export default UserDetailsPage;