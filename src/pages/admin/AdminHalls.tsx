import React, { useState } from 'react';
import { useAdminApp } from '../../contexts/AppContext';
import { Edit3, Save, X, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const AdminHalls: React.FC = () => {
  const { partyHalls, addHall, updateHall, deleteHall } = useAdminApp();
  const [editingHall, setEditingHall] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [newHallData, setNewHallData] = useState({
    name: '',
    capacity: 50,
    price: 10000,
    amenities: [] as string[],
    images: [] as string[],
    available: true,
    description: ''
  });

  const handleEditHall = (hall: any) => {
    setEditingHall(hall.id);
    setEditData({ ...hall, amenities: [...hall.amenities], images: [...hall.images] });
  };

  const handleSaveHall = () => {
    if (editingHall) {
      updateHall(editingHall, editData);
      setEditingHall(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingHall(null);
    setEditData({});
  };

  const handleDeleteHall = (hallId: string) => {
    if (window.confirm('Are you sure you want to delete this hall? This will cancel all pending bookings.')) {
      deleteHall(hallId);
    }
  };

  const handleAddHall = (e: React.FormEvent) => {
    e.preventDefault();
    addHall(newHallData);
    setNewHallData({
      name: '',
      capacity: 50,
      price: 10000,
      amenities: [],
      images: [],
      available: true,
      description: ''
    });
    setShowAddForm(false);
  };

  const addAmenity = (amenity: string, isEdit = false) => {
    if (amenity.trim()) {
      if (isEdit) {
        setEditData(prev => ({
          ...prev,
          amenities: [...prev.amenities, amenity.trim()]
        }));
      } else {
        setNewHallData(prev => ({
          ...prev,
          amenities: [...prev.amenities, amenity.trim()]
        }));
      }
    }
  };

  const removeAmenity = (index: number, isEdit = false) => {
    if (isEdit) {
      setEditData(prev => ({
        ...prev,
        amenities: prev.amenities.filter((_, i) => i !== index)
      }));
    } else {
      setNewHallData(prev => ({
        ...prev,
        amenities: prev.amenities.filter((_, i) => i !== index)
      }));
    }
  };

  const addImage = (imageUrl: string, isEdit = false) => {
    if (imageUrl.trim()) {
      if (isEdit) {
        setEditData(prev => ({
          ...prev,
          images: [...prev.images, imageUrl.trim()]
        }));
      } else {
        setNewHallData(prev => ({
          ...prev,
          images: [...prev.images, imageUrl.trim()]
        }));
      }
    }
  };

  const removeImage = (index: number, isEdit = false) => {
    if (isEdit) {
      setEditData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } else {
      setNewHallData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Party Halls Management</h1>
          <p className="text-gray-600">Manage hall details, pricing, and availability</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Hall
        </button>
      </div>

      {/* Add Hall Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add New Party Hall</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleAddHall} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hall Name</label>
                <input
                  type="text"
                  required
                  value={newHallData.name}
                  onChange={(e) => setNewHallData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Guests)</label>
                <input
                  type="number"
                  required
                  min="10"
                  value={newHallData.capacity}
                  onChange={(e) => setNewHallData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Event (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={newHallData.price}
                  onChange={(e) => setNewHallData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={3}
                value={newHallData.description}
                onChange={(e) => setNewHallData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add amenity"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addAmenity(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newHallData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images (URLs)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="Add image URL"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addImage(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {newHallData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Hall ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                checked={newHallData.available}
                onChange={(e) => setNewHallData(prev => ({ ...prev, available: e.target.checked }))}
                className="mr-2"
              />
              <label htmlFor="available" className="text-sm font-medium text-gray-700">
                Available for booking
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Add Hall
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Halls Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hall
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partyHalls.map((hall) => (
                <tr key={hall.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={hall.images[0] || 'https://via.placeholder.com/48'}
                        alt={hall.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{hall.name}</div>
                        <div className="text-sm text-gray-500">{hall.amenities.slice(0, 2).join(', ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {hall.capacity} guests
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingHall === hall.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={editData.price || 0}
                          onChange={(e) => setEditData(prev => ({ ...prev, price: Number(e.target.value) }))}
                          className="w-28 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <button
                          onClick={handleSaveHall}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          ₹{hall.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleEditHall(hall)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        hall.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {hall.available ? 'Available' : 'Unavailable'}
                      </span>
                      <button
                        onClick={() => updateHall(hall.id, { available: !hall.available })}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        {hall.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditHall(hall)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteHall(hall.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-purple-600">{partyHalls.length}</div>
          <div className="text-gray-600">Total Halls</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-green-600">
            {partyHalls.filter(h => h.available).length}
          </div>
          <div className="text-gray-600">Available Halls</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-orange-600">
            {Math.max(...partyHalls.map(h => h.capacity))}
          </div>
          <div className="text-gray-600">Max Capacity</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-blue-600">
            ₹{Math.round(partyHalls.reduce((acc, hall) => acc + hall.price, 0) / partyHalls.length).toLocaleString()}
          </div>
          <div className="text-gray-600">Avg. Price</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHalls;