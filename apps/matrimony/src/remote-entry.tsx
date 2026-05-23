import { Link } from 'react-router-dom';
import MatrimonyApp from './app/matrimonyApp';

export function RemoteEntry() {
  return (
    <div className="p-8 bg-white min-h-[50vh]">
      {/* Home Navigation Button */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors no-underline font-medium"
        >
          ⬅️ Back to Main Hub
        </Link>
      </div>

      {/* Matrimony Core UI content */}
      <div className="border-4 border-dashed border-pink-300 rounded-2xl p-10 text-center">
      <MatrimonyApp/>
      </div>
    </div>
  );
}

export default RemoteEntry;