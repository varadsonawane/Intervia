function InterviewerCard({
  name,
  language,
  avatar,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 ${
        selected
          ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
          : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50"
      }`}
    >
      <img
        src={avatar}
        alt={`${name} avatar`}
        className={`h-12 w-12 rounded-full border-2 object-cover ${
          selected ? "border-purple-500" : "border-gray-200"
        }`}
      />

      <div className="min-w-0">
        <p className="font-semibold text-gray-900">{name}</p>

        <p className="mt-0.5 text-sm text-gray-500">
          {language}
        </p>
      </div>

      {selected && (
        <span
          className="ml-auto text-lg font-bold text-purple-600"
          aria-label="Selected"
        >
          ✓
        </span>
      )}
    </button>
  );
}

export default InterviewerCard;