export default function ShareResourceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Share Resource</h2>
        <form>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Resource Name" />
          <input className="w-full mb-2 p-2 border rounded" placeholder="Link or File" />
          <textarea className="w-full mb-2 p-2 border rounded" placeholder="Description" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Share</button>
          <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}