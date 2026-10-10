'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ImageCropperModal } from '@/components/ImageCropperModal';

interface Enquiry {
  id: number;
  student_name: string;
  parent_name: string;
  phone: string;
  email: string | null;
  grade: string;
  message: string | null;
  status: 'NEW' | 'CONTACTED' | 'VISIT_SCHEDULED' | 'ADMITTED' | 'REJECTED';
  notes: string | null;
  created_at: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  caption: string | null;
  is_featured: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'enquiries' | 'gallery' | 'certificates' | 'settings'>('enquiries');
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<string | null>(null);

  // Enquiries State
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<number | null>(null);
  const [notesText, setNotesText] = useState('');

  // Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('Campus Life');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoIsFeatured, setNewPhotoIsFeatured] = useState(false);
  const [addingPhoto, setAddingPhoto] = useState(false);

  // Gallery Filters & Pagination (10 photos per page)
  const [galleryFilterTab, setGalleryFilterTab] = useState<'ALL' | 'FEATURED'>('ALL');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('ALL');
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryPage, setGalleryPage] = useState(1);
  const GALLERY_PER_PAGE = 10;

  // Reset to page 1 on filter or search change
  useEffect(() => {
    setGalleryPage(1);
  }, [galleryFilterTab, galleryCategoryFilter, gallerySearch]);

  // Interactive Image Cropper Modal State
  const [cropperModal, setCropperModal] = useState<{
    isOpen: boolean;
    imageSrc: string;
    target: 'new' | 'edit';
  }>({
    isOpen: false,
    imageSrc: '',
    target: 'new',
  });

  // Compact Edit Gallery Modal State
  const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [savingEditPhoto, setSavingEditPhoto] = useState(false);

  // Compact Custom Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'enquiry' | 'gallery';
    id: number | null;
    name: string;
  }>({
    isOpen: false,
    type: 'enquiry',
    id: null,
    name: '',
  });
  const [deletingInProgress, setDeletingInProgress] = useState(false);

  // Settings State
  const [phone, setPhone] = useState('+91 70111 60057');
  const [email, setEmail] = useState('wisdominternational.mau@gmail.com');
  const [address, setAddress] = useState(
    'Parwaripura Mohalla, Bus Stand, near Tikamgarh, Mauranipur, Roni, Uttar Pradesh 284204'
  );
  const [visitingHours, setVisitingHours] = useState('Monday – Saturday: 8:00 AM – 3:00 PM');
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');

  // Admission Session State
  const [admissionSession, setAdmissionSession] = useState('2026–27');
  const [savingSession, setSavingSession] = useState(false);
  const [sessionMsg, setSessionMsg] = useState('');

  // Password Change State
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  // Certificate Vault State (Secondary Password Protection)
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultPasswordInput, setVaultPasswordInput] = useState('');
  const [vaultShowPassword, setVaultShowPassword] = useState(false);
  const [vaultVerifying, setVaultVerifying] = useState(false);
  const [vaultError, setVaultError] = useState('');
  const [vaultSuccess, setVaultSuccess] = useState('');
  const [copiedVaultOrderNo, setCopiedVaultOrderNo] = useState<string | null>(null);

  // Vault Password Change State (In Settings)
  const [currVaultPass, setCurrVaultPass] = useState('');
  const [newVaultPass, setNewVaultPass] = useState('');
  const [vaultPassMsg, setVaultPassMsg] = useState('');
  const [vaultPassErr, setVaultPassErr] = useState('');
  const [changingVaultPass, setChangingVaultPass] = useState(false);

  // Check auth (enforcing per-tab isolation)
  useEffect(() => {
    const isTabAuth =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('wisdom_admin_tab_authenticated') === 'true';

    if (!isTabAuth) {
      router.replace('/admin/login');
      return;
    }

    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          sessionStorage.removeItem('wisdom_admin_tab_authenticated');
          router.replace('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.authenticated) {
          setAdminUser(data.user.username);
          setLoading(false);
        } else {
          sessionStorage.removeItem('wisdom_admin_tab_authenticated');
          router.replace('/admin/login');
        }
      })
      .catch(() => {
        sessionStorage.removeItem('wisdom_admin_tab_authenticated');
        router.replace('/admin/login');
      });
  }, [router]);

  // Load Enquiries
  const fetchEnquiries = useCallback(async () => {
    try {
      const q = new URLSearchParams();
      if (statusFilter !== 'ALL') q.set('status', statusFilter);
      if (gradeFilter !== 'ALL') q.set('grade', gradeFilter);
      if (search) q.set('search', search);

      const res = await fetch(`/api/enquiries?${q.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, [statusFilter, gradeFilter, search]);

  // Load Gallery
  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data.items || []);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Load Settings
  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          if (data.settings.phone) setPhone(data.settings.phone);
          if (data.settings.email) setEmail(data.settings.email);
          if (data.settings.address) setAddress(data.settings.address);
          if (data.settings.visiting_hours) setVisitingHours(data.settings.visiting_hours);
          if (data.settings.admission_session) setAdmissionSession(data.settings.admission_session);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchEnquiries();
      fetchGallery();
      fetchSettings();
    }
  }, [loading, fetchEnquiries, fetchGallery, fetchSettings]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('wisdom_admin_tab_authenticated');
      sessionStorage.removeItem('wisdom_cert_vault_unlocked');
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    router.replace('/admin/login');
  };

  // Status Change
  const updateStatus = async (id: number, newStatus: Enquiry['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  // Notes update
  const saveNotes = async (id: number) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesText }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, notes: notesText } : e))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export Enquiries to CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      alert('No enquiries found to export.');
      return;
    }

    const headers = [
      'Enquiry ID',
      'Date',
      'Time',
      'Student Name',
      'Parent Name',
      'Phone Number',
      'Email Address',
      'Grade Applied',
      'Status',
      'Parent Message',
      'Internal Notes',
    ];

    const formatField = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const statusMap: Record<string, string> = {
      NEW: 'New Lead',
      CONTACTED: 'Contacted',
      VISIT_SCHEDULED: 'Visit Scheduled',
      ADMITTED: 'Admitted',
      REJECTED: 'Closed / Rejected',
    };

    const rows = enquiries.map((e) => {
      const d = new Date(e.created_at);
      const dateStr = d.toLocaleDateString('en-IN');
      const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      return [
        formatField(e.id),
        formatField(dateStr),
        formatField(timeStr),
        formatField(e.student_name),
        formatField(e.parent_name),
        formatField(e.phone),
        formatField(e.email || ''),
        formatField(e.grade),
        formatField(statusMap[e.status] || e.status),
        formatField(e.message || ''),
        formatField(e.notes || ''),
      ].join(',');
    });

    // Prepend UTF-8 BOM so Excel on Windows opens Hindi/English characters without distortion
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute('download', `wisdom_admission_enquiries_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Delete Action Trigger
  const openDeleteModal = (type: 'enquiry' | 'gallery', id: number, name: string) => {
    setDeleteModal({
      isOpen: true,
      type,
      id,
      name,
    });
  };

  // Execute Delete
  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setDeletingInProgress(true);

    try {
      if (deleteModal.type === 'enquiry') {
        const res = await fetch(`/api/enquiries/${deleteModal.id}`, { method: 'DELETE' });
        if (res.ok) {
          setEnquiries((prev) => prev.filter((e) => e.id !== deleteModal.id));
        }
      } else {
        const res = await fetch(`/api/gallery/${deleteModal.id}`, { method: 'DELETE' });
        if (res.ok) {
          setGalleryItems((prev) => prev.filter((p) => p.id !== deleteModal.id));
        }
      }
      setDeleteModal({ isOpen: false, type: 'enquiry', id: null, name: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingInProgress(false);
    }
  };

  // When admin selects a file to upload in "Add Photo" form
  const handleSelectFileForCrop = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'new' | 'edit'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCropperModal({
          isOpen: true,
          imageSrc: reader.result,
          target,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  // When Cropping is completed
  const handleCropDone = (croppedUrl: string) => {
    if (cropperModal.target === 'new') {
      setNewPhotoUrl(croppedUrl);
    } else {
      setEditImageUrl(croppedUrl);
    }
    setCropperModal({ isOpen: false, imageSrc: '', target: 'new' });
  };

  // Add Photo Submit
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl || !newPhotoTitle) {
      alert('Please provide a photo image and title.');
      return;
    }

    setAddingPhoto(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPhotoTitle,
          category: newPhotoCategory,
          imageUrl: newPhotoUrl,
          caption: newPhotoCaption,
          isFeatured: newPhotoIsFeatured,
        }),
      });

      if (res.ok) {
        setNewPhotoTitle('');
        setNewPhotoCaption('');
        setNewPhotoUrl('');
        setNewPhotoIsFeatured(false);
        fetchGallery();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to add photo');
      }
    } finally {
      setAddingPhoto(false);
    }
  };

  // Quick 1-click Toggle Featured status for any photo
  const handleToggleFeatured = async (item: GalleryItem) => {
    const nextVal = !item.is_featured;
    setGalleryItems((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, is_featured: nextVal } : p))
    );
    try {
      const res = await fetch(`/api/gallery/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: nextVal }),
      });
      if (!res.ok) {
        fetchGallery();
      }
    } catch (err) {
      console.error(err);
      fetchGallery();
    }
  };

  // Open Edit Modal
  const openEditPhotoModal = (item: GalleryItem) => {
    setEditingPhoto(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditCaption(item.caption || '');
    setEditImageUrl(item.image_url);
    setEditIsFeatured(item.is_featured);
  };

  // Save Edit Photo Submit
  const handleSaveEditPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    setSavingEditPhoto(true);
    try {
      const res = await fetch(`/api/gallery/${editingPhoto.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          imageUrl: editImageUrl,
          caption: editCaption,
          isFeatured: editIsFeatured,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGalleryItems((prev) =>
          prev.map((item) => (item.id === editingPhoto.id ? data.item : item))
        );
        setEditingPhoto(null);
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to update photo');
      }
    } finally {
      setSavingEditPhoto(false);
    }
  };

  // Save Settings Submit
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMsg('');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            phone,
            email,
            address,
            visiting_hours: visitingHours,
            admission_session: admissionSession.trim(),
          },
        }),
      });
      if (res.ok) {
        setSettingsMsg('School settings saved successfully!');
        setTimeout(() => setSettingsMsg(''), 4000);
      }
    } finally {
      setSavingSettings(false);
    }
  };

  // Save Admission Session specifically
  const handleSaveSession = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavingSession(true);
    setSessionMsg('');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: {
            admission_session: admissionSession.trim(),
          },
        }),
      });
      if (res.ok) {
        setSessionMsg('✓ Admission session updated successfully! Live across entire website.');
        setTimeout(() => setSessionMsg(''), 4000);
      } else {
        setSessionMsg('Failed to update session.');
      }
    } catch {
      setSessionMsg('Connection error. Failed to save session.');
    } finally {
      setSavingSession(false);
    }
  };

  // Change Password Submit
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassErr('');
    setPassMsg('');
    setChangingPass(true);

    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currPass,
          newPassword: newPass,
        }),
      });

      const d = await res.json();
      if (res.ok) {
        setPassMsg('Password changed successfully!');
        setCurrPass('');
        setNewPass('');
      } else {
        setPassErr(d.error || 'Failed to change password');
      }
    } finally {
      setChangingPass(false);
    }
  };

  // Check if Certificate Vault is already unlocked
  useEffect(() => {
    if (activeTab === 'certificates') {
      fetch('/api/certificates/vault')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.unlocked) setVaultUnlocked(true);
        })
        .catch(() => {});
    }
  }, [activeTab]);

  // Unlock Certificate Vault with secondary key
  const handleUnlockVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vaultPasswordInput.trim()) {
      setVaultError('Please enter the vault security key.');
      return;
    }
    setVaultVerifying(true);
    setVaultError('');
    setVaultSuccess('');

    try {
      const res = await fetch('/api/certificates/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: vaultPasswordInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setVaultError(data.error || 'Incorrect vault security key.');
        return;
      }
      setVaultUnlocked(true);
      setVaultPasswordInput('');
      setVaultSuccess('✓ Certificate Vault unlocked successfully.');
    } catch {
      setVaultError('Failed to verify vault key. Please try again.');
    } finally {
      setVaultVerifying(false);
    }
  };

  // Re-lock Certificate Vault
  const handleLockVault = async () => {
    try {
      await fetch('/api/certificates/vault', { method: 'DELETE' });
    } catch {}
    setVaultUnlocked(false);
    setVaultSuccess('Certificate Vault locked.');
    setVaultError('');
  };

  const handleCopyOrderNo = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedVaultOrderNo(num);
    setTimeout(() => setCopiedVaultOrderNo(null), 2500);
  };

  // Change Vault Security Key in Settings
  const handleChangeVaultPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setVaultPassErr('');
    setVaultPassMsg('');
    setChangingVaultPass(true);

    try {
      const res = await fetch('/api/certificates/vault/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currVaultPass,
          newPassword: newVaultPass,
        }),
      });
      const d = await res.json();
      if (res.ok && d.success) {
        setVaultPassMsg('Vault security key updated successfully!');
        setCurrVaultPass('');
        setNewVaultPass('');
      } else {
        setVaultPassErr(d.error || 'Failed to update vault security key.');
      }
    } catch {
      setVaultPassErr('Connection error updating vault key.');
    } finally {
      setChangingVaultPass(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-navy font-bold">
          <span className="size-5 animate-spin rounded-full border-2 border-navy border-t-transparent" />
          Loading Admin Panel...
        </div>
      </div>
    );
  }

  // Stats
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'NEW').length;
  const contactedEnquiries = enquiries.filter(
    (e) => e.status === 'CONTACTED' || e.status === 'VISIT_SCHEDULED'
  ).length;
  const admittedCount = enquiries.filter((e) => e.status === 'ADMITTED').length;

  // Gallery Stats & Filtering
  const featuredCount = galleryItems.filter((p) => p.is_featured).length;
  const uniqueCategories = Array.from(new Set(galleryItems.map((p) => p.category))).filter(Boolean);
  const filteredGalleryItems = galleryItems.filter((item) => {
    if (galleryFilterTab === 'FEATURED' && !item.is_featured) return false;
    if (galleryCategoryFilter !== 'ALL' && item.category !== galleryCategoryFilter) return false;
    if (gallerySearch.trim()) {
      const q = gallerySearch.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(q);
      const captionMatch = item.caption?.toLowerCase().includes(q);
      const catMatch = item.category?.toLowerCase().includes(q);
      if (!titleMatch && !captionMatch && !catMatch) return false;
    }
    return true;
  });

  // Gallery Pagination (1-10 photos per page)
  const totalGalleryPages = Math.max(1, Math.ceil(filteredGalleryItems.length / GALLERY_PER_PAGE));
  const safeGalleryPage = Math.min(Math.max(1, galleryPage), totalGalleryPages);
  const paginatedGalleryItems = filteredGalleryItems.slice(
    (safeGalleryPage - 1) * GALLERY_PER_PAGE,
    safeGalleryPage * GALLERY_PER_PAGE
  );
  const startItemIndex =
    filteredGalleryItems.length === 0 ? 0 : (safeGalleryPage - 1) * GALLERY_PER_PAGE + 1;
  const endItemIndex = Math.min(safeGalleryPage * GALLERY_PER_PAGE, filteredGalleryItems.length);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071f3b] text-white">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <div className="size-12 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          <p className="font-display text-lg font-bold text-slate-100">
            Verifying Admin Session...
          </p>
          <p className="text-xs text-slate-400">
            Wisdom International School Administrator Portal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
              <Image
                src="/images/wisdom-logo-official.png"
                alt="Logo"
                width={80}
                height={80}
                quality={100}
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <b className="block font-display text-lg font-black text-navy leading-tight">
                Wisdom School Admin
              </b>
              <span className="text-xs font-bold text-slate-500">
                Administrator Portal · Mauranipur
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 sm:inline-flex">
              <span className="size-2 rounded-full bg-emerald-500" />
              Connected: {adminUser}
            </span>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-navy transition hover:bg-slate-50 sm:inline-block"
            >
              Public Website ↗
            </a>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-red-50 hover:text-red-600"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* KPI Stat Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Total Enquiries
            </span>
            <p className="mt-2 font-display text-3xl font-black text-navy">{totalEnquiries}</p>
            <span className="text-xs text-slate-500">All registered leads</span>
          </div>

          <div className="rounded-3xl border border-amber-200/80 bg-amber-50/40 p-5 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Needs Follow-up
            </span>
            <p className="mt-2 font-display text-3xl font-black text-amber-600">{newEnquiries}</p>
            <span className="text-xs text-amber-700/80">Pending action</span>
          </div>

          <div className="rounded-3xl border border-blue-200/80 bg-blue-50/40 p-5 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
              In Progress
            </span>
            <p className="mt-2 font-display text-3xl font-black text-blue-600">
              {contactedEnquiries}
            </p>
            <span className="text-xs text-blue-700/80">Contacted / Visit set</span>
          </div>

          <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/40 p-5 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              Admissions Done
            </span>
            <p className="mt-2 font-display text-3xl font-black text-emerald-600">
              {admittedCount}
            </p>
            <span className="text-xs text-emerald-700/80">Enrolled successfully</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {/* Tab 1: Enquiries */}
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl py-3 px-2 sm:px-4 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'enquiries'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
              }`}
            >
              <span className="text-sm sm:text-base">📋</span>
              <span className="sm:hidden">Leads</span>
              <span className="hidden sm:inline">Admissions</span>
              {newEnquiries > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-black sm:text-xs ${
                  activeTab === 'enquiries' ? 'bg-amber-400 text-navy' : 'bg-amber-500 text-white'
                }`}>
                  {newEnquiries}
                </span>
              )}
            </button>

            {/* Tab 2: Gallery */}
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl py-3 px-2 sm:px-4 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'gallery'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
              }`}
            >
              <span className="text-sm sm:text-base">📸</span>
              <span>Gallery</span>
              <span className={`text-[10px] font-bold sm:text-xs ${
                activeTab === 'gallery' ? 'text-white/80' : 'text-slate-400'
              }`}>
                ({galleryItems.length})
              </span>
            </button>

            {/* Tab 3: Official Certificates Vault */}
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl py-3 px-2 sm:px-4 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'certificates'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
              }`}
            >
              <span className="text-sm sm:text-base">🔒</span>
              <span className="sm:hidden">Vault</span>
              <span className="hidden sm:inline">Certificates Vault</span>
              <span className={`text-[10px] font-black sm:text-xs ${
                activeTab === 'certificates'
                  ? vaultUnlocked ? 'text-emerald-300' : 'text-amber-300'
                  : vaultUnlocked ? 'text-emerald-600' : 'text-amber-600'
              }`}>
                {vaultUnlocked ? '🔓 Open' : '🔒 Locked'}
              </span>
            </button>

            {/* Tab 4: Settings */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl py-3 px-2 sm:px-4 text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
              }`}
            >
              <span className="text-sm sm:text-base">⚙️</span>
              <span className="sm:hidden">Settings</span>
              <span className="hidden sm:inline">Settings & Info</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="mt-6 space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  placeholder="Search by student, parent, or mobile..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-sm rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:border-navy focus:bg-white focus:outline-none"
                />
                <button
                  onClick={fetchEnquiries}
                  className="rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navy-deep"
                >
                  Search
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">New Enquiries</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="VISIT_SCHEDULED">Visit Scheduled</option>
                  <option value="ADMITTED">Admitted</option>
                  <option value="REJECTED">Closed / Rejected</option>
                </select>

                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="ALL">All Classes</option>
                  <option value="Play Group">Play Group</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                </select>

                <button
                  onClick={() => {
                    setSearch('');
                    setStatusFilter('ALL');
                    setGradeFilter('ALL');
                  }}
                  className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
                  title="Download enquiries in Excel / CSV spreadsheet format"
                >
                  <span className="text-sm">📥</span>
                  <span>Download CSV ({enquiries.length})</span>
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3.5 px-4">Student & Class</th>
                      <th className="py-3.5 px-4">Parent Details</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Notes</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          No admission enquiries found matching the filters.
                        </td>
                      </tr>
                    ) : (
                      enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3.5 px-4">
                            <b className="block font-bold text-navy">{enq.student_name}</b>
                            <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                              {enq.grade}
                            </span>
                            {enq.message && (
                              <p className="mt-1 line-clamp-1 text-xs text-slate-500 italic">
                                &quot;{enq.message}&quot;
                              </p>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-medium">{enq.parent_name}</td>

                          <td className="py-3.5 px-4">
                            <a
                              href={`tel:${enq.phone}`}
                              className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700"
                            >
                              <span>📞</span> {enq.phone}
                            </a>
                            {enq.email && (
                              <span className="block text-xs text-slate-500">{enq.email}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-xs text-slate-500">
                            {new Date(enq.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={enq.status}
                              disabled={updatingId === enq.id}
                              onChange={(e) =>
                                updateStatus(enq.id, e.target.value as Enquiry['status'])
                              }
                              className={`rounded-xl border px-3 py-1 text-xs font-black uppercase tracking-wider ${
                                enq.status === 'NEW'
                                  ? 'border-amber-300 bg-amber-50 text-amber-700'
                                  : enq.status === 'CONTACTED'
                                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                                  : enq.status === 'VISIT_SCHEDULED'
                                  ? 'border-purple-300 bg-purple-50 text-purple-700'
                                  : enq.status === 'ADMITTED'
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                  : 'border-slate-300 bg-slate-50 text-slate-700'
                              }`}
                            >
                              <option value="NEW">New Lead</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="VISIT_SCHEDULED">Visit Scheduled</option>
                              <option value="ADMITTED">Admitted</option>
                              <option value="REJECTED">Closed / Rejected</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-xs">
                            {editingNotesId === enq.id ? (
                              <div className="flex flex-col gap-1">
                                <input
                                  type="text"
                                  value={notesText}
                                  onChange={(e) => setNotesText(e.target.value)}
                                  placeholder="e.g. Called on 10 Oct, visiting tomorrow"
                                  className="rounded border border-slate-300 px-2 py-1 text-xs"
                                />
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => saveNotes(enq.id)}
                                    className="rounded bg-navy px-2 py-0.5 text-[11px] text-white"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingNotesId(null)}
                                    className="rounded bg-slate-200 px-2 py-0.5 text-[11px]"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setEditingNotesId(enq.id);
                                  setNotesText(enq.notes || '');
                                }}
                                className="cursor-pointer text-slate-500 hover:text-navy"
                              >
                                {enq.notes ? (
                                  <span className="font-medium text-slate-700">{enq.notes}</span>
                                ) : (
                                  <span className="italic text-slate-400">+ Add note</span>
                                )}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() =>
                                openDeleteModal(
                                  'enquiry',
                                  enq.id,
                                  `${enq.student_name} (${enq.grade})`
                                )
                              }
                              className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                              title="Delete enquiry"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="mt-6 space-y-8">
            {/* Featured Photos Guidance & Explanatory Banner */}
            <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-amber-50/60 to-orange-50/50 p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-500 text-xl text-white shadow-md">
                    ★
                  </span>
                  <div>
                    <h3 className="font-display text-base font-black text-navy sm:text-lg">
                      Where do Featured Photos (चिह्नित तस्वीरें) show up on the website?
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      Photos marked as <b className="text-amber-800 font-bold">Featured</b> are highlighted at the very top of the School Gallery on both the <b className="text-navy font-semibold">Homepage (/#gallery)</b> and the <b className="text-navy font-semibold">Gallery Page (/gallery)</b> with a golden <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black text-white">★ Highlight</span> badge. Visitors can also click the <b className="text-amber-800 font-semibold">&quot;⭐ Highlights&quot;</b> filter tab to view only the spotlighted school moments.
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                  <div className="rounded-2xl border border-amber-300 bg-white/90 px-4 py-2 text-center shadow-xs">
                    <span className="block font-display text-lg font-black text-amber-600">
                      {featuredCount} / {galleryItems.length}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Featured Photos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload New Photo Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-black text-navy">
                    Upload New Photo to School Gallery
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Uploaded images are saved in the database and appear immediately on the website gallery.
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddPhoto} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Event / Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Annual Day Dance Performance"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Category *
                  </label>
                  <select
                    value={newPhotoCategory}
                    onChange={(e) => setNewPhotoCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value="Cultural Activities">Cultural Activities</option>
                    <option value="Campus Life">Campus Life</option>
                    <option value="Celebrations">Celebrations (Diwali, Republic Day)</option>
                    <option value="Yoga">Yoga & Mindful Learning</option>
                    <option value="Tulsi Poojan">Tulsi Poojan</option>
                    <option value="Art & Craft">Art & Craft</option>
                    <option value="Games">Games & Sports</option>
                    <option value="Student Market">Student Market</option>
                    <option value="Health Check-up">Health Check-up</option>
                    <option value="Parent-Teacher Meetings">Parent-Teacher Meetings</option>
                    <option value="Graduation">Graduation</option>
                  </select>
                </div>

                {/* Upload & Crop Section */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Select Image File (with Crop & Adjust)
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSelectFileForCrop(e, 'new')}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white"
                    />
                  </div>

                  {newPhotoUrl && (
                    <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-2">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-emerald-300">
                        <Image
                          src={newPhotoUrl}
                          alt="Cropped Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-xs font-bold text-emerald-800">
                          ✓ Image cropped & ready
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setCropperModal({
                              isOpen: true,
                              imageSrc: newPhotoUrl,
                              target: 'new',
                            })
                          }
                          className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900"
                        >
                          ✂️ Re-crop or rotate photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Or Paste Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="/images/... or https://..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Short Caption (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Students celebrating together on campus"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50/60 p-3">
                  <input
                    id="newPhotoFeatured"
                    type="checkbox"
                    checked={newPhotoIsFeatured}
                    onChange={(e) => setNewPhotoIsFeatured(e.target.checked)}
                    className="size-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="newPhotoFeatured" className="text-xs font-bold text-slate-800 cursor-pointer">
                    ⭐ Mark as Featured Photo (Spotlight at the top of Homepage &amp; Gallery Showcase)
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={addingPhoto || !newPhotoUrl}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-navy px-6 text-sm font-extrabold text-white shadow-md transition hover:bg-navy-deep disabled:opacity-50"
                  >
                    {addingPhoto ? 'Publishing to Gallery...' : '+ Add Photo to Website Gallery'}
                  </button>
                </div>
              </form>
            </div>

            {/* Current Gallery Grid with Filters & Controls */}
            <div>
              <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                {/* Tabs: All vs Featured */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGalleryFilterTab('ALL')}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                      galleryFilterTab === 'ALL'
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Photos ({galleryItems.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryFilterTab('FEATURED')}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                      galleryFilterTab === 'FEATURED'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
                    }`}
                  >
                    <span>⭐ Featured Highlights</span>
                    <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-[10px] font-black">
                      {featuredCount}
                    </span>
                  </button>
                </div>

                {/* Category & Search */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={galleryCategoryFilter}
                    onChange={(e) => setGalleryCategoryFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-navy focus:outline-none"
                  >
                    <option value="ALL">All Categories ({galleryItems.length})</option>
                    {uniqueCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat} ({galleryItems.filter((g) => g.category === cat).length})
                      </option>
                    ))}
                  </select>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search photos..."
                      value={gallerySearch}
                      onChange={(e) => setGallerySearch(e.target.value)}
                      className="w-44 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:border-navy focus:bg-white focus:outline-none sm:w-56"
                    />
                    {gallerySearch && (
                      <button
                        onClick={() => setGallerySearch('')}
                        className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Photos Count & Hint */}
              <div id="gallery-section-header" className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 scroll-mt-28">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    Showing {startItemIndex}–{endItemIndex} of {filteredGalleryItems.length} photos
                  </span>
                  {totalGalleryPages > 1 && (
                    <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                      Page {safeGalleryPage} of {totalGalleryPages}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Click <span className="font-bold text-amber-600">⭐</span> to toggle Featured · <span className="font-bold text-navy">✏️ Edit</span> to crop/modify
                </span>
              </div>

              {/* Empty State */}
              {filteredGalleryItems.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                  <span className="text-3xl">🖼️</span>
                  <h4 className="mt-2 text-sm font-extrabold text-navy">No photos found</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    No gallery images match the selected filter or search keyword.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryFilterTab('ALL');
                      setGalleryCategoryFilter('ALL');
                      setGallerySearch('');
                    }}
                    className="mt-4 rounded-xl bg-navy px-4 py-2 text-xs font-bold text-white shadow hover:bg-navy-deep"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {paginatedGalleryItems.map((item) => (
                      <div
                        key={item.id}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 20vw"
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />

                          {/* Single 1-Click Toggle Featured Button */}
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(item)}
                            title={
                              item.is_featured
                                ? 'Featured photo (Click to remove)'
                                : 'Click to mark as Featured'
                            }
                            className={`absolute top-2 right-2 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black shadow-md transition ${
                              item.is_featured
                                ? 'bg-amber-500 text-white hover:bg-amber-600'
                                : 'bg-black/55 text-white/90 hover:bg-amber-500 hover:text-white backdrop-blur-xs'
                            }`}
                          >
                            <span>{item.is_featured ? '★' : '☆'}</span>
                            <span>{item.is_featured ? 'Featured' : 'Feature'}</span>
                          </button>
                        </div>

                        <div className="p-3 flex flex-col flex-1 justify-between">
                          <div>
                            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-600">
                              {item.category}
                            </span>
                            <b className="mt-0.5 block truncate text-xs font-bold text-navy" title={item.title}>
                              {item.title}
                            </b>
                            {item.caption && (
                              <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500" title={item.caption}>
                                {item.caption}
                              </p>
                            )}
                          </div>

                          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
                            <span className="text-[10px] text-slate-400">
                              #{item.id}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openEditPhotoModal(item)}
                                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-navy hover:bg-navy hover:text-white transition"
                                title="Edit photo details & crop"
                              >
                                <span>✏️</span>
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => openDeleteModal('gallery', item.id, item.title)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                                title="Delete photo"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Bar (1-10 photos per page) */}
                  {totalGalleryPages > 1 && (
                    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row">
                      <div className="text-xs text-slate-600 font-medium">
                        Showing photos <b className="font-bold text-navy">{startItemIndex}–{endItemIndex}</b> of{' '}
                        <b className="font-bold text-navy">{filteredGalleryItems.length}</b> (10 per page)
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={safeGalleryPage <= 1}
                          onClick={() => {
                            const newP = Math.max(1, safeGalleryPage - 1);
                            setGalleryPage(newP);
                            document.getElementById('gallery-section-header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-navy transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-slate-50"
                        >
                          <span>←</span>
                          <span>Previous</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalGalleryPages }, (_, i) => i + 1)
                            .filter((p) => {
                              return p === 1 || p === totalGalleryPages || Math.abs(p - safeGalleryPage) <= 1;
                            })
                            .reduce<(number | string)[]>((acc, p, i, arr) => {
                              if (i > 0 && p - (arr[i - 1] as number) > 1) {
                                acc.push('...');
                              }
                              acc.push(p);
                              return acc;
                            }, [])
                            .map((p, idx) =>
                              p === '...' ? (
                                <span key={`dots-${idx}`} className="px-1 text-xs font-bold text-slate-400">
                                  …
                                </span>
                              ) : (
                                <button
                                  key={`page-${p}`}
                                  type="button"
                                  onClick={() => {
                                    setGalleryPage(Number(p));
                                    document.getElementById('gallery-section-header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }}
                                  className={`size-8 rounded-xl text-xs font-extrabold transition ${
                                    safeGalleryPage === p
                                      ? 'bg-navy text-white shadow-sm'
                                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  {p}
                                </button>
                              )
                            )}
                        </div>

                        <button
                          type="button"
                          disabled={safeGalleryPage >= totalGalleryPages}
                          onClick={() => {
                            const newP = Math.min(totalGalleryPages, safeGalleryPage + 1);
                            setGalleryPage(newP);
                            document.getElementById('gallery-section-header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-navy transition hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-slate-50"
                        >
                          <span>Next</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: SECRET CERTIFICATE VAULT (SECONDARY KEY PROTECTED) */}
        {/* ========================================================= */}
        {activeTab === 'certificates' && (
          <div className="mt-6 space-y-6">
            {!vaultUnlocked ? (
              /* LOCKED VAULT SCREEN */
              <div className="overflow-hidden rounded-3xl border border-[#d6a540]/40 bg-gradient-to-br from-[#06182e] via-[#0b2447] to-[#10335e] p-6 sm:p-10 text-white shadow-2xl">
                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-amber-400/20 text-3xl shadow-inner ring-1 ring-amber-400/40">
                    🔒
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1 text-xs font-bold text-amber-300">
                    <span>🛡️</span> Confidential Administrative Vault
                  </span>

                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-black text-white">
                    Official Certificates & Recognition Vault
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Official Department of Basic Education statutory certificates and registration order numbers have been <b>completely removed from the public website</b> and isolated in this vault. To access unmasked documents and downloads, enter the secondary <b>Certificate Vault Security Key</b>.
                  </p>

                  {vaultError && (
                    <div className="mt-4 rounded-xl border border-rose-400/40 bg-rose-500/20 p-3 text-xs font-bold text-rose-200">
                      ⚠️ {vaultError}
                    </div>
                  )}

                  {vaultSuccess && (
                    <div className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-500/20 p-3 text-xs font-bold text-emerald-200">
                      {vaultSuccess}
                    </div>
                  )}

                  <form onSubmit={handleUnlockVault} className="mt-6 space-y-3.5 text-left">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Certificate Vault Security Key
                      </label>
                      <div className="relative">
                        <input
                          type={vaultShowPassword ? 'text' : 'password'}
                          value={vaultPasswordInput}
                          onChange={(e) => setVaultPasswordInput(e.target.value)}
                          placeholder="Enter Certificate Vault Key"
                          required
                          disabled={vaultVerifying}
                          className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 pr-10 text-xs sm:text-sm font-medium text-white placeholder-slate-400 transition focus:border-amber-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                        />
                        <button
                          type="button"
                          onClick={() => setVaultShowPassword(!vaultShowPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-300 hover:text-white cursor-pointer"
                          title={vaultShowPassword ? 'Hide key' : 'Show key'}
                        >
                          {vaultShowPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={vaultVerifying}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sun px-5 py-3 text-xs sm:text-sm font-black text-navy shadow-lg transition hover:bg-amber-400 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                    >
                      {vaultVerifying ? (
                        <>
                          <span className="size-3.5 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                          <span>Verifying Vault Security Key...</span>
                        </>
                      ) : (
                        <>
                          <span>🔓</span>
                          <span>Unlock Certificate Vault</span>
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-4 text-[11px] text-slate-400">
                    🔒 Vault access is strictly restricted to authorized school administrators.
                  </p>
                </div>
              </div>
            ) : (
              /* UNLOCKED VAULT SCREEN */
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Certificate Vault Unlocked · Active Access</span>
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-black text-navy sm:text-3xl">
                      Official Government Recognition Certificates
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                      Legally certified recognition orders issued by the Office of the District Basic Education Officer (BSA), Jhansi.
                    </p>
                  </div>

                  <button
                    onClick={handleLockVault}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-navy transition shadow-xs cursor-pointer"
                  >
                    <span>🔒</span>
                    <span>Lock Vault Now</span>
                  </button>
                </div>

                {vaultSuccess && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
                    {vaultSuccess}
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Cert 1: Primary */}
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-200">
                        <span>✓</span> Permanent Recognition
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-xs font-bold text-slate-600 border border-slate-200">
                        Classes 1–5
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-black text-navy">
                      Pre-Primary & Primary School
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Office of the District Basic Education Officer, Jhansi
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200/80">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-bold">Order Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#9c271e] text-sm">JHA0936117190</span>
                          <button
                            type="button"
                            onClick={() => handleCopyOrderNo('JHA0936117190')}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600 hover:bg-white cursor-pointer"
                          >
                            {copiedVaultOrderNo === 'JHA0936117190' ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">Issue Date:</span>
                        <span className="font-bold text-navy">16 July 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">File Format:</span>
                        <span className="font-bold text-slate-600">Digital Signed PDF (677 KB)</span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                      <a
                        href="/api/certificates/download?doc=primary&download=1"
                        download
                        className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-navy-deep transition cursor-pointer"
                      >
                        <span>📥</span> Download PDF
                      </a>
                      <a
                        href="/api/certificates/download?doc=primary"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      >
                        <span>↗</span> Preview High-Res PDF
                      </a>
                    </div>
                  </div>

                  {/* Cert 2: Upper Primary */}
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-[#9c271e] border border-rose-200">
                        <span>✓</span> Provisional Recognition
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-xs font-bold text-slate-600 border border-slate-200">
                        Classes 6–8
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-black text-navy">
                      Upper Primary School
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Office of the District Basic Education Officer, Jhansi
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200/80">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-bold">Order Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#9c271e] text-sm">JHA09369070291</span>
                          <button
                            type="button"
                            onClick={() => handleCopyOrderNo('JHA09369070291')}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600 hover:bg-white cursor-pointer"
                          >
                            {copiedVaultOrderNo === 'JHA09369070291' ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">Validity:</span>
                        <span className="font-bold text-navy">25 Mar 2026 – 25 Mar 2027</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">File Format:</span>
                        <span className="font-bold text-slate-600">Digital Signed PDF (246 KB)</span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                      <a
                        href="/api/certificates/download?doc=upper-primary&download=1"
                        download
                        className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-navy-deep transition cursor-pointer"
                      >
                        <span>📥</span> Download PDF
                      </a>
                      <a
                        href="/api/certificates/download?doc=upper-primary"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      >
                        <span>↗</span> Preview High-Res PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {/* Card 1: Academic Admission Session Management */}
            <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-50/70 via-white to-white p-6 shadow-sm sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-900 border border-amber-300/60">
                    <span>🎒</span> Academic Admission Session
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                    Live Website-Wide
                  </span>
                </div>

                <h2 className="mt-3 font-display text-xl font-black text-navy">
                  Admission Session Control
                </h2>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Change the admission session year shown across the website — including Header banner, Hero badge, Admissions section, and Enquiry forms.
                </p>

                {sessionMsg && (
                  <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-300">
                    {sessionMsg}
                  </div>
                )}

                <form onSubmit={handleSaveSession} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700">
                      Current Active Session
                    </label>
                    <input
                      type="text"
                      required
                      value={admissionSession}
                      onChange={(e) => setAdmissionSession(e.target.value)}
                      placeholder="e.g. 2026–27"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-display text-base font-black text-navy shadow-inner focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Quick Session Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['2025–26', '2026–27', '2027–28', '2028–29', '2029–30'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAdmissionSession(preset)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                            admissionSession === preset
                              ? 'bg-amber-400 text-navy font-black ring-2 ring-amber-500/60 shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Visual Preview */}
                  <div className="rounded-2xl border border-amber-200/90 bg-amber-50/50 p-3.5 text-xs">
                    <span className="block font-bold text-slate-600 text-[10px] uppercase tracking-wider mb-1.5">
                      Live Website Badge Preview:
                    </span>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#9c271e] px-3.5 py-1 font-bold text-white shadow-xs">
                      <span className="size-2 rounded-full bg-sun animate-pulse" />
                      <span>Admissions Open · {admissionSession || '...'} Session</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingSession}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sun px-6 py-2.5 text-sm font-black text-navy shadow-md transition hover:bg-amber-400 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {savingSession ? (
                      <>
                        <span className="size-3.5 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                        <span>Saving Session...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>Save & Apply Session to Website</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Card 2: School Contact & Campus Info */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-black text-navy">School Contact & Campus Info</h2>
              <p className="mt-1 text-xs text-slate-500">
                Manage official school contact information and campus details.
              </p>

              {settingsMsg && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 border border-emerald-200">
                  {settingsMsg}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Helpline / Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Campus Address
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Visiting Hours
                  </label>
                  <input
                    type="text"
                    value={visitingHours}
                    onChange={(e) => setVisitingHours(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingSettings}
                  className="rounded-xl bg-navy px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:bg-navy-deep disabled:opacity-50"
                >
                  {savingSettings ? 'Saving...' : 'Save School Info'}
                </button>
              </form>
            </div>

            {/* Card 2: Admin Password */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-black text-navy">Admin Password & Security</h2>
              <p className="mt-1 text-xs text-slate-500">
                Manage secure credentials for the administrator account.
              </p>

              {passMsg && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 border border-emerald-200">
                  {passMsg}
                </div>
              )}
              {passErr && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-bold text-red-700 border border-red-200">
                  {passErr}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Current Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currPass}
                    onChange={(e) => setCurrPass(e.target.value)}
                    placeholder="Enter current password"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    New Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min 6 characters"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={changingPass}
                  className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-extrabold text-navy shadow-md transition hover:bg-amber-400 disabled:opacity-50"
                >
                  {changingPass ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Card 3: Certificate Vault Security Key */}
            <div className="rounded-3xl border border-amber-300/80 bg-amber-50/40 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔒</span>
                <h2 className="font-display text-xl font-black text-navy">Certificate Vault Key</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Separate master key protecting the secret government certificates vault.
              </p>

              {vaultPassMsg && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 border border-emerald-200">
                  {vaultPassMsg}
                </div>
              )}
              {vaultPassErr && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-bold text-red-700 border border-red-200">
                  {vaultPassErr}
                </div>
              )}

              <form onSubmit={handleChangeVaultPassword} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    Current Vault Key
                  </label>
                  <input
                    type="password"
                    required
                    value={currVaultPass}
                    onChange={(e) => setCurrVaultPass(e.target.value)}
                    placeholder="Enter current vault key"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600">
                    New Vault Key
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newVaultPass}
                    onChange={(e) => setNewVaultPass(e.target.value)}
                    placeholder="Min 6 characters"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-navy focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={changingVaultPass}
                  className="rounded-xl bg-navy px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:bg-navy-deep disabled:opacity-50 cursor-pointer"
                >
                  {changingVaultPass ? 'Updating...' : 'Update Vault Key'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* 1. COMPACT DELETE CONFIRMATION POPUP MODAL (NO ALERT)      */}
      {/* ========================================================= */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-3">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </div>

              <h3 className="font-display text-lg font-black text-navy">
                Delete {deleteModal.type === 'enquiry' ? 'Enquiry' : 'Photo'}?
              </h3>

              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-800">&quot;{deleteModal.name}&quot;</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2.5 border-t border-slate-100 pt-4">
              <button
                type="button"
                disabled={deletingInProgress}
                onClick={() =>
                  setDeleteModal({ isOpen: false, type: 'enquiry', id: null, name: '' })
                }
                className="w-1/2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deletingInProgress}
                onClick={confirmDelete}
                className="w-1/2 inline-flex items-center justify-center gap-1 rounded-xl bg-red-600 py-2 text-xs font-bold text-white shadow-md shadow-red-500/25 hover:bg-red-700 transition disabled:opacity-50"
              >
                {deletingInProgress ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. COMPACT & CLEAN EDIT PHOTO MODAL FOR GALLERY            */}
      {/* ========================================================= */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 block">
                  Gallery Photo
                </span>
                <h3 className="font-display text-lg font-black text-navy leading-none">
                  Edit Photo Details
                </h3>
              </div>

              <button
                onClick={() => setEditingPhoto(null)}
                className="size-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-navy grid place-items-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Content */}
            <form onSubmit={handleSaveEditPhoto} className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
              {/* Compact Thumbnail Preview & Crop Trigger Row */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-slate-50 p-2.5 border border-slate-200/80">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-200 border border-slate-300">
                  {editImageUrl ? (
                    <Image
                      src={editImageUrl}
                      alt={editTitle || 'Preview'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-[10px] text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Change / Crop Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSelectFileForCrop(e, 'edit')}
                    className="block w-full text-[11px] text-slate-500 file:mr-2 file:rounded-md file:border-0 file:bg-navy file:px-2.5 file:py-1 file:text-[10px] file:font-bold file:text-white"
                  />
                  {editImageUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setCropperModal({
                          isOpen: true,
                          imageSrc: editImageUrl,
                          target: 'edit',
                        })
                      }
                      className="mt-1 text-[11px] font-bold text-amber-600 underline hover:text-amber-800"
                    >
                      ✂️ Re-crop or rotate this photo
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Photo / Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs focus:border-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Category *
                </label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="Cultural Activities">Cultural Activities</option>
                  <option value="Campus Life">Campus Life</option>
                  <option value="Celebrations">Celebrations</option>
                  <option value="Yoga">Yoga & Mindful Learning</option>
                  <option value="Art & Craft">Art & Craft</option>
                  <option value="Sports & Games">Sports & Games</option>
                  <option value="Parent-Teacher Meetings">Parent-Teacher Meetings</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Or Image URL Path
                </label>
                <input
                  type="text"
                  value={editImageUrl}
                  onChange={(e) => setEditImageUrl(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs focus:border-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Short Caption
                </label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  placeholder="Optional brief description"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs focus:border-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={editIsFeatured}
                  onChange={(e) => setEditIsFeatured(e.target.checked)}
                  className="size-3.5 rounded border-slate-300 text-navy focus:ring-navy"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-700">
                  Show as Featured Photo
                </label>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-3.5 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingEditPhoto}
                  className="rounded-xl bg-navy px-5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-navy-deep disabled:opacity-50"
                >
                  {savingEditPhoto ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. INTERACTIVE IMAGE CROPPER MODAL (CROP, ZOOM & ROTATE)   */}
      {/* ========================================================= */}
      {cropperModal.isOpen && (
        <ImageCropperModal
          imageSrc={cropperModal.imageSrc}
          onCropCancel={() =>
            setCropperModal({ isOpen: false, imageSrc: '', target: 'new' })
          }
          onCropDone={handleCropDone}
        />
      )}
    </div>
  );
}
