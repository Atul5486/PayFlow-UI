import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../stylesheets/product.scss';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', category: '', description: '', points: '', image: null });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const res = await fetch(`http://localhost:8090/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to load product');
      const data = await res.json();
      setForm({
        name: data.name || '',
        category: data.category || '',
        description: data.description || '',
        points: data.points ?? data.cost ?? '',
        image: null
      });
      setPreview(data.image || '');
    } catch (err) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((f) => ({ ...f, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const payload = new FormData();
      payload.append('name', form.name);
      payload.append('category', form.category);
      payload.append('description', form.description);
      payload.append('points', form.points);
      if (form.image) payload.append('image', form.image);

      const res = await fetch(`http://localhost:8090/products/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: payload
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Save failed');
      }

      navigate('/products');
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="product-page"><div className="product-form-card">Loading...</div></div>;

  return (
    <div className="product-page">
      <section className="product-hero-copy">
        <span className="eyebrow">Edit product</span>
        <h2>Edit product details</h2>
      </section>

      <section className="product-form-shell">
        <form className="product-form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input name="category" value={form.category} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Points</label>
              <input name="points" type="number" value={form.points} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea name="description" rows={5} value={form.description} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Image</label>
              <div className="file-input-wrap">
                <input type="file" accept="image/*" onChange={handleFile} />
                <span>{form.image ? form.image.name : preview ? 'Current image' : 'Choose image'}</span>
              </div>
            </div>
          </div>

          {preview && (
            <div style={{marginTop:12}}>
              <div style={{fontSize:12,color:'#64748b',marginBottom:6}}>Preview</div>
              <div style={{width:180,height:120,overflow:'hidden',borderRadius:12}}>
                <img src={preview} alt="preview" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={() => navigate('/products')}>Cancel</button>
            <button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
          </div>

          {error && <div className="status-message error">{error}</div>}
        </form>
      </section>
    </div>
  );
};

export default EditProduct;
