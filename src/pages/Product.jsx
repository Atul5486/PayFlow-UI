import React, { useEffect, useState } from 'react';
import '../stylesheets/product.scss';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
  name: '',
  category: '',
  description: '',
  image: null,
  points: ''
};

const Product = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [imagePreview, setImagePreview] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate=useNavigate();

  useEffect(() => {
       fetchUserData(); 
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

    const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get user ID from token
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.userId;

      const response = await fetch(`http://localhost:8090/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const userData = await response.json();
      // userData.role="ROLE_ADMIN";    
      if(userData?.role==="ROLE_ADMIN"){
        navigate("/home");  
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }   
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;

    setFormData((current) => ({
      ...current,
      image: file
    }));

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview('');
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setImagePreview('');
    setFileInputKey((current) => current + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please sign in to create a product.');
      }
       const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.userId;


      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('category', formData.category.trim());
      payload.append('description', formData.description.trim());
      payload.append('points', formData.points.toString());
      payload.append('image', formData.image);
      payload.append('userId',userId)

      const response = await fetch('http://localhost:8090/products/create-product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(responseText || 'Unable to create product.');
      }

      setMessage('Product created successfully.');
      resetForm();
    } catch (submitError) {
      setError(submitError.message || 'Unable to create product.');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || !formData.name || !formData.category || !formData.description || !formData.points || !formData.image;
  
    return (
    <div className="product-page">
      <section className="product-hero">
        <div className="product-hero-copy">
          <span className="eyebrow">Catalog management</span>
          <h2>Create a new product</h2>
          <p>
            Add a redeemable product with the same PayFlow look and feel used across the app.
          </p>

          <div className="product-highlights">
            <div className="highlight-card">
              <strong>5 fields</strong>
              <span>Everything needed to publish a reward item</span>
            </div>
            <div className="highlight-card">
              <strong>Image upload</strong>
              <span>Preview the selected file before submitting</span>
            </div>
            <div className="highlight-card">
              <strong>Points based</strong>
              <span>Set the redemption cost in reward points</span>
            </div>
          </div>
        </div>

        <div className="product-preview-panel">
          <div className="preview-badge">Live preview</div>
          <div className="preview-artwork">
            {imagePreview ? (
              <img src={imagePreview} alt="Selected product preview" />
            ) : (
              <div className="preview-placeholder">
                <span>Upload an image</span>
                <small>Preview appears here</small>
              </div>
            )}
          </div>
          <div className="preview-meta">
            <h3>{formData.name || 'Product name'}</h3>
            <p>{formData.category || 'Category'}</p>
            <div className="preview-points">
              <span>Points</span>
              <strong>{formData.points || '0'}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="product-form-shell">
        <form className="product-form-card" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Product details</h3>
            <p>Use the fields below to define the reward product.</p>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. iPhone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics"
              />
            </div>

            <div className="form-group">
              <label htmlFor="points">Points</label>
              <input
                id="points"
                name="points"
                type="number"
                min="1"
                step="1"
                value={formData.points}
                onChange={handleChange}
                placeholder="e.g. 1000"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product and what makes it redeemable."
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">Image</label>
              <div className="file-input-wrap">
                <input
                  key={fileInputKey}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <span>{formData.image ? formData.image.name : 'Choose an image file'}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Clear
            </button>
            <button type="submit" className="primary-btn" disabled={isSubmitDisabled}>
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>

          {message && <div className="status-message success">{message}</div>}
          {error && <div className="status-message error">{error}</div>}
        </form>
      </section>
    </div>
  );
};

export default Product;