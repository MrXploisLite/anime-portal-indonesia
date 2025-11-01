export default function Footer() {
  return (
    <footer className="glass-effect border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold gradient-bg bg-clip-text text-transparent mb-3">
              🎌 AnimeID
            </h3>
            <p className="text-gray-400 text-sm">
              Portal anime Indonesia terlengkap. Nonton dan download anime subtitle Indonesia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Sumber</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Otakudesu</li>
              <li>• Samehadaku</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Informasi</h4>
            <p className="text-sm text-gray-400">
              Powered by{' '}
              <a
                href="https://github.com/wajik45/wajik-anime-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Wajik Anime API
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; 2024 AnimeID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
