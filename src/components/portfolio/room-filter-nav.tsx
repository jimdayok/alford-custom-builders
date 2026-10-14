"use client";

type RoomFilterNavProps = {
  rooms: string[];
  activeRoom: string;
  onSelect: (room: string) => void;
};

export function RoomFilterNav({
  rooms,
  activeRoom,
  onSelect,
}: RoomFilterNavProps) {
  return (
    <nav
      aria-label="Filter project images by room"
      className="flex flex-wrap gap-3"
    >
      {rooms.map((room) => {
        const isActive = room === activeRoom;

        return (
          <button
            key={room}
            type="button"
            onClick={() => onSelect(room)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.22em] uppercase transition duration-300 ${
              isActive
                ? "border-[#d2b38f] bg-[#d2b38f] text-[#171512]"
                : "border-white/10 bg-white/[0.03] text-[#efe8dc]/72 hover:-translate-y-0.5 hover:border-[#d2b38f]/60 hover:text-[#f7f1e7]"
            }`}
            aria-pressed={isActive}
          >
            {room}
          </button>
        );
      })}
    </nav>
  );
}
