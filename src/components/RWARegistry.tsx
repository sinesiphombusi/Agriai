import { ArrowLeft, Check, Upload, MapPin, Calendar, Scale } from 'lucide-react';
import { useState } from 'react';

type Screen = 'landing' | 'language' | 'chat' | 'traits' | 'simulation' | 'registry';

interface RWARegistryProps {
  onNavigate: (screen: Screen) => void;
}

type Step = 'details' | 'location' | 'confirmation' | 'success';

export function RWARegistry({ onNavigate }: RWARegistryProps) {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [formData, setFormData] = useState({
    assetType: 'harvest',
    cropName: '',
    quantity: '',
    unit: 'kg',
    harvestDate: '',
    location: '',
    coordinates: '',
  });

  const steps = [
    { id: 'details', name: 'Asset Details', icon: Scale },
    { id: 'location', name: 'Location', icon: MapPin },
    { id: 'confirmation', name: 'Confirmation', icon: Check },
  ];

  const handleNext = () => {
    if (currentStep === 'details') setCurrentStep('location');
    else if (currentStep === 'location') setCurrentStep('confirmation');
    else if (currentStep === 'confirmation') setCurrentStep('success');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-bounce">
              <Check className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-slate-900 mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Your harvest has been registered on the blockchain
          </p>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-sm text-slate-500 mb-1">Asset ID</p>
                <p className="text-slate-900">RWA-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Crop Type</p>
                <p className="text-slate-900">{formData.cropName || 'Maize'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Quantity</p>
                <p className="text-slate-900">{formData.quantity || '500'} {formData.unit}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Registration Date</p>
                <p className="text-slate-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('chat')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              Back to Chat
            </button>
            <button
              onClick={() => {
                setCurrentStep('details');
                setFormData({
                  assetType: 'harvest',
                  cropName: '',
                  quantity: '',
                  unit: 'kg',
                  harvestDate: '',
                  location: '',
                  coordinates: '',
                });
              }}
              className="px-8 py-4 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-slate-200/50 text-slate-700 hover:border-emerald-300 transition-all"
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Chat</span>
          </button>

          <h1 className="text-4xl md:text-5xl text-slate-900 mb-3">
            RWA Registry
          </h1>
          <p className="text-xl text-slate-600">
            Register your harvest or assets on the blockchain
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted =
                (step.id === 'details' && ['location', 'confirmation'].includes(currentStep)) ||
                (step.id === 'location' && currentStep === 'confirmation');

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500'
                          : isActive
                          ? 'bg-white border-emerald-500'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? 'text-emerald-500' : 'text-slate-400'
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`text-sm mt-2 text-center ${
                        isActive || isCompleted ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-4 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 p-8 mb-8">
          {currentStep === 'details' && (
            <div className="space-y-6">
              <h3 className="text-2xl text-slate-900 mb-6">Asset Details</h3>

              <div>
                <label className="block text-slate-700 mb-2">Asset Type</label>
                <select
                  value={formData.assetType}
                  onChange={(e) => handleInputChange('assetType', e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                >
                  <option value="harvest">Harvest</option>
                  <option value="livestock">Livestock</option>
                  <option value="equipment">Equipment</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Crop Name</label>
                <input
                  type="text"
                  value={formData.cropName}
                  onChange={(e) => handleInputChange('cropName', e.target.value)}
                  placeholder="e.g., Maize, Wheat, Rice"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="tons">Tons</option>
                    <option value="bags">Bags</option>
                    <option value="units">Units</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-2">Harvest Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 'location' && (
            <div className="space-y-6">
              <h3 className="text-2xl text-slate-900 mb-6">Location Details</h3>

              <div>
                <label className="block text-slate-700 mb-2">Farm Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Nairobi County, Kenya"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-2">GPS Coordinates (Optional)</label>
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={(e) => handleInputChange('coordinates', e.target.value)}
                  placeholder="e.g., -1.2921, 36.8219"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200/50">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-slate-900 mb-1">Location Verification</h4>
                    <p className="text-sm text-slate-600">
                      Providing GPS coordinates helps verify the authenticity of your registration and can be used for future climate and yield analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="space-y-6">
              <h3 className="text-2xl text-slate-900 mb-6">Confirm Registration</h3>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-sm text-slate-500 mb-1">Asset Type</p>
                  <p className="text-slate-900 capitalize">{formData.assetType}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-sm text-slate-500 mb-1">Crop Name</p>
                  <p className="text-slate-900">{formData.cropName || 'Not specified'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-sm text-slate-500 mb-1">Quantity</p>
                    <p className="text-slate-900">
                      {formData.quantity || '0'} {formData.unit}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <p className="text-sm text-slate-500 mb-1">Harvest Date</p>
                    <p className="text-slate-900">{formData.harvestDate || 'Not specified'}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-sm text-slate-500 mb-1">Location</p>
                  <p className="text-slate-900">{formData.location || 'Not specified'}</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200/50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 mb-1">Blockchain Registration</h4>
                    <p className="text-sm text-slate-600">
                      This asset will be registered on the blockchain, creating an immutable record of ownership and authenticity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {currentStep !== 'details' && (
            <button
              onClick={() => {
                if (currentStep === 'location') setCurrentStep('details');
                else if (currentStep === 'confirmation') setCurrentStep('location');
              }}
              className="px-8 py-4 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-slate-200/50 text-slate-700 hover:border-emerald-300 transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
          >
            {currentStep === 'confirmation' ? 'Register Asset' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
