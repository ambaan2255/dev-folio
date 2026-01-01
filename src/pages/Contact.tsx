import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { DEV_INFO } from '../services/constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showChoiceModal, setShowChoiceModal] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleTransmitSignal = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid digital address.');
      return;
    }

    setShowChoiceModal(true);
  };

  const formatMessageForWhatsApp = () => {
    return `PORTFOLIO CONTACT MESSAGE\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
  };

  const formatMessageForEmail = () => {
    return `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
  };

  const sendViaWhatsApp = () => {
    const text = encodeURIComponent(formatMessageForWhatsApp());
    const phone = DEV_INFO.phone.replace(/[^0-9]/g, '');
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
    setShowChoiceModal(false);
    resetForm();
  };

  const sendViaEmail = () => {
    const subject = encodeURIComponent('PORTFOLIO CONTACT MESSAGE');
    const body = encodeURIComponent(formatMessageForEmail());
    window.open(`mailto:${DEV_INFO.email}?subject=${subject}&body=${body}`, '_blank');
    setShowChoiceModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { id: 'email', url: `mailto:${DEV_INFO.email}`, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>, label: 'Email', color: 'bg-indigo-600' },
    { id: 'phone', url: `tel:${DEV_INFO.phone}`, icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: 'Call', color: 'bg-green-600' },
    { id: 'whatsapp', url: `https://${DEV_INFO.whatsapp}`, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, label: 'WhatsApp', color: 'bg-green-600' },
    { id: 'linkedin', url: `https://${DEV_INFO.linkedin}`, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, label: 'LinkedIn', color: 'bg-blue-700' },
    { id: 'twitter', url: `https://${DEV_INFO.twitter}`, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, label: 'X (Twitter)', color: 'bg-black' },
    { id: 'facebook', url: `https://${DEV_INFO.facebook}`, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, label: 'Facebook', color: 'bg-blue-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-24">
      {/* Choice Modal */}
      {showChoiceModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 sm:p-10">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowChoiceModal(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] border-2 border-gray-200 dark:border-gray-800 p-8 sm:p-12 shadow-2xl animate-zoom-in">
            <h3 className="text-2xl sm:text-3xl font-black mb-6 tracking-tighter text-gray-900 dark:text-white text-center">Select Transmission Path</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-10 font-light">Choose how you'd like to deliver your signal to Maurice.</p>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={sendViaWhatsApp} className="flex items-center justify-center gap-4 p-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-green-600/20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
              <button onClick={sendViaEmail} className="flex items-center justify-center gap-4 p-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                Email Client
              </button>
            </div>
            <button onClick={() => setShowChoiceModal(false)} className="mt-8 w-full text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-red-500 transition-colors">Abort</button>
          </div>
        </div>
      )}

      <SectionWrapper type="fade-down">
        <h2 className="text-4xl sm:text-8xl font-black mb-8 tracking-tighter text-center">Let's Interface</h2>
        <p className="text-lg sm:text-2xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed text-center">Available for architectural consulting non-AI, AI-driven and blended development.</p>
      </SectionWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        <div className="lg:col-span-5 space-y-12">
          <SectionWrapper type="fade-right" delay={200}>
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Social Pulse</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl hover:border-indigo-600 transition-all group shadow-sm">
                    <div className={`p-2 rounded-lg text-white ${s.color} transition-transform group-hover:scale-110`}>{s.icon}</div>
                    <span className="font-bold text-[10px] uppercase tracking-widest">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>

        <div className="lg:col-span-7">
          <SectionWrapper type="fade-left" delay={400}>
            <div className="p-8 sm:p-14 bg-white dark:bg-gray-900 rounded-[2.5rem] sm:rounded-[4rem] border-2 border-gray-200 dark:border-gray-800 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-black mb-8 tracking-tighter text-gray-900 dark:text-white">Signal Transmission</h3>
              <form onSubmit={handleTransmitSignal} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-gray-400">Identity</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all dark:text-white font-bold" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-gray-400">Digital Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={`w-full bg-gray-50 dark:bg-gray-800 border-2 ${emailError ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all dark:text-white font-bold`} placeholder="Email Address" />
                  {emailError && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">{emailError}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-gray-400">Message Payload</label>
                  <textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all dark:text-white resize-none font-bold" placeholder="How can I help you?" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl shadow-indigo-600/30">
                  Transmit Signal 
                  <svg className="w-6 h-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

export default Contact;
