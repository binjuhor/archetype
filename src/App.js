import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';

const archetypes = [
  {
    name: {
      en: "Caregiver",
      vi: "Người chăm sóc"
    },
    image: "/cards/caregiver.jpg",
    light: {
      en: "Love, care, sacrifice.",
      vi: "Tình yêu thương, sự chăm sóc, sự hy sinh."
    },
    shadow: {
      en: "Dependency, lack of confidence, self-denial.",
      vi: "Phụ thuộc, thiếu tự tin, sự từ chối bản thân."
    },
    reflection: {
      en: "What can you do to take better care of yourself?",
      vi: "Bạn có thể làm gì để chăm sóc bản thân tốt hơn?"
    }
  },
  {
    name: {
      en: "Creator",
      vi: "Người sáng tạo"
    },
    image: "/cards/creator.jpg",
    light: {
      en: "Creativity, imagination, innovation.",
      vi: "Sự sáng tạo, khả năng tưởng tượng, sự đổi mới."
    },
    shadow: {
      en: "Skepticism, lack of confidence, procrastination.",
      vi: "Sự hoài nghi, thiếu tự tin, sự chần chừ."
    },
    reflection: {
      en: "What can you do to unleash your creativity?",
      vi: "Bạn có thể làm gì để phát huy khả năng sáng tạo của mình?"
    }
  },
  {
    name: {
      en: "Dreamer",
      vi: "Người mơ mộng"
    },
    image: "/cards/dreamer.jpg",
    light: {
      en: "Imagination, vision, creativity.",
      vi: "Sự tưởng tượng, khả năng nhìn xa trông rộng, sự sáng tạo."
    },
    shadow: {
      en: "Lack of realism, avoidance, uncertainty.",
      vi: "Sự thiếu thực tế, sự trốn tránh, sự không chắc chắn."
    },
    reflection: {
      en: "What can you do to turn your dreams into reality?",
      vi: "Bạn có thể làm gì để biến ước mơ thành hiện thực?"
    }
  },
  {
    name: {
      en: "Inner Child",
      vi: "Đứa trẻ bên trong"
    },
    image: "/cards/innerchild.jpg",
    light: {
      en: "Innocence, joy, freedom.",
      vi: "Sự ngây thơ, sự vui vẻ, sự tự do."
    },
    shadow: {
      en: "Vulnerability, lack of confidence, self-denial.",
      vi: "Sự tổn thương, sự thiếu tự tin, sự từ chối bản thân."
    },
    reflection: {
      en: "What can you do to reconnect with your inner child?",
      vi: "Bạn có thể làm gì để kết nối lại với đứa trẻ bên trong của mình?"
    }
  },
  {
    name: {
      en: "Ruler",
      vi: "Người cai trị"
    },
    image: "/cards/ruler.jpg",
    light: {
      en: "Leadership, confidence, organization.",
      vi: "Sự lãnh đạo, sự tự tin, khả năng tổ chức."
    },
    shadow: {
      en: "Dictatorship, control, inflexibility.",
      vi: "Sự độc tài, sự kiểm soát, sự thiếu linh hoạt."
    },
    reflection: {
      en: "What can you do to become a better leader?",
      vi: "Bạn có thể làm gì để trở thành một nhà lãnh đạo tốt hơn?"
    }
  },
  {
    name: {
      en: "Seeker",
      vi: "Người tìm kiếm"
    },
    image: "/cards/seeker.jpg",
    light: {
      en: "Curiosity, exploration, quest for truth.",
      vi: "Sự tò mò, sự khám phá, sự tìm kiếm chân lý."
    },
    shadow: {
      en: "Skepticism, impatience, uncertainty.",
      vi: "Sự hoài nghi, sự thiếu kiên nhẫn, sự không chắc chắn."
    },
    reflection: {
      en: "What can you do to explore the world around you?",
      vi: "Bạn có thể làm gì để khám phá thế giới xung quanh mình?"
    }
  },
  {
    name: {
      en: "Trickster",
      vi: "Kẻ lừa đảo"
    },
    image: "/cards/trickster.jpg",
    light: {
      en: "Humor, intelligence, adaptability.",
      vi: "Sự hài hước, sự thông minh, khả năng thích ứng."
    },
    shadow: {
      en: "Deception, irresponsibility, dishonesty.",
      vi: "Sự lừa dối, sự thiếu trách nhiệm, sự không trung thực."
    },
    reflection: {
      en: "What can you do to use humor positively?",
      vi: "Bạn có thể làm gì để sử dụng sự hài hước một cách tích cực?"
    }
  }
];

export default function ArchetypeApp() {
  const [card, setCard] = useState(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const { t, i18n } = useTranslation();

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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-yellow-50 to-pink-100 p-6 flex flex-col items-center justify-center text-gray-800">
      <div className="flex items-center justify-center gap-2 w-full max-w-4xl mb-6">
        <h1 className="text-3xl font-bold">{t('title', { lng: i18n.language })}</h1>
      </div>

      <div className="flex gap-2 absolute top-4 right-4">
          <button onClick={() => changeLanguage('en')} >
            <img src="/icons/en.png" alt="English" className="w-8 h-5" />
          </button>
          <button onClick={() => changeLanguage('vi')} >
            <img src="/icons/vi.webp" alt="Vietnamese" className="w-8 h-5" />
          </button>
        </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={drawCard}
          className="px-6 py-2 bg-pink-500 text-white rounded-2xl shadow hover:bg-pink-600 transition"
        >
          {t('drawCard')}
        </button>
        <button
          onClick={toggleHistory}
          className="px-6 py-2 bg-purple-500 text-white rounded-2xl shadow hover:bg-purple-600 transition"
        >
          {showHistory ? t('toggleHistory.hide') : t('toggleHistory.show')}
        </button>
      </div>

      {!showHistory && card && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center"
        >
          <img
            src={card.image}
            alt={card.name[i18n.language]}
            className="w-full md:w-1/2 h-auto object-cover rounded-xl mb-4 md:mb-0 md:mr-6"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">🃏 {card.name[i18n.language]}</h2>
            <p className="mb-2"><strong>{t('light')}:</strong> {card.light[i18n.language]}</p>
            <p className="mb-2"><strong>{t('shadow')}:</strong> {card.shadow[i18n.language]}</p>
            <p className="italic mb-4">💭 {card.reflection[i18n.language]}</p>
            <textarea
              placeholder={t('reflectionPlaceholder')}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring focus:border-pink-300"
              rows={4}
            ></textarea>
            <button
              onClick={saveNote}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              {t('saveNote')}
            </button>
            {saved && <p className="text-sm text-green-600 mt-2">{t('savedMessage')}</p>}
          </div>
        </motion.div>
      )}

      {showHistory && history.length > 0 && (
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">{t('historyTitle')}</h3>
          <ul className="space-y-3">
            {history.map((entry, index) => (
              <li key={index} className="border rounded-lg p-3 relative">
                <p className="text-sm text-gray-600">🕰️ {entry.date}</p>
                <p className="font-semibold">🃏 {entry.name[i18n.language]}</p>
                <p className="mt-1 text-sm whitespace-pre-line">{entry.note}</p>
                <button
                  onClick={() => deleteNote(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                >
                  {t('deleteNote')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
