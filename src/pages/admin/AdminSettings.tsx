import React, { useState } from 'react';
import { useAdminApp } from '../../contexts/AppContext';
import { Save, Hotel, Mail, Phone, MapPin, Clock, FileText, Percent } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { hotelSettings, updateHotelSettings } = useAdminApp();
  const [formData, setFormData] = useState(hotelSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      updateHotelSettings(formData);
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Hotel Settings</h1>
        <p className="text-gray-600">Manage your hotel's basic information and policies</p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-200' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Hotel className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Name
              </label>
              <input
                type="text"
                value={formData.hotelName}
                onChange={(e) => handleInputChange('hotelName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.taxRate}
                  onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your hotel's unique features and amenities..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Check-in/Check-out Times */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Check-in & Check-out Times</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Time
              </label>
              <input
                type="time"
                value={formData.checkInTime}
                onChange={(e) => handleInputChange('checkInTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Time
              </label>
              <input
                type="time"
                value={formData.checkOutTime}
                onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Hotel Policies</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cancellation Policy
            </label>
            <textarea
              rows={4}
              value={formData.cancellationPolicy}
              onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
              placeholder="Describe your cancellation policy..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            } text-white`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings Preview</h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Hotel Name:</span>
            <span className="text-gray-800">{formData.hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Phone:</span>
            <span className="text-gray-800">{formData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Check-in Time:</span>
            <span className="text-gray-800">{formData.checkInTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Check-out Time:</span>
            <span className="text-gray-800">{formData.checkOutTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Tax Rate:</span>
            <span className="text-gray-800">{formData.taxRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;