"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession, clearAdminSession, loadMedia, saveMedia } from "@/lib/adminAuth";
import { MediaItem, CATEGORIES, MediaCategory } from "@/lib/mediaStore";

// ─── Types ───────────────────────────────────────────────────────────────────
type MainTab = "gallery" | "team" | "services" | "stats";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  img: string;
}

interface ServiceItem {
  id: string;
  section: "roofing" | "interior";
  icon: string;
  title: string;
  desc: string;
  features: string;
  img: string;
  imgAlt: string;
}

const TEAM_KEY = "evan_team_members";
const SERVICES_KEY = "evan_services_items";

const DEFAULT_TEAM: TeamMember[] = [
  { id: "t1", name: "Evan Kariuki", role: "Founder & Lead Roofer", bio: "With over 14 years in the roofing industry, Evan founded EvanRoofs with a clear mission: exceptional quality with honest pricing.", img: "https://picsum.photos/seed/person_evan/300/300" },
  { id: "t2", name: "Grace Njeri", role: "Interior Design Lead", bio: "Grace brings creativity and precision to every interior project, transforming spaces into functional, beautiful environments.", img: "https://picsum.photos/seed/person_grace/300/300" },
  { id: "t3", name: "Michael Oduya", role: "Site Supervisor", bio: "Michael ensures every project runs smoothly. His coordination skills keep teams efficient and clients informed.", img: "https://picsum.photos/seed/person_michael/300/300" },
  { id: "t4", name: "Priscilla Wanjiku", role: "Client Relations Manager", bio: "Priscilla manages client relationships and ensures every customer feels heard and well-informed throughout the process.", img: "https://picsum.photos/seed/person_priscilla/300/300" },
  { id: "t5", name: "Joseph Maina", role: "Senior Roofer", bio: "With 10+ years of hands-on experience, Joseph leads installation crews and specialises in complex structures.", img: "https://picsum.photos/seed/person_joseph/300/300" },
  { id: "t6", name: "Lydia Achieng", role: "Estimator & Project Planner", bio: "Lydia handles assessments and cost estimations, ensuring clients receive accurate quotes and planned timelines.", img: "https://picsum.photos/seed/person_lydia/300/300" },
];

const DEFAULT_SERVICES: ServiceItem[] = [
  { id: "s1", section: "roofing", icon: "🏠", title: "New Roof Installation", desc: "Complete roofing systems for new constructions using clay tiles, iron sheets, concrete tiles, and more.", features: "Material consultation,Structural assessment,Professional installation,Warranty", img: "https://picsum.photos/seed/svc_install/600/400", imgAlt: "New roof installation" },
  { id: "s2", section: "roofing", icon: "🔧", title: "Roof Repair & Maintenance", desc: "Fast and reliable repairs for leaking roofs, broken tiles, damaged flashing, and sagging structures.", features: "Emergency repair,Leak detection,Tile replacement,Structural reinforcement", img: "https://picsum.photos/seed/svc_repair/600/400", imgAlt: "Roof repair" },
  { id: "s3", section: "interior", icon: "✨", title: "False Ceiling Installation", desc: "Elegant gypsum, PVC, and suspended grid ceilings with lighting integration options.", features: "Gypsum ceilings,PVC panels,Suspended grid,Lighting design", img: "https://picsum.photos/seed/svc_ceiling/600/400", imgAlt: "False ceiling installation" },
  { id: "s4", section: "interior", icon: "🎨", title: "Interior Design Consultation", desc: "Full design services from concept to completion — space planning, colours, furniture, and 3D visualisation.", features: "Space planning,Colour consultation,Furniture arrangement,3D visualisation", img: "https://picsum.photos/seed/svc_design/600/400", imgAlt: "Interior design consultation" },
];

