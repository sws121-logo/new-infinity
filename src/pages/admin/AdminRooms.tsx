import React, { useState } from 'react';
import { useAdminApp } from '../../contexts/AppContext';
import { Edit3, Save, X, Plus, Trash2, Upload, Eye, EyeOff } from 'lucide-react';

const AdminRooms: React.FC = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useAdminApp();
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [newRoomData, setNewRoomData] = useState({
    name: '',
    type: 'AC' as 'AC' | 'Non-AC',
    price: 0,
    capacity: 1,
    amenities: [] as string[],
    images: [] as string[],
    available: true,
    description: ''
  });

  const handleEditRoom = (room: any) => {
    setEditingRoom(room.id);
    setEditData({ ...room, amenities: [...room.amenities], images: [...room.images] });
  };

  const handleSaveRoom = () => {
    if (editingRoom) {
      updateRoom(editingRoom, editData);
      setEditingRoom(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
    setEditData({});
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm('Are you sure you want to delete this room? This will cancel all pending bookings.')) {
      deleteRoom(roomId);
    }
  };

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    addRoom(newRoomData);
    setNewRoomData({
      name: '',
      type: 'AC',
      price: 0,
      capacity: 1,
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
        setNewRoomData(prev => ({
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
      setNewRoomData(prev => ({
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
        setNewRoomData(prev => ({
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
      setNewRoomData(prev => ({
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
          <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
          <p className="text-gray-600">Manage room details, pricing, and availability</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Room
        </button>
      </div>

      {/* Add Room Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add New Room</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleAddRoom} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                <input
                  type="text"
                  required
                  value={newRoomData.name}
                  onChange={(e) => setNewRoomData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <select
                  value={newRoomData.type}
                  onChange={(e) => setNewRoomData(prev => ({ ...prev, type: e.target.value as 'AC' | 'Non-AC' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night (₹)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={newRoomData.price}
                  onChange={(e) => setNewRoomData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Guests)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newRoomData.capacity}
                  onChange={(e) => setNewRoomData(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={3}
                value={newRoomData.description}
                onChange={(e) => setNewRoomData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {newRoomData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {newRoomData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Room ${index + 1}`}
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
                checked={newRoomData.available}
                onChange={(e) => setNewRoomData(prev => ({ ...prev, available: e.target.checked }))}
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
                Add Room
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

      {/* Rooms Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
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
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={room.images[0] || 'https://via.placeholder.com/48'}
                        alt={room.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{room.name}</div>
                        <div className="text-sm text-gray-500">{room.amenities.slice(0, 2).join(', ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      room.type === 'AC' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {room.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.capacity} guests
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingRoom === room.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={editData.price || 0}
                          onChange={(e) => setEditData(prev => ({ ...prev, price: Number(e.target.value) }))}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                        <button
                          onClick={handleSaveRoom}
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
                          ₹{room.price}
                        </span>
                        <button
                          onClick={() => handleEditRoom(room)}
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
                        room.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {room.available ? 'Available' : 'Unavailable'}
                      </span>
                      <button
                        onClick={() => updateRoom(room.id, { available: !room.available })}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        {room.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRoom(room)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
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
          <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
          <div className="text-gray-600">Total Rooms</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-green-600">
            {rooms.filter(r => r.available).length}
          </div>
          <div className="text-gray-600">Available Rooms</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-orange-600">
            {rooms.filter(r => r.type === 'AC').length}
          </div>
          <div className="text-gray-600">AC Rooms</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-2xl font-bold text-purple-600">
            ₹{Math.round(rooms.reduce((acc, room) => acc + room.price, 0) / rooms.length).toLocaleString()}
          </div>
          <div className="text-gray-600">Avg. Price</div>
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;