import React from 'react';
import { motion } from 'motion/react';
import { Award, Grid3X3, Ticket, ConciergeBell, CreditCard, PlusCircle, Home, Briefcase, Dumbbell, ReceiptText, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);

  type UserData = {
    username: string;
    fullName: string;
    email: string;
    mobile: string;
  };

  const fields: { label: string; key: keyof UserData }[] = [
    { label: 'Username', key: 'username' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'Email Address', key: 'email' },
    { label: 'Mobile Number', key: 'mobile' },
  ];

  const [userData, setUserData] = React.useState<UserData>({
    username: 'Juan',
    fullName: 'Juan Dela Cruz',
    email: 'juandelacruz@gmail.com',
    mobile: '(+63) 922-444-5555',
  });

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  return (
    <main className="pt-28 pb-24 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

      <div className="md:col-span-12 space-y-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-3">Account Settings</h1>
            <p className="text-on-surface-variant font-body max-w-xl">Update and personalize your account settings while keeping track of your activity and usage history.</p>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-error/10 text-error rounded-sm font-headline font-bold text-[10px] uppercase tracking-widest border-none cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Info */}
          <section className="bg-surface-container-low rounded-xl p-8 space-y-6 relative overflow-hidden ">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#660000]"></div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-[#330000]">Personal Information</h2>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    {/* Cancel */}
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        // optional: reset data dito
                      }}
                      className="text-sm font-semibold text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>

                    {/* Save */}
                    <button
                      onClick={() => {
                        alert('Saved!');
                        setIsEditing(false);
                      }}
                      className="text-sm font-bold text-primary-container hover:underline"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm font-bold text-primary-container hover:underline"
                  >
                    Edit Details
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Username', key: 'username' },
                { label: 'Full Name', key: 'fullName' },
                { label: 'Email Address', key: 'email' },
                { label: 'Mobile Number', key: 'mobile' },
              ].map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                  <label className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">{field.label}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData[field.key]}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      className="bg-surface p-4 rounded-sm border outline-none"
                    />
                  ) : (
                    <div className="bg-surface p-4 rounded-sm text-on-surface font-medium">
                      {userData[field.key]}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="font-headline text-[12px] uppercase tracking-widest text-on-surface-variant font-bold">
                  Password
                </label>


                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="text-m font-semibold text-primary-container hover:underline w-fit"
                >
                  Change Password
                </button>
              </div>
            </div>
          </section>

          {showPasswordModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">

                <h3 className="text-lg font-bold text-[#330000]">Change Password</h3>

                {/* Current Password */}
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-3 border rounded-md outline-none"
                />

                {/* New Password */}
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 border rounded-md outline-none"
                  required
                  title="must be at least 8 characters with A-Z a-z letters, 0-9, and @$!%*#?& symbols"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$"
                  />
              

                {/* Confirm Password */}
                <input
                  type="password"
                  placeholder="Re-type New Password"
                  className="w-full p-3 border rounded-md outline-none"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      alert('Password changed!');
                      setShowPasswordModal(false);
                    }}
                    className="px-4 py-2 bg-[#660000] text-white rounded-md text-sm"
                  >
                    Save
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Saved Locations */}
          <section className="bg-surface-container-low rounded-xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-[#330000]">Saved Locations</h2>
              <PlusCircle size={24} className="text-primary-container cursor-pointer" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'The Penthouse', info: 'Level P1, Bay 14-B', icon: Home },
                { name: 'Financial District', info: 'Level B3, Valet Priority', icon: Briefcase },
                { name: 'Sovereign Spa', info: 'Surface Level, South Wing', icon: Dumbbell },
              ].map((loc) => (
                <div key={loc.name} className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 transition-all hover:scale-[1.02] cursor-pointer">
                  <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                    <loc.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{loc.name}</h4>
                    <p className="text-xs text-on-surface-variant">{loc.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Parking History */}
          <section className="lg:col-span-2 bg-surface-container-low rounded-xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-[#330000]">Parking History</h2>
              <button className="px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-primary-container transition-all">View All Activity</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Central Plaza Valet', time: '3 Hours 15 Minutes', date: 'May 12, 2024', price: '$45.00' },
                { name: 'The Glass House', time: 'Overnight Stay', date: 'May 10, 2024', price: '$120.00' },
                { name: 'South Wing Bay', time: '1 Hour 40 Minutes', date: 'May 08, 2024', price: '$22.00' },
              ].map((item) => (
                <div key={item.name} className="bg-surface p-6 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest py-1 px-2 bg-secondary-container text-on-secondary-container rounded-full">Completed</span>
                    <span className="text-xs text-on-surface-variant font-medium">{item.date}</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant">{item.time}</p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                    <span className="text-lg font-black text-on-surface">{item.price}</span>
                    <ReceiptText size={18} className="text-on-surface-variant" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div >
    </main >
  );
}
