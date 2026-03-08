export default function TrustBanner() {
  const stats = [
    { value: "$2.50+", label: "Avg. Rate Per Mile" },
    { value: "98%", label: "Driver Retention" },
    { value: "24/7", label: "Live Support" },
    { value: "0", label: "Forced Dispatches" },
  ];

  return (
    <section className="bg-primary py-8 border-y border-[#e06612] relative z-20 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="text-3xl md:text-5xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
              <div className="text-sm md:text-base font-bold text-white/90 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
