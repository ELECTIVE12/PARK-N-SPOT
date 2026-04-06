import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building, Sparkles, LayoutGrid, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/footer';

export default function AboutUs() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-8 md:px-20 overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGfWkAN6r0xTy1fUExoE3fJb7kfN1ngN5YaFb5dFMK1qbx0HYGFz8qOy9c5sQxP2BWWjbRLg9TukYcopbsZHN12mN3GYbxd6nm--iqPKukCC0FhRbIc9BTnKjKeFi0exzXLb-7seGpsgmP6llT8_g-XYWovgq6fzYYk2fX_tUINVyll-MnLRypkExmOV7vqG6YY_E1Q36k8dhTILh1Uol9_6R223RnKcp7iOU5DoUN7kzB5E2BPNycuR9afM7HO0vt4OYkakJOBEbN" 
            alt="Architecture"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <span className="text-secondary font-headline tracking-[0.3em] uppercase text-xs mb-6 block font-bold">
            The Digital Curator Experience
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-tight mb-8 text-primary">
            Architectural <br/>
            <span className="text-on-primary-container">Excellence.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
            Park 'N Spot isn't a facility management tool—it's a curated ecosystem. We move beyond dashboards into digital galleries, where engineering precision meets elite architectural vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/login" 
              className="premium-gradient text-on-primary px-10 py-4 font-headline font-bold rounded-sm tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <button className="border border-outline px-10 py-4 font-headline font-bold rounded-sm tracking-wide hover:bg-surface-container-high transition-colors">
              Explore Portfolio
            </button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-2 text-right">
          <div className="h-16 w-[1px] bg-outline mb-4"></div>
          <span className="font-headline font-bold text-sm tracking-widest text-primary">01 / EST. 2024</span>
          <span className="text-xs text-on-surface-variant font-body">CURATED PRECISION</span>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-32 px-8 md:px-20 bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-sm mt-12"
            >
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRMLR0XpjoAzQNhJ3XexFlZY2wcGQdTVPm1zcFmgnoB540TV9EMTofS7OwRhODD0a1bhG5tnbaanX6zQ75HLZsWH5VkFbODq1DYBPrBFwR74BKrnmtcPER0jDDzcE3GDOUR7aAoSWV2hXUkAd71DaURolG0Q63Bvzbfx0Ype7ZfPxOuwkfYwC8LE__c4rOWPWH6CqfNhE-bY24jjpwR8xAbT-1UWEyyk0bZA4_kLlv_okU8xWgpJNSHvkXufhnHY1yee7Vw35r47hF" 
                alt="Interior"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-sm"
            >
              <img 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0TzK0yt2RD-qYxSHHakOVs4xCMYWbXspOaePMltgvUEhy0XpC1MikC3sp2c-kHScWKuek7RBFLRn5nBi34_7TeZ-vBLWZWirJmmrHLl8DJZWWzy2DYasH9aZfX4K2UKeXMF6B4pez2AI09PmkvhkRB7Jhi_7_uaBWehLGUDO8JA2L5VBoTYccblvRBnM3Tyj7m-PEzTZIYtnzIDBsc5ycuFJE4M6uXOGi4MAPDvuuBNaKCm_BbDZh2kMjrt_1xIxJMEz1VrJ5cXBH" 
                alt="Exterior"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="w-12 h-1 bg-primary mb-12"></div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-8">
              The Concept of the Digital Curator
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              Traditional systems clutter. We curate. The Digital Curator is our philosophy of operational clarity through tonal hierarchy and intentional asymmetry.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-secondary-container p-3 rounded-sm text-on-secondary-container">
                  <Building size={24} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary">Precision Engineering</h4>
                  <p className="text-sm text-on-surface-variant">Data visualizations designed with architectural structural integrity.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-secondary-container p-3 rounded-sm text-on-secondary-container">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary">Elite Tonal Palette</h4>
                  <p className="text-sm text-on-surface-variant">Modern Heritage aesthetic using deep wine and brass accents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 bg-surface-container-low px-8 md:px-20">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-secondary font-headline tracking-widest uppercase text-xs mb-4 block font-bold">The Council</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Members Portfolio</h2>
          </div>
          <p className="max-w-md text-on-surface-variant">Meet the architects and engineers defining the next generation of Sovereign living.</p>
        </div>
        
        <div className="flex overflow-x-auto pb-12 gap-8 no-scrollbar -mx-8 px-8">
          {[
            {
              name: "Julian Thorne",
              role: "Structural Engineer",
              desc: "Master of seismic-resistant aesthetics and heavy-timber high-rises.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZht-WQ6kfkh0nQJr_xyP4OHByzGbdjsr0hDbQSv-nr3zXQ-wMhKPOcLq2Sc_FF-5Kveb5RMNJxhEuqvtJqYlMhhzSp7S2PhtQ6zboJqNyjNPmQMuZKO2UZitjZ6pCdJqJh6JVl8JKVAOJADl8jRGyVWoxxfeP_jFtz1Lb4EoCwfyCgF9ojKZ1u6rOF6UKB7A2YNOxe4OfxWsatfLFPTzKkD3oM5WSCXOtqZUzYIjOdnyvEKXbnIvmniHEzO-qy8LjAdQ5PA4Nxb_T"
            },
            {
              name: "Elena Vance",
              role: "Lead Architect",
              desc: "Pioneer of biophilic urbanism and sustainable facade systems.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLxsI8xP6gTzH0yJAaiSoAR5GBlRfJJFw4Gr5ILRROpExXWml_b3-c7-flebH-iod9rIs7fH5BbOooBS3y8LgCDKZUuWvucjX3S9Yi_hbs-dYQcAWsd_aOZr3ZLs_zvxm_-L8G68Az5_383718wn2s2W5Cp1JeFj29NgSOjRn-oK1htXLLjACnrDn2tKYPuThanx0G1QJcImCp8unVHjz1AQTXew0RGub5x3t7abJnFm3SLSjUPmed7fRXYco58WxsuY99iLj_igsc"
            },
            {
              name: "Marcus Sterling",
              role: "Systems Designer",
              desc: "Expert in integrating smart-grid technology into luxury heritage builds.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkolhB2G5iXVbkrqm-obdGfidyzZYh_wPSAZAkU0YGTT4MbCWkx5ScPPlREQdaHo-UwcXCZ28zCn6wUdJueJiFWcqfgs2QL2smD2gVGiTKyZO8x7WegBy_cy6E1SXKbQCylANpM5D2AnqRpYuUakM8gsXHrMFjLSVZUJh-WXYbT3csNbka4rbybBad_NIM2dnEKCMhGPfAQ02CD5o5FSJiZo0zFrW88SBpe15IGV2L9S2WKtNhKYNP8jMXojzEvFv2YHs4YMXcEwC"
            }
          ].map((member, i) => (
            <div key={i} className="min-w-[320px] flex-shrink-0 bg-surface-container-lowest p-8 rounded-sm shadow-[0_12px_40px_rgba(27,28,25,0.06)] relative border-l-4 border-primary">
              <div className="w-20 h-20 bg-surface-container mb-6 rounded-full overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src={member.img} 
                  alt={member.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-headline font-bold text-xl mb-1">{member.name}</h3>
              <span className="text-xs text-secondary font-headline tracking-widest uppercase block mb-4">{member.role}</span>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{member.desc}</p>
              <div className="flex gap-4 border-t border-outline-variant pt-4">
                <LayoutGrid size={18} className="text-primary cursor-pointer" />
                <ExternalLink size={18} className="text-primary cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
