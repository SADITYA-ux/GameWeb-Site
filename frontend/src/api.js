// src/api.js
const API_BASE = 'http://localhost/backend';
 // adjust if different

export async function apiGet(path, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/${path}${qs ? '?' + qs : ''}`, {
    credentials: 'include'
  });
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body)
  });
  return res.json();
}

// file upload for images
export async function apiUploadImage(file) {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${API_BASE}/upload_image.php`, {
    method: 'POST',
    credentials: 'include',
    body: form
  });
  return res.json();
}
