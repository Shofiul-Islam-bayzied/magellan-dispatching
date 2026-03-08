export default function TrustBanner() {
  const stats = [
    { value: "$2.50+", label: "Avg. Rate Per Mile" },
    { value: "98%", label: "Driver Retention" },
    { value: "24/7", label: "Live Support" },
    { value: "ZERO", label: "Forced Dispatches" },
  ];

  return (
    <section className="bg-gray-100 py-16 relative z-10 -mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 bg-white shadow-2xl p-8 transform -translate-y-12 border-b-8 border-primary">
          {stats.map((stat, i) => (
            <div key={i} className={`text-center px-4 py-4 ${i !== stats.length - 1 ? 'md:border-r-4 md:border-gray-100' : ''}`}>
              <div className="text-5xl md:text-6xl font-black text-[#0B3C5D] mb-2 tracking-tighter drop-shadow-sm">{stat.value}</div>
              <div className="text-sm md:text-lg font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
