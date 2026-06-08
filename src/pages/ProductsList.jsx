import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/product.scss';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const getUserIdFromToken = (token) => {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.userId || tokenPayload.sub || null;
    } catch (e) {
      return null;
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const userId = getUserIdFromToken(token);
      if (!userId) throw new Error('Invalid token');

      const res = await fetch(`http://localhost:8090/products/user-products/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      console.log(data)
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Delete this product? This cannot be undone.');
    if (!ok) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const res = await fetch(`http://localhost:8090/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Delete failed');
      }

      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id) && String(p._id) !== String(id)));
    } catch (err) {
      alert(err.message || 'Failed to delete');
    }
  };

  if (loading) return <div className="product-page"><div className="product-form-card">Loading products...</div></div>;
  if (error) return <div className="product-page"><div className="product-form-card">{error}</div></div>;

  return (
    <div className="product-page">
      <section className="product-hero-copy">
        <span className="eyebrow">Catalog</span>
        <h2>Your products</h2>
        <p>Manage your redeemable products. Edit details or remove items.</p>
      </section>

      <section className="product-form-shell">
        <div className="product-form-card">
          {products.length === 0 ? (
            <div>No products found.</div>
          ) : (
            <div className="products-grid">
              {products.map((p) => {
                const id = p.id || p._id || p.productId || '';
                return (
                  <div key={id} className="product-card" style={{marginBottom:12}}>
                    <div style={{display:'flex',gap:12,alignItems:'center'}}>
                      <div style={{width:84,height:84,flexShrink:0,borderRadius:12,overflow:'hidden',background:'#f3f4f6'}}>
                        {p.image ? <img src={p.image} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <div style={{padding:12,color:'#94a3b8'}}>No image</div>}
                      </div>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
                          <div>
                            <div style={{fontWeight:700,fontSize:16}}>{p.name || 'Untitled'}</div>
                            <div style={{color:'#64748b',fontSize:13}}>{p.category || ''}</div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div style={{color:'#0f172a',fontWeight:700}}>{p.points ?? p.cost ?? '-'}</div>
                            <div style={{fontSize:12,color:'#94a3b8'}}>points</div>
                          </div>
                        </div>
                        <div style={{marginTop:8,color:'#475569'}}>{p.description?.slice(0,160)}</div>
                      </div>
                    </div>

                    <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:12}}>
                      <button className="secondary-btn" onClick={() => handleEdit(id)}>Edit</button>
                      <button className="primary-btn" onClick={() => handleDelete(id)}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsList;
