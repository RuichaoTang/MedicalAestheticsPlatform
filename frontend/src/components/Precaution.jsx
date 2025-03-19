export default function Precaustion() {
  return (
    <>
      <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mt-6">
        <h2 className="text-2xl font-serif font-semibold text-teal-700 mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-teal-700"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16h4v2h-4v-2zm0-10h4v8h-4V7z" />
          </svg>
          Important Precautions
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl">
            <div>
              <h3 className="text-base/7 font-semibold text-orange-700 mb-1">
                Pre-Treatment
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Professional skin assessment required</li>
                <li>Avoid sun exposure 48 hours prior</li>
                <li>Discontinue retinoids 1 week before</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
            <div>
              <h3 className="text-base/7 font-semibold text-blue-700  mb-1">
                Post-Treatment
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Apply SPF 50+ sunscreen daily</li>
                <li>Use gentle cleansers for 72 hours</li>
                <li>Avoid strenuous exercise for 24h</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
            <div>
              <h3 className="text-base/7 font-semibold text-red-700 mb-1">
                Contraindications
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Not recommended for pregnant women</li>
                <li>Consult if using blood thinners</li>
                <li>Not suitable for active acne</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
            <div>
              <h3 className="text-base/7 font-semibold text-purple-700 mb-1">
                Maintenance
              </h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Recommended 4-week follow-up</li>
                <li>Monthly maintenance suggested</li>
                <li>Use provided aftercare kit</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-400 italic flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Individual results may vary. Consult your specialist for personalized
          advice.
        </p>
      </section>
    </>
  );
}
