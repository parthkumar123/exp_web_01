"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminRow {
  _id: string;
  email: string;
  role: string;
  name?: string;
  lastLogin?: string;
}

export default function AdminsPage() {
  const { logout } = useAdminAuth();

  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string }>({
    type: "",
    text: "",
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/admins");
      const data = await res.json();
      setAdmins(data.admins || []);
      setCurrentEmail(data.currentEmail || "");
      setIsSuperadmin(data.currentRole === "superadmin");
    } catch {
      setMessage({ type: "error", text: "Failed to load admins" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmail("");
        setRole("admin");
        setMessage({ type: "success", text: "Admin added" });
        load();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to add admin" });
      }
    } finally {
      setAdding(false);
    }
  };

  const remove = async (admin: AdminRow) => {
    const ok = window.confirm(
      `Remove ${admin.email}? They will lose access to the admin panel immediately.`
    );
    if (!ok) return;

    const res = await fetch(`/api/admin/admins?id=${admin._id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage({ type: "error", text: data.error || "Failed to remove admin" });
      return;
    }
    setMessage({ type: "success", text: "Admin removed" });
    load();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
      <Navigation />

      <div className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-light text-white mb-2">Admins</h1>
              <p className="text-white/60">
                Google accounts allowed to access this panel
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-6 py-3 bg-white/10 text-white/90 font-semibold rounded-xl hover:bg-white/20 border border-emerald-500/30 transition-all duration-300"
              >
                Back to Panel
              </Link>
              <button
                onClick={logout}
                className="px-6 py-3 bg-red-500/20 text-red-300 font-semibold rounded-xl hover:bg-red-500/30 border border-red-500/30 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                  : "bg-red-500/20 text-red-300 border border-red-500/50"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Add admin (superadmin only) */}
          {isSuperadmin && (
            <form
              onSubmit={add}
              className="mb-8 backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6"
            >
              <label className="block text-sm font-medium text-white/90 mb-3">
                Add admin
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="person@gmail.com"
                  className="flex-1 px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white [&>option]:bg-zinc-900"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
                <button
                  type="submit"
                  disabled={adding}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? "Adding…" : "Add"}
                </button>
              </div>
            </form>
          )}

          {/* Admin list */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl overflow-hidden">
            {loading ? (
              <p className="p-8 text-white/60">Loading…</p>
            ) : admins.length === 0 ? (
              <p className="p-8 text-white/60">No admins found.</p>
            ) : (
              <ul className="divide-y divide-white/10">
                {admins.map((admin) => (
                  <li
                    key={admin._id}
                    className="flex items-center justify-between gap-4 p-5"
                  >
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">
                        {admin.email}
                        {admin.email === currentEmail && (
                          <span className="ml-2 text-xs text-emerald-300">
                            (you)
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-white/50">
                        {admin.role === "superadmin" ? "Superadmin" : "Admin"}
                        {admin.lastLogin
                          ? ` · last login ${new Date(
                              admin.lastLogin
                            ).toLocaleDateString()}`
                          : " · never logged in"}
                      </p>
                    </div>
                    {isSuperadmin && admin.email !== currentEmail && (
                      <button
                        onClick={() => remove(admin)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 text-sm font-semibold rounded-lg hover:bg-red-500/30 border border-red-500/30 transition-all duration-300"
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
