import { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import StatsCards from '../components/StatsCards.jsx';
import FilterBar from '../components/FilterBar.jsx';
import ApplicationTable from '../components/ApplicationTable.jsx';
import ApplicationModal from '../components/ApplicationModal.jsx';
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';
import {
  getApplications,
  getApplicationStats,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication
} from '../services/api.js';

export default function Dashboard({ user, onOpenAuth, onLogout, onGoHome }) {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, applied: 0, interviews: 0, offers: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentTab, setCurrentTab] = useState('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [appToDelete, setAppToDelete] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appsRes, statsRes] = await Promise.all([
        getApplications(),
        getApplicationStats()
      ]);
      setApplications(appsRes.data);
      setStats(statsRes.data);
      setError('');
    } catch (err) {
      setError('Unable to load application records from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingApp) {
        await updateApplication(editingApp._id, formData);
      } else {
        await createApplication(formData);
      }
      setIsModalOpen(false);
      setEditingApp(null);
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving application');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplicationStatus(id, { status: newStatus });
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteApplication(id);
      setAppToDelete(null);
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting application');
    }
  };

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    if (tabId === 'all') {
      setStatusFilter('All');
    } else {
      setStatusFilter(tabId);
    }
  };

  const filteredAndSortedApplications = useMemo(() => {
    let list = [...applications];

    if (currentTab !== 'all') {
      list = list.filter((app) => app.status === currentTab);
    } else if (statusFilter !== 'All') {
      list = list.filter((app) => app.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (app) =>
          app.company.toLowerCase().includes(q) ||
          app.role.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.applicationDate || b.createdAt) - new Date(a.applicationDate || a.createdAt));
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => new Date(a.applicationDate || a.createdAt) - new Date(b.applicationDate || b.createdAt));
    } else if (sortBy === 'company') {
      list.sort((a, b) => a.company.localeCompare(b.company));
    }

    return list;
  }, [applications, currentTab, statusFilter, search, sortBy]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F0] md:flex-row">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        stats={stats}
        user={user}
        onOpenAuth={onOpenAuth}
        onLogout={onLogout}
        onGoHome={onGoHome}
      />

      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
                {currentTab === 'all'
                  ? 'Application Pipeline'
                  : `${currentTab} Applications`}
              </h1>
              <p className="text-sm text-[#6A665E]">
                Track and manage your recruiting pipeline in real-time.
              </p>
            </div>
          </div>

          <StatsCards stats={stats} />

          <FilterBar
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onAddNew={() => {
              setEditingApp(null);
              setIsModalOpen(true);
            }}
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex h-48 items-center justify-center rounded-xl border border-[#E8E0D2] bg-white">
              <span className="text-sm font-semibold text-[#6A665E]">Loading applications...</span>
            </div>
          ) : (
            <ApplicationTable
              applications={filteredAndSortedApplications}
              onStatusChange={handleStatusChange}
              onEdit={(app) => {
                setEditingApp(app);
                setIsModalOpen(true);
              }}
              onDelete={(app) => setAppToDelete(app)}
            />
          )}
        </div>
      </main>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApp(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingApp}
      />

      <DeleteConfirmModal
        isOpen={Boolean(appToDelete)}
        onClose={() => setAppToDelete(null)}
        onConfirm={handleConfirmDelete}
        application={appToDelete}
      />
    </div>
  );
}