function loadTeam(): TeamMember[] {
  if (typeof window === "undefined") return DEFAULT_TEAM;
  try { const r = localStorage.getItem(TEAM_KEY); return r ? JSON.parse(r) : DEFAULT_TEAM; } catch { return DEFAULT_TEAM; }
}
function saveTeam(t: TeamMember[]) { if (typeof window !== "undefined") localStorage.setItem(TEAM_KEY, JSON.stringify(t)); }
function loadServices(): ServiceItem[] {
  if (typeof window === "undefined") return DEFAULT_SERVICES;
  try { const r = localStorage.getItem(SERVICES_KEY); return r ? JSON.parse(r) : DEFAULT_SERVICES; } catch { return DEFAULT_SERVICES; }
}
function saveServices(s: ServiceItem[]) { if (typeof window !== "undefined") localStorage.setItem(SERVICES_KEY, JSON.stringify(s)); }

// ─── Blank forms ──────────────────────────────────────────────────────────────
const BLANK_MEDIA: Omit<MediaItem, "id" | "uploadedAt"> = {
  type: "image", title: "", description: "", category: "Roof Installation",
  location: "", year: new Date().getFullYear().toString(), src: "", thumb: "", featured: false,
};
const BLANK_TEAM: Omit<TeamMember, "id"> = { name: "", role: "", bio: "", img: "" };
const BLANK_SVC: Omit<ServiceItem, "id"> = { section: "roofing", icon: "🏠", title: "", desc: "", features: "", img: "", imgAlt: "" };

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [mainTab, setMainTab] = useState<MainTab>("gallery");

  // Media state
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [mediaForm, setMediaForm] = useState(BLANK_MEDIA);
  const [mediaEditId, setMediaEditId] = useState<string | null>(null);
  const [mediaFormOpen, setMediaFormOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Team state
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [teamForm, setTeamForm] = useState(BLANK_TEAM);
  const [teamEditId, setTeamEditId] = useState<string | null>(null);
  const [teamFormOpen, setTeamFormOpen] = useState(false);

  // Services state
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [svcForm, setSvcForm] = useState(BLANK_SVC);
  const [svcEditId, setSvcEditId] = useState<string | null>(null);
  const [svcFormOpen, setSvcFormOpen] = useState(false);

  // UI
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: "media" | "team" | "service" } | null>(null);
  const [filterCat, setFilterCat] = useState<"All" | MediaCategory>("All");

  useEffect(() => {
    if (!getAdminSession()) { router.replace("/admin/login"); return; }
    setAuthed(true);
    setMedia(loadMedia());
    setTeam(loadTeam());
    setServices(loadServices());
  }, [router]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Media helpers ────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { const d = ev.target?.result as string; setPreviewSrc(d); setMediaForm((f) => ({ ...f, src: d, thumb: d })); };
    reader.readAsDataURL(file);
  };

  const resetMediaForm = () => { setMediaForm(BLANK_MEDIA); setPreviewSrc(""); setMediaEditId(null); setMediaFormOpen(false); if (fileRef.current) fileRef.current.value = ""; };

  const saveMediaItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.title || !mediaForm.src) { showToast("Title and media source are required.", "error"); return; }
    setSaving(true); await new Promise((r) => setTimeout(r, 500));
    const updated = mediaEditId
      ? media.map((m) => m.id === mediaEditId ? { ...m, ...mediaForm } : m)
      : [{ ...mediaForm, id: `m${Date.now()}`, uploadedAt: new Date().toISOString().split("T")[0], thumb: mediaForm.thumb || mediaForm.src }, ...media];
    setMedia(updated); saveMedia(updated); setSaving(false);
    showToast(mediaEditId ? "Media updated!" : "Media added to gallery!");
    resetMediaForm();
  };

  const startEditMedia = (item: MediaItem) => {
    setMediaForm({ type: item.type, title: item.title, description: item.description, category: item.category, location: item.location, year: item.year, src: item.src, thumb: item.thumb, featured: item.featured });
    setPreviewSrc(item.thumb || item.src); setMediaEditId(item.id); setMediaFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteMedia = (id: string) => { const u = media.filter((m) => m.id !== id); setMedia(u); saveMedia(u); showToast("Item deleted."); };

  // ── Team helpers ─────────────────────────────────────────────────────────
  const resetTeamForm = () => { setTeamForm(BLANK_TEAM); setTeamEditId(null); setTeamFormOpen(false); };

  const saveTeamItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.role) { showToast("Name and role are required.", "error"); return; }
    setSaving(true); await new Promise((r) => setTimeout(r, 400));
    const updated = teamEditId
      ? team.map((m) => m.id === teamEditId ? { ...m, ...teamForm } : m)
      : [...team, { ...teamForm, id: `t${Date.now()}` }];
    setTeam(updated); saveTeam(updated); setSaving(false);
    showToast(teamEditId ? "Team member updated!" : "Team member added!");
    resetTeamForm();
  };

  const startEditTeam = (m: TeamMember) => {
    setTeamForm({ name: m.name, role: m.role, bio: m.bio, img: m.img });
    setTeamEditId(m.id); setTeamFormOpen(true); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteTeam = (id: string) => { const u = team.filter((m) => m.id !== id); setTeam(u); saveTeam(u); showToast("Team member removed."); };

  // ── Service helpers ──────────────────────────────────────────────────────
  const resetSvcForm = () => { setSvcForm(BLANK_SVC); setSvcEditId(null); setSvcFormOpen(false); };

  const saveSvcItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!svcForm.title || !svcForm.desc) { showToast("Title and description required.", "error"); return; }
    setSaving(true); await new Promise((r) => setTimeout(r, 400));
    const updated = svcEditId
      ? services.map((s) => s.id === svcEditId ? { ...s, ...svcForm } : s)
      : [...services, { ...svcForm, id: `s${Date.now()}` }];
    setServices(updated); saveServices(updated); setSaving(false);
    showToast(svcEditId ? "Service updated!" : "Service added!");
    resetSvcForm();
  };

  const startEditSvc = (s: ServiceItem) => {
    setSvcForm({ section: s.section, icon: s.icon, title: s.title, desc: s.desc, features: s.features, img: s.img, imgAlt: s.imgAlt });
    setSvcEditId(s.id); setSvcFormOpen(true); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteSvc = (id: string) => { const u = services.filter((s) => s.id !== id); setServices(u); saveServices(u); showToast("Service removed."); };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "media") deleteMedia(deleteTarget.id);
    if (deleteTarget.type === "team") deleteTeam(deleteTarget.id);
    if (deleteTarget.type === "service") deleteSvc(deleteTarget.id);
    setDeleteTarget(null);
  };

  const displayed = filterCat === "All" ? media : media.filter((m) => m.category === filterCat);

  if (!authed) return <div className="min-h-screen bg-roofGrey-900 flex items-center justify-center"><p className="text-roofGrey-400">Checking authentication…</p></div>;

  const stats = { total: media.length, images: media.filter((m) => m.type === "image").length, videos: media.filter((m) => m.type === "video").length, featured: media.filter((m) => m.featured).length };

  return (
    <div className="min-h-screen bg-roofGrey-50">
      {/* ── Header ── */}
      <header className="bg-roofGrey-900 sticky top-0 z-40 shadow-xl">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brown-500 rounded flex items-center justify-center text-white font-bold font-heading text-lg">E</div>
            <div>
              <p className="text-white font-heading font-bold text-sm">EvanRoofs Admin</p>
              <p className="text-roofGrey-500 text-xs">Content Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/gallery" target="_blank" className="text-roofGrey-400 hover:text-white text-xs border border-roofGrey-700 px-3 py-1.5 rounded hover:border-roofGrey-500 transition">
              View Site ↗
            </a>
            <button onClick={() => { clearAdminSession(); router.replace("/admin/login"); }}
              className="text-roofRed-400 text-xs border border-roofRed-800 px-3 py-1.5 rounded hover:border-roofRed-600 transition">
              Sign Out
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="px-6 md:px-10 flex gap-1 border-t border-roofGrey-800 overflow-x-auto">
          {([
            { key: "gallery", label: "📋 Gallery", count: stats.total },
            { key: "team", label: "👥 Team", count: team.length },
            { key: "services", label: "🔧 Services", count: services.length },
            { key: "stats", label: "📊 Stats" },
          ] as const).map((t) => (
            <button key={t.key}
              onClick={() => { setMainTab(t.key as MainTab); resetMediaForm(); resetTeamForm(); resetSvcForm(); }}
              className={`px-5 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${mainTab === t.key ? "border-brown-500 text-brown-400" : "border-transparent text-roofGrey-500 hover:text-roofGrey-300"}`}>
              {t.label}
              {"count" in t && t.count !== undefined && (
                <span className="ml-1.5 bg-roofGrey-700 text-roofGrey-300 text-xs px-1.5 py-0.5 rounded-full">{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-white text-sm flex items-center gap-2 ${toast.type === "success" ? "bg-roofGreen-600" : "bg-roofRed-600"}`}>
          {toast.type === "success" ? "✅" : "❌"} {toast.msg}
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="text-5xl mb-4">🗑️</div>
            <h3 className="font-heading font-bold text-xl text-roofGrey-800 mb-2">Delete Item?</h3>
            <p className="text-roofGrey-500 text-sm mb-6">This will permanently remove this item.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteTarget(null)} className="btn-secondary text-xs">Cancel</button>
              <button onClick={handleDeleteConfirm} className="bg-roofRed-500 text-white px-6 py-2.5 rounded text-xs font-medium hover:bg-roofRed-600 uppercase tracking-wider">Delete</button>
            </div>
          </div>
        </div>
      )}

      <main className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

        {/* ════════════════════ GALLERY TAB ════════════════════ */}
        {mainTab === "gallery" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="font-heading text-2xl text-roofGrey-800 font-bold">Gallery ({media.length} items)</h2>
              <button onClick={() => { resetMediaForm(); setMediaFormOpen(true); }}
                className="btn-primary text-xs">➕ Add New Media</button>
            </div>

            {/* ── Media Form (inline slide-down) ── */}
            {mediaFormOpen && (
              <div className="bg-white rounded-2xl shadow-lg border border-roofGrey-100 p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-bold text-roofGrey-800">
                    {mediaEditId ? "✏️ Edit Media Item" : "➕ Add New Media"}
                  </h3>
                  {/* ← CANCEL / CLOSE BUTTON */}
                  <button
                    type="button"
                    onClick={resetMediaForm}
                    className="flex items-center gap-2 text-roofGrey-500 hover:text-roofRed-500 border border-roofGrey-200 hover:border-roofRed-300 px-4 py-2 rounded-lg text-sm transition-colors"
                    aria-label="Cancel and close form"
                  >
                    <span className="text-lg leading-none">×</span> Cancel
                  </button>
                </div>

                <form onSubmit={saveMediaItem} className="space-y-6">
                  {/* Type */}
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-3">Media Type *</label>
                    <div className="flex gap-3">
                      {(["image", "video"] as const).map((t) => (
                        <button key={t} type="button"
                          onClick={() => setMediaForm((f) => ({ ...f, type: t }))}
                          className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium transition-all ${mediaForm.type === t ? "border-brown-500 bg-brown-50 text-brown-700" : "border-roofGrey-200 text-roofGrey-500 hover:border-roofGrey-300"}`}>
                          {t === "image" ? "📸 Photo / Image" : "🎬 Video"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Source */}
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-3">
                      {mediaForm.type === "image" ? "Upload Image *" : "Video Embed URL *"}
                    </label>
                    {mediaForm.type === "image" ? (
                      <div className="space-y-3">
                        <div onClick={() => fileRef.current?.click()}
                          className="border-2 border-dashed border-roofGrey-200 rounded-xl p-8 text-center cursor-pointer hover:border-brown-400 hover:bg-brown-50 transition-all">
                          {previewSrc && previewSrc.startsWith("data:") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewSrc} alt="preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                          ) : (
                            <><div className="text-4xl mb-3">📁</div><p className="text-roofGrey-500 text-sm">Click to upload or drag & drop</p><p className="text-roofGrey-400 text-xs mt-1">JPG, PNG, WEBP up to 10MB</p></>
                          )}
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        <p className="text-roofGrey-400 text-xs text-center">— or paste a URL —</p>
                        <input type="url" name="src" value={mediaForm.src.startsWith("data:") ? "" : mediaForm.src}
                          onChange={(e) => { setMediaForm((f) => ({ ...f, src: e.target.value, thumb: e.target.value })); setPreviewSrc(e.target.value); }}
                          placeholder="https://example.com/image.jpg"
                          className="w-full border border-roofGrey-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brown-400" />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input type="url" value={mediaForm.src} required
                          onChange={(e) => setMediaForm((f) => ({ ...f, src: e.target.value }))}
                          placeholder="https://www.youtube.com/embed/VIDEO_ID"
                          className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                        {mediaForm.src && <div className="rounded-lg overflow-hidden border aspect-video"><iframe src={mediaForm.src} title="preview" className="w-full h-full" allowFullScreen /></div>}
                        <input type="url" value={mediaForm.thumb} onChange={(e) => setMediaForm((f) => ({ ...f, thumb: e.target.value }))}
                          placeholder="Thumbnail URL (optional)" className="w-full border border-roofGrey-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brown-400" />
                      </div>
                    )}
                  </div>

                  {/* Title + description */}
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Title *</label>
                    <input type="text" value={mediaForm.title} required onChange={(e) => setMediaForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. Stone-coated tile installation – Westlands"
                      className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                  </div>
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Description</label>
                    <textarea rows={3} value={mediaForm.description} onChange={(e) => setMediaForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Describe this project briefly..."
                      className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400 resize-none" />
                  </div>

                  {/* Category + Location + Year */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Category *</label>
                      <select value={mediaForm.category} onChange={(e) => setMediaForm((f) => ({ ...f, category: e.target.value as MediaCategory }))}
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400 bg-white">
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Location</label>
                      <input type="text" value={mediaForm.location} onChange={(e) => setMediaForm((f) => ({ ...f, location: e.target.value }))}
                        placeholder="Karen, Nairobi"
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                    </div>
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Year</label>
                      <input type="number" value={mediaForm.year} min={2010} max={2035} onChange={(e) => setMediaForm((f) => ({ ...f, year: e.target.value }))}
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                    </div>
                  </div>

                  {/* Featured */}
                  <label className="flex items-center gap-3 p-4 bg-brown-50 border border-brown-100 rounded-lg cursor-pointer">
                    <input type="checkbox" checked={mediaForm.featured} onChange={(e) => setMediaForm((f) => ({ ...f, featured: e.target.checked }))}
                      className="w-5 h-5 accent-brown-500" />
                    <div>
                      <p className="text-roofGrey-800 text-sm font-medium">Mark as Featured</p>
                      <p className="text-roofGrey-500 text-xs">Featured items appear at the top of the gallery.</p>
                    </div>
                  </label>

                  <div className="flex gap-4">
                    <button type="submit" disabled={saving}
                      className="flex-1 bg-brown-500 hover:bg-brown-600 disabled:bg-roofGrey-300 text-white py-4 rounded-lg font-medium tracking-wider uppercase text-sm transition-colors">
                      {saving ? "Saving…" : mediaEditId ? "✓ Update Item" : "✓ Publish to Gallery"}
                    </button>
                    <button type="button" onClick={resetMediaForm}
                      className="px-6 border border-roofGrey-200 text-roofGrey-500 rounded-lg hover:bg-roofGrey-50 text-sm transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-5">
              {(["All", ...CATEGORIES] as const).map((c) => (
                <button key={c} onClick={() => setFilterCat(c as "All" | MediaCategory)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${filterCat === c ? "bg-brown-500 text-white" : "bg-white text-roofGrey-600 border border-roofGrey-200 hover:border-brown-300"}`}>
                  {c} {c !== "All" && `(${media.filter((m) => m.category === c).length})`}
                </button>
              ))}
            </div>

            {displayed.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-roofGrey-500">No media items yet.</p>
                <button onClick={() => setMediaFormOpen(true)} className="btn-primary mt-4 text-xs">Add Media</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {displayed.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow overflow-hidden border border-roofGrey-100 group">
                    <div className="relative h-40 bg-roofGrey-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.thumb || item.src} alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/200/150`; }} />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded">{item.type === "video" ? "🎬" : "📸"}</span>
                        {item.featured && <span className="bg-brown-500 text-white text-xs px-2 py-0.5 rounded">★</span>}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-brown-500 text-xs font-medium uppercase mb-0.5">{item.category}</p>
                      <h3 className="font-heading font-bold text-roofGrey-800 text-sm leading-tight line-clamp-2 mb-1">{item.title}</h3>
                      <p className="text-roofGrey-400 text-xs mb-3">📍 {item.location} · {item.year}</p>
                      <div className="flex gap-2 flex-wrap">
                        <button onClick={() => startEditMedia(item)}
                          className="flex-1 text-xs border border-roofGrey-200 text-roofGrey-600 py-1.5 rounded hover:border-brown-400 hover:text-brown-500 transition-colors">
                          ✏️ Edit
                        </button>
                        <button onClick={() => { const u = media.map((m) => m.id === item.id ? { ...m, featured: !m.featured } : m); setMedia(u); saveMedia(u); showToast("Featured status updated."); }}
                          className={`flex-1 text-xs border py-1.5 rounded transition-colors ${item.featured ? "border-brown-300 text-brown-500 bg-brown-50" : "border-roofGrey-200 text-roofGrey-500"}`}>
                          {item.featured ? "★ Featured" : "☆ Feature"}
                        </button>
                        <button onClick={() => setDeleteTarget({ id: item.id, type: "media" })}
                          className="text-xs border border-roofRed-200 text-roofRed-400 py-1.5 px-2 rounded hover:bg-roofRed-50 transition-colors">🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════ TEAM TAB ════════════════════ */}
        {mainTab === "team" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="font-heading text-2xl text-roofGrey-800 font-bold">Team Members ({team.length})</h2>
              <button onClick={() => { resetTeamForm(); setTeamFormOpen(true); }} className="btn-primary text-xs">➕ Add Team Member</button>
            </div>

            {teamFormOpen && (
              <div className="bg-white rounded-2xl shadow-lg border border-roofGrey-100 p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-bold text-roofGrey-800">{teamEditId ? "✏️ Edit Member" : "➕ Add Member"}</h3>
                  {/* ← CANCEL BUTTON */}
                  <button type="button" onClick={resetTeamForm}
                    className="flex items-center gap-2 text-roofGrey-500 hover:text-roofRed-500 border border-roofGrey-200 hover:border-roofRed-300 px-4 py-2 rounded-lg text-sm transition-colors">
                    <span className="text-lg leading-none">×</span> Cancel
                  </button>
                </div>
                <form onSubmit={saveTeamItem} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Full Name *</label>
                      <input type="text" required value={teamForm.name} onChange={(e) => setTeamForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Grace Njeri"
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                    </div>
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Role / Title *</label>
                      <input type="text" required value={teamForm.role} onChange={(e) => setTeamForm((f) => ({ ...f, role: e.target.value }))}
                        placeholder="e.g. Site Supervisor"
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Short Bio</label>
                    <textarea rows={3} value={teamForm.bio} onChange={(e) => setTeamForm((f) => ({ ...f, bio: e.target.value }))}
                      placeholder="A brief description of this team member's role and expertise..."
                      className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400 resize-none" />
                  </div>
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Photo URL</label>
                    <div className="flex gap-3 items-center">
                      {teamForm.img && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={teamForm.img} alt="preview" className="w-14 h-14 rounded-full object-cover border-2 border-roofGrey-200" />
                      )}
                      <input type="url" value={teamForm.img} onChange={(e) => setTeamForm((f) => ({ ...f, img: e.target.value }))}
                        placeholder="https://example.com/photo.jpg"
                        className="flex-1 border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={saving}
                      className="flex-1 bg-brown-500 hover:bg-brown-600 disabled:bg-roofGrey-300 text-white py-4 rounded-lg font-medium tracking-wider uppercase text-sm transition-colors">
                      {saving ? "Saving…" : teamEditId ? "✓ Update Member" : "✓ Add to Team"}
                    </button>
                    <button type="button" onClick={resetTeamForm}
                      className="px-6 border border-roofGrey-200 text-roofGrey-500 rounded-lg hover:bg-roofGrey-50 text-sm transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow overflow-hidden border border-roofGrey-100">
                  <div className="flex items-center gap-4 p-5 border-b border-roofGrey-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={member.img || `https://picsum.photos/seed/${member.id}/80/80`} alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-roofGrey-100"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${member.id}/80/80`; }} />
                    <div>
                      <h3 className="font-heading font-bold text-roofGrey-800">{member.name}</h3>
                      <p className="text-brown-500 text-xs font-medium uppercase tracking-wide mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-roofGrey-500 text-sm leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
                    <div className="flex gap-2">
                      <button onClick={() => startEditTeam(member)}
                        className="flex-1 text-xs border border-roofGrey-200 text-roofGrey-600 py-1.5 rounded hover:border-brown-400 hover:text-brown-500 transition-colors">
                        ✏️ Edit
                      </button>
                      <button onClick={() => setDeleteTarget({ id: member.id, type: "team" })}
                        className="text-xs border border-roofRed-200 text-roofRed-400 py-1.5 px-3 rounded hover:bg-roofRed-50 transition-colors">🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════ SERVICES TAB ════════════════════ */}
        {mainTab === "services" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="font-heading text-2xl text-roofGrey-800 font-bold">Services ({services.length})</h2>
              <button onClick={() => { resetSvcForm(); setSvcFormOpen(true); }} className="btn-primary text-xs">➕ Add Service</button>
            </div>

            {svcFormOpen && (
              <div className="bg-white rounded-2xl shadow-lg border border-roofGrey-100 p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl font-bold text-roofGrey-800">{svcEditId ? "✏️ Edit Service" : "➕ Add Service"}</h3>
                  {/* ← CANCEL BUTTON */}
                  <button type="button" onClick={resetSvcForm}
                    className="flex items-center gap-2 text-roofGrey-500 hover:text-roofRed-500 border border-roofGrey-200 hover:border-roofRed-300 px-4 py-2 rounded-lg text-sm transition-colors">
                    <span className="text-lg leading-none">×</span> Cancel
                  </button>
                </div>
                <form onSubmit={saveSvcItem} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Section *</label>
                      <select value={svcForm.section} onChange={(e) => setSvcForm((f) => ({ ...f, section: e.target.value as "roofing" | "interior" }))}
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400 bg-white">
                        <option value="roofing">🏠 Roofing</option>
                        <option value="interior">✨ Interior Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Icon (emoji)</label>
                      <input type="text" value={svcForm.icon} onChange={(e) => setSvcForm((f) => ({ ...f, icon: e.target.value }))}
                        placeholder="🔧" maxLength={4}
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-2xl outline-none focus:border-brown-400 text-center" />
                    </div>
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Title *</label>
                      <input type="text" required value={svcForm.title} onChange={(e) => setSvcForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="e.g. Waterproofing"
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Description *</label>
                    <textarea rows={3} required value={svcForm.desc} onChange={(e) => setSvcForm((f) => ({ ...f, desc: e.target.value }))}
                      placeholder="Describe this service in 1–2 sentences..."
                      className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400 resize-none" />
                  </div>
                  <div>
                    <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Features (comma-separated)</label>
                    <input type="text" value={svcForm.features} onChange={(e) => setSvcForm((f) => ({ ...f, features: e.target.value }))}
                      placeholder="Feature 1, Feature 2, Feature 3, Feature 4"
                      className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Image URL</label>
                      <div className="flex gap-3 items-center">
                        {svcForm.img && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={svcForm.img} alt="preview" className="w-16 h-12 rounded object-cover border border-roofGrey-200" />
                        )}
                        <input type="url" value={svcForm.img} onChange={(e) => setSvcForm((f) => ({ ...f, img: e.target.value }))}
                          placeholder="https://example.com/service.jpg"
                          className="flex-1 border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-roofGrey-600 text-xs font-medium uppercase tracking-wider mb-2">Image Alt Text</label>
                      <input type="text" value={svcForm.imgAlt} onChange={(e) => setSvcForm((f) => ({ ...f, imgAlt: e.target.value }))}
                        placeholder="Descriptive alt text for SEO"
                        className="w-full border border-roofGrey-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-brown-400" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={saving}
                      className="flex-1 bg-roofGreen-500 hover:bg-roofGreen-600 disabled:bg-roofGrey-300 text-white py-4 rounded-lg font-medium tracking-wider uppercase text-sm transition-colors">
                      {saving ? "Saving…" : svcEditId ? "✓ Update Service" : "✓ Add Service"}
                    </button>
                    <button type="button" onClick={resetSvcForm}
                      className="px-6 border border-roofGrey-200 text-roofGrey-500 rounded-lg hover:bg-roofGrey-50 text-sm transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s) => (
                <div key={s.id} className="bg-white rounded-xl shadow overflow-hidden border border-roofGrey-100 flex gap-0">
                  {s.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.img} alt={s.imgAlt} className="w-28 h-auto object-cover flex-shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{s.icon}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.section === "roofing" ? "bg-brown-100 text-brown-600" : "bg-roofGreen-100 text-roofGreen-700"}`}>
                          {s.section === "roofing" ? "Roofing" : "Interior"}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-roofGrey-800 mb-1">{s.title}</h3>
                      <p className="text-roofGrey-500 text-xs leading-relaxed line-clamp-2">{s.desc}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => startEditSvc(s)}
                        className="flex-1 text-xs border border-roofGrey-200 text-roofGrey-600 py-1.5 rounded hover:border-brown-400 hover:text-brown-500 transition-colors">
                        ✏️ Edit
                      </button>
                      <button onClick={() => setDeleteTarget({ id: s.id, type: "service" })}
                        className="text-xs border border-roofRed-200 text-roofRed-400 py-1.5 px-3 rounded hover:bg-roofRed-50 transition-colors">🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════ STATS TAB ════════════════════ */}
        {mainTab === "stats" && (
          <div>
            <h2 className="font-heading text-2xl text-roofGrey-800 font-bold mb-8">Dashboard Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { label: "Total Media", value: stats.total, icon: "🖼️", color: "border-brown-500" },
                { label: "Photos", value: stats.images, icon: "📸", color: "border-roofGreen-500" },
                { label: "Videos", value: stats.videos, icon: "🎬", color: "border-roofRed-500" },
                { label: "Team Members", value: team.length, icon: "👥", color: "border-roofGrey-500" },
              ].map((s) => (
                <div key={s.label} className={`bg-white rounded-xl p-6 shadow border-l-4 ${s.color}`}>
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <p className="text-3xl font-heading font-bold text-roofGrey-800">{s.value}</p>
                  <p className="text-roofGrey-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <h3 className="font-heading text-xl font-bold text-roofGrey-800 mb-4">Gallery by Category</h3>
            <div className="bg-white rounded-xl shadow p-6 mb-8">
              {CATEGORIES.map((cat) => {
                const count = media.filter((m) => m.category === cat).length;
                const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={cat} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-roofGrey-700 font-medium">{cat}</span>
                      <span className="text-roofGrey-500">{count}</span>
                    </div>
                    <div className="h-2.5 bg-roofGrey-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brown-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
