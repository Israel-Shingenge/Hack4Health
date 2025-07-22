import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the Django API
    const fetchItems = async () => {
      try {
        console.log('Attempting to fetch items from Django API...'); 
        
        const response = await fetch('http://127.0.0.1:8000/api/items/');
        if (!response.ok) {
          // If the response is not OK (e.g., 404, 500), throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data); 
      } catch (e) {
        console.error("Failed to fetch items:", e);
        setError(e.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchItems();
  }, []); 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold">Error: {error}</p>
        <p className="text-sm mt-2">Please ensure your Django backend is running on `http://127.0.0.1:8000`.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <header className="text-center py-8 bg-white shadow-md rounded-lg mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">MetHealth</h1>
        <p className="text-xl text-gray-600">Items from Django Backend</p>
      </header>

      <main className="container mx-auto px-4">
        {items.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-600">No items found. Add some items via Django Admin!</p>
            <p className="text-sm text-gray-500 mt-2">
              Go to <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://127.0.0.1:8000/admin/</a>, log in, and add new 'Item' objects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-700 mb-3">{item.description}</p>
                <p className="text-sm text-gray-500">Created: {new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-6 mt-8 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Django-React Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
