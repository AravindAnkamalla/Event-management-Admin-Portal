const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);
export default Card;