import React, { useState, useEffect, useRef } from "react";
import "./ActionList.css";

export type ActionType =
  | "Doctors"
  | "Patients"
  | "Appointments"
  | "Exams"
  | "Statistics";

export interface ActionListItem {
  type: ActionType;
}

interface listAction {
  type: ActionType;
  action: "view" | "create" | "delete";
}

interface ActionListProps {
  items: ActionListItem[];
  onView?: (type: ActionType) => void;
  onCreate?: (type: ActionType) => void;
  onDelete?: (type: ActionType) => void;
}

export default function ActionList({
  items,
  onView,
  onCreate,
  onDelete,
}: ActionListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Κλείνει το μενού αν κάνεις κλικ οπουδήποτε εκτός
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id: string | number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="action-list-card" ref={listRef}>
      <ul className="action-list">
        {items.map((item) => (
          <li key={item.type} className="action-list-row">
            <span className="action-item-label">{item.type}</span>

            {/* Περιοχή κουμπιού ενεργειών & dropdown */}
            <div className="action-menu-container">
              <button
                type="button"
                className="btn-dots"
                onClick={() => toggleMenu(item.type)}
                aria-label="More actions"
              >
                {/* Εικονίδιο 3 κουκκίδων */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              {openMenuId === item.type && (
                <div className="action-dropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      onView?.(item.type);
                      setOpenMenuId(null);
                    }}
                  >
                    View
                  </button>

                  {item.type !== "Statistics" && (
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        onCreate?.(item.type);
                        setOpenMenuId(null);
                      }}
                    >
                      Create
                    </button>
                  )}

                  {/* Εμφάνιση Delete μόνο στα appointments */}
                  {item.type === "Appointments" && (
                    <button
                      className="dropdown-item delete"
                      onClick={() => {
                        onDelete?.(item.type);
                        setOpenMenuId(null);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
