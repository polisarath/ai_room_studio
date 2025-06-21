export default function HomeSection() {
  return (
    <section className="bg-white py-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        AI Room and Home{" "}
        <span className="text-indigo-600">Interior Design</span>
      </h1>
      <p className="mt-4 text-gray-600">
        Transform Your Space with AI: Effortless Room & Home Interior Design at
        Your Fingertips!
      </p>

     

      {/* Before and After Images */}
      <div className="mt-12 flex justify-center">
        <img
          src="/group1.webp"
          alt="Before and After Interior Design"
          className="w-full max-w-7xl rounded-lg shadow-xl"
        />
      </div>

      {/* Feature Cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 text-left max-w-7xl mx-auto">
        <div className="flex flex-col items-start">
          <div className="text-3xl text-indigo-600 mb-3">🗂️</div>
          <h3 className="font-bold text-lg">Upload</h3>
          <p className="text-sm text-gray-600">Upload Your Room Picture</p>
          <a href="#" className="text-sm text-indigo-600 mt-2 hover:underline">
            Learn more →
          </a>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-3xl text-indigo-600 mb-3">⚙️</div>
          <h3 className="font-bold text-lg">Select Design</h3>
          <p className="text-sm text-gray-600">Select Design and Room Type</p>
          <a href="#" className="text-sm text-indigo-600 mt-2 hover:underline">
            Learn more →
          </a>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-3xl text-indigo-600 mb-3">📘</div>
          <h3 className="font-bold text-lg">Ready to Download</h3>
          <p className="text-sm text-gray-600">
            Your Room / Home Interior Design is Ready
          </p>
          <a href="#" className="text-sm text-indigo-600 mt-2 hover:underline">
            Learn more →
          </a>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-3xl text-indigo-600 mb-3">💬</div>
          <h3 className="font-bold text-lg">24/7 Support</h3>
          <p className="text-sm text-gray-600">
            Contact us 24 hours a day, 7 days a week
          </p>
          <a href="#" className="text-sm text-indigo-600 mt-2 hover:underline">
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}
