import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
/**
 * /cards/caregiver.jpg
 * /cards/creator.jpg
 * /cards/dreamer.jpg
 * /cards/innerchild.jpg
 * /cards/ruler.jpg
 * /cards/seeker.jpg
 * /cards/trickster.jpg
 */
const archetypes = [
  {
        "name": "Người chăm sóc",
        "image": "/cards/caregiver.jpg",
        "light": "Tình yêu thương, sự chăm sóc, sự hy sinh.",
        "shadow": "Phụ thuộc, thiếu tự tin, sự từ chối bản thân.",
        "reflection": "Bạn có thể làm gì để chăm sóc bản thân tốt hơn?"
    },
    {
        "name": "Người sáng tạo",
        "image": "/cards/creator.jpg",
        "light": "Sự sáng tạo, khả năng tưởng tượng, sự đổi mới.",
        "shadow": "Sự hoài nghi, thiếu tự tin, sự chần chừ.",
        "reflection": "Bạn có thể làm gì để phát huy khả năng sáng tạo của mình?"
    },
    {
        "name": "Người mơ mộng",
        "image": "/cards/dreamer.jpg",
        "light": "Sự tưởng tượng, khả năng nhìn xa trông rộng, sự sáng tạo.",
        "shadow": "Sự thiếu thực tế, sự trốn tránh, sự không chắc chắn.",
        "reflection": "Bạn có thể làm gì để biến ước mơ thành hiện thực?"
    },
    {
        "name": "Đứa trẻ bên trong",
        "image": "/cards/innerchild.jpg",
        "light": "Sự ngây thơ, sự vui vẻ, sự tự do.",
        "shadow": "Sự tổn thương, sự thiếu tự tin, sự từ chối bản thân.",
        "reflection": "Bạn có thể làm gì để kết nối lại với đứa trẻ bên trong của mình?"
    },
    {
        "name": "Người cai trị",
        "image": "/cards/ruler.jpg",
        "light": "Sự lãnh đạo, sự tự tin, khả năng tổ chức.",
        "shadow": "Sự độc tài, sự kiểm soát, sự thiếu linh hoạt.",
        "reflection": "Bạn có thể làm gì để trở thành một nhà lãnh đạo tốt hơn?"
    },
    {
        "name": "Người tìm kiếm",
        "image": "/cards/seeker.jpg",
        "light": "Sự tò mò, sự khám phá, sự tìm kiếm chân lý.",
        "shadow": "Sự hoài nghi, sự thiếu kiên nhẫn, sự không chắc chắn.",
        "reflection": "Bạn có thể làm gì để khám phá thế giới xung quanh mình?"
    },
    {
        "name": "Kẻ lừa đảo",
        "image": "/cards/trickster.jpg",
        "light": "Sự hài hước, sự thông minh, khả năng thích ứng.",
        "shadow": "Sự lừa dối, sự thiếu trách nhiệm, sự không trung thực.",
        "reflection": "Bạn có thể làm gì để sử dụng sự hài hước một cách tích cực?"
    }
];

export default function ArchetypeApp() {
  const [card, setCard] = useState(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('archetype-notes') || '[]');
    setHistory(notes);
  }, []);

  const drawCard = () => {
    const random = archetypes[Math.floor(Math.random() * archetypes.length)];
    setCard(random);
    setNote('');
    setSaved(false);
    setShowHistory(false);
  };

  const saveNote = () => {
    if (card && note.trim()) {
      const newNote = {
        name: card.name,
        note,
        date: new Date().toLocaleString(),
      };
      const updatedHistory = [newNote, ...history];
      localStorage.setItem('archetype-notes', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      setSaved(true);
    }
  };

  const deleteNote = (index) => {
    const updated = history.filter((_, i) => i !== index);
    localStorage.setItem('archetype-notes', JSON.stringify(updated));
    setHistory(updated);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6 flex flex-col items-center justify-center text-gray-800">
      <h1 className="text-3xl font-bold mb-6">🌟 Rút Bài Archetype</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={drawCard}
          className="px-6 py-2 bg-pink-500 text-white rounded-2xl shadow hover:bg-pink-600 transition"
        >
          Rút bài của bạn
        </button>
        <button
          onClick={toggleHistory}
          className="px-6 py-2 bg-purple-500 text-white rounded-2xl shadow hover:bg-purple-600 transition"
        >
          {showHistory ? 'Ẩn nhật ký' : 'Hiện nhật ký'}
        </button>
      </div>

      {card && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <img src={card.image} alt={card.name} className="w-full h-auto object-cover rounded-xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">🃏 {card.name}</h2>
          <p className="mb-2"><strong>Mặt sáng:</strong> {card.light}</p>
          <p className="mb-2"><strong>Mặt tối:</strong> {card.shadow}</p>
          <p className="italic mb-4">💭 {card.reflection}</p>
          <textarea
            placeholder="Viết vài dòng suy ngẫm của bạn..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring focus:border-pink-300"
            rows={4}
          ></textarea>
          <button
            onClick={saveNote}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            Lưu nhật ký
          </button>
          {saved && <p className="text-sm text-green-600 mt-2">✅ Đã lưu vào trình duyệt.</p>}
        </motion.div>
      )}

      {showHistory && history.length > 0 && (
        <div className="max-w-md w-full bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">📚 Nhật ký đã lưu</h3>
          <ul className="space-y-3">
            {history.map((entry, index) => (
              <li key={index} className="border rounded-lg p-3 relative">
                <p className="text-sm text-gray-600">🕰️ {entry.date}</p>
                <p className="font-semibold">🃏 {entry.name}</p>
                <p className="mt-1 text-sm whitespace-pre-line">{entry.note}</p>
                <button
                  onClick={() => deleteNote(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
